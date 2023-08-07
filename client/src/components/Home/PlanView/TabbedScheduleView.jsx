import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import {
  Card, Grid, Tab, Tabs,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ExistingMealSchedule from './ExistingMealSchedule';
import ExistingWorkoutSchedule from './ExistingWorkoutSchedule';
import NoSchedule from './NoSchedule';
import { resetWorkoutAndMealScheduleStates } from '../../../reducers/WorkoutAndMealSchedule';
import { ToastContext } from '../../common/context/ToastContextProvider';
import RelativeSpinner from '../../common/RelativeSpinner';
import TabPanel from '../../common/TabPanel';

export default function TabbedScheduleView() {
  const dispatch = useDispatch();
  const openToast = useContext(ToastContext);
  const [value, setValue] = useState(0);
  const {
    isLoading, workoutSchedule, mealSchedule, isError, isSuccess, message,
  } = useSelector((state) => state.workoutAndMealSchedule);

  useEffect(() => {
    if (isSuccess && workoutSchedule && mealSchedule) {
      openToast('success', message);
    }
    dispatch(resetWorkoutAndMealScheduleStates());
  }, [workoutSchedule, mealSchedule, isError, isSuccess, message, dispatch]);

  return (
    <Grid container component={Card} alignItems="center" columns={2} sx={{ p: 3, position: 'relative', borderRadius: '10px' }}>
      {isLoading && <RelativeSpinner />}
      <Grid item xs={10}>
        <Tabs
          value={value}
          onChange={(e, v) => setValue(v)}
          aria-label="icon label tabs example"
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab
            icon={<FitnessCenterIcon fontSize="large" />}
            label="Fitness Plan"
            sx={{
              width: '50%',
            }}
          />
          <Tab
            icon={<LocalDiningIcon fontSize="large" />}
            label="Meal Plan"
            sx={{
              width: '50%',
            }}
          />
        </Tabs>
      </Grid>
      <Grid item xs={10}>
        <TabPanel value={value} index={0}>
          {workoutSchedule ? <ExistingWorkoutSchedule /> : <NoSchedule />}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {mealSchedule ? <ExistingMealSchedule /> : <NoSchedule />}
        </TabPanel>
      </Grid>
    </Grid>
  );
}
