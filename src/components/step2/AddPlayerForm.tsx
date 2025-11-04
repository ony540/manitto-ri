import Image from 'next/image';
import { useFormContext } from 'react-hook-form';

import EditIcon from '@/assets/icon/edit.svg';
import { BottomButton } from '../BottomButton';
import { PlayerFormSchema } from '@/app/create/step2/page';
import { useEffect, useState } from 'react';
import { ResponsiveDialog } from '../ResponsiveDialog';

type Props = {
  index: number;
};
// prof개수
const numArr = Array.from({ length: 3 }, (_, i) => `/prof${i + 1}.png`);

const AddPlayerForm = ({ index }: Props) => {
  const {
    setValue,
    register,
    watch,
    formState: { errors },
  } = useFormContext<PlayerFormSchema>();
  const currentPlayer = watch('playerList')[index];
  const [isOpen, setIsOpen] = useState(false);
  const [tempProf, setTempProf] = useState('');

  useEffect(() => {
    if (currentPlayer.profile) setTempProf(currentPlayer.profile);
  }, [currentPlayer.profile]);

  const handleClickProf = (url: string) => {
    setTempProf(url);
  };

  const handleClickSave = () => {
    setValue(`playerList.${index}.profile`, tempProf);
    setIsOpen(false);
  };

  return (
    <>
      <fieldset className="bg-[url(/bg/bg_02.svg)] bg-size-[100%_100%] bg-center w-full bg-no-repeat flex flex-col items-center min-h-[500px]">
        <div className="mt-16 relative">
          <Image
            src={`/profile${currentPlayer?.profile || '/prof1.png'}`}
            width={128}
            height={128}
            alt="프로필 이미지"
            priority
          />
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className=" absolute right-[-8px] bottom-[-8px] bg-background rounded-full "
          >
            <EditIcon />
          </button>
        </div>
        <input
          {...register(`playerList.${index}.name`)}
          maxLength={10}
          id="name"
          placeholder="이름"
          className=" focus-visible:outline-0 text-center border-b-2 max-w-[231px] mt-8 mb-12 text-lg/[40px] "
        />
        <input
          {...register(`playerList.${index}.email`)}
          id="email"
          type="email"
          placeholder="이메일"
          className=" focus-visible:outline-0 text-center border-b-2 max-w-[231px] text-lg/[40px] "
        />
        {errors?.playerList?.[index]?.email && (
          <p className="text-red-500 mt-2 text-sm">{errors.playerList[index]?.email.message}</p>
        )}
        {errors?.playerList?.root && (
          <p className="text-red-500">{errors.playerList.root.message}</p>
        )}
      </fieldset>
      <BottomButton
        type="submit"
        disabled={!currentPlayer?.email || !!errors?.playerList?.[index]?.email}
      >
        ADD
      </BottomButton>

      {/* 프로필 이미지 설정 모달 or 바텀시트 */}
      <ResponsiveDialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-lg text-center font-semibold mb-4">프로필 설정</h2>
        <Image
          src={`/profile${tempProf || '/prof1.png'}`}
          width={90}
          height={90}
          alt="프로필 이미지"
          priority
        />

        <ul className="text-gray-600 my-6 grid grid-cols-3 justify-between w-full gap-y-3.5 ">
          {numArr?.map((item, idx) => (
            <li
              key={idx}
              onClick={() => handleClickProf(item)}
              role="button"
              className=" m-auto w-fit cursor-pointer"
            >
              <Image
                src={`/profile${item}`}
                width={55}
                height={55}
                alt={`프로필 이미지${idx + 1}`}
                priority
              />
            </li>
          ))}
        </ul>

        <button
          onClick={handleClickSave}
          className="w-full py-2 text-stroke  bg-yellow-400 rounded-lg"
        >
          SAVE
        </button>
      </ResponsiveDialog>
    </>
  );
};

export default AddPlayerForm;
