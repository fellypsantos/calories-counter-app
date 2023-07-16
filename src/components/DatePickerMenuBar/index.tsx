import { useState, useCallback } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useCalendars } from 'expo-localization';
import { useAppTranslation } from '../../hooks/translation';

import {
  Container,
  DatePickerButton,
  DatePickerButtonIcon,
  DatePickerCurrentDateContainer,
  DatePickerCurrentDate,
} from './styles';

import 'dayjs/locale/pt';
import 'dayjs/locale/en';
import 'dayjs/locale/es';
import Toaster from '../../Utils/Toaster';

dayjs.extend(require('dayjs/plugin/localizedFormat'));

interface IDatePickerMenuBarProps {
  onDateChange(date: Dayjs): void;
}

export default function DatePickerMenuBar({ onDateChange }: IDatePickerMenuBarProps) {

  const use24HClock = useCalendars()[0].uses24hourClock || false;
  const [currentDate, setCurrentDate] = useState(dayjs());
  const { selectedLanguage, Translate } = useAppTranslation();

  const addOneDay = useCallback(() => {

    const nextDay = currentDate.add(1, 'day');
    setCurrentDate(nextDay);
    onDateChange(nextDay);
  }, [currentDate]);

  const subOneDay = useCallback(() => {

    const previewsDay = currentDate.subtract(1, 'day');
    setCurrentDate(previewsDay);
    onDateChange(previewsDay);
  }, [currentDate]);

  const handleOpenTimePicker = () => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange,
      mode: 'date',
      is24Hour: use24HClock,
    });
  }

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === 'set') {
      if (selectedDate !== undefined) {
        setCurrentDate(dayjs(selectedDate));
        onDateChange(dayjs(selectedDate));
      }
    }
  };

  return (
    <Container>
      <DatePickerButton onPress={() => subOneDay()}>
        <DatePickerButtonIcon name="chevron-left" />
      </DatePickerButton>

      <DatePickerCurrentDateContainer onPress={handleOpenTimePicker}>
        <DatePickerCurrentDate>
          {currentDate.locale(selectedLanguage).format('LL')}
        </DatePickerCurrentDate>
      </DatePickerCurrentDateContainer>

      <DatePickerButton onPress={() => addOneDay()}>
        <DatePickerButtonIcon name="chevron-right" />
      </DatePickerButton>
    </Container>
  )
}
