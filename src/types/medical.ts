export type Lang = 'ar' | 'en';

export type PageId =
  | 'home'
  | 'about'
  | 'family-medicine'
  | 'services'
  | 'knowledge'
  | 'assessments'
  | 'booking'
  | 'reviews';

export interface BilingualText {
  ar: string;
  en: string;
}

export interface ServiceFAQ {
  question: BilingualText;
  answer: BilingualText;
}

export type ServiceCategory =
  | 'primary'
  | 'chronic'
  | 'preventive'
  | 'urgent'
  | 'telehealth-aesthetics';

export interface MedicalService {
  id: string;
  number: string;
  category: ServiceCategory;
  title: BilingualText;
  subtitle: BilingualText;
  shortDesc: BilingualText;
  detailedDesc: BilingualText;
  features: BilingualText[];
  suitableCases: BilingualText[];
  steps: BilingualText[];
  faqs: ServiceFAQ[];
  durationMinutes: number;
  modes: ('online' | 'riyadh' | 'jordan')[];
}

export type KnowledgeCategoryId =
  | 'general-health'
  | 'diabetes'
  | 'hypertension'
  | 'heart-health'
  | 'obesity'
  | 'nutrition'
  | 'child-health'
  | 'womens-health'
  | 'mental-health'
  | 'prevention'
  | 'vaccinations'
  | 'periodic-checkups'
  | 'family-medicine';

export interface KnowledgeCategory {
  id: KnowledgeCategoryId;
  name: BilingualText;
  description: BilingualText;
}

export interface MedicalArticle {
  id: string;
  categoryId: KnowledgeCategoryId;
  title: BilingualText;
  summary: BilingualText;
  readTimeMinutes: number;
  publishedDate: string;
  featured?: boolean;
  sections: {
    heading: BilingualText;
    body: BilingualText;
  }[];
  keyTakeaways: BilingualText[];
  relatedArticleIds: string[];
  recommendedServiceId: string;
}

export type AssessmentId =
  | 'diabetes-risk'
  | 'blood-pressure'
  | 'healthy-lifestyle'
  | 'sleep-quality'
  | 'physical-fitness'
  | 'bmi-obesity';

export interface AssessmentOption {
  label: BilingualText;
  points: number;
}

export interface AssessmentQuestion {
  id: string;
  prompt: BilingualText;
  options: AssessmentOption[];
}

export interface AssessmentDefinition {
  id: AssessmentId;
  title: BilingualText;
  shortDesc: BilingualText;
  estimatedMinutes: number;
  isBmiCalculator?: boolean;
  questions: AssessmentQuestion[];
  relatedArticleIds: string[];
  recommendedServiceId: string;
}

export interface ReviewCriteriaRatings {
  listening: number;
  clarity: number;
  followUp: number;
  punctuality: number;
}

export interface PatientReview {
  id: string;
  patientName: BilingualText;
  location: BilingualText;
  consultationType: 'online' | 'riyadh' | 'jordan';
  serviceId: string;
  serviceName: BilingualText;
  visitDate: string;
  bookingRef?: string;
  ratings: ReviewCriteriaRatings;
  rating: number;
  date: string;
  comment: BilingualText;
  verified: boolean;
}

export type ConsultationMode = 'online' | 'riyadh' | 'jordan';

export interface AppointmentPayload {
  mode: ConsultationMode;
  serviceId: string;
  date: string;
  timeSlot: string;
  patientName: string;
  phone: string;
  email: string;
  age?: string;
  notes?: string;
  lang: Lang;
}

export interface AppointmentConfirmation {
  referenceCode: string;
  mode: ConsultationMode;
  serviceId: string;
  date: string;
  timeSlot: string;
  patientName: string;
  phone: string;
  email: string;
  notes?: string;
  status: string;
  emailDispatched: boolean;
  whatsappDispatched: boolean;
  createdAt: string;
}

export interface AiAssistantResponse {
  reply: string;
  urgencyLevel: 'routine' | 'soon' | 'urgent';
  suggestedServiceIds: string[];
  suggestedArticleIds: string[];
  shouldBook: boolean;
  recommendedMode?: ConsultationMode;
  isMedicalQuestion?: boolean;
  doctorAdviceNote?: string;
}

