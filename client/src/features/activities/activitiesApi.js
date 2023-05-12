import axios from "axios";

export const getAllActivities = () => axios(`/activities`)

export const getOneActivity = (activityId) => axios(`/activities/${activityId}`);

export const createOneActivity = (activity) => axios.post(`/activities/`, activity);

export const deleteOneActivity = (activityId) => axios.delete(`/activities/${activityId}?force=true`);

export const disableOneActivity = (activityId) => axios.delete(`/activities/${activityId}`);

export const restoreOneActivity = (activity) => axios.post(`/activities/${activity.id}`, {});

export const updateOneActivity = (activity) => axios.patch(`/activities/${activity.id}`, activity)