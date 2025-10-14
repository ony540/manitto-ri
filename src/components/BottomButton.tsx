import Link from 'next/link';

type Props = {
  onClick?: () => void;
  type?: 'submit' | 'reset' | 'button';
  href?: string;
  propsClass?: string;
  children: React.ReactNode;
};

const commonStyle = `flex items-center justify-center absolute left-[50%] bottom-2 w-[calc(100vw-2rem)] max-w-[381px] mb-4 h-14 rounded-2xl text-stroke text-xl font-normal translate-x-[-50%] bg-yellow-400`;

const BottomButton = ({ onClick, type, href, propsClass, children }: Props) => {
  if (href)
    return (
      <Link href={href} className={`${commonStyle} ${propsClass}`}>
        {children}
      </Link>
    );

  return (
    <button type={type || 'button'} onClick={onClick} className={`${commonStyle}  ${propsClass}`}>
      {children}
    </button>
  );
};

export default BottomButton;
