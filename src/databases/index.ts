import { createRealmContext } from '@realm/react';

import { FoodHistory } from "./schema/FoodHistory";

export const {
  RealmProvider,
  useRealm,
  useQuery,
  useObject
} = createRealmContext({ schema: [FoodHistory] });
