import { FoodProvider } from "./food";
import { PremiumProvider } from "./premium";
import { ProfileProvider } from "./profile";
import { TranslationProvider } from "./translation";

interface AppProviderProps {
  children: React.ReactElement;
}

export default function AppProvider({ children }: AppProviderProps) {
  return (
    <TranslationProvider>
      <PremiumProvider>
        <ProfileProvider>
          <FoodProvider>
            {children}
          </FoodProvider>
        </ProfileProvider>
      </PremiumProvider>
    </TranslationProvider>
  )
}
