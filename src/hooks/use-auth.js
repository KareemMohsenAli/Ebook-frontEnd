import { create } from "zustand";
export const useAuth = create((set) => ({
  data: {},
  getName: () =>`${localStorage.getItem("userName")}`,
  isLoggedIn: localStorage.getItem("token") !== null,
  onLogin: (token, userName) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userName", userName);
    set({ isLoggedIn: true, data: { token, userName } });
  },
  onLogout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    set({ isLoggedIn: false, data: {} });
  },
}));
