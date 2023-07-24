import dayjs from 'dayjs';
import { createContext, useMemo, useContext, useState, useEffect, useCallback } from 'react';
import { IProfile } from '../interfaces/IProfile';
import { useAppTranslation } from './translation';
import ProfileService from '../services/ProfileService';
import Toaster from '../Utils/Toaster';


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

  const { setCurrentLanguage, selectedLanguage, Translate } = useAppTranslation();
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

  const profileService = useMemo(() => new ProfileService(), []);

  useEffect(() => {

    profileService.getProfileData()
      .then(profile => {

        if (profile) {
          setProfile(profile);
          setCurrentLanguage(profile.language);
        }

        setLoadingProfile(false);
      })
      .catch(() => { });
  }, []);

  const addProfile = useCallback(async (newProfile: IProfile) => {

    const profile = { ...newProfile, createdAt: dayjs().toISOString() };
    const success = await profileService.addProfile(profile);

    if (success) setProfile(profile);
    else Toaster.ShowToast({ text: Translate('Toast.FailedToAddProfile') });

  }, [profile]);

  const updateProfile = useCallback(async (editedProfile: IProfile) => {

    const success = await profileService.updateProfile(editedProfile);

    if (success) setProfile(editedProfile);
    else Toaster.ShowToast({ text: Translate('Toast.FailedToUpdateProfile') });
  }, [profile]);

  const basalMetabolicExpenditure = useMemo<number>(() => {

    const { weight, height, age, gender, activityFactor } = profile;

    const calc = gender === 'M'
      ? 66.5 + (13.75 * weight) + (5.003 * height) - (6.76 * age)
      : 65.51 + (13.75 * weight) + (5.003 * height) - (6.775 * age);

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
