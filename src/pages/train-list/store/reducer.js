import {
  SET_FROM,
  SET_TO,
  SET_DEPART_DATE,
  SET_HIGHSPEED,
  SET_TRAIN_LIST,
  SET_ORDER_TYPE,
  SET_ONLY_TICKETS,
  SET_TICKET_TYPES,
  SET_CHECKED_TICKET_TYPE,
  SET_TRAIN_TYPES,
  SET_CHECKED_TRAIN_TYPES,
  SET_DEPART_STATIONS,
  SET_CHECKED_DEPART_STATIONS,
  SET_ARRIVE_STATIONS,
  SET_CHECKED_ARRIVE_STATIONS,
  SET_DEPART_TIME_START,
  SET_DEPART_TIME_END,
  SET_ARRIVE_TIME_START,
  SET_ARRIVE_TIME_END,
  SET_IS_FILTERS_VISIABLE,
  SET_SEARCH_PARSED,
} from './action-types';
import { h0 } from '../../../lib/utils';

export const ORDER_DEPART = 1;
export const ORDER_DURATION = 2;

const initState = {
  from: '',
  to: '',
  departDate: h0(),
  highSpeed: false,
  trainList: [],
  orderType: ORDER_DEPART,
  onlyTickets: false,
  ticketTypes: [],
  checkedTicketType: {},
  trainTypes: [],
  checkedTrainTypes: {},
  departStations: [],
  checkedDepartStations: {},
  arriveStations: [],
  checkedArriveStations: [],
  departTimeStart: 0,
  departTimeEnd: 24,
  arriveTimeStart: 0,
  arriveTimeEnd: 24,
  isFiltersVisible: false,
  searchParsed: false,
};

function reducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_FROM:
      return { ...state, from: payload };
    case SET_TO:
      return { ...state, to: payload };
    case SET_DEPART_DATE:
      return { ...state, departDate: payload };
    case SET_HIGHSPEED:
      return { ...state, highSpeed: payload };
    case SET_TRAIN_LIST:
      return { ...state, trainList: payload };
    case SET_ORDER_TYPE:
      return { ...state, orderType: payload };
    case SET_ONLY_TICKETS:
      return { ...state, onlyTickets: payload };
    case SET_TICKET_TYPES:
      return { ...state, ticketTypes: payload };
    case SET_CHECKED_TICKET_TYPE:
      return { ...state, checkedTicketType: payload };
    case SET_TRAIN_TYPES:
      return { ...state, trainTypes: payload };
    case SET_CHECKED_TRAIN_TYPES:
      return { ...state, checkedTrainTypes: payload };
    case SET_DEPART_STATIONS:
      return { ...state, departStations: payload };
    case SET_CHECKED_DEPART_STATIONS:
      return { ...state, checkedDepartStations: payload };
    case SET_ARRIVE_STATIONS:
      return { ...state, arriveStations: payload };
    case SET_CHECKED_ARRIVE_STATIONS:
      return { ...state, checkedArriveStations: payload };
    case SET_DEPART_TIME_START:
      return { ...state, departTimeStart: payload };
    case SET_DEPART_TIME_END:
      return { ...state, departTimeEnd: payload };
    case SET_ARRIVE_TIME_START:
      return { ...state, arriveTimeStart: payload };
    case SET_ARRIVE_TIME_END:
      return { ...state, arriveTimeEnd: payload };
    case SET_IS_FILTERS_VISIABLE:
      return { ...state, isFiltersVisible: payload };
    case SET_SEARCH_PARSED:
      return { ...state, searchParsed: payload };
    default:
      return state;
  }
}

export default reducer;
