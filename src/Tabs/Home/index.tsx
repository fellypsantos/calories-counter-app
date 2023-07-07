import ScrollViewContainer from "../../components/ScrollViewContainer";

import { BottomContainer, ListContainer, ListItemTouchable, TopContainer } from "./styles";
import AdIconsBar from "../../components/AdIconsBar";
import Profile from "../../components/Profile";
import CaloriesCalculator from "../../components/CaloriesCalculator";
import TopBarAddFoodRegistry from "../../components/TopBarAddFoodRegistry";
import NoFoodRegistry from "../../components/NoFoodRegistry";
import CallToAction from "../../components/CallToAction";
import FoodRegistryListItem from "../../components/FoodRegistryListItem";

import { useQuery, useRealm } from "../../databases";
import { FoodHistory } from "../../databases/schema/FoodHistory";
import { Linking } from "react-native";
import { useAppTranslation } from '../../hooks/translation';
import i18next from "i18next";

export default function Home() {

  const { Translate, selectedLanguage, setCurrentLanguage } = useAppTranslation();

  const foodHistory = useQuery(FoodHistory);
  const realm = useRealm();

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
        title="Mais Aplicativos"
        description="Descrição sobre acessar mais apps."
        handleOnPress={() => {
          Linking.openURL('https://play.google.com/store/apps/dev?id=4983605265674024761');
        }}
      />

      <CallToAction title="DEV" description="Botão de testes" handleOnPress={() => {
        console.log('Testando realm db!');

        const response = foodHistory.toJSON();

        console.log('response = ', response);

      }} />

      <CallToAction title={Translate('App.Name')} description="Botão de ação para manipular a database." handleOnPress={() => {
        console.log('language will change');

        console.log('selectedLanguage', selectedLanguage);

        setCurrentLanguage('en');

        console.log('selectedLanguage', selectedLanguage);

        // realm.write(() => {
        //   // realm.create('food_history', FoodHistory.generate({
        //   //   name: 'Refeição Teste',
        //   //   kcal: 321,
        //   //   category_level: 2,
        //   //   datetime: new Date(),
        //   // }));

        //   realm.deleteAll();

        //   console.log('table is clean');
        // });

      }} />
    </ScrollViewContainer>
  );
}
