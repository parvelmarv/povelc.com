// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type User = {
  id: number;
  name: string;
};

export interface Project {
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  tags: string[];
  link: string;
  category: 'music' | 'games' | 'code';
  isYoutube?: boolean;
  youtubeId?: string;
}

export interface FormData {
  name: string;
  email: string;
  message: string;
}
