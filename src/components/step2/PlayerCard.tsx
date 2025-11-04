import Image from 'next/image';

import PlusIcon from '@/assets/icon/plus.svg';
import { initialPlayer, useManittoFormStore } from '@/store/useManittoFormStore';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { PlayerFormSchema } from '@/app/create/step2/page';

type Props = {
  player: ManittoPlayer;
  index: number;
};

const PlayerCard = ({ player, index }: Props) => {
  const { control } = useFormContext<PlayerFormSchema>();
  const { remove, update } = useFieldArray({
    control,
    name: 'playerList',
  });

  const { deletePlayer } = useManittoFormStore();

  const handleClickDelete = () => {
    if (index === 0) {
      update(0, initialPlayer);
    } else {
      remove(index);
    }
    deletePlayer(player.email);
  };

  return (
    <li className="relative flex flex-col items-center justify-center min-h-[180px] p-4 bg-background  rounded-xl">
      <Image
        src={`/profile${player.profile || '/prof1.png'}`}
        width={75}
        height={75}
        alt="프로필 이미지"
        priority
      />
      <h5 className=" font-bold text-lg pt-2 pb-0.5 ">{player.name}</h5>
      <div className="text-xs break-all text-center line-clamp-2">{player.email}</div>
      <button
        type="button"
        onClick={handleClickDelete}
        className="rotate-45 absolute right-2 top-2 bg-gray-200 rounded-full p-0.5 "
      >
        <PlusIcon className=" w-[18px] h-[18px] " />
      </button>
    </li>
  );
};

export default PlayerCard;
