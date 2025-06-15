import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/lobby/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/lobby/"!</div>;
}
