import React, { useEffect, useMemo, useState } from 'react';
import mobileAds from 'react-native-google-mobile-ads';
import { Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SpInAppUpdates, { NeedsUpdateResponse, IAUUpdateKind, StartUpdateOptions, StatusUpdateEvent } from 'sp-react-native-in-app-updates';

import './i18n.config';
import Colors from './src/Colors';
import AppProvider from './src/hooks';
import MainStack from './src/routes/MainStack';
import Database from './src/databases';
import ButtonDefault from './src/components/ButtonDefault';

Database.open();

mobileAds()
  .initialize()
  .then(adapterStatuses => {
    console.log('Google Ads Loaded.');
  });

const CHECK_UPDATE_INTERVAL_MS = 30 * 1000;

export default function App() {

  const [updateStatus, setUpdateStatus] = useState<StatusUpdateEvent>();

  const inAppUpdates = useMemo(() => new SpInAppUpdates(false), [SpInAppUpdates]);

  const checkAppUpdates = () => {

    inAppUpdates.checkNeedsUpdate().then((result) => {
      if (result.shouldUpdate) {
        let updateOptions: StartUpdateOptions = {};
        updateOptions = {
          updateType: IAUUpdateKind.FLEXIBLE,
        };
        inAppUpdates.startUpdate(updateOptions);
      }
    });

  }

  useEffect(() => {

    checkAppUpdates();
    setInterval(checkAppUpdates, CHECK_UPDATE_INTERVAL_MS);
  }, []);

  useEffect(() => {

    inAppUpdates.addStatusUpdateListener((status) => {
      setUpdateStatus(status);
    });

    return () => {
      inAppUpdates.removeStatusUpdateListener(status => {
        setUpdateStatus(status);
      });
    }
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingTop: 20 }}>
        <StatusBar backgroundColor={Colors.Primary} style='light' />
        <Text>VERSÃO ATUALIZADA</Text>
        <Text>Bytes downloaded: {updateStatus?.bytesDownloaded || '0'}</Text>
        <Text>Total bytes downloaded: {updateStatus?.totalBytesToDownload || '0'}</Text>
        <Text>Status: {updateStatus?.status || '--'}</Text>
        <ButtonDefault text='Install Update' onPress={() => inAppUpdates.installUpdate()} />
        <AppProvider>
          <NavigationContainer>
            <MainStack />
          </NavigationContainer>
        </AppProvider>
      </View>
    </GestureHandlerRootView>
  )
}
