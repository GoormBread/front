// useUserStore.js
import { create } from "zustand";

type userStore = {
  userId: string;
  nickname: string;

  setUserStore: (userId: string, nickname:string) => void
}

const useUserStore = create<userStore>() ((set) => ({
    userId: "",
    nickname: "",

    setUserStore: (userId: string, nickname: string) => set( () => ({ userId: userId, nickname: nickname })),
}))

export default useUserStore;