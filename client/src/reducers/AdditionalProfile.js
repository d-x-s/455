/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import {
  ALLERGIES_INTOLERANCES_OPTIONS,
  DIETARY_RESTRICTIONS_OPTIONS,
  HEALTH_CONDITIONS_AND_INJURIES_OPTIONS,
  WEEKLY_AVAILABILITY_OPTIONS,
} from '../constants/AdditionalProfile';

// TODO: when api setup, change the initial state to empty
const additionalProfileSlice = createSlice({
  name: 'additionalProfile',
  initialState: {
    loading: false,
    error: '',
    profile: {
      bodyFatPercentage: 0,
      muscleMassPercentage: 0,
      healthConditionsInjuries: [
        HEALTH_CONDITIONS_AND_INJURIES_OPTIONS.ANXIETY_OR_DEPRESSION,
        HEALTH_CONDITIONS_AND_INJURIES_OPTIONS.ASTHMA,
      ],
      dietaryRestrictions: [
        DIETARY_RESTRICTIONS_OPTIONS.DAIRY_FREE,
        DIETARY_RESTRICTIONS_OPTIONS.HALAL,
      ],
      allergiesIntolerances: [
        ALLERGIES_INTOLERANCES_OPTIONS.ALMONDS,
        ALLERGIES_INTOLERANCES_OPTIONS.CASHEWS,
      ],
      weeklyAvailability: [
        WEEKLY_AVAILABILITY_OPTIONS.MONDAY,
        WEEKLY_AVAILABILITY_OPTIONS.FRIDAY,
      ],
      workoutDuration: 0,
      exercisePreferences: [],
      equipmentAvailability: [],
    },
  },
  reducers: {
    FETCH_ADDITIONAL_PROFILE_REQUESTED: (state) => {
      state.loading = true;
    },
    FETCH_ADDITIONAL_PROFILE_SUCCESS: (state, action) => {
      state.loading = false;
      state.profile = action.payload;
      state.error = '';
    },
    FETCH_ADDITIONAL_PROFILE_ERROR: (state, action) => {
      state.loading = false;
      state.profile = additionalProfileSlice.getInitialState().profile;
      state.error = action.payload;
    },
  },
});

export const {
  FETCH_ADDITIONAL_PROFILE_REQUESTED,
  FETCH_ADDITIONAL_PROFILE_SUCCESS,
  FETCH_ADDITIONAL_PROFILE_ERROR,
} = additionalProfileSlice.actions;

export default additionalProfileSlice.reducer;
