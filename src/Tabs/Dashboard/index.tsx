import { Alert, Linking } from "react-native";
import ScrollViewContainer from "../../components/ScrollViewContainer";

import dayjs from "dayjs";
import AdIconsBar from "../../components/AdIconsBar";
import Profile from "../../components/Profile";
import CaloriesCalculator from "../../components/CaloriesCalculator";
import TopBarAddFoodRegistry from "../../components/TopBarAddFoodRegistry";
import NoFoodRegistry from "../../components/NoFoodRegistry";
import CallToAction from "../../components/CallToAction";
import FoodRegistryListItem from "../../components/FoodRegistryListItem";

import { useNavigation } from "@react-navigation/native";
import { useAppTranslation } from '../../hooks/translation';
import { useFoodRecord } from "../../hooks/food";
import { IFoodRecord } from "../../interfaces/IFoodRecord";

import { BottomContainer, ListContainer, ListItemTouchable, TopContainer } from "./styles";

export default function Dashboard() {

  const { Translate, selectedLanguage } = useAppTranslation();
  const { foodHistory, deleteFoodRecord } = useFoodRecord();

  const navigation = useNavigation();

  const handleConfirmDeleteListItem = (foodRecord: IFoodRecord) => {
    Alert.alert(
      Translate('Alert.Caution'),
      Translate('Alert.Message.ConfirmRemoveItem'),
      [
        { text: Translate('Modal.Button.Cancel'), onPress: () => null },
        {
          text: Translate('Modal.Button.YesWantDelete'),
          onPress: () => deleteFoodRecord(foodRecord),
        },
      ],
    );
  };

  const handlePressListItem = (item: IFoodRecord) => {

    const time = dayjs(item.timestamp).locale(selectedLanguage);

    Alert.alert(
      Translate('Modal.Title.RegistryDetails'),
      `${Translate('Modal.Label.Name')}: ${item.name}
${Translate('Modal.Label.Calories')}: ${item.kcal} Kcal
${Translate('Modal.Label.Date')}: ${time.format('LL')}
${Translate('Modal.Label.Hour')}: ${time.format('LT')}`,
      [
        {
          text: Translate('Modal.Button.Delete'),
          onPress: () => handleConfirmDeleteListItem(item),
        },
        {
          text: Translate('Modal.Button.Edit'),
          onPress: () => navigation.navigate('AddFoodRegistry', { foodRecord: item }),
        },
        { text: Translate('Modal.Button.Close'), onPress: () => { } },
      ],
    );
  }

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
            <ListItemTouchable key={item.id} onPress={() => handlePressListItem(item)}>
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
