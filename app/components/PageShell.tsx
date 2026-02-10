import React from "react";

type Props = {
  children: React.ReactNode;
  below?: React.ReactNode;
};

export default function PageShell({ children, below }: Props) {
  return (
    <>
      {children}
      {below ? (
        <div className="mx-auto max-w-3xl px-4 pb-10">
          <div className="mt-6 space-y-6">{below}</div>
        </div>
      ) : null}
    </>
  );
}
