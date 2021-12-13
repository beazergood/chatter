import { action } from '@storybook/addon-actions'
import { Story, Meta, moduleMetadata } from '@storybook/angular'
import { ReactiveFormsModule, FormBuilder } from '@angular/forms'
import ChatFeedComponent from './chat-feed.component'
import ChatItemComponent from '../chat-item/chat-item.component'

export default {
  title: 'Components/ChatFeed',
  component: ChatFeedComponent,
  excludeStories: /.*Data$/,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule],
      providers: [FormBuilder],
      declarations: [ChatFeedComponent, ChatItemComponent],
    }),
  ],
} as Meta

export const actionsData = {
  saveChanges: action('saveChanges'),
}

const Template: Story<ChatFeedComponent> = (args: ChatFeedComponent) => ({
  props: {
    ...args,
    saveChanges: actionsData.saveChanges,
  },
})
// Default scenario
export const DefaultChatFeed = Template.bind({})
DefaultChatFeed.args = {
  messages: [
    {
      _id: '12',
      _userId: '23',
      _created: new Date(), //'15:21',
      name: 'Michel Sagen',
      message:
        "Waiting for a few more before we begin, I'm keeping my microphone muted for now 😉",
    },
    {
      _id: '34',
      _userId: '00',
      _created: new Date(), //'15:22',
      name: 'Meetingbot',
      message: 'Peng Mok joined.',
    },
    {
      _id: '12',
      _userId: '00',
      _created: new Date(), //'15:23',
      name: 'Meetingbot',
      message: 'Lars Bergendahl joined.',
    },
    {
      _id: '12',
      _userId: '34',
      _created: new Date(), //'15:24',
      name: 'Lars Bergendahl',
      message:
        'When did we get chat? Is the backend ready to handle the massive amount of traffic we willl get?',
    },
    {
      _id: '12',
      _userId: '77',
      _created: new Date(), //'15:24',
      name: 'Tom Erik Lia',
      message: 'Looks like I have another meeting, please email notes to me',
    },
    {
      _id: '12',
      _userId: '00',
      _created: new Date(), //'15:24',
      name: 'Meetingbot',
      message: 'Tom Erik Lia left.',
    },
    {
      _id: '12',
      _userId: '11',
      _created: new Date(), //'15:25',
      name: 'Krzystof Grzeslo',
      message:
        'Will ask Thomas to restart sleipnir chat on osl-mid3. Thomas has a plan to migrate to chat websockets: www.websocketsforbeginners.com',
    },
    {
      _id: '12',
      _userId: '23',
      _created: new Date(), //'15:25',
      name: 'Michel Sagen',
      message:
        "I'm not sure about websockets. Chat already has a name - strongly suggest we do not change the name weeks before it is launched. Should we launch on desktop first?",
    },
  ],
}
