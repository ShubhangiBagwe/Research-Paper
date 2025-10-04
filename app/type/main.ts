export interface Paper {
  id: number;
  papertitle: string;
  client?: {
    firstname?: string;
    lastname?: string;
  };
  coauthors?: string;
  publisher?: {
    publishername?: string;
  };
  journal?: {
    title?: string;
    impactfactor?: number;
  };
  articlelink?: string;
  published_at?: string;
}


export interface DetailsModalProps {
  paper: Paper;
  onClose: () => void;
}


export interface SearchBarProps {
  onSearch: (query: string, field: "title" | "author" | "journal") => void;
  onSort: (sortBy: "title" | "year" | "impact", order: "asc" | "desc") => void;
}


export interface PaginationProps {
  total: number;         
  perPage: number;        
  current: number;       
  onChange: (page: number) => void; 
}
