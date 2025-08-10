import { createFileRoute } from '@tanstack/react-router';

import HomePage from '@/apps/home';

export const Route = createFileRoute('/')({
  component: HomePage,
});
