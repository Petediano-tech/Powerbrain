export type Resource = {
  id: string;
  title: string;
  description: string;
  type: 'PDF' | 'Video' | 'Past Paper' | 'Textbook';
  imageUrl: string;
  imageHint: string;
  sourceUrl: string;
};

export const resources: Resource[] = [
  {
    id: 'msce-math-paper-1',
    title: 'MSCE Mathematics Paper 1',
    description: '2023 - Past Paper',
    type: 'Past Paper',
    imageUrl: 'https://picsum.photos/seed/mathpaper/400/300',
    imageHint: 'mathematics exam',
    sourceUrl: '#',
  },
  {
    id: 'form-4-bio-notes',
    title: 'Form 4 Biology Notes',
    description: 'Chapter 3: Respiration',
    type: 'PDF',
    imageUrl: 'https://picsum.photos/seed/bionotes/400/300',
    imageHint: 'biology textbook',
    sourceUrl: '#',
  },
  {
    id: 'std-8-english-video',
    title: 'Standard 8 English',
    description: 'Lesson 5: Tenses',
    type: 'Video',
    imageUrl: 'https://picsum.photos/seed/engvideo/400/300',
    imageHint: 'teacher lecture',
    sourceUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    id: 'jce-physics-syllabus',
    title: 'JCE Physics Syllabus',
    description: 'Ministry of Education',
    type: 'PDF',
    imageUrl: 'https://picsum.photos/seed/physsyllabus/400/300',
    imageHint: 'physics diagram',
    sourceUrl: '#',
  },
  {
    id: 'chichewa-textbook-form-2',
    title: 'Chichewa Textbook Form 2',
    description: 'Approved Curriculum',
    type: 'Textbook',
    imageUrl: 'https://picsum.photos/seed/chichewabook/400/300',
    imageHint: 'Malawian student',
    sourceUrl: '#',
  },
  {
    id: 'msce-history-paper-2',
    title: 'MSCE History Paper 2',
    description: '2022 - Past Paper',
    type: 'Past Paper',
    imageUrl: 'https://picsum.photos/seed/histpaper/400/300',
    imageHint: 'history document',
    sourceUrl: '#',
  },
];
