import { action } from '@storybook/addon-actions'
import { Story, Meta, moduleMetadata } from '@storybook/angular'
import { expect } from '@storybook/jest'
import { userEvent, waitFor, within } from '@storybook/testing-library'
import MessageFormComponent from './message-form.component'
import { ReactiveFormsModule, FormBuilder } from '@angular/forms'

export default {
  title: 'Components/MessageForm',
  component: MessageFormComponent,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule],
      providers: [FormBuilder],
    }),
  ],
  excludeStories: /.*Data$/,
} as Meta

export const actionsData = {
  sendMessage: action('sendMessage'),
}

const Template: Story<MessageFormComponent> = (args: MessageFormComponent) => ({
  props: {
    ...args,
    sendMessage: actionsData.sendMessage,
  },
})
// Default scenario
export const EmptyMessageForm = Template.bind({})
EmptyMessageForm.args = {}

export const ValidMessageForm = Template.bind({})
ValidMessageForm.args = {}
ValidMessageForm.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)

  await userEvent.type(canvas.getByTestId('name'), 'Le Bot')
  await userEvent.type(canvas.getByTestId('message'), 'Bonjour')
}

export const CompletedMessageForm = Template.bind({})
CompletedMessageForm.args = {
  // name: 'Dave',
  // message: 'Hello world',
  // freezeName: true,
}
CompletedMessageForm.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)

  await userEvent.type(canvas.getByTestId('name'), 'Le Bot')
  await userEvent.type(canvas.getByTestId('message'), 'Bonjour')
  await userEvent.click(canvas.getByTestId('submit-button'))

  await waitFor(() => expect(args.sendMessage).toHaveBeenCalled())
}
