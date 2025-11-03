
'use client';
import { ChevronRight } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';

interface ProfileListItemProps {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
  isAction?: boolean;
  onClick?: () => void;
}

export const ProfileListItem: React.FC<ProfileListItemProps> = ({
  icon: Icon,
  label,
  value,
  isAction = true,
  onClick
}) => {
  const content = (
    <div className="flex items-center justify-between w-full p-3 hover:bg-muted/50 rounded-lg transition-colors text-left">
      <div className="flex items-center gap-4">
        <Icon className="h-5 w-5 text-muted-foreground" />
        <div className="text-left">
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className={cn("font-semibold text-foreground", !value && "text-muted-foreground italic text-sm font-normal")}>
            {value || "Not set"}
          </p>
        </div>
      </div>
      {isAction && <ChevronRight className="h-5 w-5 text-muted-foreground" />}
    </div>
  );

  if (onClick) {
      return <button onClick={onClick} className="w-full">{content}</button>
  }

  return content;
};
