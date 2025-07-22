import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import coursesReducer from './slices/coursesSlice';
import assignmentsReducer from './slices/assignmentsSlice';
import studentsReducer from './slices/studentsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: coursesReducer,
    assignments: assignmentsReducer,
    students: studentsReducer,
  },
});

export default store; 