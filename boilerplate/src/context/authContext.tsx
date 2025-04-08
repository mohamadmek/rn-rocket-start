import { create } from 'zustand';

interface IAuthStore {
  accessToken: string;
  setAccessToken: (by: string) => void;
  resetAuth: () => void;
}

export const useAuthStore = create<IAuthStore>()((set) => ({
  accessToken: '',
  setAccessToken: (by) => set(() => ({ accessToken: by })),
  resetAuth: () => set(() => ({ accessToken: '' })),
}));
