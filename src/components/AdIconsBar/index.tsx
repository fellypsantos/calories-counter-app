import { TouchableOpacity } from "react-native";
import { AdButtonBlock, AdButtonContainer } from "./styles";
import { useNavigation } from "@react-navigation/native";
import Icon from '@expo/vector-icons/FontAwesome5';
import { usePremium } from "../../hooks/premium";

export default function AdIconsBar() {
  const navigation = useNavigation();
  const { isPremiumTime } = usePremium();

  return (
    <AdButtonContainer>
      {!isPremiumTime && (
        <>
          <AdButtonBlock>
            <TouchableOpacity onPress={() => navigation.navigate('DisableAdsIntro')}>
              <Icon name="gift" color="#fff" size={25} />
            </TouchableOpacity>
          </AdButtonBlock>
        </>
      )}
    </AdButtonContainer>
  );
}
