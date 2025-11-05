'use client';

import { generateManittoEmail } from './generateManittoEmail';

export default function EmailPreview() {
  const html = generateManittoEmail({
    eventName: '동팟이네 마니또',
    giverName: '오나영',
    receiverName: '아선초',
    eventDate: '2025년 12월 31일',
    budget: 10000,
    profileUrl: '/prof1.png',
    comment: '추가 메세지입니다! 🎉',
  });

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
