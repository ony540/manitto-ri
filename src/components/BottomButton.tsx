import Link from 'next/link';

type Props = {
  onClick?: () => void;
  type?: 'submit' | 'reset' | 'button';
  href?: string;
  propsClass?: string;
  children: React.ReactNode;
  disabled?: boolean;
};

const commonStyle = `flex items-center justify-center absolute left-[50%] bottom-2 w-[calc(100vw-2rem)] max-width-content mb-4 h-14 rounded-2xl text-stroke text-xl font-normal translate-x-[-50%] bg-yellow-400 disabled:bg-yellow-400/50 `;

export const BottomButton = ({
  onClick,
  type = 'button',
  href,
  propsClass,
  children,
  disabled,
}: Props) => {
  if (href)
    return (
      <Link href={href} className={`${commonStyle} ${propsClass}`}>
        {children}
      </Link>
    );

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${commonStyle}  ${propsClass}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
