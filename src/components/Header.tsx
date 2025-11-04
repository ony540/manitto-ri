import ArrowIcon from '@/assets/icon/arrow-left.svg';

type Props = {
  title: string;
  subtitle?: string;
  subContent?: React.ReactNode;
  onClickBack?: () => void;
};

export const Header = ({ title, subtitle, subContent, onClickBack }: Props) => {
  return (
    <header className="w-[calc(100vw-2rem)] max-width-content relative pb-[20px]">
      <h1 className="font-(family-name:--font-subtit) text-center text-3xl  ">
        {title}
        <span className=" block font-cont font-semibold text-lg">{subtitle}</span>
      </h1>
      {subContent}

      {onClickBack && (
        <button type="button" onClick={onClickBack} className="absolute top-[12px] left-0">
          <ArrowIcon />
        </button>
      )}
    </header>
  );
};
