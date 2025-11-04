import Link from 'next/link';

type Props = {
  onClick?: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  type?: 'submit' | 'reset' | 'button';
  href?: string;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
};

const commonStyle = `fixed flex items-center justify-center absolute left-[50%] bottom-2 w-[calc(100vw-2rem)] max-width-content mb-4 h-14 rounded-2xl text-stroke text-xl font-normal translate-x-[-50%] bg-yellow-400 disabled:bg-[#FCEEB7] disabled:text-gray-500 shadow `;

export const BottomButton = ({
  onClick,
  type = 'button',
  href,
  className,
  children,
  disabled = false,
}: Props) => {
  if (href)
    return (
      <Link href={href} className={`${commonStyle} ${className}`}>
        {children}
      </Link>
    );

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${commonStyle}  ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
