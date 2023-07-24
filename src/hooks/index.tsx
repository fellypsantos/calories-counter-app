import { FoodProvider } from "./food";
import { PremiumProvider } from "./premium";
import { ProfileProvider } from "./profile";
import { UpdaterProvider } from "./updater";

interface AppProviderProps {
  children: React.ReactElement;
}

export default function AppProvider({ children }: AppProviderProps) {
  return (
    <UpdaterProvider>
      <PremiumProvider>
        <ProfileProvider>
          <FoodProvider>
            {children}
          </FoodProvider>
        </ProfileProvider>
      </PremiumProvider>
    </UpdaterProvider>
  )
}
