import axios from "axios";

export const getAllActivities = async () => await axios(`/activities`)

export const getOneActivity = async (activityId) => await axios(`/activities/${activityId}`);

export const createOneActivity = async (activity) => await axios.post(`/activities/`, activity);

export const deleteOneActivity = async (activityId) => await axios.delete(`/activities/${activityId}?force=true`);

export const disableOneActivity = async (activityId) => await axios.delete(`/activities/${activityId}`);

export const restoreOneActivity = async (activity) => await axios.post(`/activities/${activity.id}`, {});

export const updateOneActivity = async (activity) => await axios.patch(`/activities/${activity.id}`, activity)