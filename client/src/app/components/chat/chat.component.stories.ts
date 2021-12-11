import { action } from '@storybook/addon-actions'
import { Story, Meta, moduleMetadata } from '@storybook/angular'
import MessageFormComponent from '../message-form/message-form.component'
import ChatComponent from './chat.component'

export default {
  title: 'Components/Organisms/Chat',
  component: ChatComponent,
  excludeStories: /.*Data$/,
  decorators: [
    moduleMetadata({
      declarations: [ChatComponent, MessageFormComponent],
    }),
  ],
} as Meta

export const actionsData = {
  onSendMessage: action('onSendMessage'),
}

const Template: Story<ChatComponent> = (args: ChatComponent) => ({
  props: {
    ...args,
    onSendMessage: actionsData.onSendMessage,
  },
})
// Default scenario
export const DefaultChat = Template.bind({})
DefaultChat.args = {
  messages: [
    {
      time: new Date(), //'15:21',
      name: 'Michel Sagen',
      message:
        "Waiting for a few more before we begin, I'm keeping my microphone muted for now 😉",
      isBroadcast: false,
    },
    {
      time: new Date(), //'15:22',
      name: 'Meetingbot',
      message: 'Peng Mok joined.',
      isBroadcast: false,
    },
    {
      time: new Date(), //'15:23',
      name: 'Meetingbot',
      message: 'Lars Bergendahl joined.',
      isBroadcast: false,
    },
    {
      time: new Date(), //'15:24',
      name: 'Lars Bergendahl',
      message:
        'When did we get chat? Is the backend ready to handle the massive amount of traffic we willl get?',
      isBroadcast: false,
    },
    {
      time: new Date(), //'15:24',
      name: 'Tom Erik Lia',
      message: 'Looks like I have another meeting, please email notes to me',
      isBroadcast: false,
    },
    {
      time: new Date(), //'15:24',
      name: 'Meetingbot',
      message: 'Tom Erik Lia left.',
      isBroadcast: false,
    },
    {
      time: new Date(), //'15:25',
      name: 'Krzystof Grzeslo',
      message:
        'Will ask Thomas to restart sleipnir chat on osl-mid3. Thomas has a plan to migrate to chat websockets: www.websocketsforbeginners.com',
      isBroadcast: false,
    },
    {
      time: new Date(), //'15:25',
      name: 'Michel Sagen',
      message:
        "I'm not sure about websockets. Chat already has a name - strongly suggest we do not change the name weeks before it is launched. Should we launch on desktop first?",
      isBroadcast: false,
    },
  ],
}
