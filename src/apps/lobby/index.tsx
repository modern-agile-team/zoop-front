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
      <div className="flex-1 flex items-center justify-center">
        <p className="text-white">로비에 오신 것을 환영합니다!</p>
      </div>
    </div>
  );
}
