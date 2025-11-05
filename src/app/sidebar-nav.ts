'use client';
import {
  Home,
  BookCopy,
  BrainCircuit,
  User,
  Star,
  Calendar,
  Briefcase,
} from 'lucide-react';

export const navItems = [
  { href: '/home', label: 'Home', icon: Home },
  { href: '/subjects', label: 'Subjects', icon: BookCopy },
  { href: '/planner', label: 'Planner', icon: Calendar, isPremium: true },
  { href: '/career', label: 'Careers', icon: Briefcase, isPremium: true },
];
