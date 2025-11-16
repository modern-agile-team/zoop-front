import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/room/$roomId/in-play')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/room/$roomId/in-play"!</div>;
}
