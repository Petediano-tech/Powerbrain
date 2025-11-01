
'use client';
import { ChevronRight } from 'lucide-react';
import React from 'react';

interface ProfileListItemProps {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
  isAction?: boolean;
}

export const ProfileListItem: React.FC<ProfileListItemProps> = ({
  icon: Icon,
  label,
  value,
  isAction = true,
}) => {
  const content = (
    <div className="flex items-center justify-between w-full p-3 hover:bg-white/5 rounded-lg transition-colors">
      <div className="flex items-center gap-4">
        <Icon className="h-5 w-5 text-white/60" />
        <div className="text-left">
          <p className="text-xs text-white/60">{label}</p>
          {typeof value === 'string' && <p className="font-semibold">{value}</p>}
        </div>
      </div>
      {typeof value !== 'string' && <div className="ml-auto">{value}</div>}
      {isAction && <ChevronRight className="h-5 w-5 text-white/40" />}
    </div>
  );

  return isAction ? <button className="w-full">{content}</button> : content;
};
