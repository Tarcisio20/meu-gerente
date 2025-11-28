// app/layout.tsx
import React from "react";
import "@/app/globals.css"; // 👈 sem isso o Tailwind não entra!
import { ThemeProvider } from "@/app/components/theme-provider"; // ajuste se seu theme-provider estiver em outro lugar
import { Toaster } from "sonner";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head />
      <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="bottom-center" duration={4} />
        </ThemeProvider>
      </body>
    </html>
  );
}
