import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Role {
    isUser: boolean
}

const initialState: Role = {
    isUser: false
}

const userSlice = createSlice({
    name: "role",
    initialState,
    reducers: {
        setIsUser: (state, action: PayloadAction<boolean>) => {
            state.isUser = action.payload;
        }
    },
})

export const { setIsUser } = userSlice.actions;
export default userSlice.reducer;