import useUserStore from "../store/useUserStore"

export const useSetUserStore = () => {
  const setUserStore = useUserStore((state) => state.setUserStore);

  return { setUserStore };
}

export const useUserId   = () => {
    const userId = useUserStore((state) => state.userId);

    return { userId };
}

export const useNickname = () => {
    const nickname = useUserStore((state) => state.nickname)

    return { nickname };
}