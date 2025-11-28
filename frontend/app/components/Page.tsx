// app/components/Page.tsx
import React from "react";

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center items-center w-full h-full">
      {children}
    </div>
  );
}
