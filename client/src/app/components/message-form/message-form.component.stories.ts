import { action } from '@storybook/addon-actions'
import { Story, Meta } from '@storybook/angular'
import MessageFormComponent from './message-form.component'

export default {
  title: 'Components/Molecules/MessageFormComponent',
  component: MessageFormComponent,
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
export const DefaultMessageForm = Template.bind({})
DefaultMessageForm.args = {}
