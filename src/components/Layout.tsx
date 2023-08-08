import React from 'react';

interface props {
  children: React.ReactNode;
}

export const Layout: React.FC<props> = ({ children }) => {
  return (
    <>
      <header className="flex items-center bg-cyan-300">
        <h1>Header</h1>
      </header>
      <main className="w-full bg-gray-400 p-5">{children}</main>
    </>
  );
};
