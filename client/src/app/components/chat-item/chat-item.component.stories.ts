import { action } from '@storybook/addon-actions'
import { Story, Meta, moduleMetadata } from '@storybook/angular'
import { ReactiveFormsModule, FormBuilder } from '@angular/forms'
import ChatItemComponent from './chat-item.component'

export default {
  title: 'Components/ChatItem',
  component: ChatItemComponent,
  excludeStories: /.*Data$/,
  decorators: [
    moduleMetadata({
      declarations: [ChatItemComponent],
      imports: [ReactiveFormsModule],
      providers: [FormBuilder],
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
export const DefaultChatItem = Template.bind({})
DefaultChatItem.args = {
  msg: {
    _id: '12',
    _userId: '23',
    _created: new Date(), //'15:21',
    name: 'Michel Sagen',
    message:
      "Waiting for a few more before we begin, I'm keeping my microphone muted for now 😉",
  },
}

export const EditedChatItem = Template.bind({})
EditedChatItem.args = {
  msg: {
    _id: '12',
    _userId: '23',
    _created: new Date(), //'15:21',
    _modified: new Date(), //'15:21',
    name: 'Michel Sagen',
    message:
      "Waiting for a few more before we begin, I'm keeping my microphone muted for now as I had beans for breakfast 😉",
  },
}

export const YourChatItem = Template.bind({})
YourChatItem.args = {
  msg: {
    _id: '12',
    _userId: '23',
    _created: new Date(), //'15:21',
    name: 'Dave Beazer',
    message:
      "Waiting for a few more before we begin, I'm keeping my microphone muted for now 😉",
  },
  userId: '23',
}
