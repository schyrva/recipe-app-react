import { ReactNode } from "react";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto py-8 px-4">{children}</main>
      <footer className="bg-muted py-6 text-center text-muted-foreground">
        <div className="container mx-auto">
          <p>© {new Date().getFullYear()} Recipe App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
