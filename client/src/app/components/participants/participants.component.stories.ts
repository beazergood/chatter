import { Story, Meta } from '@storybook/angular'
import ParticipantsComponent, { Participant } from './participants.component'

export default {
  title: 'Components/Organisms/Participants',
  component: ParticipantsComponent,
  excludeStories: /.*Data$/,
  argTypes: {
    label: { control: 'string' },
  },
} as Meta

const Template: Story<ParticipantsComponent> = (
  args: ParticipantsComponent
) => ({
  props: args,
})

const participantsData: Participant[] = [
  {
    firstname: 'Elon',
    lastname: 'Musk',
  },
  {
    firstname: 'Jeff',
    lastname: 'Bezos',
  },
  {
    firstname: 'JB',
    lastname: 'Straubel',
  },
  {
    firstname: 'Reid',
    lastname: 'Hoffman',
  },
]
// Default scenario
export const DefaultParticipants = Template.bind({})
DefaultParticipants.args = {
  participants: participantsData,
}
