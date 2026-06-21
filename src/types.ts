export type { ImpactStory } from './storiesData';

export interface SiteStats {
  mealsServed: number;
  activeVolunteers: number;
  beneficiariesHelped: number;
  citiesReached: number;
}

export interface Review {
  id: number;
  name: string;
  role: string;
  rating: number;
  text: string;
  avatar: string;
  date: string;
  isApproved: boolean;
}

export interface Volunteer {
  id: number;
  fullName: string;
  phone: string;
  email: string;
  city: string;
  message: string;
  date: string;
  status: "Pending" | "Approved" | "Contacted";
}

export interface DonationTier {
  id: number;
  amount: number;
  personsFed: number;
  icon: string;
  description: string;
  popular?: boolean;
}

export interface GalleryItem {
  id: number;
  title: string;
  category: "Kids" | "Distribution" | "Kitchen" | "Elderly" | "Volunteers";
  url: string;
  description: string;
}

export interface NGOEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  status: "Upcoming" | "Completed" | "Ongoing";
}

export interface SiteConfig {
  headline: string;
  subheading: string;
  phone: string;
  email: string;
  address: string;
  upiId?: string;
  upiName?: string;
  customQrImage?: string;
  heroImage?: string;
  introImage?: string;
  aboutImage?: string;
  teamImage1?: string;
  teamImage2?: string;
  teamImage3?: string;
  teamImage4?: string;
}
