import { createContext, useMemo, useContext, useState, useEffect, useCallback } from 'react';
import SpInAppUpdates, { IAUUpdateKind, StatusUpdateEvent } from 'sp-react-native-in-app-updates';

interface IUpdaterContext {
  updateButtonVisible: boolean;
  installDownloadedUpdate(): void;
  downloadProgress: number;
}

interface IProps {
  children: React.ReactNode,
}

const UpdaterContext = createContext<IUpdaterContext | null>(null);

const CHECK_UPDATE_INTERVAL_MS = 30 * 1000;
const UPDATE_DOWNLOADING = 2;
const UPDATE_DOWNLOADED = 11;

const UpdaterProvider = ({ children }: IProps) => {

  const [updateStatus, setUpdateStatus] = useState<StatusUpdateEvent>();
  const [updateButtonVisible, setUpdateButtonVisible] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const inAppUpdates = useMemo(() => new SpInAppUpdates(false), [SpInAppUpdates]);

  const checkAppUpdates = () => {

    inAppUpdates.checkNeedsUpdate().then((result) => {
      if (result.shouldUpdate) {
        inAppUpdates.startUpdate({
          updateType: IAUUpdateKind.FLEXIBLE
        });
      }
    });
  }

  const installDownloadedUpdate = useCallback(() => {

    inAppUpdates.installUpdate();
  }, [inAppUpdates]);

  useEffect(() => {

    // CHECK FOR UPDATES
    checkAppUpdates();
    setInterval(checkAppUpdates, CHECK_UPDATE_INTERVAL_MS);
  }, []);

  useEffect(() => {

    // HANDLE UPDATE PROGRESS
    inAppUpdates.addStatusUpdateListener(setUpdateStatus);

    return () => {
      inAppUpdates.removeStatusUpdateListener(setUpdateStatus);
    }
  }, []);

  useEffect(() => {

    if (updateStatus?.status === UPDATE_DOWNLOADING) {
      const { bytesDownloaded, totalBytesToDownload } = updateStatus;
      const progressPercentage = (bytesDownloaded / totalBytesToDownload) * 100;
      const selectedProgress = progressPercentage > 100 ? 100 : progressPercentage;
      setDownloadProgress(selectedProgress);
    }

    if (updateStatus?.status === UPDATE_DOWNLOADED) {
      setDownloadProgress(0);
      setUpdateButtonVisible(true);
    }
  }, [updateStatus]);

  const contextValues = useMemo(() => ({
    updateButtonVisible,
    installDownloadedUpdate,
    downloadProgress
  }),
    [
      updateButtonVisible,
      installDownloadedUpdate,
      downloadProgress
    ]);

  return <UpdaterContext.Provider value={contextValues}>
    {children}
  </UpdaterContext.Provider>
}

const useUpdater = () => {
  const context = useContext(UpdaterContext);

  if (!context) {
    throw new Error(
      'useUpdater must be used within a UpdaterProvider',
    );
  }

  return context;
}

export { UpdaterProvider, useUpdater };
