import { combineReducers } from "@reduxjs/toolkit";
import countriesSlice from "../features/countries/countriesSlice";
import activitiesSlice from "../features/activities/activitiesSlice";

export const rootReducer = combineReducers({
  countries: countriesSlice,
  activities: activitiesSlice
})