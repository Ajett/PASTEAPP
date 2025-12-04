
import { createSlice } from "@reduxjs/toolkit";

const pasteSlice = createSlice({
  name: "paste",
  initialState: { pastes: [] },
  reducers: {
    setPastes(state, action) { state.pastes = action.payload; },
    addPaste(state, action) { state.pastes.unshift(action.payload); },
    updatePaste(state, action) {
      const i = state.pastes.findIndex(p => p._id === action.payload._id);
      if (i !== -1) state.pastes[i] = action.payload;
    },
    removePaste(state, action) {
      state.pastes = state.pastes.filter(p => p._id !== action.payload);
    }
  }
});

export const { setPastes, addPaste, updatePaste, removePaste } = pasteSlice.actions;
export default pasteSlice.reducer;
