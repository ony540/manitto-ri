'use client';
import { useRouter } from 'next/navigation';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { initialPlayer, useManittoFormStore } from '@/store/useManittoFormStore';
import { useEffect } from 'react';
import { BottomButton } from '@/components/BottomButton';
import { Header } from '@/components/Header';
import AddPlayerForm from '@/components/step2/AddPlayerForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import PlayerCard from '@/components/step2/PlayerCard';
import PlusIcon from '@/assets/icon/plus.svg';

const playerSchema = z.object({
  name: z.string().max(10).nonempty('이름을 입력해주세요.'),
  email: z.email('올바른 이메일 형식이 아닙니다.'),
  profile: z.string(),
});

const playerFormSchema = z.object({
  playerList: z
    .array(playerSchema)
    // .min(3, '참가자는 최소 3명 이상 입력해야 합니다')
    .refine(
      (players) => {
        const emails = players.map((p) => p.email);
        const uniqueEmails = new Set(emails);
        return emails.length === uniqueEmails.size;
      },
      { message: '이메일이 중복되었습니다.', path: ['playerList'] } // 전체 배열에 에러
    ),
});

export type PlayerFormSchema = z.infer<typeof playerFormSchema>;

const Page = () => {
  const { push } = useRouter();
  const { playerList, addPlayer, deleteEmptyPlayer, resetPlayerlist } = useManittoFormStore();
  const isHasEmptyPlayer = playerList?.some((field) => field.name === '' && field.email === '');
  const emptyPlayerIndex = playerList.findIndex((f) => f.name === '' && f.email === '');

  const method = useForm({
    resolver: zodResolver(playerFormSchema),
    defaultValues: {
      playerList: playerList,
    },
  });
  const { setValue, control, handleSubmit } = method;
  const { append, remove, update } = useFieldArray({
    control,
    name: 'playerList',
  });

  // ✅ Zustand 값이 변경되면 폼에도 반영 (재진입 시)
  useEffect(() => {
    if (playerList?.length) setValue('playerList', playerList);
  }, [playerList]);

  const onSubmitPlayerForm = handleSubmit((data) => {
    const newPlayerIndex = playerList.findIndex((f) => f.name === '' && f.email === '');
    addPlayer(data.playerList[newPlayerIndex]);
  });

  const onSubmitDefault = handleSubmit(() => {
    push('/create/step3');
  });

  const onClickBackPlayerForm = () => {
    if (emptyPlayerIndex === 0) {
      update(0, initialPlayer);
    } else {
      remove(emptyPlayerIndex);
    }
    deleteEmptyPlayer();
  };
  const onClickBackDefault = () => {
    resetPlayerlist();
    push('/create/step1');
  };

  const onClickAddPlayer = () => {
    append(initialPlayer);
    addPlayer(initialPlayer);
  };

  useEffect(() => {
    console.log(playerList);
  }, [playerList]);

  return (
    <div className="flex flex-col items-center justify-items-center">
      <Header onClickBack={isHasEmptyPlayer ? onClickBackPlayerForm : onClickBackDefault}>
        02
      </Header>
      <FormProvider {...method}>
        <form
          onSubmit={isHasEmptyPlayer ? onSubmitPlayerForm : onSubmitDefault}
          className="w-[calc(100vw-2rem)] max-width-content "
        >
          {isHasEmptyPlayer && <AddPlayerForm index={emptyPlayerIndex} />}
          {!isHasEmptyPlayer && (
            <>
              {/* TODO: 여기 배경 맞춰서 늘리기 z-index 버튼 위로 올라오게 */}
              <fieldset className="bg-[url(/bg/bg_02.svg)] bg-size-[100%_100%] bg-center w-full bg-no-repeat flex flex-col items-center min-h-[500px] px-[35px] py-[100px] z-0">
                <ul className="grid grid-cols-2 w-full gap-[12px]">
                  {playerList?.map((player, index) => {
                    return <PlayerCard index={index} player={player} key={player.email} />;
                  })}
                  <li
                    onClick={onClickAddPlayer}
                    role="button"
                    className="relative flex flex-col items-center justify-center min-h-[180px] p-4 bg-background rounded-xl cursor-pointer "
                  >
                    <div className=" w-[60px] h-[60px] rounded-full bg-[#FFDF6D] flex items-center justify-center ">
                      <PlusIcon className=" w-[35px] h-[35px]  " />
                    </div>
                  </li>
                </ul>
              </fieldset>
              <BottomButton type="submit" disabled={playerList.length < 3}>
                NEXT
              </BottomButton>
            </>
          )}
        </form>
      </FormProvider>
    </div>
  );
};

export default Page;
