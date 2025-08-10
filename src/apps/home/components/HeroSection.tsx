import Features from './Features';
import ActionButtons from './ActionButtons';
import Stats from './Stats';
import { FEATURES, STATS } from '../data/mockData';
import type { HeroSectionProps } from '../types';

export default function HeroSection({
  isLoggedIn,
  onLogin,
  onNavigateToLobby,
}: HeroSectionProps) {
  return (
    <main className="flex-1 flex items-center justify-center px-6" role="main">
      <div className="max-w-4xl mx-auto text-center">
        {/* 타이틀 섹션 */}
        <section className="mb-12" aria-labelledby="main-title">
          <h1
            id="main-title"
            className="text-6xl md:text-7xl font-extrabold text-white mb-6"
          >
            <span className="bg-gradient-to-r from-yellow-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              퀴즈 배틀
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
            실시간으로 친구들과 함께하는 <br />
            스릴 넘치는 퀴즈 대결!
          </p>

          {/* 특징 아이콘들 */}
          <Features features={FEATURES} />
        </section>

        {/* 액션 버튼들 */}
        <ActionButtons
          isLoggedIn={isLoggedIn}
          onLogin={onLogin}
          onNavigateToLobby={onNavigateToLobby}
        />

        {/* 통계 또는 추가 정보 */}
        <Stats stats={STATS} />
      </div>
    </main>
  );
}
