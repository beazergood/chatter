import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { CommonModule } from '@angular/common'

import PurePageShellComponent from './pure-page-shell.component'
import ChatComponent from '../../../chat/chat.component'
import ParticipantsComponent from '../../../participants/participants.component'
import MessageFormComponent from '../../../message-form/message-form.component'
import { DefaultChat } from '../../../chat/chat.component.stories'
import { DefaultParticipants } from '../../../participants/participants.component.stories'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Pages/PurePageShell',
  component: PurePageShellComponent,
  excludeStories: /.*Data$/,
  decorators: [
    moduleMetadata({
      declarations: [
        ChatComponent,
        ParticipantsComponent,
        MessageFormComponent,
      ],
      imports: [CommonModule],
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
  messages: DefaultChat.args?.messages,
  participants: DefaultParticipants.args?.participants,
}
