import { create } from 'zustand';

export const initialPlayer = { name: '', email: '', profile: '/prof1.png' };
const initialState: ManittoForm = {
  name: '',
  eventDate: '',
  playerList: [
    // initialPlayer,
    { name: '구번', email: 'hgb2652@naver.com', profile: '/prof1.png' },
    { name: '여눤', email: 'qkr980529@naver.com', profile: '/prof2.png' },
    { name: '선초', email: 'mo_o6m@naver.com', profile: '/prof3.png' },
    { name: '알쥔', email: 'kongnamulp21@naver.com', profile: '/prof4.png' },
    { name: '나영', email: 'viky0209@naver.com', profile: '/prof5.png' },
    { name: '수번', email: 'osier17@naver.com', profile: '/prof6.png' },
  ],
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
