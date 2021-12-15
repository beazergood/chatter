import { action } from '@storybook/addon-actions'
import { Story, Meta, moduleMetadata } from '@storybook/angular'
import { expect } from '@storybook/jest'
import { userEvent, waitFor, within } from '@storybook/testing-library'
import { ReactiveFormsModule, FormBuilder } from '@angular/forms'
import { CommonModule } from '@angular/common'

// component under test
import MessageFormComponent from './message-form.component'

export default {
  title: 'Components/MessageForm',
  component: MessageFormComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ReactiveFormsModule],
      providers: [FormBuilder],
    }),
  ],
  excludeStories: /.*Data$/,
} as Meta

export const actionsData = {
  onSendMessage: action('onSendMessage'),
}

const Template: Story<MessageFormComponent> = (args: MessageFormComponent) => ({
  props: {
    argTypes: {
      onSendMessage: { action: 'clicked' },
    },
  },
})
// Default scenario
export const EmptyMessageForm = Template.bind({})
EmptyMessageForm.args = {}

export const NameEntered = Template.bind({})
NameEntered.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  await userEvent.type(canvas.getByTestId('name'), 'Le Bot')
}

export const ValidForm = Template.bind({})
ValidForm.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  await userEvent.type(canvas.getByTestId('name'), 'Le Bot')
  await userEvent.type(canvas.getByTestId('message'), 'Bonjour')
}

export const SubmittedForm = Template.bind({})
SubmittedForm.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  await userEvent.type(canvas.getByTestId('name'), 'Santa Paws', { delay: 50 })
  await userEvent.type(canvas.getByTestId('message'), 'Bonjour', {
    delay: 50,
  })
  await userEvent.click(canvas.getByTestId('submit-button'))
  // await waitFor(() => expect(args.onSendMessage).toHaveBeenCalled()) // why doesn't this work?
}

export const SubmittedAndNameEdited = Template.bind({})
SubmittedAndNameEdited.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  await userEvent.type(canvas.getByTestId('name'), 'Santa Paws', { delay: 50 })
  await userEvent.type(canvas.getByTestId('message'), 'Bonjour', {
    delay: 50,
  })
  await userEvent.click(canvas.getByTestId('submit-button'))
  await userEvent.click(canvas.getByTestId('name-edit-button'))
  await userEvent.type(
    canvas.getByTestId('name'),
    ' {backspace}{backspace}{backspace}{backspace}{backspace}{backspace} Claws',
    {
      delay: 50,
    }
  )
  await userEvent.type(canvas.getByTestId('message'), 'Bonjour', {
    delay: 50,
  })

  // await waitFor(() => expect(args.onSendMessage).toHaveBeenCalled()) // why not working?!
}
