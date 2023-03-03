import { sortArr } from "../../utils";
import { GET_COUNTRIES, GET_COUNTRY, GET_ACTIVITIES, CREATE_ACTIVITY, CLEAN_UP, SORT_COUNTRIES, FILTER_COUNTRIES, REMOVE_ACTIVITY, UPDATE_ACTIVITY, RESTORE_ACTIVITY, GET_ACTIVITY, DELETE_ACTIVITY, DISABLE_ACTIVITY } from "../types";


const initialState = {
  filteredCountries: [],
  countries: [],
  country: {},
  activities: [],
  activity: {}
};

export default (state = initialState, action) => {
  const filteredCopy = state.filteredCountries.slice()

  switch (action.type) {
    case GET_COUNTRIES:
      return {...state, countries: action.payload.countries, filteredCountries: action.payload.countries}

    case GET_COUNTRY:
      return {...state, country: action.payload}

    case FILTER_COUNTRIES:
      const filterByAct = (country) => {
        const activitiesNames = country.Activities.map(a => a.name);
        return activitiesNames.some(v => action.payload.activities?.values.includes(v))
      }

      const filterByCont = (country) => {
        return action.payload.continents?.values.some(v => country.continent.includes(v))
      }

      const filteredByActivity = (action.payload.activities?.active && !!action.payload.activities?.values.length)
      ? filteredCopy.filter(filterByAct)
      : filteredCopy

    const allFilteredCountries = (action.payload.continents?.active && !!action.payload.continents?.values.length)
    ?  filteredByActivity.filter(filterByCont) 
    : filteredByActivity
      return {...state, countries: allFilteredCountries}

    case SORT_COUNTRIES:
      const newArr = (action.payload.active && action.payload.by && action.payload.order)
        ? sortArr(state.countries, action.payload.order, action.payload.by)
        : filteredCopy

      return {...state, countries: newArr}
        
    case GET_ACTIVITIES:
      return {...state, activities: action.payload.activities }

    case GET_ACTIVITY:
      return {...state, activity: action.payload}

    case CREATE_ACTIVITY:
      return {...state, activities: state.activities.concat(action.payload.activity)}

    case DELETE_ACTIVITY:
      return {...state, activities: state.activities.filter(act => act.id !== action.payload)}

    case DISABLE_ACTIVITY:
      return {...state, activities: state.activities.map(act => {
        if (act.id === action.payload) {
          return {
            ...act,
            ...action.payload
          }
        } else return act
      })}

    case RESTORE_ACTIVITY:
      return {...state, activities: state.activities.map(act => {
        if (act.id === action.payload) {
          return {
            ...act,
            ...action.payload
          }
        } else return act
      })}

    case UPDATE_ACTIVITY:
      return {...state, activities: state.activities.map(act => {
        if (act.id === action.payload.id) {
          return {
            ...act,
            ...action.payload
          }
        } else return act
      })}

    case CLEAN_UP:
      return {...state, country: {}}

    default:
      return state;
  }
}