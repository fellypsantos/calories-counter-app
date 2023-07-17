import MainTitle from "../../components/MainTitle";
import Subtitle from "../../components/Subtitle";
import Icon from '@expo/vector-icons/FontAwesome5';

import Colors from "../../Colors";
import SmallBoxContent from "../../components/SmallBoxContent";
import { useNavigation } from "@react-navigation/native";

import { Scrollable, Container, CloseIconBox } from "./styles";

export default function CuriosityContent() {

  const navigation = useNavigation();

  return (
    <Scrollable>
      <Container>
        <CloseIconBox onPress={() => navigation.goBack()}>
          <Icon name="times-circle" size={20} color="#666" />
        </CloseIconBox>
        <Icon name="fire" size={40} color={Colors.Primary} />
        <MainTitle>What is basal energy?</MainTitle>

        <Subtitle renderAsParagraph>{'\t\t\t'}Basal energy is the amount of energy needed to sustain all the basic functions of a living organism. This energy requirement is most accurate when describing the needs of an alert, resting human in a calm mental and physical state and in favorable temperature conditions.</Subtitle>

        <MainTitle>How to calculate?</MainTitle>

        <SmallBoxContent title="Male" content="66.5 + (13.75 * weight) + (5.003 * height) - (6.76 * age)" />
        <SmallBoxContent title="Female" content="65.51 + (13.75 * weight) + (5.003 * height) - (6.775 * age)" />

        <MainTitle>How is basal metabolism related to calories?</MainTitle>
        <Subtitle renderAsParagraph>{'\t\t\t'}The relation between basal metabolism and calorie intake is pretty simple; the higher the basal metabolism/energy expenditure, the higher the number of calories you should consume. In order words, if you need to lose weight (or be able to eat more without gaining weight 🍔), you need to increase your basal metabolism.</Subtitle>
      </Container>
    </Scrollable>
  );
}
