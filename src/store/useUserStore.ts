// useUserStore.ts
import { create } from "zustand";
import { persist  } from 'zustand/middleware';

type UserStore = {
  userId: string;
  nickname: string;

  setUserStore: (userId: string, nickname: string) => void;
}

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userId: "",
      nickname: "",

      setUserStore: (userId: string, nickname: string) => set(() => ({ userId, nickname })),
    }),
    {
      name: 'user-store'
    }
  )
);

export default useUserStore;