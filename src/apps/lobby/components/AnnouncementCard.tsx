import { Announcement } from '../types';

interface AnnouncementCardProps {
  announcement: Announcement;
}

export default function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  return (
    <div className="p-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all duration-200 cursor-pointer border border-blue-100 hover:border-blue-200">
      <h4 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2">
        {announcement.title}
      </h4>
      <p className="text-xs text-gray-600 mb-2 line-clamp-3 leading-relaxed">
        {announcement.content}
      </p>
      <span className="text-xs text-blue-600 font-medium">
        {announcement.date}
      </span>
    </div>
  );
}
