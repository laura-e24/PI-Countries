import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllActivities, getOneActivity, createOneActivity, deleteOneActivity, disableOneActivity, restoreOneActivity, updateOneActivity } from "./activitiesApi";
import { EStateGeneric } from "../../redux/types";
import { toast } from 'react-toastify';


export const fetchAllActivities = createAsyncThunk(
  'activities/fetchAllActivities',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllActivities()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const fetchOneActivity = createAsyncThunk(
  'activities/fetchOneActivity',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getOneActivity(id)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const createActivity = createAsyncThunk(
  'activities/createActivity',
  async (activity, { rejectWithValue }) => {
    try {
      const response = await createOneActivity(activity)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const deleteActivity = createAsyncThunk(
  'activities/deleteActivity',
  async (activityId, { rejectWithValue }) => {
    try {
      await deleteOneActivity(activityId)
      return activityId
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const disableActivity = createAsyncThunk(
  'activities/disableActivity',
  async (activityId, { rejectWithValue }) => {
    try {
      const response = await disableOneActivity(activityId)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const restoreActivity = createAsyncThunk(
  'activities/restoreActivity',
  async (activity, { rejectWithValue }) => {
    try {
      const response = await restoreOneActivity(activity)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const updateActivity = createAsyncThunk(
  'activities/updateActivity',
  async (activity, { rejectWithValue }) => {
    try {
      const response = await updateOneActivity(activity)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const initialState = {
  activities: [],
  activity: {},
  allActivitiesStatus: EStateGeneric.IDLE,
  oneActivityStatus: EStateGeneric.IDLE,
}

const activitiesSlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    // cleanUpState: (state) => {
    //   state.activities = [];
    // },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchAllActivities.fulfilled, (state, action) => {
      state.activities = action.payload.activities;
      state.allActivitiesStatus = EStateGeneric.SUCCEEDED;
    })

    builder.addCase(fetchAllActivities.pending, (state, action) => {
      state.allActivitiesStatus = EStateGeneric.PENDING;
    })

    builder.addCase(fetchAllActivities.rejected, (state, action) => {
      state.allActivitiesStatus = EStateGeneric.FAILED;
    })



    builder.addCase(fetchOneActivity.fulfilled, (state, action) => {
      state.activity = action.payload;
      state.oneActivityStatus = EStateGeneric.SUCCEEDED;
    })

    builder.addCase(fetchOneActivity.pending, (state, action) => {
      state.oneActivityStatus = EStateGeneric.PENDING;
    })

    builder.addCase(fetchOneActivity.rejected, (state, action) => {
      state.oneActivityStatus = EStateGeneric.FAILED;
    })

    
    builder.addCase(createActivity.fulfilled, (state, action) => {
      state.activities = state.activities.concat(action.payload.activity);
      state.allActivitiesStatus = EStateGeneric.SUCCEEDED;
      state.oneActivityStatus = EStateGeneric.SUCCEEDED;

      toast("Actividad creada exitosamente", { type: "success" })
    })

    builder.addCase(createActivity.pending, (state, action) => {
      state.oneActivityStatus = EStateGeneric.PENDING;
      toast("Cargando, por favor espere...", { type: "info" })
    })

    builder.addCase(createActivity.rejected, (state, action) => {
      state.oneActivityStatus = EStateGeneric.FAILED;
      toast(action.payload?.message, { type: "error" })
    })


    builder.addCase(deleteActivity.fulfilled, (state, action) => {
      state.activities = state.activities.filter(act => act.id !== action.payload);
      state.allActivitiesStatus = EStateGeneric.SUCCEEDED;
      state.oneActivityStatus = EStateGeneric.SUCCEEDED;
    })

    builder.addCase(deleteActivity.pending, (state, action) => {
      state.oneActivityStatus = EStateGeneric.PENDING;
    })

    builder.addCase(deleteActivity.rejected, (state, action) => {
      state.oneActivityStatus = EStateGeneric.FAILED;
    })

    
    builder.addCase(disableActivity.fulfilled, (state, action) => {
      state.activities = action.payload.data;
      state.oneActivityStatus = EStateGeneric.SUCCEEDED;
      state.allActivitiesStatus = EStateGeneric.SUCCEEDED;
    })

    builder.addCase(disableActivity.pending, (state, action) => {
      state.oneActivityStatus = EStateGeneric.PENDING;
    })

    builder.addCase(disableActivity.rejected, (state, action) => {
      state.oneActivityStatus = EStateGeneric.FAILED;
    })


    builder.addCase(restoreActivity.fulfilled, (state, action) => {
      state.activities = action.payload.data;
      state.oneActivityStatus = EStateGeneric.SUCCEEDED;
      state.allActivitiesStatus = EStateGeneric.SUCCEEDED;
    })

    builder.addCase(restoreActivity.pending, (state, action) => {
      state.oneActivityStatus = EStateGeneric.PENDING;
    })

    builder.addCase(restoreActivity.rejected, (state, action) => {
      state.oneActivityStatus = EStateGeneric.FAILED;
    })


    builder.addCase(updateActivity.fulfilled, (state, action) => {
      state.activities = state.activities.map(act => {
        if (act.id === action.payload.id) {
          return {
            ...act,
            ...action.payload
          }
        } else return act
      });
      state.allActivitiesStatus = EStateGeneric.SUCCEEDED;
      state.oneActivityStatus = EStateGeneric.SUCCEEDED;

      toast("Actividad editada exitosamente", { type: "success" })
    })

    builder.addCase(updateActivity.pending, (state, action) => {
      state.oneActivityStatus = EStateGeneric.PENDING;
      toast("Cargando, por favor espere...", { type: "info" })
    })

    builder.addCase(updateActivity.rejected, (state, action) => {
      state.oneActivityStatus = EStateGeneric.FAILED;
      toast(action.payload?.message, { type: "error" })
    })
  },
})

export default activitiesSlice.reducer

export const selectAllActivities = (state) => state.activities.activities;
export const selectOneActivity = (state) => state.activities.activity;

// export const { cleanUpState } = productsSlice.actions;

export const selectAllActivitiesStatus = (state) => state.activities.allActivitiesStatus;
export const selectOneActivityStatus = (state) => state.activities.oneActivityStatus;