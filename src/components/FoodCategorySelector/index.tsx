import { useEffect, useState } from 'react';
import { Container, MainContainer, TheIcon, TheLabel, TouchableContainer } from "./styles";
import { useAppTranslation } from '../../hooks/translation';

export interface IFoodCategoryItem {
  id: number;
  label: string;
  icon: string;
  checked: boolean;
}

interface IFoodCategorySelectorProps {
  options: IFoodCategoryItem[];
  initialCategoryLevel?: number;
  handleChange(categoryId: number): void;
}

export default function FoodCategorySelector({ options, initialCategoryLevel, handleChange }: IFoodCategorySelectorProps) {

  const [listOptions, setListOptions] = useState<IFoodCategoryItem[]>(options);

  const refreshUI = (categoryId: number) => {
    const updatedOptions = listOptions.map(checkbox => {
      if (checkbox.id === categoryId) {
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

    setListOptions(updatedOptions);
  }

  const handleUpdateOptions = (item: IFoodCategoryItem) => {
    refreshUI(item.id);
    handleChange(item.id);
  };

  useEffect(() => {

    if (initialCategoryLevel !== undefined && initialCategoryLevel > 0) {
      refreshUI(initialCategoryLevel);
    }
  }, []);

  return (
    <MainContainer>
      {listOptions.map(item => (
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
