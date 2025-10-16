'use client';
import { BottomButton } from '@/components/BottomButton';

const comment = '테스트메일';
const mailList = [
  { name: '나영', mail: 'viky020902@gmail.com' },
  { name: '사공', mail: 'onyy540@gmail.com' },
];
const page = () => {
  const onClick = async () => {
    const res = await fetch('/api/manitto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comment: comment, mailList }),
    });
  };

  return (
    <div>
      <BottomButton onClick={onClick}>textSendMail</BottomButton>
    </div>
  );
};

export default page;
