import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { CommonModule } from '@angular/common'

import PurePageShellComponent from './pure-page-shell.component'
import ChatFeedComponent from '../../../chat-feed/chat-feed.component'
import ParticipantsComponent from '../../../participants/participants.component'
import MessageFormComponent from '../../../message-form/message-form.component'
import ChatItemComponent from 'src/app/components/chat-item/chat-item.component'
import { DefaultChatFeed } from '../../../chat-feed/chat-feed.component.stories'
import { DefaultParticipants } from '../../../participants/participants.component.stories'
import { action } from '@storybook/addon-actions'
import { ReactiveFormsModule, FormBuilder } from '@angular/forms'

export default {
  title: 'Pages/PurePageShell',
  component: PurePageShellComponent,
  excludeStories: /.*Data$/,
  decorators: [
    moduleMetadata({
      declarations: [
        ChatFeedComponent,
        ChatItemComponent,
        ParticipantsComponent,
        MessageFormComponent,
      ],
      imports: [CommonModule, ReactiveFormsModule],
      providers: [FormBuilder],
    }),
  ],
} as Meta

export const actionsData = {
  onSendMessage: action('onSendMessage'),
}

const Template: Story<PurePageShellComponent> = (
  args: PurePageShellComponent
) => ({
  props: {
    ...args,
    onSendMessage: actionsData.onSendMessage,
  },
})
// Default scenario
export const Default = Template.bind({})
Default.args = {
  userId: '34',
  messages: DefaultChatFeed.args?.messages,
  participants: DefaultParticipants.args?.participants,
}
