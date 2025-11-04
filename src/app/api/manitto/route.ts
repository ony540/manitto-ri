import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  // POST 요청을 처리하는 로직
  const { comment, name, playerList, eventDate } = await req.json();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465, // SSL/TLS 포트
    secure: true, // 보안 연결 사용
    auth: {
      user: process.env.GOOGLE_USER,
      pass: process.env.GOOGLE_APP_PASSWORD,
    },
  });

  const matched = assignManitto(playerList);

  const mailOption = matched.map((item) => {
    return {
      from: process.env.GOOGLE_USER,
      to: item.giver.email,
      subject: '[MANITTO-RI] 당신의 마니또를 확인하세요 📫',
      html: `메일 내용이여라 ${comment}`,
    };
  });

  const sendMail = (options: any) => {
    return new Promise((resolve, reject) => {
      transporter.sendMail(options, (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      });
    });
  };

  try {
    await sendMail(mailOption);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
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

  // 완전 랜덤 셔플된 배열을 만들되, 자기 자신 배정 방지
  while (!isValid) {
    // Fisher-Yates shuffle
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // 유효성 검사 (자기 자신 X)
    isValid = shuffled.every((p, i) => p.email !== players[i].email);
  }

  // A → B 매칭 결과 반환
  return players.map((p, i) => ({
    giver: p,
    receiver: shuffled[i],
  }));
}
