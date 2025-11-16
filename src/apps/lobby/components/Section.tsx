import clsx from 'clsx';
import { RefreshCw } from 'lucide-react';
import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';

import { queryClient } from '@/lib/queryClient';
import { Button } from '@/shared/components/ui/button';

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

const Header = ({
  children,
  refreshQuery,
}: PropsWithChildren<{ refreshQuery?: string[] }>) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleReset = async () => {
    setIsRefreshing(true);
    try {
      await queryClient.invalidateQueries({ queryKey: refreshQuery });
    } finally {
      setIsRefreshing(false);
    }
  };

  const refreshClasses = clsx('cursor-pointer', {
    'animate-spin': isRefreshing,
  });

  return (
    <header className="relative flex items-center justify-center px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
      <h2 className="text-base sm:text-lg font-semibold text-gray-800">
        {children}
      </h2>
      <Button
        className="absolute right-5 text-black bg-white hover:bg-gray-100"
        onClick={handleReset}
        aria-label="대기방 목록 새로고침"
        disabled={isRefreshing}
      >
        <RefreshCw className={refreshClasses} />
      </Button>
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
  <footer className="flex w-full p-3 sm:p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
    {children}
  </footer>
);
Footer.displayName = 'LobbyScrollSection.Footer';
LobbyScrollSection.Footer = Footer;
