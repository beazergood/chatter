module.exports = {
  stories: ['../src/app/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-actions',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/angular',
  core: {
    builder: 'webpack5',
  },
}
