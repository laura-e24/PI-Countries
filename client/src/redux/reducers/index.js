import { GET_COUNTRIES, GET_COUNTRY, GET_ACTIVITIES, CREATE_ACTIVITY, CLEAN_UP } from "../types";


const initialState = {
  countries: [],
  country: {},
  activities: [],
  status: 'idle'
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRIES:
      return {...state, countries: action.payload.countries}

    case GET_COUNTRY:
      return {...state, country: { ...state.country, ...action.payload.country }}

    case GET_ACTIVITIES:
      return {...state, activities: state.activities.concat(action.payload.activities)}

    case CREATE_ACTIVITY:
      return {...state, activities: state.activities.concat(action.payload.activity)}

    case CLEAN_UP:
      return {...state, country: {}}
        
    default:
      return state;
  }
}