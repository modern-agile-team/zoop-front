import useAuth from '@/shared/hooks/useAuth';

export default function HomePage() {
  const { isLoggedIn, login, logout } = useAuth();
  return (
    <div className="flex flex-col h-screen bg-primary-900">
      <div className="w-full">
        <h1
          style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.6)' }}
          className="text-title-1 text-white"
        >
          실시간 퀴즈 맞추기 게임
        </h1>
      </div>
      {isLoggedIn && (
        <div>
          <button>로비로 이동</button>
          <button onClick={logout}>로그아웃</button>
        </div>
      )}

      {!isLoggedIn && (
        <div>
          <button onClick={() => login('test')}>로그인</button>
          <button>회원가입</button>
        </div>
      )}
    </div>
  );
}
