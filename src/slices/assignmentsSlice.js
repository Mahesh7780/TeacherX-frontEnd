import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  assignments: [],
};

const assignmentsSlice = createSlice({
  name: 'assignments',
  initialState,
  reducers: {
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },
  },
});

export const { setAssignments } = assignmentsSlice.actions;
export default assignmentsSlice.reducer; 