type ManittoPlayer = {
  name: string;
  email: string;
  profile?: string;
};
type Info = {
  name: string;
  budget?: number;
  eventDate: string; //Date
};

type ManittoForm = Info & {
  groupList: ManittoPlayer[];
  comment?: string;
};

type ManittoFormStore = ManittoForm & {
  setStep1: (info: Info) => void;
  addPlayer: (player: ManittoPlayer) => void;
  deletePlayer: (email: string) => void;
  setComment: (comment: string) => void;
  reset: () => void;
};
