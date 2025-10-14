import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  // POST 요청을 처리하는 로직
  const { messages } = await req.json();

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
    to: 'viky020902@gmail.com',
    subject: '제목',
    html: '메일 내용이여라',
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
  } catch (error) {
    console.log(error);
  }
}
