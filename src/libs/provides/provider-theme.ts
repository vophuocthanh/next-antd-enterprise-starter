import { ThemeConfig } from 'antd';

export const themeConfigProvider: ThemeConfig = {
  token: {
    colorPrimary: '#003E92',
    colorLink: '#3896FA',
    colorError: '#FF4D4F',
    colorTextSecondary: '#737373',
  },
  components: {
    Button: {
      colorTextDisabled: '#ffffff',
    },
  },
};
