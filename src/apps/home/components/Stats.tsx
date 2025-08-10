import type { StatItem } from '../types';

interface StatCardProps {
  stat: StatItem;
}

function StatCard({ stat }: StatCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
      <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
      <div className="text-white/70">{stat.label}</div>
    </div>
  );
}

interface StatsProps {
  stats: StatItem[];
}

export default function Stats({ stats }: StatsProps) {
  return (
    <section className="mt-16" aria-label="게임 통계">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
        {stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>
    </section>
  );
}
