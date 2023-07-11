import { useEffect, useState } from 'react';
import { Container, MainContainer, TheIcon, TheLabel, TouchableContainer } from "./styles";
import { useAppTranslation } from '../../hooks/translation';

interface IFoodCategoryItem {
  id: number;
  label: string;
  icon: string;
  checked: boolean;
}

interface IFoodCategorySelectorProps {
  handleChange(int: number): void;
}

export default function FoodCategorySelector({ handleChange }: IFoodCategorySelectorProps) {
  const { Translate, selectedLanguage } = useAppTranslation();

  const [foodCategories, setFoodCategories] = useState<IFoodCategoryItem[]>();

  const handleUpdateOptions = (item: IFoodCategoryItem) => {
    const updatedOptions = foodCategories?.map(checkbox => {
      if (checkbox.id === item.id) {
        return {
          ...checkbox,
          checked: !checkbox.checked,
        };
      }

      return {
        ...checkbox,
        checked: false,
      };
    });

    handleChange(item.id);
    setFoodCategories(updatedOptions);
  };

  useEffect(() => {
    setFoodCategories([
      {
        id: 1,
        label: Translate('Food.Category.Light'),
        icon: 'smile',
        checked: false,
      },
      {
        id: 2,
        label: Translate('Food.Category.Moderate'),
        icon: 'exclamation-triangle',
        checked: false,
      },
      {
        id: 3,
        label: Translate('Food.Category.Heavy'),
        icon: 'sad-tear',
        checked: false,
      },
    ]);
  }, [selectedLanguage]);

  return (
    <MainContainer>
      {foodCategories?.map(item => (
        <TouchableContainer
          onPress={() => handleUpdateOptions(item)}
          key={item.id}
          isMiddle={item.id === 2}>
          <Container isChecked={item.checked}>
            <TheIcon name={item.icon} size={25} color="#333" isChecked={item.checked} />
            <TheLabel isChecked={item.checked}>{item.label}</TheLabel>
          </Container>
        </TouchableContainer>
      ))}
    </MainContainer>
  )
}
