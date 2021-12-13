import { action } from '@storybook/addon-actions'
import { Story, Meta, moduleMetadata } from '@storybook/angular'
import ChatItemComponent from './chat-item.component'

export default {
  title: 'Components/ChatItem',
  component: ChatItemComponent,
  excludeStories: /.*Data$/,
  decorators: [
    moduleMetadata({
      declarations: [ChatItemComponent],
    }),
  ],
} as Meta

export const actionsData = {
  onSendMessage: action('onSendMessage'),
}

const Template: Story<ChatItemComponent> = (args: ChatItemComponent) => ({
  props: {
    ...args,
    onSendMessage: actionsData.onSendMessage,
  },
})
// Default scenario
export const DefaultChatFeed = Template.bind({})
DefaultChatFeed.args = {
  msg: {
    _id: '12',
    _userId: '23',
    _created: new Date(), //'15:21',
    name: 'Michel Sagen',
    message:
      "Waiting for a few more before we begin, I'm keeping my microphone muted for now 😉",
  },
}
