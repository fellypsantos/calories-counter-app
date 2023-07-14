import { Linking } from "react-native";
import ScrollViewContainer from "../../components/ScrollViewContainer";

import { BottomContainer, ListContainer, ListItemTouchable, TopContainer } from "./styles";
import AdIconsBar from "../../components/AdIconsBar";
import Profile from "../../components/Profile";
import CaloriesCalculator from "../../components/CaloriesCalculator";
import TopBarAddFoodRegistry from "../../components/TopBarAddFoodRegistry";
import NoFoodRegistry from "../../components/NoFoodRegistry";
import CallToAction from "../../components/CallToAction";
import FoodRegistryListItem from "../../components/FoodRegistryListItem";

import { useAppTranslation } from '../../hooks/translation';
import { useFoodRecord } from "../../hooks/food";

export default function Dashboard() {

  const { Translate } = useAppTranslation();

  const { foodHistory } = useFoodRecord();

  return (
    <ScrollViewContainer>
      <TopContainer>
        <AdIconsBar />
        <Profile />
        <CaloriesCalculator />
      </TopContainer>

      <BottomContainer>
        <TopBarAddFoodRegistry />
        <NoFoodRegistry hidden={foodHistory.length !== 0} />
        <ListContainer>
          {foodHistory.map(item => (
            <ListItemTouchable key={item.id} onPress={() => null}>
              <FoodRegistryListItem key={item.id} foodRecord={item} />
            </ListItemTouchable>
          ))}
        </ListContainer>
      </BottomContainer>

      <CallToAction
        title={Translate('BlockOption.Developer.MoreApps.Title')}
        description={Translate('BlockOption.Developer.MoreApps.Description')}
        handleOnPress={() => {
          Linking.openURL('https://play.google.com/store/apps/dev?id=4983605265674024761');
        }}
      />
    </ScrollViewContainer>
  );
}
