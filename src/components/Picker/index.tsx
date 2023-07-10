import React from 'react';
import FormLabelControl from '../FormLabelControl';
import { Container, PickerControl, PickerControlItem } from './styles';

interface IPickerItem {
  label: string;
  description?: string;
  value: string | number;
}

interface IPickerProps {
  label: string;
  items: IPickerItem[];
  selectedValue: string | number;
  onValueChange(value: unknown, index: number): void;
}

const Picker = ({ label, items, selectedValue, onValueChange }: IPickerProps) => (
  <>
    <FormLabelControl text={label} />
    <Container>
      <PickerControl
        selectedValue={selectedValue}
        onValueChange={onValueChange}>
        {items.map(item => (
          <PickerControlItem key={item.label} label={item.label} value={item.value}
          />
        ))}
      </PickerControl>
    </Container>
  </>
);

export default Picker;
