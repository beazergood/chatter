import ButtonComponent from './button.component'
import { expect } from '@storybook/jest'
import { within, userEvent } from '@storybook/testing-library'
import { Story, Meta } from '@storybook/angular'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Components/Button',
  excludeStories: /.*Data$/,
  component: ButtonComponent,
} as Meta

const Template: Story<ButtonComponent> = (args: ButtonComponent) => ({
  props: {
    ...args,
    onClick: actionsData.onClick,
  },
})
export const actionsData = {
  onClick: action('onClick'),
}
// Default scenario
export const Primary = Template.bind({})

// Primary.args = {}
Primary.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  await userEvent.click(canvas.getByRole('button'))
  await expect(args.onClick).toHaveBeenCalled()
}
