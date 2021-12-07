import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { CommonModule } from '@angular/common'

import PurePageShellComponent from './pure-page-shell.component'
import ChatComponent from '../../chat/chat.component'
import ParticipantsComponent from '../../participants/participants.component'
import { DefaultChat } from '../../chat/chat.component.stories'
import { DefaultParticipants } from '../../participants/participants.component.stories'

export default {
  title: 'Components/PurePageShell',
  component: PurePageShellComponent,
  decorators: [
    moduleMetadata({
      declarations: [ChatComponent, ParticipantsComponent],
      imports: [CommonModule],
    }),
  ],
} as Meta

const Template: Story<PurePageShellComponent> = (
  args: PurePageShellComponent
) => ({
  props: args,
})
// Default scenario
export const Default = Template.bind({})
Default.args = {
  messages: DefaultChat.args?.messages,
  participants: DefaultParticipants.args?.participants,
}
