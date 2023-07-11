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

export default function Dashboard() {

  const { Translate } = useAppTranslation();

  const theFoodHistory = [{ id: 1 }, { id: 2 }];

  const isEmptyFoodList = theFoodHistory.length == 0;

  return (
    <ScrollViewContainer>
      <TopContainer>
        <AdIconsBar />
        <Profile />
        <CaloriesCalculator />
      </TopContainer>

      <BottomContainer>
        <TopBarAddFoodRegistry />
        <NoFoodRegistry hidden={!isEmptyFoodList} />
        <ListContainer>
          {theFoodHistory.map(item => (
            <ListItemTouchable key={item.id} onPress={() => null}>
              <FoodRegistryListItem />
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
