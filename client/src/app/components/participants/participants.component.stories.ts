import { Story, Meta } from '@storybook/angular'
import ParticipantsComponent from './participants.component'
import { Participant } from '../../data.interfaces'

export default {
  title: 'Components/Participants',
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
    _id: '12',
    name: 'Elon Musk',
  },
  {
    _id: '34',
    name: 'Jeff Bezos',
  },
  {
    _id: '56',
    name: 'JB Straubel',
  },
  {
    _id: '78',
    name: 'Reid Hoffman',
  },
]
// Default scenario
export const DefaultParticipants = Template.bind({})
DefaultParticipants.args = {
  participants: participantsData,
}
