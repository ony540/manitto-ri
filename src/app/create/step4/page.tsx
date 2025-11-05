'use client';

import { BottomButton } from '@/components/BottomButton';
import { Header } from '@/components/Header';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Page() {
  return (
    <div>
      <main className=" flex flex-col items-center text-center ">
        <Header title="04" subtitle="마니또 지정 완료" />
        <div className="mt-6 relative">
          {/* 회전 애니메이션 적용 */}
          <motion.div
            animate={{
              rotateY: [0, 360, 360], // 회전 중간에 같은 값 유지해서 멈춘 듯한 느낌
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: 'easeIn',
              times: [0, 0.7, 1], // 회전 구간/멈춤 비율 조정
            }}
            style={{
              transformStyle: 'preserve-3d',
              perspective: 1000,
            }}
          >
            <Image src={`/bg/bg_04.svg`} width={370} height={370} alt={`배경4`} priority />
          </motion.div>
          <span className=" absolute top-0 left-0 w-full h-full text-center font-bold flex items-center justify-center text-xl">
            메일함을 <br /> 확인해보세요!
          </span>
        </div>

        <p className="text-sm text-center text-zinc-500 mt-6 mb-6">
          ※ 메일이 보이지 않을 경우 스팸함을 확인해주세요.
        </p>
        <BottomButton className=" static translate-none mb-0! max-w-[300px]! " href="/">
          HOME
        </BottomButton>
      </main>
    </div>
  );
}
