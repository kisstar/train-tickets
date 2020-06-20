import { reducer as homeReducer } from '../pages/home/store';
import { reducer as cityReducer } from '../pages/city/store';
import { reducer as trainReducer } from '../pages/train-list/store';

const reducers = {
  home: homeReducer,
  city: cityReducer,
  train: trainReducer,
};

export default reducers;
