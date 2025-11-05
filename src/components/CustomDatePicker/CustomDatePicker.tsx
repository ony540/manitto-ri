import DatePicker from 'react-datepicker';
import { CalenderCustomHeader } from './CustomHeader';
import { ko } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import './style.css';

type Props = {
  label?: string;
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  type?: 'submit' | 'button' | 'reset';
  selectsRange?: boolean;
  inline?: boolean;
  placeholderText?: string;
  width?: string;
  dateFormat?: string;
  disabled?: boolean;
  className?: string;
};

export const CustomDatePicker = ({
  selectedDate,
  onChange,
  inline = false,
  disabled = false,
  placeholderText,
  dateFormat = 'yyyy.MM.dd',
  className,
}: Props) => {
  return (
    <div className={'Mainwrapper'}>
      <DatePicker
        locale={ko}
        className={`MainReactDatePicker ${className}`}
        inline={inline}
        onFocus={(e) => e.target.blur()}
        selected={selectedDate}
        minDate={new Date()}
        onChange={onChange}
        disabled={disabled}
        placeholderText={placeholderText}
        dateFormat={dateFormat}
        renderCustomHeader={(p) => (
          <CalenderCustomHeader
            date={p.date}
            decreaseMonth={p.decreaseMonth}
            increaseMonth={p.increaseMonth}
            prevMonthButtonDisabled={p.prevMonthButtonDisabled}
            nextMonthButtonDisabled={p.nextMonthButtonDisabled}
          />
        )}
      />
    </div>
  );
};
