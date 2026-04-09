import Image from 'next/image';

export const Logo = (props: { className?: string }) => {
  return (
    <Image
      src="/bsvc-logo.png"
      alt="BSVC Logo"
      width={120}
      height={44}
      className={props.className + " h-auto"}
      priority
    />
  );
};
