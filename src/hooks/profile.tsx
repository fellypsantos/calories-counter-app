import { createContext, useMemo, useContext, useState, useEffect, useCallback } from 'react';
import { IProfile } from '../interfaces/IProfile';
import DataBase from '../databases';
import dayjs from 'dayjs';

interface IProfileContext {
  profile: IProfile,
  loadingProfile: boolean;
  setProfile(profile: IProfile): void;
  addProfile(profile: IProfile): void;
}

interface IProps {
  children: React.ReactNode,
}

const ProfileContext = createContext<IProfileContext | null>(null);

const ProfileProvider = ({ children }: IProps) => {

  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profile, setProfile] = useState<IProfile>({
    name: '',
    phrase: '',
    gender: 'M',
    age: 26,
    weight: 65,
    height: 165,
    activityFactor: 1.2,
    createdAt: null,
  });

  useEffect(() => {

    DataBase.getProfileData(profile => {

      if (profile) setProfile(profile);
      setLoadingProfile(false);
    });
  }, []);

  const addProfile = useCallback((newProfile: IProfile) => {

    const profile = { ...newProfile, createdAt: dayjs().toISOString() };

    DataBase.addProfile(profile, (success) => {
      console.log(newProfile);
      console.log('addProfile:', success ? '✅' : '❌');
      setProfile(profile);
    });

  }, [profile]);

  const contextValues = useMemo(() => ({
    profile,
    setProfile,
    addProfile,
    loadingProfile
  }),
    [profile, setProfile, addProfile, loadingProfile]);

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
