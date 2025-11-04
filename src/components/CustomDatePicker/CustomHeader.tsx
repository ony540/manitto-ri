import './style.css';
import ArrowIcon from '@/assets/icon/arrow-right-nonbar.svg';
import { ReactDatePickerCustomHeaderProps } from 'react-datepicker';

export const CalenderCustomHeader = ({
  date,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}: Partial<ReactDatePickerCustomHeaderProps>) => {
  return (
    <div className="flex justify-between px-8">
      <button
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
        type="button"
        className="rotate-180  disabled:text-gray-400 "
      >
        <ArrowIcon alt="이전 달" />
      </button>
      <h6 className="text-[15px] text-stroke-light">{formatDate(date)}</h6>
      <button
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
        type="button"
        className="disabled:text-gray-400"
      >
        <ArrowIcon alt="이전 달" />
      </button>
    </div>
  );
};

const formatDate = (d: Date | undefined) => {
  if (!d) return;
  //달력 년, 월, 일 header
  const date = new Date(d);
  const monthIndex = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${year}년 ${`0${monthIndex}`.slice(-2)}월`;
};
