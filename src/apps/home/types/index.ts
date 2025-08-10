export interface FeatureItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  color: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface HomeHeaderProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

export interface HeroSectionProps {
  isLoggedIn: boolean;
  onLogin: (username: string) => void;
  onNavigateToLobby: () => void;
}
