import { FoodProvider } from "./food";
import { ProfileProvider } from "./profile";
import { TranslationProvider } from "./translation";

interface AppProviderProps {
  children: React.ReactElement;
}

export default function AppProvider({ children }: AppProviderProps) {
  return (
    <TranslationProvider>
      <ProfileProvider>
        <FoodProvider>
          {children}
        </FoodProvider>
      </ProfileProvider>
    </TranslationProvider>
  )
}
