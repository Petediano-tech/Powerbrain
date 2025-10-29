
import { create } from 'zustand';

type UserStore = {
  profileId: string | null;
  setProfileId: (id: string | null) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  profileId: null,
  setProfileId: (id) => set({ profileId: id }),
}));

    