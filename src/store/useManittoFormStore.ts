import { create } from 'zustand';

export const initialPlayer = { name: '', email: '', profile: '/prof1.png' };
const initialState: ManittoForm = {
  name: '',
  eventDate: '',
  playerList: [{ name: '더미', email: 'dddddddsdffsfsefes@gmail.com', profile: '/prof1.png' }],
};

export const useManittoFormStore = create<ManittoFormStore>()((set) => ({
  ...initialState,
  setStep1: (info: Info) =>
    set((state) => ({
      ...state,
      name: info.name,
      budget: info.budget,
      eventDate: info.eventDate,
    })),

  addPlayer: (player) =>
    set((state) => {
      if (state.playerList[0].name == '')
        return {
          ...state,
          playerList: [player],
        };
      return { ...state, playerList: [...state.playerList.filter((p) => p.email !== ''), player] };
    }),
  deletePlayer: (email) =>
    set((state) => {
      if (state.playerList.length === 1)
        return {
          ...state,
          playerList: [initialPlayer],
        };

      return { ...state, playerList: state.playerList.filter((p) => p.email !== email) };
    }),
  deleteEmptyPlayer: () =>
    set((state) => {
      return { ...state, playerList: state.playerList.filter((p) => p.email !== '') };
    }),
  resetPlayerlist: () => set((state) => ({ ...state, playerList: [] })),
  setComment: (comment) =>
    set((state) => ({
      ...state,
      comment,
    })),

  reset: () => set(() => ({ ...initialState })),
}));
