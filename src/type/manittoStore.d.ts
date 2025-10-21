type ManittoPlayer = {
  name: string;
  email: string;
  profile: string;
};
type Info = {
  name: string;
  budget?: number | undefined;
  eventDate: string; //Date
};

type ManittoForm = Info & {
  playerList: ManittoPlayer[];
  comment?: string;
};

type ManittoFormStore = ManittoForm & {
  setStep1: (info: Info) => void;
  addPlayer: (player: ManittoPlayer) => void;
  deletePlayer: (email: string) => void;
  setComment: (comment: string) => void;
  resetPlayerlist: () => void;
  deleteEmptyPlayer: () => void;
  reset: () => void;
};
