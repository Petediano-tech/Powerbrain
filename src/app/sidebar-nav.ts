'use client';
import {
  Home,
  BookCopy,
  Layers,
  FilePenLine,
  PencilRuler,
  FolderKanban,
  BarChart2,
  GraduationCap
} from 'lucide-react';

export const navItems = [
  { href: '/home', label: 'Home', icon: Home },
  { href: '/dashboard', label: 'Dashboard', icon: BarChart2 },
  { href: '/subjects', label: 'Subjects', icon: GraduationCap },
  { href: '/quizzes', label: 'Quizzes', icon: PencilRuler },
  { href: '/flashcards', label: 'Flashcards', icon: Layers },
  { href: '/notes', label: 'My Notes', icon: FilePenLine },
  { href: '/repository', label: 'Resources', icon: FolderKanban },
];
