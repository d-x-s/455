import { Grid, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Form from './Forms/Form';
import FormMultiSelect from './Forms/FormMultiSelect';
import FormTextFieldInput from './Forms/FormTextFieldInput';
import fetchAdditionalProfile from '../../actionCreators/AdditionalProfile';
import {
  healthConditionsAndInjuriesOptions,
  dietaryRestrictionsOptions,
  allergiesIntolerancesOptions,
  weeklyAvailabilityOptions,
} from '../../constants/AdditionalProfile';

export default function AdditionalProfileForm() {
  const [healthConditionsAndInjuries, setHealthConditionsAndInjuries] = useState([]);
  const [dietaryRestrictions, setDietaryRestrictions] = useState([]);
  const [allergiesIntolerances, setAllergiesIntolerances] = useState([]);
  const [weeklyAvailability, setWeeklyAvailability] = useState([]);
  const [bodyFatPercentage, setBodyFatPercentage] = useState(0);
  const [muscleMassPercentage, setMuscleMassPercentage] = useState(0);
  const [workoutDuration, setWorkoutDuration] = useState(0);
  const additionalProfile = useSelector((state) => state.additionalProfile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAdditionalProfile());
  }, [dispatch]);

  useEffect(() => {
    // TODO: uncomment this when backend api is set up
    // if (additionalProfile.loading || additionalProfile.error) return;
    setHealthConditionsAndInjuries(additionalProfile.profile.healthConditionsInjuries);
    setDietaryRestrictions(additionalProfile.profile.dietaryRestrictions);
    setAllergiesIntolerances(additionalProfile.profile.allergiesIntolerances);
    setWeeklyAvailability(additionalProfile.profile.weeklyAvailability);
    setBodyFatPercentage(additionalProfile.profile.bodyFatPercentage);
    setMuscleMassPercentage(additionalProfile.profile.muscleMassPercentage);
    setWorkoutDuration(additionalProfile.profile.workoutDuration);
  }, []);

  const clear = () => {
    setHealthConditionsAndInjuries([]);
    setDietaryRestrictions([]);
    setAllergiesIntolerances([]);
    setWeeklyAvailability([]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      healthConditionsAndInjuries,
      dietaryRestrictions,
      allergiesIntolerances,
      weeklyAvailability,
      bodyFatPercentage,
      muscleMassPercentage,
      workoutDuration,
    });

    clear();
  };

  const restrictPercentageValue = (input, set) => {
    const zeroToHundredRegex = /^(?:100|[1-9]\d|\d)$/;
    if (input === '' || zeroToHundredRegex.test(input)) {
      set(input);
    }
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      formTitle="Update Additional Profile"
    >
      <FormTextFieldInput
        id="body-fat-percentage"
        label="Body Fat Percentage"
        half
        value={bodyFatPercentage}
        setValue={(val) => restrictPercentageValue(val, setBodyFatPercentage)}
        endAdornment="%"
      />
      <FormTextFieldInput
        id="muscle-mass-percentage"
        label="Muscle Mass Percentage"
        half
        value={muscleMassPercentage}
        setValue={(val) => restrictPercentageValue(val, setMuscleMassPercentage)}
        endAdornment="%"
      />
      <FormMultiSelect
        id="health-conditions-and-injuries"
        label="Health Conditions & Injuries"
        value={healthConditionsAndInjuries}
        setValue={setHealthConditionsAndInjuries}
        options={healthConditionsAndInjuriesOptions}
      />
      <FormMultiSelect
        id="dietary-restrictions"
        label="Dietary Restrictions"
        value={dietaryRestrictions}
        setValue={setDietaryRestrictions}
        options={dietaryRestrictionsOptions}
      />
      <FormMultiSelect
        id="allergies-intolerances"
        label="Allergies & Intolerances"
        value={allergiesIntolerances}
        setValue={setAllergiesIntolerances}
        options={allergiesIntolerancesOptions}
      />
      <FormMultiSelect
        id="weekly-availability"
        label="Weekly Availability"
        value={weeklyAvailability}
        setValue={setWeeklyAvailability}
        options={weeklyAvailabilityOptions}
      />
      <FormTextFieldInput
        id="workout-duration"
        label="Preferred Workout Duration"
        half
        value={workoutDuration}
        setValue={setWorkoutDuration}
        endAdornment="minutes"
      />
      <Grid item xs={12} sm={6} />
      <Grid item xs={12} sm={5} />
      <Grid item xs={12} sm={4}>
        <Button variant="contained" type="submit">
          Save
        </Button>
      </Grid>
      <Grid item xs={12} sm={5} />
    </Form>
  );
}
