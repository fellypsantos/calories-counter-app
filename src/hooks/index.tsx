import { FoodProvider } from "./food";
import { PremiumProvider } from "./premium";
import { ProfileProvider } from "./profile";
import { TranslationProvider } from "./translation";
import { UpdaterProvider } from "./updater";

interface AppProviderProps {
  children: React.ReactElement;
}

export default function AppProvider({ children }: AppProviderProps) {
  return (
    <TranslationProvider>
      <UpdaterProvider>
        <PremiumProvider>
          <ProfileProvider>
            <FoodProvider>
              {children}
            </FoodProvider>
          </ProfileProvider>
        </PremiumProvider>
      </UpdaterProvider>
    </TranslationProvider>
  )
}
