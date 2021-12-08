import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { CommonModule } from '@angular/common'

import PurePageShellComponent from './pure-page-shell.component'
import ChatComponent from '../../../organisms/chat/chat.component'
import ParticipantsComponent from '../../../organisms/participants/participants.component'
import MessageFormComponent from '../../../molecules/message-form/message-form.component'
import { DefaultChat } from '../../../organisms/chat/chat.component.stories'
import { DefaultParticipants } from '../../../organisms/participants/participants.component.stories'
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
