import type {TopicPollState} from '../types/medical';

export const TOPIC_POLL_STORAGE_KEY = 'drmotasem_topic_poll_vote_v1';
export const TOPIC_POLL_STATE_FALLBACK_KEY = 'drmotasem_topic_poll_state_v1';

export const INITIAL_TOPIC_POLL: TopicPollState = {
  pollId: 'blog-next-topic-2026-q4',
  question: {
    ar: 'ما الموضوع الطبي الذي تود أن يكتب عنه د. معتصم النسور في المقال القادم؟',
    en: 'Which medical topic would you like Dr. Motasem Alnsour to cover next in the blog?',
  },
  options: [
    {
      id: 'glp1-weight-safety',
      categoryId: 'obesity',
      title: {
        ar: 'إبر التنحيف (GLP-1) وعلاج السمنة: من يستحقها وما شروط المتابعة الآمنة؟',
        en: 'GLP-1 Weight-Loss Injections: Clinical Eligibility & Safe Monitoring',
      },
      description: {
        ar: 'ضوابط مؤشر كتلة الجسم، الفحوصات المسبقة، وحماية الكتلة العضلية أثناء النزول.',
        en: 'BMI thresholds, baseline lab screening, and preserving lean muscle mass.',
      },
      votes: 0,
    },
    {
      id: 'thyroid-persistent-fatigue',
      categoryId: 'general-health',
      title: {
        ar: 'الخمول المزمن وكسل الغدة الدرقية: كيف نفرّق بينها وبين نقص الفيتامينات؟',
        en: 'Persistent Fatigue & Hypothyroidism: Separating Thyroid Issues from Deficiencies',
      },
      description: {
        ar: 'متى يكفي فحص TSH ومتى نحتاج تقييم الحديد وفيتامين د وفيتامين B12.',
        en: 'When TSH alone suffices vs. checking ferritin, Vitamin D, and B12.',
      },
      votes: 0,
    },
    {
      id: 'chronic-insomnia-protocol',
      categoryId: 'mental-health',
      title: {
        ar: 'الأرق واضطرابات النوم: الخطة السلوكية الطبية قبل اللجوء للمنوّمات',
        en: 'Chronic Insomnia & Sleep Disorders: Behavioral Care Before Medication',
      },
      description: {
        ar: 'تأثير قلة النوم على ضغط الدم ومقاومة الإنسولين وخطوات تحسين جودة النوم.',
        en: 'How sleep debt affects blood pressure, insulin sensitivity, and recovery.',
      },
      votes: 0,
    },
    {
      id: 'pediatric-fever-antibiotics',
      categoryId: 'child-health',
      title: {
        ar: 'الحرارة المتكررة عند الأطفال: متى نحتاج مضاداً حيوياً ومتى نكتفي بالرعاية المنزلية؟',
        en: 'Recurrent Pediatric Fevers: When Antibiotics Are Truly Necessary',
      },
      description: {
        ar: 'العلامات المنذرة التي تستدعي التقييم الطبي وحساب جرعات خافضات الحرارة بالوزن.',
        en: 'Pediatric red flags and accurate weight-based antipyretic dosing.',
      },
      votes: 0,
    },
    {
      id: 'home-bp-monitoring',
      categoryId: 'hypertension',
      title: {
        ar: 'قياس ضغط الدم في المنزل: الأخطاء الشائعة وكيف توثّق قراءاتك للطبيب',
        en: 'Home Blood Pressure Monitoring: Avoiding Errors & Logging Readings',
      },
      description: {
        ar: 'توقيت القياس الصحيح، اختيار مقاس الكفة المناسب، ومؤشرات مراجعة الجرعة.',
        en: 'Proper cuff sizing, timing, and clinical thresholds for dose review.',
      },
      votes: 0,
    },
  ],
  totalVotes: 0,
  updatedAt: '2026-11-26T00:00:00.000Z',
};
