import type {BilingualText, PatientReview, ReviewCriteriaRatings} from '../types/medical';

export interface ReviewCriterionDefinition {
  key: keyof ReviewCriteriaRatings;
  label: BilingualText;
  description: BilingualText;
}

export const REVIEW_CRITERIA: ReviewCriterionDefinition[] = [
  {
    key: 'listening',
    label: {ar: 'الاستماع ودقة التقييم السريري', en: 'Listening & Clinical Assessment'},
    description: {
      ar: 'أخذ التاريخ المرضي بدقة ومنح الوقت الكافي لفهم الشكوى.',
      en: 'Thorough medical history intake and attentive evaluation.',
    },
  },
  {
    key: 'clarity',
    label: {ar: 'وضوح التشخيص والخطة العلاجية', en: 'Diagnosis & Plan Clarity'},
    description: {
      ar: 'شرح الحالة والبدائل العلاجية والأدوية بلغة واضحة ومطمئنة.',
      en: 'Clear explanation of findings, medications, and next steps.',
    },
  },
  {
    key: 'followUp',
    label: {ar: 'تفسير الفحوصات وجودة المتابعة', en: 'Lab Review & Follow-Up Quality'},
    description: {
      ar: 'ربط نتائج التحاليل بالأعراض ووضع جدول متابعة منظم.',
      en: 'Contextualizing lab results with structured ongoing follow-up.',
    },
  },
  {
    key: 'punctuality',
    label: {ar: 'الالتزام بالموعد وسهولة التواصل', en: 'Punctuality & Communication'},
    description: {
      ar: 'الانضباط في وقت الاستشارة الحضورية أو عن بعد واحترام الخصوصية.',
      en: 'Respect for scheduled visit time and clinical confidentiality.',
    },
  },
];

// No fabricated reviews: starts empty and stores authentic patient submissions
export const INITIAL_REVIEWS: PatientReview[] = [];
