export interface Category {
  _id: string;
  title: string;
}

export interface Instructor {
  name: string;
  image?: {
    asset: {
      url: string;
    };
  };
}

export interface PilatesClass {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description?: string;
  level?: 'beginner' | 'intermediate' | 'advanced' | 'all-levels';
  duration: number;
  maxParticipants?: number;
  price?: number;
  instructor?: Instructor;
  category?: Category;
  image?: {
    asset: {
      _id: string;
      url: string;
    };
    alt?: string;
  };
  equipment?: string[];
  benefits?: string[];
}

// Helper to get level display name
export function getLevelDisplay(level?: string): string {
  switch (level) {
    case 'beginner':
      return 'Beginner';
    case 'intermediate':
      return 'Intermediate';
    case 'advanced':
      return 'Advanced';
    case 'all-levels':
      return 'All Levels';
    default:
      return 'All Levels';
  }
}

// Helper to get level color class
export function getLevelColor(level?: string): string {
  switch (level) {
    case 'beginner':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'intermediate':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'advanced':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'all-levels':
      return 'bg-primary/10 text-primary border-primary/20';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

