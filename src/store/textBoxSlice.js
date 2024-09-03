import { createSlice } from '@reduxjs/toolkit';

const textBoxSlice = createSlice({
    name: 'textBoxes',
    initialState: [],
    reducers: {
        addTextBox: (state, action) => {
            state.push(action.payload);
        },
        updateTextBox: (state, action) => {
            const { id, updates } = action.payload;
            const index = state.findIndex((box) => box.id === id);
            if (index !== -1) {
                state[index] = { ...state[index], ...updates };
            }
        },
        deleteTextBox: (state, action) => {
            const index = state.findIndex((box) => box.id === action.payload);
            if (index !== -1) {
                state.splice(index, 1);
            }
        },
    },
});

export const { addTextBox, updateTextBox, deleteTextBox } = textBoxSlice.actions;
export default textBoxSlice.reducer;
