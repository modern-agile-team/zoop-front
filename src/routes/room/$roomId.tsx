import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/room/$roomId')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/room/$roomId"!</div>;
}
