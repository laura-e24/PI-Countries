import { sortArr } from "../../utils";
import { GET_COUNTRIES, GET_COUNTRY, GET_ACTIVITIES, CREATE_ACTIVITY, CLEAN_UP, SORT_COUNTRIES, FILTER_COUNTRIES } from "../types";


const initialState = {
  filteredCountries: [],
  countries: [],
  country: {},
  activities: []
};

export default (state = initialState, action) => {
  const filteredCopy = state.filteredCountries.slice()

  switch (action.type) {
    case GET_COUNTRIES:
      return {...state, countries: action.payload.countries, filteredCountries: action.payload.countries}

    case GET_COUNTRY:
      return {...state, country: { ...state.country, ...action.payload.country }}

    case GET_ACTIVITIES:
      return {...state, activities: state.activities.concat(action.payload.activities)}

    case CREATE_ACTIVITY:
      return {...state, activities: state.activities.concat(action.payload.activity)}

    case CLEAN_UP:
      return {...state, country: {}}

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
        
    default:
      return state;
  }
}