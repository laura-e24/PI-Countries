import axios from "axios";
import { sortArr } from "../../utils";
import { GET_COUNTRIES, GET_COUNTRY, GET_ACTIVITIES, CREATE_ACTIVITY, CLEAN_UP, SORT_COUNTRIES, FILTER_COUNTRIES } from "../types";

export const getCountries = (name = undefined) => {
  return async (dispatch) => {
    const response = await axios(name
      ? `/countries?name=${name}`
      : `/countries`
    )

    return dispatch({ type: GET_COUNTRIES, payload: response.data })
  }
}

export const getOneCountry = (countryId) => {
  return async (dispatch) => {
    const response = await axios(`/countries/${countryId}`)
  
    return dispatch({ type: GET_COUNTRY, payload: response.data })
  }
}

export const getActivities = () => {
  return async (dispatch) => {
    const response = await axios(`/activities`)

    return dispatch({ type: GET_ACTIVITIES, payload: response.data })
  }
}

export const createActivity = (activity) => {
  return async (dispatch) => {
    const response = await axios.post(`/activities`, activity)
  
    return dispatch({ type: CREATE_ACTIVITY, payload: response.data })
  }
}

export const cleanUpState = () => {
  return async (dispatch) => {
    return dispatch({ type: CLEAN_UP, payload: {} })
  }
}

export const sortCountries = (payload) => {
  return async (dispatch) => {
    return dispatch({ type: SORT_COUNTRIES, payload })
  }
}

export const filterCountries = (payload) => {
  return async (dispatch) => {
    return dispatch({ type: FILTER_COUNTRIES, payload })
  }
}