import { ToastAndroid, ToastAndroidStatic } from 'react-native';

interface IToastProps {
  text: string;
  duration?: 'SHORT' | 'LONG';
  position?: 'BOTTOM' | 'CENTER',
}

export default {
  ShowToast: (props: IToastProps) => {
    const { text, duration = 'SHORT', position = 'BOTTOM' } = props;

    ToastAndroid.showWithGravityAndOffset(
      text,
      duration === 'SHORT' ? ToastAndroid.SHORT : ToastAndroid.LONG,
      position === 'BOTTOM' ? ToastAndroid.BOTTOM : ToastAndroid.CENTER,
      0,
      160,
    );
  },
};
