import type { Meta, StoryObj } from '@storybook/react';
import { Location } from 'react-router-dom';

import { AppHeaderUI } from '@ui';

const mockLocation: Location = {
  pathname: '/',
  search: '',
  hash: '',
  state: null,
  key: 'default'
};

const meta = {
  title: 'Example/Header',
  component: AppHeaderUI,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen'
  }
} satisfies Meta<typeof AppHeaderUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  args: {
    userName: 'John Doe',
    location: mockLocation,
    handleMenuClick: () => {},
    handleLogout: () => {}
  }
};

export const LoggedOut: Story = {
  args: {
    userName: undefined,
    location: mockLocation,
    handleMenuClick: () => {},
    handleLogout: () => {}
  }
};
