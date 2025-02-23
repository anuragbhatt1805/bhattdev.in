export interface HeroSectionInterface {
    title: string;
    subtitle?: string;
}

export interface ServicesInterface {
    id : string;
    title : string;
    description : string;
    image : string[];
    price : number;
    techstack : string[];
    experience : string;
}

export interface ProjectsInterface {
    id : string;
    title : string;
    description : string;
    image : string[];
    techstack : string[];
    startDate : Date;
    endDate : Date | 'present';
    link: string;
    repo: string;
}

export interface GalleryCategoryInterface {
    id: string;
    name: string;
}

export interface GalleryImagesInterface {
    id: string;
    category: string;
    image: string;
    title: string;
    description: string;
    tags: string[];
}

export interface BlogCategoryInterface {
    id: string;
    name: string;
}

export interface BlogPostInterface {
    id: string;
    title: string;
    thumbnail: string;
    content: string;
    category: string;
    tags: string[];
    date: Date;
}