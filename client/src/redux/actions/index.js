import axios from "axios";
import { GET_COUNTRIES, GET_COUNTRY, GET_ACTIVITIES, CREATE_ACTIVITY, CLEAN_UP } from "../types";

export const getCountries = (name = undefined) => {
  return async (dispatch) => {
    const response = await axios(name
      ? `http://localhost:3001/countries?name=${name}`
      : `http://localhost:3001/countries`
    )

    return dispatch({ type: GET_COUNTRIES, payload: response.data })
  }
}

export const getOneCountry = (countryId) => {
  return async (dispatch) => {
    const response = await axios(`http://localhost:3001/countries/${countryId}`)
  
    return dispatch({ type: GET_COUNTRY, payload: response.data })
  }
}

export const getActivities = () => {
  return async (dispatch) => {
    const response = await axios(`http://localhost:3001/activities`)

    return dispatch({ type: GET_ACTIVITIES, payload: response.data })
  }
}

export const createActivity = (activity) => {
  return async (dispatch) => {
    const response = await axios.post(`http://localhost:3001/activities`, activity)
  
    return dispatch({ type: CREATE_ACTIVITY, payload: response.data })
  }
}

export const cleanUpState = () => {
  return async (dispatch) => {
    return dispatch({ type: CLEAN_UP, payload: {} })
  }
}