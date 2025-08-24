import { useParams } from '@tanstack/react-router';

export default function GameRoomDetailPage() {
  const { roomId } = useParams({ from: '/room/$roomId' });

  return <div>Game Room ID: {roomId}</div>;
}
