import type { FeatureItem } from '../types';

interface FeatureItemProps {
  feature: FeatureItem;
}

function FeatureItemComponent({ feature }: FeatureItemProps) {
  const IconComponent = feature.icon;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
        <IconComponent className={`w-8 h-8 ${feature.color}`} aria-hidden="true" />
      </div>
      <span className="text-white/70 text-sm">{feature.title}</span>
    </div>
  );
}

interface FeaturesProps {
  features: FeatureItem[];
}

export default function Features({ features }: FeaturesProps) {
  return (
    <div className="flex justify-center gap-8 mb-12">
      {features.map((feature) => (
        <FeatureItemComponent key={feature.title} feature={feature} />
      ))}
    </div>
  );
}
