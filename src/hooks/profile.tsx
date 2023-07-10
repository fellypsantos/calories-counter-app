import { createContext, useMemo, useContext, useState, useEffect, useCallback } from 'react';
import { IProfile } from '../interfaces/IProfile';

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
    name: 'Leon Kennedy',
    phrase: '',
    gender: 'M',
    age: 16,
    weight: 65,
    height: 165,
    activityFactor: 1.2,
    createdAt: new Date(),
  });

  useEffect(() => {

  }, []);

  const addProfile = useCallback((newProfile: IProfile) => {
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
