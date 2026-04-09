import Image from 'next/image';

export const Logo = (props: { className?: string }) => {
  return (
    <Image
      src="/bsvc-logo.png"
      alt="BSVC Logo"
      width={0}
      height={0}
      sizes="120px"
      className={props.className + " h-auto"}
      priority
    />
  );
};
