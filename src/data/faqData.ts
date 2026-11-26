import type {BilingualText} from '../types/medical';

export interface MedicalFaqItem {
  id: string;
  question: BilingualText;
  answer: BilingualText;
}

export const COMMON_MEDICAL_FAQS: MedicalFaqItem[] = [
  {
    id: 'faq-family-vs-specialist',
    question: {
      ar: 'ما الفرق بين طبيب الأسرة وباقي التخصصات الطبية؟',
      en: 'What is the difference between a family physician and other medical specialists?',
    },
    answer: {
      ar: 'طبيب الأسرة يعالج جميع أفراد العائلة بمختلف الأعمار ويعالج أكثر من 85% من المشكلات الصحية الشائعة والمزمنة في ملف طبي واحد، بينما يركز الاختصاص الفرعي على عضو واحد فقط. كما ينسق طبيب الأسرة الأدوية ويمنع تكرار التحاليل ويوجهك للتخصص الدقيق عند الحاجة.',
      en: 'A family physician cares for patients of all ages across all organ systems, resolving over 85% of common and chronic conditions while coordinating medications and preventing duplicate tests, whereas subspecialists focus on a single organ system.',
    },
  },
  {
    id: 'faq-booking-modes',
    question: {
      ar: 'كيف يمكنني حجز موعد استشارة طبية أونلاين مع د. معتصم النسور؟',
      en: 'How do I book an online consultation with Dr. Motasem Alnsour?',
    },
    answer: {
      ar: 'يتم حجز المواعيد في الموقع للاستشارات الطبية أونلاين فقط (عن بعد) دون الحاجة لتسجيل دخول، وذلك للمرضى في السعودية والأردن وكافة الدول. بعد اختيار الوقت المناسب وتعبئة بياناتك، تُرسل التفاصيل مباشرة عبر واتساب السعودية (+966570117358) أو واتساب الأردن (+962785483349) والبريد الإلكتروني للطبيب.',
      en: 'Appointments on the platform are booked exclusively for Online Medical Consultations without requiring account login, serving patients in Saudi Arabia, Jordan, and worldwide. After selecting a slot and entering your details, your booking is dispatched via Saudi WhatsApp (+966570117358), Jordan WhatsApp (+962785483349), and email.',
    },
  },
  {
    id: 'faq-chronic-followup',
    question: {
      ar: 'كم مرة يُنصح بمتابعة السكري وارتفاع ضغط الدم والكوليسترول؟',
      en: 'How often should diabetes, high blood pressure, and cholesterol be followed up?',
    },
    answer: {
      ar: 'يُنصح عادة بالمراجعة كل 3 أشهر عند استقرار السكر التراكمي (HbA1c) وضغط الدم، أو كل 2 إلى 4 أسابيع عند تعديل الجرعات الدوائية حتى الوصول للمستهدف الآمن وحماية القلب والكلى والشبكية.',
      en: 'Follow-up is typically recommended every 3 months once HbA1c, blood pressure, and lipids are stable, or every 2 to 4 weeks during medication adjustments to protect cardiovascular, renal, and retinal health.',
    },
  },
  {
    id: 'faq-periodic-fasting',
    question: {
      ar: 'ما التحاليل الأساسية في الفحص الدوري السنوي وهل يتطلب صياماً؟',
      en: 'What is included in an annual periodic checkup and is fasting required?',
    },
    answer: {
      ar: 'تُحدد الفحوصات وفق العمر والتاريخ العائلي وتشمل عادة صورة الدم، سكر الصائم والتراكمي، الدهون الثلاثية والكوليسترول، وظائف الكلى والكبد، الغدة الدرقية، وفيتامين د. يُفضل الصيام 8–10 ساعات مع شرب الماء فقط قبل فحص الصائم والدهون.',
      en: 'Annual checkups are tailored to age and family history, typically covering CBC, fasting glucose/HbA1c, lipid panel, kidney and liver function, thyroid, and Vitamin D. Fasting for 8–10 hours with water only is advised for glucose and triglyceride tests.',
    },
  },
  {
    id: 'faq-lab-interpretation',
    question: {
      ar: 'هل يمكنني إرسال نتائج تحاليل أو أشعة لتفسيرها عبر الاستشارة عن بعد؟',
      en: 'Can I book an online consultation to interpret lab tests or radiology reports?',
    },
    answer: {
      ar: 'نعم، تتوفر خدمة تفسير نتائج الفحوصات عن بعد لقراءة تحاليل الدم والأشعة التي أجريتها في أي مختبر أو مستشفى معتمد، وربطها بأعراضك الفعلية مع خطة واضحة للخطوة التالية.',
      en: 'Yes. Through Remote Lab Interpretation, Dr. Motasem reviews accredited blood tests and imaging reports from any laboratory or hospital, explains them in clinical context, and outlines clear next steps.',
    },
  },
  {
    id: 'faq-child-fever',
    question: {
      ar: 'هل كل ارتفاع في حرارة الطفل يستدعي تناول مضاد حيوي؟',
      en: 'Does every childhood fever require an antibiotic?',
    },
    answer: {
      ar: 'لا، أكثر من 80% من حالات الحمى والتهابات الجهاز التنفسي العلوي عند الأطفال سببها فيروسات تتحسن بالرعاية الداعمة وخافضات الحرارة المحسوبة بالوزن، ولا يُوصف المضاد الحيوي إلا بعد التأكد سريرياً من وجود عدوى بكتيرية.',
      en: 'No. Over 80% of childhood fevers and upper respiratory infections are viral and resolve with supportive care and weight-based antipyretics; antibiotics are prescribed only when bacterial infection is clinically confirmed.',
    },
  },
];
