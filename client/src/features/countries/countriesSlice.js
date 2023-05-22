import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCountries, getOneCountry } from "./countriesApi";
import { EStateGeneric } from "../../redux/types";
import { filterByActFn, filterByContFn, sortArr } from "../../utils";

export const fetchAllCountries = createAsyncThunk(
  'countries/fetchAllCountries',
  async (name, { rejectWithValue }) => {
    try {
      const response = await getAllCountries(name)
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
  sorting: {
    active: false,
    by: '',
    order: ''
  },
  filtering: {
    active: false,
    filterBy: [],
    activities: { values: [] },
    continents: { values: [] }
  },
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
    clearAllFilters: (state) => {
      let { by, order } = state.sorting;
      state.filtering.active = false;
      state.filtering.filterBy = [];
      state.filtering.activities = { values: [] }
      state.filtering.continents = { values: [] }
      
      if (state.sorting.active) {
        state.countries = sortArr(state.originalCountries, order, by)  
      } else state.countries = state.originalCountries
    },
    clearSorting: (state) => {
      state.sorting.active = false;
      state.sorting.by = '';
      state.sorting.order = '';

      if (!state.filtering.active) {
        state.countries = state.originalCountries 
      } else state.countries = state.countries
    },
    filterCountriesByContinent: (state, action) => {
      let { activities } = state.filtering;
      let { by, order } = state.sorting;

      state.filtering.active = true;
      state.filtering.filterBy = state.filtering.filterBy.concat("continents");
      state.filtering.continents.values = action.payload.values;

      let countriesToFilter  

      if (state.filtering.filterBy.includes("continents") && state.filtering.filterBy.includes("activities")) {
        countriesToFilter = state.originalCountries.filter(country => filterByActFn(country, activities.values))
      }
      else if (!state.filtering.filterBy.includes("continents") && state.filtering.filterBy.includes("activities")) {
        countriesToFilter = state.countries
      }
      else if (state.filtering.filterBy.includes("continents") && !state.filtering.filterBy.includes("activities")) {
        countriesToFilter = state.originalCountries
      }
      else if (!state.filtering.filterBy.includes("continents") && !state.filtering.filterBy.includes("activities")) {
        countriesToFilter = state.countries
      }

      if (state.sorting.active) countriesToFilter = sortArr(countriesToFilter, order, by) 


      state.countries = countriesToFilter.filter(country => filterByContFn(country, action.payload.values))
    },

    filterCountriesByActivity: (state, action) => {
      let { by, order } = state.sorting;
      let { continents } = state.filtering;
      state.filtering.active = true;
      state.filtering.filterBy = state.filtering.filterBy.concat("activities");
      state.filtering.activities.values = action.payload.values;

      let countriesToFilter = [];

      if (state.filtering.filterBy.includes("continent") && state.filtering.filterBy.includes("activities")) {
        countriesToFilter = state.originalCountries.filter(country => filterByContFn(country, continents.values))
      }
      else if (!state.filtering.filterBy.includes("continent") && state.filtering.filterBy.includes("activities")) {
        countriesToFilter = state.originalCountries
      }
      else if (state.filtering.filterBy.includes("continent") && !state.filtering.filterBy.includes("activities")) {
        countriesToFilter = state.countries
      }
      else if (!state.filtering.filterBy.includes("continent") && !state.filtering.filterBy.includes("activities")) {
        countriesToFilter = state.countries
      }

      if (state.sorting.active) countriesToFilter = sortArr(countriesToFilter, order, by)   

      state.countries = countriesToFilter.filter(country => filterByActFn(country, action.payload.values))
    },

    sortCountriesByName: (state, action) => {
      state.sorting.active = true;
      state.sorting.by = "name";
      state.sorting.order = action.payload;

      let countriesToSort = []
    
      if (state.filtering.active) countriesToSort = state.countries;
      else countriesToSort = state.originalCountries;
      
      state.countries = sortArr(countriesToSort, action.payload, "name")
    },

    sortCountriesByPopulation: (state, action) => {
      state.sorting.active = true;
      state.sorting.by = "population";
      state.sorting.order = action.payload;

      let countriesToSort = []
    
      if (state.filtering.active) countriesToSort = state.countries;
      else countriesToSort = state.originalCountries;


      state.countries = sortArr(countriesToSort, action.payload, "population")
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

export const { filterCountriesByActivity, filterCountriesByContinent, sortCountriesByName, sortCountriesByPopulation, clearAllFilters, clearSorting } = countriesSlice.actions;

export const selectAllCountriesStatus = (state) => state.countries.allCountriesStatus;
export const selectOneCountryStatus = (state) => state.countries.oneCountryStatus;