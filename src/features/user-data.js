import { createSlice } from "@reduxjs/toolkit";

export const userInputData = createSlice({
  name: 'userData',
  initialState: {
      value: {
          userInputData: null,
      }
  },
  reducers: {
      setUserInputData: ({value}, {payload}) => {
        value.userInputData = payload;
      },
    }
});

export const { 
  setUserInputData, 
} = userInputData.actions

export default userInputData.reducer;