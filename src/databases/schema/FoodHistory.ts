import uuid from 'react-native-uuid';

interface GenerateProps {
  name: string,
  category_level: number;
  kcal: number;
  datetime: Date;
}

export class FoodHistory extends Realm.Object<FoodHistory> {
  id!: string;
  name!: string;
  category_level!: number;
  kcal!: number;
  datetime!: Date;

  static generate({ name, category_level, kcal, datetime }: GenerateProps) {
    return {
      id: uuid.v4(),
      name,
      category_level,
      kcal,
      datetime
    }
  }

  static schema = {
    name: 'food_history',
    primaryKey: 'id',

    properties: {
      id: 'string',
      name: 'string',
      category_level: 'int',
      datetime: 'date',
    },
  }
}
