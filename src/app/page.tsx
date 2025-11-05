import { BottomButton } from '@/components/BottomButton';
import EmailPreview from '../../util/EmailPreview';

export default function Home() {
  // return <EmailPreview />;

  return (
    <div>
      <main className=" flex items-center justify-center h-[90svh]">
        <h1 className="bg-[url(/bg/bg_00.svg)] w-full max-width-content min-h-[500px] bg-size-[100%_100%]  bg-center bg-no-repeat text-[40px]/[100%] font-tit flex items-center justify-center">
          MANITTO-RRI
        </h1>

        <BottomButton href="/create/step1">START</BottomButton>
      </main>
    </div>
  );
}
