import axios from "axios";
import { GET_COUNTRIES, GET_COUNTRY, GET_ACTIVITIES, CREATE_ACTIVITY, CLEAN_UP, SORT_COUNTRIES, FILTER_COUNTRIES, RESTORE_ACTIVITY, GET_ACTIVITY, REMOVE_ACTIVITY, UPDATE_ACTIVITY, DELETE_ACTIVITY, DISABLE_ACTIVITY } from "../types";

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

export const getActivities = () => {
  return async (dispatch) => {
    const response = await axios(`/activities`)

    return dispatch({ type: GET_ACTIVITIES, payload: response.data })
  }
}

export const getOneActivity = (activityId) => {
  return async (dispatch) => {
    const response = await axios(`/activities/${activityId}`)
  
    return dispatch({ type: GET_ACTIVITY, payload: response.data })
  }
}

export const createActivity = (activity) => {
  return async (dispatch) => {
    const response = await axios.post(`/activities`, activity)
  
    return dispatch({ type: CREATE_ACTIVITY, payload: response.data })
  }
}

export const deleteActivity = (activityId) => {
  return async (dispatch) => {
    await axios.delete(`/activities/${activityId}?force=true`)

    return dispatch({ type: DELETE_ACTIVITY, payload: activityId })
  }
}

export const disableActivity = (activityId) => {
  return async (dispatch) => {
    await axios.delete(`/activities/${activityId}`)

    return dispatch({ type: DISABLE_ACTIVITY, payload: activityId })
  }
}

export const restoreActivity = (activityId) => {
  return async (dispatch) => {
    await axios.post(`/activities/${activityId}`, {})
  
    return dispatch({ type: RESTORE_ACTIVITY, payload: activityId })
  }
}

export const updateActivity = (activity) => {
  return async (dispatch) => {
    const response = await axios.patch(`/activities/${activity.id}`, activity)
  
    return dispatch({ type: UPDATE_ACTIVITY, payload: response.data })
  }
}

export const cleanUpState = () => {
  return async (dispatch) => {
    return dispatch({ type: CLEAN_UP, payload: {} })
  }
}