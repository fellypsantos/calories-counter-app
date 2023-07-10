import { ToastAndroid } from 'react-native';

interface IToastProps {
  text: string;
  duration?: 'SHORT' | 'LONG';
}

export default {
  ShowToast: (props: IToastProps) => {
    const { text, duration = 'SHORT' } = props;

    ToastAndroid.showWithGravityAndOffset(
      text,
      duration === 'SHORT' ? ToastAndroid.SHORT : ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      0,
      160,
    );
  },
};
