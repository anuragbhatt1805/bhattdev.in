// Type definitions for TypeScript
export interface User {
  id: string;
  username: string;
  active: boolean;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SocialLink {
  id: string;
  title: string;
  link: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Developer {
  id: string;
  name: string;
  position: string;
  organization: string;
  picture: string;
  bio: string;
  socialLinks: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    portfolio?: string;
    other?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  id: string;
  name: string;
  details: string[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  name: string;
  details: string[];
  link?: string;
  screenshots: string[];
  techStack: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface App {
  id: string;
  name: string;
  details: string;
  techStack: string[];
  screenshots: string[];
  link: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Connection {
  id: string;
  name: string;
  email: string;
  phone?: string;
  serviceId: string;
  subject: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}