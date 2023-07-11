import { createContext, useMemo, useContext, useState, useEffect, useCallback } from 'react';
import { IProfile } from '../interfaces/IProfile';
import DataBase from '../databases';
import dayjs from 'dayjs';
import { useAppTranslation } from './translation';

interface IProfileContext {
  profile: IProfile,
  loadingProfile: boolean;
  setProfile(profile: IProfile): void;
  addProfile(profile: IProfile): void;
  updateProfile(profile: IProfile): void;
}

interface IProps {
  children: React.ReactNode,
}

const ProfileContext = createContext<IProfileContext | null>(null);

const ProfileProvider = ({ children }: IProps) => {

  const { setCurrentLanguage, selectedLanguage } = useAppTranslation();
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profile, setProfile] = useState<IProfile>({
    name: '',
    phrase: '',
    gender: 'M',
    age: 26,
    weight: 65,
    height: 165,
    activityFactor: 1.2,
    language: selectedLanguage,
    createdAt: null,
  });

  useEffect(() => {

    DataBase.getProfileData(profile => {

      if (profile) {
        setProfile(profile);
        setCurrentLanguage(profile.language);
      }

      setLoadingProfile(false);
    });
  }, []);

  const addProfile = useCallback((newProfile: IProfile) => {

    const profile = { ...newProfile, createdAt: dayjs().toISOString() };
    DataBase.addProfile(profile, () => setProfile(profile));
  }, [profile]);

  const updateProfile = useCallback((editedProfile: IProfile) => {

    DataBase.updateProfile(editedProfile, () => { });

  }, [profile]);

  const contextValues = useMemo(() => ({
    profile,
    setProfile,
    addProfile,
    loadingProfile,
    updateProfile
  }),
    [profile, setProfile, addProfile, loadingProfile, updateProfile]);

  return <ProfileContext.Provider value={contextValues}>
    {children}
  </ProfileContext.Provider>
}

const useProfile = () => {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error(
      'useProfile must be used within a ProfileProvider',
    );
  }

  return context;
}

export { ProfileProvider, useProfile };
