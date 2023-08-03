import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./Chats/chatSlice";
import authReducer from "./Auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
  },
});
