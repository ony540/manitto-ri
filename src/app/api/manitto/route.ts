import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  // POST 요청을 처리하는 로직
  const { comment, mailList } = await req.json();

  console.log(comment, mailList, 'comment, mailList');

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465, // SSL/TLS 포트
    secure: true, // 보안 연결 사용
    auth: {
      user: process.env.GOOGLE_USER,
      pass: process.env.GOOGLE_APP_PASSWORD,
    },
  });

  const mailOption = {
    from: process.env.GOOGLE_USER,
    to: mailList[0]?.mail,
    subject: '제목',
    html: `메일 내용이여라 ${comment}`,
  };

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
