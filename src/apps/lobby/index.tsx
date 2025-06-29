import Room from './components/room';

const MOCK_ROOMS = Array.from({ length: 30 }, (_, i) => i + 1);

export default function LobbyPage() {
  return (
    <div className="flex flex-col h-screen bg-primary-900">
      <div className="w-full">
        <h1
          style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.6)' }}
          className="text-title-1 text-white"
        >
          로비
        </h1>
      </div>
      <ul className="flex flex-col gap-4 p-4 overflow-y-auto">
        {MOCK_ROOMS.map((room) => (
          <Room key={room} />
        ))}
      </ul>
    </div>
  );
}
