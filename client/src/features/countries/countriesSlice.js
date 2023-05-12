import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCountries, getOneCountry } from "./countriesApi";
import { EStateGeneric } from "../../redux/types";

export const fetchAllCountries = createAsyncThunk(
  'countries/fetchAllCountries',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllCountries()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const fetchOneCountry = createAsyncThunk(
  'countries/fetchOneCountry',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getOneCountry(id)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const initialState = {
  filterByCont: false,
  filterByAct: false,
  originalCountries: [],
  countries: [],
  country: {},
  allCountriesStatus: EStateGeneric.IDLE,
  oneCountryStatus: EStateGeneric.IDLE,
}

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    // cleanUpState: (state) => {
    //   state.countries = [];
    // },
    filterCountriesByContinent: (state, action) => {
      state.filterByCont = true;
      const countriesToFilter = state.filterByAct || action.payload.values.length === 1
      ? state.countries 
      : state.originalCountries;

      state.countries = countriesToFilter.filter(country => {
        return action.payload.values.some(v => v === country.continent)
      })
    },

    filterCountriesByActivity: (state, action) => {
      state.filterByAct = true;
      const filterByActivity = (country) => {
        const activitiesNames = country.activities.map(a => a.name);
        return activitiesNames.some(v => action.payload.values.includes(v))
      }

      const countriesToFilter = state.filterByCont
      ? state.countries 
      : state.originalCountries;

      state.countries = countriesToFilter.filter(filterByActivity)
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchAllCountries.fulfilled, (state, action) => {
      state.originalCountries = action.payload.countries;
      state.countries = action.payload.countries;
      state.allCountriesStatus = EStateGeneric.SUCCEEDED;
    })

    builder.addCase(fetchAllCountries.pending, (state, action) => {
      state.allCountriesStatus = EStateGeneric.PENDING;
    })

    builder.addCase(fetchAllCountries.rejected, (state, action) => {
      state.allCountriesStatus = EStateGeneric.FAILED;
    })



    builder.addCase(fetchOneCountry.fulfilled, (state, action) => {
      state.country = action.payload;
      state.oneCountryStatus = EStateGeneric.SUCCEEDED;
    })

    builder.addCase(fetchOneCountry.pending, (state, action) => {
      state.oneCountryStatus = EStateGeneric.PENDING;
    })

    builder.addCase(fetchOneCountry.rejected, (state, action) => {
      state.oneCountryStatus = EStateGeneric.FAILED;
    })
  },
})

export default countriesSlice.reducer

export const selectAllCountries = (state) => state.countries.countries;
export const selectOriginalCountries = (state) => state.countries.originalCountries;
export const selectOneCountry = (state) => state.countries.country;

export const { filterCountriesByActivity, filterCountriesByContinent } = countriesSlice.actions;

export const selectAllCountriesStatus = (state) => state.countries.allCountriesStatus;
export const selectOneCountryStatus = (state) => state.countries.oneCountryStatus;