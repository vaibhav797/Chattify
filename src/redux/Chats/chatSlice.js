import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  chatId: null,
  user: {},
};

export const incrementAsync = createAsyncThunk(
  "counter/fetchCount",
  async (amount) => {}
);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    changeChat: (state, action) => {
      state.user = action.payload;
      state.chatId =
        state.currentUser.uid > action.payload.uid
          ? state.currentUser.uid + action.payload.uid
          : action.payload.uid + state.currentUser.uid;
    },
    setCurrentUser: (state,action) => {
        state.currentUser = action.payload;
    },
    removeSelectedChat:(state) => {
      state.chatId = null
      state.user = {}
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.value += action.payload;
      });
  },
});

export const { changeChat, setCurrentUser,removeSelectedChat } = chatSlice.actions;

export const selectedUser = (state) => state.chat.user;
export const selectChatId = (state) => state.chat.chatId;

export default chatSlice.reducer;
