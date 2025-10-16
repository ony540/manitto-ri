import { create } from 'zustand';

const initialState: ManittoForm = {
  name: '',
  eventDate: '',
  groupList: [],
};

export const useManittoFormStore = create<ManittoFormStore>()((set) => ({
  ...initialState,
  setStep1: (info: Info) =>
    set((state) => ({
      ...state.setStep1,
      name: info.name,
      budget: info.budget,
      eventDate: info.eventDate,
    })),

  addPlayer: (player) =>
    set((state) => ({
      groupList: [...state.groupList, player],
    })),
  deletePlayer: (email) =>
    set((state) => ({
      groupList: state.groupList.filter((p) => p.email !== email),
    })),
  setComment: (comment) =>
    set(() => ({
      comment,
    })),

  reset: () => set(() => ({ ...initialState })),
}));
