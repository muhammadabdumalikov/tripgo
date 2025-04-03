export interface TourListFilters {
  limit: number;
  offset: number;
  search?: string;
  status?: string[];
  from_date?: string;
  to_date?: string;
  location?: number;
  from_price?: number;
  to_price?: number;
}

export interface TourFile {
  url: string;
  type: string;
}

export interface Tour {
  id: string;
  status: number;
  is_deleted: boolean;
  created_at: string;
  title: {
    en: string;
    ru: string;
    uz: string;
  };
  description: {
    en: string;
    ru: string;
    uz: string;
  };
  location: number;
  price: string;
  sale_price: string;
  duration: string;
  start_date: string;
  end_date: string;
  organizer_id: string;
  seats: number;
  rating: number;
  route_json?: {
    day?: string;
    title: string;
    description: string;
    type: "location" | "destination" | "transport";
    transport_type: string;
    duration: string;
    activities: string;
  }[];
  included_json?: string[];
  excluded_json?: string[];
  total: string;
  organizer_title: string;
  organizer_phone: string;
  organizer_logo: string;
  review_count: string;
  files: TourFile[];
}

export interface TourListResponse {
  data: Tour[];
} 