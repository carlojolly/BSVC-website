"use client";

export const FixedAurora = () => {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-white dark:bg-zinc-900"
    >
      <div
        className="
          [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
          [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
          [--aurora:repeating-linear-gradient(100deg,#ffdd0e_10%,#fbbf24_15%,#fcd34d_20%,#fde68a_25%,#ffdd0e_30%)]
          [background-image:var(--white-gradient),var(--aurora)]
          dark:[background-image:var(--dark-gradient),var(--aurora)]
          [background-size:300%,_200%]
          [background-position:50%_50%,50%_50%]
          filter blur-[10px]
          after:content-[''] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)]
          after:dark:[background-image:var(--dark-gradient),var(--aurora)]
          after:[background-size:200%,_100%]
          after:animate-aurora after:[background-attachment:fixed]
          after:mix-blend-multiply dark:after:mix-blend-screen
          pointer-events-none
          absolute -inset-[10px] opacity-60 will-change-transform
          [mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]
        "
      />
    </div>
  );
};
