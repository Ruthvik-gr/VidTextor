import { configureStore } from '@reduxjs/toolkit';
import textBoxReducer from './textBoxSlice';

const store = configureStore({
  reducer: {
    textBoxes: textBoxReducer,
  },
});

export default store;
