import { NextResponse } from 'next/server';
// import { Resend } from 'resend';
import { generateManittoEmail } from '../../../../util/generateManittoEmail';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

// const resend = new Resend(process.env.RESEND_API_KEY);

// Resend 사용하려면 도메인 필요
export async function POST(req: Request) {
  const { comment, name: eventName, playerList, budget, eventDate } = await req.json();

  const matched = assignManitto(playerList);
  console.log(matched, 'matched');

  try {
    // 모든 이메일을 병렬로 보냄
    const results = await Promise.all(
      matched.map(async (item) => {
        const html = generateManittoEmail({
          eventName,
          giverName: item.giver.name,
          receiverName: item.receiver.name,
          profileUrl: item.receiver.profile,
          eventDate: format(eventDate, 'yyyy년 M월 d일', { locale: ko }),
          budget,
          comment,
        });

        // return resend.emails.send({
        //   from: process.env.RESEND_FROM || 'onboarding@resend.dev',
        //   to: item.giver.email,
        //   subject: '[MANITTO-RI] 당신의 마니또를 확인하세요 📫',
        //   html,
        // });
      }),
    );

    console.log('Resend results:', results);
    return NextResponse.json({ success: true, matched, results });
  } catch (error) {
    console.error('Resend send error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

type Player = {
  name: string;
  email: string;
  profile: string;
};

function assignManitto(players: Player[]) {
  const shuffled = [...players];
  let isValid = false;

  // 자기 자신이 걸리지 않게 섞기
  while (!isValid) {
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    isValid = shuffled.every((p, i) => p.email !== players[i].email);
  }

  return players.map((p, i) => ({
    giver: p,
    receiver: shuffled[i],
  }));
}
