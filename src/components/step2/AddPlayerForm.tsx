import Image from 'next/image';
import { useFormContext } from 'react-hook-form';

import EditIcon from '@/assets/icon/edit.svg';
import { BottomButton } from '../BottomButton';
import { PlayerFormSchema } from '@/app/create/step2/page';

type Props = {
  index: number;
};

const AddPlayerForm = ({ index }: Props) => {
  const {
    setValue,
    register,
    watch,
    formState: { errors },
  } = useFormContext<PlayerFormSchema>();
  const currentPlayer = watch('playerList')[index];

  //TODO: 프로필 설정 바텀 시트 열리기, 타이틀 한글 추가하기
  const handleClickProf = () => {
    console.log();
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
            onClick={handleClickProf}
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
    </>
  );
};

export default AddPlayerForm;
