import useAuth from '@/shared/hooks/useAuth';
import { useNavigate } from '@tanstack/react-router';
import {
  BackgroundDecorations,
  HomeHeader,
  HeroSection,
  Footer,
} from './home';

export default function HomePage() {
  const { isLoggedIn = false, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleNavigateToLobby = () => {
    navigate({ to: '/lobby' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* 배경 장식 요소들 */}
      <BackgroundDecorations />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* 헤더 */}
        <HomeHeader isLoggedIn={isLoggedIn} onLogout={logout} />

        {/* 메인 콘텐츠 */}
        <HeroSection
          isLoggedIn={isLoggedIn}
          onLogin={login}
          onNavigateToLobby={handleNavigateToLobby}
        />

        {/* 푸터 */}
        <Footer />
      </div>
    </div>
  );
}
