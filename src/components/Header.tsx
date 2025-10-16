import ArrowIcon from '@/assets/icon/arrow-left.svg';

type Props = {
  children: React.ReactNode;
  onClickBack?: () => void;
};

export const Header = ({ children, onClickBack }: Props) => {
  return (
    <header className="w-[calc(100vw-2rem)] max-width-content relative h-[40px]">
      <h1 className="font-(family-name:--font-subtit) text-center text-2xl/[40px] ">{children}</h1>
      {onClickBack && (
        <button type="button" onClick={onClickBack} className="absolute top-0 left-0">
          <ArrowIcon />
        </button>
      )}
    </header>
  );
};
