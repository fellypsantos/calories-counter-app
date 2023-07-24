import { useEffect, useState, Fragment } from 'react';
import DataBase from '../index';
import Toaster from '../../Utils/Toaster';
import FullScreenLoading from '../../components/FullScreenLoading';
import { useAppTranslation } from '../../hooks/translation';

interface IDataBaseInitProps {
  children: React.ReactNode;
}

export default function DataBaseInit({ children }: IDataBaseInitProps) {

  const [appReady, setAppReady] = useState(false);
  const { Translate } = useAppTranslation();

  useEffect(() => {
    DataBase.open()
      .then(() => setAppReady(true))
      .catch(() => Toaster.ShowToast({ text: Translate('Toast.FailedToConnectToDatabase') }));
  }, []);

  return !appReady ? <FullScreenLoading hideSpinner /> : <Fragment>{children}</Fragment>;
}
