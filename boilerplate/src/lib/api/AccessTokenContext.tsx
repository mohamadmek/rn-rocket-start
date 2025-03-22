import { create } from 'zustand';

interface IAuthStore {
  accessToken: string;
  setAccessToken: (by: string) => void;
}

export const useAuthStore = create<IAuthStore>()((set) => ({
  accessToken: '',
  setAccessToken: (by) => set(() => ({ accessToken: by })),
}));
