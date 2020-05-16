import { reducer as homeReducer } from '../pages/home/store';
import { reducer as cityReducer } from '../pages/city/store';

const reducers = {
  home: homeReducer,
  city: cityReducer,
};

export default reducers;
