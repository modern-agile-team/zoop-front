import type { PropsWithChildren } from 'react';
import React from 'react';

export function LobbyScrollSection({
  children,
}: {
  children: React.ReactNode;
}) {
  const childrenArray = React.Children.toArray(
    children
  ) as React.ReactElement[];

  const getByDisplayName = (name: string) =>
    childrenArray.find(
      (child) => (child.type as { displayName?: string }).displayName === name
    );

  const header = getByDisplayName('LobbyScrollSection.Header');
  const content = getByDisplayName('LobbyScrollSection.Content');
  const footer = getByDisplayName('LobbyScrollSection.Footer');

  return (
    <section className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col h-full min-h-0">
      {header && header}
      {content && content}
      {footer && footer}
    </section>
  );
}

const Header = ({ children }: PropsWithChildren) => {
  return (
    <header className="flex items-center justify-center px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
      <h2 className="text-lg font-semibold text-gray-800">{children}</h2>
    </header>
  );
};
Header.displayName = 'LobbyScrollSection.Header';
LobbyScrollSection.Header = Header;

const Content = ({ children }: PropsWithChildren) => (
  <div className="overflow-y-auto flex-1 min-h-0 max-h-full w-full">
    {children}
  </div>
);
Content.displayName = 'LobbyScrollSection.Content';
LobbyScrollSection.Content = Content;

const Footer = ({ children }: PropsWithChildren) => (
  <footer className="flex w-full p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
    {children}
  </footer>
);
Footer.displayName = 'LobbyScrollSection.Footer';
LobbyScrollSection.Footer = Footer;
