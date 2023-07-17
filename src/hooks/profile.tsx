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
  basalMetabolicExpenditure: number;
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
    age: 0,
    weight: 0,
    height: 0,
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

    DataBase.updateProfile(editedProfile, success => {
      if (success) setProfile(editedProfile);
    });

  }, [profile]);

  const basalMetabolicExpenditure = useMemo<number>(() => {

    const { weight, height, age, gender, activityFactor } = profile;

    const calc = gender === 'M'
      ? 13.75 * weight + 5 * height - 6.76 * age + 66.5
      : 9.56 * weight + 1.85 * height - 4.68 * age + 665;

    return Math.round(calc * activityFactor);
  }, [profile]);

  const contextValues = useMemo(() => ({
    profile,
    setProfile,
    addProfile,
    loadingProfile,
    updateProfile,
    basalMetabolicExpenditure
  }),
    [
      profile,
      setProfile,
      addProfile,
      loadingProfile,
      updateProfile,
      basalMetabolicExpenditure
    ]);

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
