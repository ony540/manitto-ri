'use client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useManittoFormStore } from '@/store/useManittoFormStore';
import { useEffect, useState } from 'react';
import { BottomButton } from '@/components/BottomButton';
import { Header } from '@/components/Header';
import Image from 'next/image';
import { CustomDatePicker } from '@/components/CustomDatePicker/CustomDatePicker';
import CostIcon from '@/assets/icon/cost.svg';
import CalenderIcon from '@/assets/icon/calender.svg';
import { format } from 'date-fns';

// ✅ Zod 스키마 정의
const step1Schema = z.object({
  name: z.string().trim().min(1, '그룹명을 입력해주세요.'),
  budget: z.number().optional(),
  eventDate: z.string().min(1, '날짜를 선택해주세요.'),
});
type Step1Schema = z.infer<typeof step1Schema>;

const page = () => {
  const router = useRouter();
  const { name, budget, eventDate, setStep1 } = useManittoFormStore();
  const [formDate, setFormDate] = useState<Date | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<Step1Schema>({
    resolver: zodResolver(step1Schema),
    defaultValues: { name, budget, eventDate },
  });

  // ✅ Zustand 값이 변경되면 폼에도 반영 (재진입 시)
  useEffect(() => {
    setValue('name', name);
    setValue('budget', budget);
    setValue('eventDate', eventDate);
  }, [name, budget, eventDate, setValue]);

  const onSubmit = handleSubmit((data: Step1Schema) => {
    setStep1(data);
    router.push('/create/step2');
  });

  const onClickBack = () => {};

  const onChangeDate = (date: Date | null) => {
    if (date) {
      setFormDate(date);
      setValue('eventDate', format(date, 'yyyy-MM-dd'));
    }
  };

  // TODO: 버튼 활성화 시기 확인
  useEffect(() => {
    console.log(isValid);
  }, [isValid]);

  return (
    <div className="flex flex-col items-center justify-items-center">
      <Header onClickBack={onClickBack}>01</Header>
      <form className="w-[calc(100vw-2rem)] max-width-content ">
        <fieldset className="bg-[url(/bg/bg_01.svg)] bg-size-[100%_100%] bg-center w-full bg-no-repeat flex flex-col items-center min-h-[500px]">
          <input
            {...register('name')}
            id="name"
            placeholder="이벤트 명"
            className=" focus-visible:outline-0 text-center border-b-2 max-w-[231px] font-bold  mt-12 mb-16 text-lg/[40px] "
          />

          <div className="grid grid-cols-[24px_1fr] items-center gap-1 mb-6">
            <label htmlFor="budget" className=" w-fit">
              <CostIcon className="align-middle" />
            </label>
            <input
              type="number"
              id="budget"
              {...register('budget')}
              placeholder="예산금액"
              className=" focus-visible:outline-0 
            border-b-[1.5px]  max-w-[180px] text-base/[36px] indent-2 "
            />
          </div>

          <div className="grid grid-cols-[24px_1fr] items-center gap-1">
            <label htmlFor="budget" className=" w-fit">
              <CalenderIcon alt="날짜" />
            </label>
            <CustomDatePicker
              selectedDate={formDate}
              onChange={onChangeDate}
              placeholderText="이벤트 날짜"
            />
            {errors.eventDate && <p>{errors.eventDate.message}</p>}
          </div>
        </fieldset>
        <BottomButton disabled={!isValid} onClick={onSubmit}>
          NEXT
        </BottomButton>
      </form>
    </div>
  );
};

export default page;
