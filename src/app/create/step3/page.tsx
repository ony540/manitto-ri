'use client';
import { BottomButton } from '@/components/BottomButton';
import { Header } from '@/components/Header';
import useDebounce from '@/hooks/useDebounce';
import { useManittoFormStore } from '@/store/useManittoFormStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Page = () => {
  const { push } = useRouter();
  const { name, eventDate, comment, playerList, setComment } = useManittoFormStore();
  const [localComment, setLocalComment] = useState('');
  const debounceSetComment = useDebounce(localComment, 300);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalComment(e.target.value);
  };
  useEffect(() => {
    setComment(debounceSetComment);
  }, [debounceSetComment]);

  const onClickBack = () => {
    setComment('');
    push('/create/step2');
  };

  const onClickSend = async () => {
    const res = await fetch('/api/manitto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, eventDate, comment, playerList }),
    });
  };

  return (
    <div className="flex flex-col items-center justify-items-center">
      <Header
        onClickBack={onClickBack}
        title="03"
        subtitle="추가 메세지 작성하기 "
        subContent={
          <p className=" mt-0.5 text-center">
            참가자에게 보낼 메일에 추가적으로 들어갈
            <br />
            메세지가 있다면 작성해주세요!
          </p>
        }
      />
      <div className="bg-[url(/bg/bg_03.svg)] bg-size-[100%_100%] bg-center w-[calc(100vw-2rem)]  max-width-content bg-no-repeat flex  items-center justify-center min-h-[536px] mb-16">
        <textarea
          name="comment"
          value={localComment}
          onChange={handleChange}
          placeholder="추가적으로 보낼 메세지가 없다면 바로 보내도 좋아요 😊"
          className="min-w-[241px] min-h-[304px] rounded-lg p-2 resize-none focus:outline-none  bg-background"
        />
      </div>

      <BottomButton onClick={onClickSend} className=" fixed">
        SEND
      </BottomButton>
    </div>
  );
};

export default Page;
