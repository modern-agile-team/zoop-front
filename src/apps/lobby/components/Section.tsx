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
    childrenArray.find((child) => (child.type as any).displayName === name);

  const header = getByDisplayName('LobbyScrollSection.Header');
  const content = getByDisplayName('LobbyScrollSection.Content');
  const footer = getByDisplayName('LobbyScrollSection.Footer');

  return (
    <section className="bg-primary-700 flex flex-col min-h-0 py-16 px-12 gap-16 border-4 border-primary-900 rounded-8">
      {header && header}
      {content && content}
      {footer && footer}
    </section>
  );
}

const Header = ({ children }: PropsWithChildren) => {
  return (
    <header className="flex items-center justify-center">
      <h2 className="text-title-3 text-primary-100">{children}</h2>
    </header>
  );
};
Header.displayName = 'LobbyScrollSection.Header';
LobbyScrollSection.Header = Header;

const Content = ({ children }: PropsWithChildren) => (
  <div className="overflow-auto flex-1 min-h-0 w-full">{children}</div>
);
Content.displayName = 'LobbyScrollSection.Content';
LobbyScrollSection.Content = Content;

const Footer = ({ children }: PropsWithChildren) => (
  <footer className="flex w-full">{children}</footer>
);
Footer.displayName = 'LobbyScrollSection.Footer';
LobbyScrollSection.Footer = Footer;
