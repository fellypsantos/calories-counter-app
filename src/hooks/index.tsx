import { ProfileProvider } from "./profile";
import { TranslationProvider } from "./translation";

interface AppProviderProps {
  children: React.ReactElement;
}

export default function AppProvider({ children }: AppProviderProps) {
  return (
    <TranslationProvider>
      <ProfileProvider>
        {children}
      </ProfileProvider>
    </TranslationProvider>
  )
}
