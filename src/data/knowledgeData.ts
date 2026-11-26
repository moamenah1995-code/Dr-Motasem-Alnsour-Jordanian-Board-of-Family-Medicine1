import type {KnowledgeCategory, MedicalArticle} from '../types/medical';

export const KNOWLEDGE_CATEGORIES: KnowledgeCategory[] = [
  {
    id: 'general-health',
    name: {ar: 'الصحة العامة', en: 'General Health'},
    description: {ar: 'أساسيات العافية اليومية، المناعة، وإدارة الإجهاد.', en: 'Daily wellness foundations, immunity, and fatigue evaluation.'},
  },
  {
    id: 'diabetes',
    name: {ar: 'السكري', en: 'Diabetes'},
    description: {ar: 'الوقاية من السكري، قراءة السكر التراكمي، وضبط الغذاء.', en: 'Diabetes prevention, HbA1c interpretation, and glycemic control.'},
  },
  {
    id: 'hypertension',
    name: {ar: 'ارتفاع الضغط', en: 'Hypertension'},
    description: {ar: 'القياس المنزلي الصحيح للضغط وحماية الشرايين والكلى.', en: 'Accurate home blood pressure monitoring and vascular protection.'},
  },
  {
    id: 'heart-health',
    name: {ar: 'صحة القلب', en: 'Heart Health'},
    description: {ar: 'إدارة الكوليسترول، العلامات التحذيرية، والوقاية القلبية.', en: 'Cholesterol balance, cardiac warning signs, and heart prevention.'},
  },
  {
    id: 'obesity',
    name: {ar: 'السمنة', en: 'Obesity'},
    description: {ar: 'فهم مقاومة الإنسولين، مؤشر الكتلة، وإدارة الوزن طبياً.', en: 'Understanding insulin resistance, BMI, and medical weight care.'},
  },
  {
    id: 'nutrition',
    name: {ar: 'التغذية', en: 'Nutrition'},
    description: {ar: 'التغذية المتوازنة، تصحيح نقص الفيتامينات، وتغذية الأسرة.', en: 'Balanced clinical nutrition, micronutrients, and family meals.'},
  },
  {
    id: 'child-health',
    name: {ar: 'صحة الأطفال', en: 'Child Health'},
    description: {ar: 'الحمى، التهابات الأطفال، النمو، والتربية الصحية.', en: 'Childhood fever, infections, growth milestones, and healthy habits.'},
  },
  {
    id: 'womens-health',
    name: {ar: 'صحة المرأة', en: 'Women’s Health'},
    description: {ar: 'فقر الدم، الغدة الدرقية، وصحة العظام عبر مراحل العمر.', en: 'Anemia, thyroid balance, and preventive screening across life stages.'},
  },
  {
    id: 'mental-health',
    name: {ar: 'الصحة النفسية', en: 'Mental Health'},
    description: {ar: 'القلق، الاحتراق الوظيفي، جودة النوم، والصحة الجسدية.', en: 'Stress, burnout, sleep hygiene, and mind-body wellness.'},
  },
  {
    id: 'prevention',
    name: {ar: 'الوقاية', en: 'Prevention'},
    description: {ar: 'استراتيجيات الكشف المبكر وتقليل عوامل الخطورة المزمنة.', en: 'Early risk reduction and evidence-based preventive strategies.'},
  },
  {
    id: 'vaccinations',
    name: {ar: 'التطعيمات', en: 'Vaccinations'},
    description: {ar: 'لقاحات الأطفال، البالغين، كبار السن، والمسافرين.', en: 'Pediatric, adult, senior, and travel immunization schedules.'},
  },
  {
    id: 'periodic-checkups',
    name: {ar: 'الفحوصات الدورية', en: 'Periodic Checkups'},
    description: {ar: 'متى تُجرى التحاليل السنوية وكيف تُقرأ نتائجها بعلمية.', en: 'When to schedule annual labs and how to interpret results.'},
  },
  {
    id: 'family-medicine',
    name: {ar: 'طب الأسرة', en: 'Family Medicine'},
    description: {ar: 'دور طبيب الأسرة في تنسيق الرعاية ومنع تداخل الأدوية.', en: 'How family medicine coordinates care and prevents polypharmacy.'},
  },
];

export const MEDICAL_ARTICLES: MedicalArticle[] = [
  {
    id: 'art-fatigue-causes',
    categoryId: 'general-health',
    featured: true,
    readTimeMinutes: 5,
    publishedDate: '2026-10-12',
    title: {
      ar: 'الإرهاق المستمر: 7 أسباب طبية شائعة يتأكد منها طبيب الأسرة',
      en: 'Persistent Fatigue: 7 Medical Causes Your Family Physician Evaluates',
    },
    summary: {
      ar: 'متى يكون التعب مجرد قلة نوم، ومتى يشير إلى فقر الدم أو خمول الغدة الدرقية أو نقص فيتامين د؟',
      en: 'Distinguishing routine tiredness from anemia, hypothyroidism, sleep apnea, and vitamin deficiencies.',
    },
    sections: [
      {
        heading: {ar: 'لماذا لا يجب تجاهل الإرهاق المزمن؟', en: 'Why Persistent Fatigue Deserves Structured Evaluation'},
        body: {
          ar: 'الإرهاق العابر بعد أسبوع عمل شاق أمر طبيعي، لكن استمرار التعب لأكثر من 3–4 أسابيع رغم النوم الكافي يستدعي تقييماً سريرياً منظماً في عيادة طب الأسرة.',
          en: 'Brief tiredness after a demanding week is expected, yet fatigue lasting beyond 3–4 weeks despite adequate rest warrants a structured family medicine workup.',
        },
      },
      {
        heading: {ar: 'أبرز الأسباب القابلة للعلاج', en: 'Common Treatable Root Causes'},
        body: {
          ar: 'تشمل الأسباب الأكثر شيوعاً نقص مخزون الحديد (الفيريتين)، خمول الغدة الدرقية، نقص فيتامين ب12 أو فيتامين د، اضطرابات سكر الدم، وتوقف التنفس أثناء النوم.',
          en: 'Frequent reversible causes include low ferritin (iron stores), hypothyroidism, vitamin B12 or D deficiency, early glycemic dysregulation, and obstructive sleep apnea.',
        },
      },
    ],
    keyTakeaways: [
      {ar: 'اطلب فحوصات موجهة بدلاً من تناول مكملات عشوائية.', en: 'Get targeted lab testing before starting random supplements.'},
      {ar: 'راجع جودة نومك وضغوطك النفسية مع طبيب الأسرة.', en: 'Evaluate sleep quality and stress load alongside blood markers.'},
    ],
    relatedArticleIds: ['art-annual-labs', 'art-womens-anemia'],
    recommendedServiceId: 'general-consultations',
  },
  {
    id: 'art-hydration-immunity',
    categoryId: 'general-health',
    readTimeMinutes: 4,
    publishedDate: '2026-09-20',
    title: {
      ar: 'الترطيب السليم وصحة المناعة في المناخ الحار',
      en: 'Smart Hydration & Everyday Immune Resilience in Warm Climates',
    },
    summary: {
      ar: 'دليل عملي لتوازن السوائل والأملاح والوقاية من الجفاف الصامت والصداع.',
      en: 'Practical guidance on fluid balance, electrolytes, and preventing silent dehydration headaches.',
    },
    sections: [
      {
        heading: {ar: 'علامات الجفاف الخفيف', en: 'Recognizing Subtle Dehydration'},
        body: {
          ar: 'في أجواء الرياض والأردن صيفاً قد يظهر الجفاف على شكل صداع ظهري، تراجع التركيز، أو خفقان خفيف قبل الشعور بالعطش الشديد.',
          en: 'In warm climates across Riyadh and Jordan, mild dehydration often presents as afternoon headaches, reduced focus, or mild dizziness before intense thirst appears.',
        },
      },
    ],
    keyTakeaways: [
      {ar: 'راقب لون البول كأبسط مؤشر يومي للترطيب.', en: 'Pale straw-colored urine is a reliable daily hydration indicator.'},
    ],
    relatedArticleIds: ['art-fatigue-causes', 'art-mediterranean-plate'],
    recommendedServiceId: 'general-consultations',
  },
  {
    id: 'art-hba1c-prediabetes',
    categoryId: 'diabetes',
    featured: true,
    readTimeMinutes: 6,
    publishedDate: '2026-10-28',
    title: {
      ar: 'مقدمات السكري والسكر التراكمي HbA1c: فرصتك الذهبية للوقاية',
      en: 'Prediabetes & HbA1c: Your Window to Reverse Risk Before Type 2 Diabetes',
    },
    summary: {
      ar: 'كيف تقرأ نتيجة السكر التراكمي بين 5.7% و6.4%، وما الخطوات المثبتة علمياً لإعادته للمعدل الطبيعي.',
      en: 'Understanding an HbA1c between 5.7% and 6.4% and proven lifestyle interventions to restore normal glucose.',
    },
    sections: [
      {
        heading: {ar: 'ماذا يعني السكر التراكمي؟', en: 'What HbA1c Actually Measures'},
        body: {
          ar: 'يعكس السكر التراكمي متوسط مستوى السكر في الدم خلال آخر 3 أشهر. النطاق الطبيعي أقل من 5.7%، ومقدمات السكري بين 5.7% و6.4%، بينما يشخص السكري عند 6.5% فأعلى.',
          en: 'HbA1c reflects your 3-month average blood sugar. Normal is below 5.7%, prediabetes spans 5.7%–6.4%, and diabetes is diagnosed at 6.5% or higher.',
        },
      },
      {
        heading: {ar: 'التدخل المبكر يغيّر المسار', en: 'Early Action Reverses Progression'},
        body: {
          ar: 'خسارة 5–7% من وزن الجسم مع المشي 150 دقيقة أسبوعياً وتقليل السكريات السائلة يخفض خطر التحول إلى السكري بنسبة تصل إلى 58%.',
          en: 'Losing 5–7% of body weight paired with 150 minutes of weekly brisk walking reduces progression to type 2 diabetes by up to 58%.',
        },
      },
    ],
    keyTakeaways: [
      {ar: 'مقدمات السكري حالة صامتة لا تسبب أعراضاً واضحة غالباً.', en: 'Prediabetes is typically silent—screening catches it early.'},
      {ar: 'المتابعة كل 3–6 أشهر تحمي القلب والكلى والأعصاب.', en: '3–6 month monitoring protects vascular and renal health.'},
    ],
    relatedArticleIds: ['art-diabetes-complications', 'art-insulin-resistance'],
    recommendedServiceId: 'chronic-disease-management',
  },
  {
    id: 'art-diabetes-complications',
    categoryId: 'diabetes',
    readTimeMinutes: 5,
    publishedDate: '2026-09-14',
    title: {
      ar: 'الفحوصات السنوية الخمسة الضرورية لكل مريض سكري',
      en: 'Five Essential Annual Checks Every Person With Diabetes Needs',
    },
    summary: {
      ar: 'حماية الشبكية، الكلى، القدمين، الدهون، وضغط الدم ضمن خطة سنوية منظمة.',
      en: 'Protecting eyes, kidneys, feet, lipids, and blood pressure through a yearly preventive checklist.',
    },
    sections: [
      {
        heading: {ar: 'ما وراء قياس السكر اليومي', en: 'Beyond Daily Glucose Readings'},
        body: {
          ar: 'نجاح متابعة السكري لا يقتصر على رقم الصائم، بل يشمل فحص الزلال الدقيق في البول، قاع العين، الأعصاب الطرفية للقدمين، والدهون الضارة LDL.',
          en: 'Optimal diabetes care goes beyond fasting glucose to include urine microalbumin, dilated retinal exams, foot sensation checks, and LDL cholesterol targets.',
        },
      },
    ],
    keyTakeaways: [
      {ar: 'الكشف المبكر عن زلال البول يمنع تدهور وظائف الكلى.', en: 'Early urine microalbumin testing preserves kidney function.'},
    ],
    relatedArticleIds: ['art-hba1c-prediabetes', 'art-home-bp'],
    recommendedServiceId: 'chronic-disease-management',
  },
  {
    id: 'art-home-bp',
    categoryId: 'hypertension',
    featured: true,
    readTimeMinutes: 5,
    publishedDate: '2026-10-19',
    title: {
      ar: 'الطريقة الطبية الصحيحة لقياس ضغط الدم في المنزل',
      en: 'How to Measure Blood Pressure Accurately at Home',
    },
    summary: {
      ar: 'أخطاء شائعة ترفع قراءة الضغط بمقدار 10–15 ملم زئبق، وكيفية تسجيل سجل موثوق لطبيبك.',
      en: 'Common mistakes that falsely elevate readings by 10–15 mmHg and how to build a reliable log.',
    },
    sections: [
      {
        heading: {ar: 'قواعد القياس الخمس قبل الضغط على زر البدء', en: 'Five Pre-Measurement Rules'},
        body: {
          ar: 'اجلس بهدوء 5 دقائق والظهر مسنود والقدمان على الأرض، وتجنب القهوة والتدخين قبلها بنصف ساعة، وضع الكفة على الذراع العارية بمستوى القلب.',
          en: 'Rest quietly for 5 minutes with back supported and feet flat, avoid caffeine/nicotine for 30 minutes prior, and place the cuff on bare skin at heart level.',
        },
      },
    ],
    keyTakeaways: [
      {ar: 'سجّل متوسط قراءتين صباحاً ومساءً لمدة أسبوع قبل الزيارة.', en: 'Log morning and evening averages for 7 days before your visit.'},
    ],
    relatedArticleIds: ['art-cholesterol-heart', 'art-diabetes-complications'],
    recommendedServiceId: 'chronic-disease-management',
  },
  {
    id: 'art-silent-hypertension',
    categoryId: 'hypertension',
    readTimeMinutes: 4,
    publishedDate: '2026-08-30',
    title: {
      ar: 'لماذا يُسمى ارتفاع الضغط بالقاتل الصامت ومتى يستدعي العلاج؟',
      en: 'Understanding Silent Hypertension & Modern Blood Pressure Targets',
    },
    summary: {
      ar: 'الاعتماد على الصداع كعلامة لارتفاع الضغط خطأ شائع؛ تعرّف على الأرقام المستهدفة لحماية الدماغ والقلب.',
      en: 'Relying on headaches is misleading—learn evidence-based BP thresholds that safeguard brain and heart.',
    },
    sections: [
      {
        heading: {ar: 'لا تنتظر الأعراض', en: 'Do Not Wait for Symptoms'},
        body: {
          ar: 'معظم المصابين بارتفاع الضغط لا يشعرون بأي صداع أو دوار، لذا يوصى بقياس الضغط سنوياً على الأقل لكل بالغ.',
          en: 'Most people with elevated blood pressure feel completely well, making annual screening essential for every adult.',
        },
      },
    ],
    keyTakeaways: [
      {ar: 'خفض الملح وزيادة البوتاسيوم الطبيعي من الخضروات يخفض الضغط بوضوح.', en: 'Sodium reduction and potassium-rich foods meaningfully lower BP.'},
    ],
    relatedArticleIds: ['art-home-bp', 'art-cholesterol-heart'],
    recommendedServiceId: 'periodic-checkups',
  },
  {
    id: 'art-cholesterol-heart',
    categoryId: 'heart-health',
    readTimeMinutes: 6,
    publishedDate: '2026-10-05',
    title: {
      ar: 'فهم تحليل الدهون: الكوليسترول الضار LDL والنافع HDL والدهون الثلاثية',
      en: 'Decoding Your Lipid Panel: LDL, HDL, and Triglycerides Explained',
    },
    summary: {
      ar: 'لماذا لا يكفي النظر للرقم الكلي للكوليسترول، وكيف يحدد الطبيب حاجتك للعلاج الوقائي.',
      en: 'Why total cholesterol alone is incomplete and how physicians calculate true cardiovascular risk.',
    },
    sections: [
      {
        heading: {ar: 'تقييم الخطورة الشاملة لا الرقم المنفرد', en: 'Treating Overall Risk, Not a Single Number'},
        body: {
          ar: 'يُقرأ الكوليسترول الضار LDL بالتوازي مع العمر، ضغط الدم، السكري، والتدخين لتقدير الخطورة القلبية خلال 10 سنوات.',
          en: 'LDL levels are interpreted alongside age, blood pressure, diabetes status, and smoking to estimate 10-year cardiovascular risk.',
        },
      },
    ],
    keyTakeaways: [
      {ar: 'الدهون الثلاثية المرتفعة تستجيب سريعاً لتقليل السكريات والكربوهيدرات المكررة.', en: 'Triglycerides drop rapidly when refined sugars are reduced.'},
    ],
    relatedArticleIds: ['art-home-bp', 'art-annual-labs'],
    recommendedServiceId: 'preventive-screenings',
  },
  {
    id: 'art-chest-pain-triage',
    categoryId: 'heart-health',
    readTimeMinutes: 4,
    publishedDate: '2026-09-02',
    title: {
      ar: 'ألم الصدر: متى يكون عضلياً أو هضمياً ومتى يستدعي الطوارئ فوراً؟',
      en: 'Chest Discomfort: Distinguishing Musculoskeletal vs. Urgent Cardiac Signs',
    },
    summary: {
      ar: 'دليل سريع للتفريق بين الأسباب الحميدة وعلامات الإنذار القلبي التي لا تحتمل التأجيل.',
      en: 'A practical safety guide to recognizing cardiac red flags that require immediate emergency evaluation.',
    },
    sections: [
      {
        heading: {ar: 'علامات الإنذار الفورية', en: 'Immediate Red Flags'},
        body: {
          ar: 'أي ألم ضاغط في منتصف الصدر يمتد للذراع الأيسر أو الفك أو الظهر ويرافقه تعرق بارد أو ضيق نفس يستدعي التوجه للطوارئ فوراً.',
          en: 'Pressure-like central chest pain radiating to the arm, jaw, or back with cold sweats or shortness of breath requires immediate emergency care.',
        },
      },
    ],
    keyTakeaways: [
      {ar: 'لا تقُد سيارتك بنفسك عند الاشتباه بألم قلبي حاد.', en: 'Never drive yourself when acute cardiac symptoms are suspected.'},
    ],
    relatedArticleIds: ['art-cholesterol-heart', 'art-urgent-vs-er'],
    recommendedServiceId: 'urgent-clinic',
  },
  {
    id: 'art-insulin-resistance',
    categoryId: 'obesity',
    readTimeMinutes: 5,
    publishedDate: '2026-10-10',
    title: {
      ar: 'مقاومة الإنسولين والسمنة الحشوية: كيف نكسر الحلقة بأسلوب طبي آمن؟',
      en: 'Insulin Resistance & Visceral Weight: Breaking the Cycle Medically',
    },
    summary: {
      ar: 'العلاقة بين محيط الخصر، جودة النوم، البروتين الكافي، وبرامج إدارة الوزن تحت إشراف طبيب الأسرة.',
      en: 'How waist circumference, sleep, protein intake, and physician-led care address metabolic weight gain.',
    },
    sections: [
      {
        heading: {ar: 'ليست معادلة سعرات فقط', en: 'More Than Just Willpower'},
        body: {
          ar: 'الهرمونات الأيضية ومقاومة الإنسولين واضطراب النوم تلعب دوراً محورياً في ثبات الوزن وصعوبة نزوله بالطرق القاسية.',
          en: 'Metabolic hormones, insulin resistance, and sleep deprivation strongly influence weight retention and rebound after crash diets.',
        },
      },
    ],
    keyTakeaways: [
      {ar: 'الهدف الصحي هو فقدان دهون مستدام مع الحفاظ على الكتلة العضلية.', en: 'Sustainable fat loss while preserving lean muscle is the clinical priority.'},
    ],
    relatedArticleIds: ['art-hba1c-prediabetes', 'art-mediterranean-plate'],
    recommendedServiceId: 'preventive-programs',
  },
  {
    id: 'art-bmi-waist-ratio',
    categoryId: 'obesity',
    readTimeMinutes: 4,
    publishedDate: '2026-08-22',
    title: {
      ar: 'مؤشر كتلة الجسم BMI ومحيط الخصر: أيهما أدق لصحة القلب؟',
      en: 'BMI vs. Waist Circumference: What Matters Most for Metabolic Health?',
    },
    summary: {
      ar: 'لماذا يجمع الأطباء بين مؤشر الكتلة وقياس محيط الخصر لتقييم الدهون الحشوية بدقة.',
      en: 'Why clinicians combine BMI with waist circumference to assess true visceral fat risk.',
    },
    sections: [
      {
        heading: {ar: 'قراءة متوازنة للأرقام', en: 'Interpreting Both Metrics Together'},
        body: {
          ar: 'قد يمتلك رياضي مؤشر كتلة مرتفعاً بسبب العضلات، بينما قد يعاني شخص بوزن طبيعي من دهون حشوية حول الخصر، لذا نقيّم المؤشرين معاً.',
          en: 'Athletes may have elevated BMI from muscle mass, while normal-weight adults can carry visceral fat—combining both metrics improves accuracy.',
        },
      },
    ],
    keyTakeaways: [
      {ar: 'استخدم اختبار السمنة ومؤشر الكتلة التفاعلي في الموقع لتقييم حالتك.', en: 'Try our interactive BMI & Obesity Assessment to check your baseline.'},
    ],
    relatedArticleIds: ['art-insulin-resistance', 'art-hba1c-prediabetes'],
    recommendedServiceId: 'preventive-programs',
  },
  {
    id: 'art-mediterranean-plate',
    categoryId: 'nutrition',
    readTimeMinutes: 5,
    publishedDate: '2026-10-01',
    title: {
      ar: 'نموذج الطبق المتوازن: دليل التغذية اليومية للأسرة العربية',
      en: 'The Balanced Clinical Plate: Practical Daily Nutrition for Families',
    },
    summary: {
      ar: 'توزيع ذكي للألياف والبروتين والدهون الصحية في وجباتنا التقليدية دون حرمان.',
      en: 'Structuring fiber, protein, and healthy fats within everyday Middle Eastern family meals.',
    },
    sections: [
      {
        heading: {ar: 'قاعدة النصف والربعين', en: 'Half Vegetables, Quarter Protein, Quarter Whole Grains'},
        body: {
          ar: 'اجعل نصف الطبق خضروات وسلطة، وربعاً للبروتين المشوي أو البقوليات، وربعاً للنشويات المعقدة مع زيت الزيتون البكر.',
          en: 'Fill half the plate with non-starchy vegetables, one quarter with lean protein or legumes, and one quarter with whole grains plus olive oil.',
        },
      },
    ],
    keyTakeaways: [
      {ar: 'تجنب المشروبات المحلاة يحسن السكر والوزن خلال أسابيع.', en: 'Eliminating sugary beverages improves glucose and energy within weeks.'},
    ],
    relatedArticleIds: ['art-vitamin-d-b12', 'art-insulin-resistance'],
    recommendedServiceId: 'preventive-programs',
  },
  {
    id: 'art-vitamin-d-b12',
    categoryId: 'nutrition',
    readTimeMinutes: 4,
    publishedDate: '2026-09-09',
    title: {
      ar: 'نقص فيتامين د وفيتامين ب12 في الخليج والأردن: الجرعات الآمنة والمتابعة',
      en: 'Vitamin D & B12 Deficiencies: Safe Supplementation & Lab Follow-Up',
    },
    summary: {
      ar: 'لماذا ينتشر نقص فيتامين د رغم وفرة الشمس، ومتى يجب إعادة الفحص لتجنب الجرعات الزائدة.',
      en: 'Why vitamin D deficiency remains widespread in sunny regions and how to dose safely.',
    },
    sections: [
      {
        heading: {ar: 'المكملات المبنية على التحليل', en: 'Lab-Guided Supplementation'},
        body: {
          ar: 'الجرعات العلاجية العالية من فيتامين د تُؤخذ لفترة محددة فقط تليها جرعة وقائية، مع مراعاة عدم تجاوز الحدود الآمنة.',
          en: 'High-dose repletion regimens should run for a defined duration before stepping down to maintenance doses confirmed by follow-up labs.',
        },
      },
    ],
    keyTakeaways: [
      {ar: 'مستخدمو دواء الميتفورمين للسكري أكثر عرضة لنقص فيتامين ب12.', en: 'Long-term metformin users benefit from periodic vitamin B12 checks.'},
    ],
    relatedArticleIds: ['art-fatigue-causes', 'art-womens-anemia'],
    recommendedServiceId: 'lab-results-interpretation',
  },
  {
    id: 'art-child-fever',
    categoryId: 'child-health',
    featured: true,
    readTimeMinutes: 5,
    publishedDate: '2026-10-24',
    title: {
      ar: 'التعامل الطبي الآمن مع ارتفاع حرارة الطفل ومتى تزور الطبيب',
      en: 'Managing Childhood Fever Safely: Evidence-Based Guide for Parents',
    },
    summary: {
      ar: 'الحمى عرض وليست مرضاً بحد ذاتها؛ تعرّف على الجرعات الدقيقة حسب الوزن وعلامات الخطر.',
      en: 'Understanding fever as an immune response, weight-based dosing, and pediatric red flags.',
    },
    sections: [
      {
        heading: {ar: 'تحديد الجرعة بالوزن لا بالعمر', en: 'Dose by Weight, Not Age'},
        body: {
          ar: 'استخدم خافضات الحرارة بجرعة محسوبة على وزن الطفل بالكيلوجرام، وتجنب الكمادات بالماء المثلج أو الكحول.',
          en: 'Always calculate pediatric antipyretic doses using body weight in kilograms, and avoid ice-cold baths or alcohol rubs.',
        },
      },
    ],
    keyTakeaways: [
      {ar: 'أي حرارة فوق 38°م لدى رضيع عمره أقل من 3 أشهر تتطلب تقييماً فورياً.', en: 'Any fever ≥38°C in an infant under 3 months requires immediate medical care.'},
    ],
    relatedArticleIds: ['art-antibiotic-stewardship', 'art-child-vaccines'],
    recommendedServiceId: 'child-health',
  },
  {
    id: 'art-antibiotic-stewardship',
    categoryId: 'child-health',
    readTimeMinutes: 4,
    publishedDate: '2026-09-18',
    title: {
      ar: 'متى يحتاج الطفل مضاداً حيوياً ومتى يضره؟',
      en: 'When Children Need Antibiotics—and When Viral Care Is Safer',
    },
    summary: {
      ar: 'الفرق بين الالتهاب الفيروسي والبكتيري في التهاب الحلق والأذن للحفاظ على مناعة طفلك.',
      en: 'Distinguishing viral colds from bacterial infections to protect your child’s microbiome and immunity.',
    },
    sections: [
      {
        heading: {ar: 'المقاومة البكتيرية تبدأ بالاستخدام العشوائي', en: 'Preventing Antibiotic Resistance'},
        body: {
          ar: 'أكثر من 80% من التهابات الجهاز التنفسي العلوي لدى الأطفال سببها فيروسات لا تستجيب للمضاد الحيوي.',
          en: 'Over 80% of upper respiratory infections in children are viral and improve without antibiotics.',
        },
      },
    ],
    keyTakeaways: [
      {ar: 'أكمل مدة المضاد الموصوف فقط عند ثبوت الحاجة السريرية.', en: 'Complete prescribed antibiotics strictly when clinically indicated.'},
    ],
    relatedArticleIds: ['art-child-fever', 'art-child-vaccines'],
    recommendedServiceId: 'child-health',
  },
  {
    id: 'art-womens-anemia',
    categoryId: 'womens-health',
    readTimeMinutes: 5,
    publishedDate: '2026-10-08',
    title: {
      ar: 'نقص الحديد والفيريتين عند النساء: لماذا لا يكفي فحص الهيموجلوبين وحده؟',
      en: 'Iron Deficiency & Ferritin in Women: Beyond Hemoglobin Alone',
    },
    summary: {
      ar: 'كيف يؤدي انخفاض مخزون الحديد إلى تساقط الشعر والخفقان والتعب حتى قبل ظهور فقر الدم الواضح.',
      en: 'How depleted ferritin causes hair loss and fatigue even before hemoglobin drops below normal.',
    },
    sections: [
      {
        heading: {ar: 'مخزون الحديد هو المقياس المبكر', en: 'Ferritin Reflects True Iron Stores'},
        body: {
          ar: 'يمكن أن يكون الهيموجلوبين طبيعياً بينما مخزون الحديد (Ferritin) منخفضاً، مما يفسر الإرهاق المزمن لدى كثير من السيدات.',
          en: 'Hemoglobin can remain borderline-normal while ferritin is depleted, explaining persistent fatigue and hair shedding.',
        },
      },
    ],
    keyTakeaways: [
      {ar: 'تناول مكمل الحديد مع فيتامين C وبعيداً عن الشاي والقهوة بساعتين.', en: 'Pair iron supplements with vitamin C and separate from tea or coffee by 2 hours.'},
    ],
    relatedArticleIds: ['art-thyroid-women', 'art-fatigue-causes'],
    recommendedServiceId: 'womens-health',
  },
  {
    id: 'art-thyroid-women',
    categoryId: 'womens-health',
    readTimeMinutes: 5,
    publishedDate: '2026-08-27',
    title: {
      ar: 'اضطرابات الغدة الدرقية: الأعراض الصامتة وطريقة المتابعة المخبرية',
      en: 'Thyroid Disorders in Women: Recognizing Subtle Signs & Lab Monitoring',
    },
    summary: {
      ar: 'الفرق بين خمول الغدة ونشاطها، وكيفية ضبط جرعة الهرمون التعويضي بدقة.',
      en: 'Hypothyroidism vs. hyperthyroidism symptoms and how TSH monitoring guides steady hormone balance.',
    },
    sections: [
      {
        heading: {ar: 'أعراض تتشابه مع ضغوط الحياة', en: 'Symptoms Often Mistaken for Stress'},
        body: {
          ar: 'زيادة الوزن غير المبررة، الشعور بالبرد، جفاف الجلد، أو الخفقان واضطراب الدورة قد تكون مؤشرات مبكرة لاضطراب الغدة الدرقية.',
          en: 'Unexplained weight shifts, cold intolerance, dry skin, palpitations, or cycle irregularities may signal thyroid imbalance.',
        },
      },
    ],
    keyTakeaways: [
      {ar: 'تُؤخذ حبة الغدة الدرقية صباحاً على معدة فارغة قبل الإفطار بـ 45 دقيقة.', en: 'Take levothyroxine on an empty stomach 45 minutes before breakfast.'},
    ],
    relatedArticleIds: ['art-womens-anemia', 'art-annual-labs'],
    recommendedServiceId: 'womens-health',
  },
  {
    id: 'art-sleep-hygiene',
    categoryId: 'mental-health',
    readTimeMinutes: 5,
    publishedDate: '2026-10-15',
    title: {
      ar: 'علم جودة النوم: 6 خطوات طبية للتغلب على الأرق وتحسين التركيز',
      en: 'Sleep Architecture & Hygiene: 6 Clinical Steps to Overcome Insomnia',
    },
    summary: {
      ar: 'العلاقة الوثيقة بين قلة النوم وارتفاع الضغط والسكر، وبروتوكول عملي لإعادة ضبط الساعة البيولوجية.',
      en: 'How restorative sleep lowers blood pressure and improves metabolic and emotional resilience.',
    },
    sections: [
      {
        heading: {ar: 'لماذا يهمك النوم في طب الأسرة؟', en: 'Why Sleep Is a Vital Sign'},
        body: {
          ar: 'النوم أقل من 6 ساعات يرفع هرمون الكورتيزول ويزيد الشهية للسكريات ويرفع ضغط الدم الصباحي.',
          en: 'Sleeping under 6 hours elevates cortisol, increases glucose cravings, and drives higher morning blood pressure.',
        },
      },
    ],
    keyTakeaways: [
      {ar: 'ثبّت ساعة الاستيقاظ يومياً وأوقف الكافيين قبل النوم بـ 8 ساعات.', en: 'Keep a fixed wake time daily and stop caffeine 8 hours before bed.'},
    ],
    relatedArticleIds: ['art-burnout-stress', 'art-fatigue-causes'],
    recommendedServiceId: 'general-consultations',
  },
  {
    id: 'art-burnout-stress',
    categoryId: 'mental-health',
    readTimeMinutes: 5,
    publishedDate: '2026-09-12',
    title: {
      ar: 'الاحتراق الوظيفي والقلق الجسدي: متى تنعكس الضغوط على المعدة والقلب؟',
      en: 'Workplace Burnout & Somatic Stress: When Pressure Affects Body Systems',
    },
    summary: {
      ar: 'التفريق الطبي بين الأعراض النفسجسدية والأمراض العضوية دون إهمال أي منهما.',
      en: 'Evaluating stress-related palpitations and gut symptoms while ruling out organic causes.',
    },
    sections: [
      {
        heading: {ar: 'الصحة النفسية جزء من الرعاية الأولية', en: 'Mental Health Within Primary Care'},
        body: {
          ar: 'غالباً ما تكون عيادة طب الأسرة المكان الآمن الأول لمناقشة القلق واضطراب النوم والضغط النفسي بسرية تامة.',
          en: 'Family medicine offers a confidential, stigma-free setting to address anxiety, mood shifts, and work burnout alongside physical health.',
        },
      },
    ],
    keyTakeaways: [
      {ar: 'اطلب استشارة متكاملة إذا أثّر القلق على نومك أو عملك لأكثر من أسبوعين.', en: 'Seek support if stress disrupts sleep or daily function beyond two weeks.'},
    ],
    relatedArticleIds: ['art-sleep-hygiene', 'art-fatigue-causes'],
    recommendedServiceId: 'employee-health-clinic',
  },
  {
    id: 'art-early-screening-40',
    categoryId: 'prevention',
    featured: true,
    readTimeMinutes: 6,
    publishedDate: '2026-10-22',
    title: {
      ar: 'خريطة الفحوصات الوقائية بعد سن الأربعين للرجال والنساء',
      en: 'The 40+ Preventive Screening Roadmap for Men and Women',
    },
    summary: {
      ar: 'جدول زمني واضح لفحوصات القلب والسكري والقولون والثدي وعنق الرحم والعظام.',
      en: 'A clear schedule for cardiovascular, metabolic, colorectal, breast, cervical, and bone screenings.',
    },
    sections: [
      {
        heading: {ar: 'الوقاية أسهل وأقل كلفة من العلاج المتأخر', en: 'Intercepting Disease Before Symptoms'},
        body: {
          ar: 'اكتشاف ارتفاع الضغط أو مقدمات السكري أو سلائل القولون مبكراً يمنح المريض فرصة الشفاء التام أو السيطرة الكاملة دون مضاعفات.',
          en: 'Detecting borderline blood pressure, prediabetes, or early colon polyps allows complete prevention of late complications.',
        },
      },
    ],
    keyTakeaways: [
      {ar: 'ابدأ فحص القولون المبكر عند سن 45 عاماً أو قبل ذلك بوجود تاريخ عائلي.', en: 'Begin colorectal screening at age 45, or earlier with family history.'},
    ],
    relatedArticleIds: ['art-annual-labs', 'art-smoking-cessation'],
    recommendedServiceId: 'preventive-screenings',
  },
  {
    id: 'art-smoking-cessation',
    categoryId: 'prevention',
    readTimeMinutes: 5,
    publishedDate: '2026-09-05',
    title: {
      ar: 'الإقلاع عن التدخين والفيب: ماذا يحدث لجسمك خلال أول 90 يوماً؟',
      en: 'Quitting Smoking & Vaping: What Happens in Your First 90 Days',
    },
    summary: {
      ar: 'خطة طبية مدعومة بالسلوك والبدائل الآمنة لمضاعفة فرص نجاح الإقلاع.',
      en: 'Combining behavioral coaching and medical support to double quit-success rates.',
    },
    sections: [
      {
        heading: {ar: 'الاستعانة بالطبيب تضاعف فرص النجاح', en: 'Structured Support Doubles Success'},
        body: {
          ar: 'تتحسن الدورة الدموية ووظائف الرئة خلال أسابيع قليلة من التوقف، وبمساعدة خطة طبية تقل أعراض الانسحاب بشكل ملموس.',
          en: 'Circulation and lung function improve within weeks of quitting, and medical cessation support markedly eases withdrawal.',
        },
      },
    ],
    keyTakeaways: [
      {ar: 'كل محاولة إقلاع مدروسة تقرّبك من التخلص النهائي من النيكوتين.', en: 'Each structured quit plan brings you closer to lasting freedom from nicotine.'},
    ],
    relatedArticleIds: ['art-early-screening-40', 'art-cholesterol-heart'],
    recommendedServiceId: 'preventive-programs',
  },
  {
    id: 'art-child-vaccines',
    categoryId: 'vaccinations',
    readTimeMinutes: 5,
    publishedDate: '2026-09-28',
    title: {
      ar: 'تطعيمات الأطفال الأساسية والموسمية: حماية مجتمعية وأسرية',
      en: 'Childhood & Seasonal Immunizations: Protecting Your Whole Household',
    },
    summary: {
      ar: 'أهمية الالتزام بجدول اللقاحات الوطنية وكيفية التعامل مع استكمال الجرعات الفائتة.',
      en: 'Staying on track with routine pediatric vaccines and safely catching up on missed doses.',
    },
    sections: [
      {
        heading: {ar: 'لا داعي لإعادة السلسلة من البداية', en: 'Catch-Up Schedules Are Safe and Simple'},
        body: {
          ar: 'إذا تأخر الطفل عن موعد تطعيم معين، يُستكمل الجدول من حيث توقف دون الحاجة لإعادة الجرعات السابقة.',
          en: 'If a child misses a scheduled vaccine, providers simply resume the schedule without restarting prior doses.',
        },
      },
    ],
    keyTakeaways: [
      {ar: 'احتفظ بنسخة رقمية من سجل التطعيمات لمراجعتها في كل زيارة.', en: 'Keep a digital copy of immunization records for every pediatric visit.'},
    ],
    relatedArticleIds: ['art-adult-vaccines', 'art-child-fever'],
    recommendedServiceId: 'child-health',
  },
  {
    id: 'art-adult-vaccines',
    categoryId: 'vaccinations',
    readTimeMinutes: 4,
    publishedDate: '2026-10-03',
    title: {
      ar: 'تطعيمات البالغين وكبار السن: الإنفلونزا، المكورات الرئوية، والحزام الناري',
      en: 'Essential Adult & Senior Vaccines: Influenza, Pneumococcal & Shingles',
    },
    summary: {
      ar: 'التطعيمات ليست للأطفال فقط؛ دليل وقائي لحماية كبار السن ومرضى السكري والقلب.',
      en: 'Why adult immunization protects seniors and people with diabetes, asthma, or heart disease.',
    },
    sections: [
      {
        heading: {ar: 'وقاية حاسمة لكبار السن', en: 'Crucial Protection for Seniors & Chronic Care'},
        body: {
          ar: 'يوصى بلقاح الإنفلونزا السنوي للجميع، ولقاح المكورات الرئوية والحزام الناري لكبار السن أو المصابين بأمراض مزمنة.',
          en: 'Annual influenza vaccination is advised for adults, alongside pneumococcal and shingles vaccines for older adults and chronic-care patients.',
        },
      },
    ],
    keyTakeaways: [
      {ar: 'اسأل طبيب الأسرة عن تطعيمات الحج والعمرة والسفر قبل موعد السفر بشهر.', en: 'Review travel and seasonal vaccines 4 weeks prior to departure.'},
    ],
    relatedArticleIds: ['art-child-vaccines', 'art-elderly-meds'],
    recommendedServiceId: 'elderly-health-care',
  },
  {
    id: 'art-annual-labs',
    categoryId: 'periodic-checkups',
    featured: true,
    readTimeMinutes: 5,
    publishedDate: '2026-10-17',
    title: {
      ar: 'ما التحاليل الدورية التي تحتاجها فعلاً كل عام؟ وكيف تتجنب التحاليل التسويقية؟',
      en: 'Which Annual Lab Tests Do You Actually Need? Avoiding Over-Testing',
    },
    summary: {
      ar: 'تحاليل أساسية ذات قيمة سريرية عالية مقابل باقات تجارية غير مبررة طبياً.',
      en: 'High-value evidence-based annual blood panels vs. unnecessary commercial test bundles.',
    },
    sections: [
      {
        heading: {ar: 'الجودة الطبية لا تعني كثرة الأنابيب', en: 'Clinical Precision Over Panel Size'},
        body: {
          ar: 'الباقات التي تضم 60 تحليلاً عشوائياً قد تعطي نتائج هامشية تسبب القلق، بينما يختار طبيب الأسرة التحاليل المؤثرة فعلاً في القرار الطبي.',
          en: 'Random 60-test bundles frequently generate incidental false alarms, whereas your family doctor selects biomarkers that genuinely guide health decisions.',
        },
      },
    ],
    keyTakeaways: [
      {ar: 'ناقش نتائج أي تحليل مع طبيبك قبل إجراء فحوصات إضافية.', en: 'Review every lab result in clinical context before ordering extra tests.'},
    ],
    relatedArticleIds: ['art-early-screening-40', 'art-cholesterol-heart'],
    recommendedServiceId: 'periodic-checkups',
  },
  {
    id: 'art-pre-employment-check',
    categoryId: 'periodic-checkups',
    readTimeMinutes: 4,
    publishedDate: '2026-08-19',
    title: {
      ar: 'دليل الفحص الطبي الوظيفي لعيادة الموظفين واستمرارية العطاء',
      en: 'Pre-Employment & Annual Employee Health Exams: What to Expect',
    },
    summary: {
      ar: 'أهمية تقييم اللياقة الصحية للموظفين واكتشاف عوامل الخطر المهنية مبكراً.',
      en: 'How structured occupational exams safeguard employee productivity and long-term wellbeing.',
    },
    sections: [
      {
        heading: {ar: 'صحة الموظف ركيزة الأداء', en: 'Proactive Care for Working Professionals'},
        body: {
          ar: 'يساعد الفحص الوظيفي على اكتشاف ارتفاع الضغط أو ضعف النظر أو آلام الرقبة والظهر المكتبية مبكراً قبل تأثيرها على العمل.',
          en: 'Routine employee screenings catch early hypertension, vision strain, and ergonomic spine pain before they impair daily performance.',
        },
      },
    ],
    keyTakeaways: [
      {ar: 'احرص على حركة كل 45 دقيقة أثناء العمل المكتبي.', en: 'Stand and stretch briefly every 45 minutes during desk work.'},
    ],
    relatedArticleIds: ['art-annual-labs', 'art-burnout-stress'],
    recommendedServiceId: 'employee-health-clinic',
  },
  {
    id: 'art-elderly-meds',
    categoryId: 'family-medicine',
    readTimeMinutes: 5,
    publishedDate: '2026-10-14',
    title: {
      ar: 'دور طبيب الأسرة في منع تعدد الأدوية (Polypharmacy) وحماية كبار السن',
      en: 'How Your Family Physician Prevents Medication Overload in Seniors',
    },
    summary: {
      ar: 'عندما يراجع المريض عدة عيادات قد تتراكم الوصفات المتعارضة؛ هكذا يعيد طبيب الأسرة ضبط القائمة بأمان.',
      en: 'Reconciling prescriptions from multiple clinics to eliminate side effects and drug interactions.',
    },
    sections: [
      {
        heading: {ar: 'مراجعة حقيبة الأدوية الدورية', en: 'The Annual Medication Reconciliation'},
        body: {
          ar: 'تناول أكثر من 5 أدوية يومياً يرفع احتمال الدوار والسقوط واضطراب الكلى، لذا يراجع طبيب الأسرة كل دواء ومكمل عشبي بانتظام.',
          en: 'Taking five or more daily medications increases dizziness, fall, and renal risk—making regular family physician medication audits essential.',
        },
      },
    ],
    keyTakeaways: [
      {ar: 'أحضر جميع الأدوية والمكملات في كل مراجعة دورية.', en: 'Bring all prescriptions and over-the-counter supplements to every checkup.'},
    ],
    relatedArticleIds: ['art-urgent-vs-er', 'art-adult-vaccines'],
    recommendedServiceId: 'elderly-health-care',
  },
  {
    id: 'art-urgent-vs-er',
    categoryId: 'family-medicine',
    readTimeMinutes: 4,
    publishedDate: '2026-09-25',
    title: {
      ar: 'العيادة العاجلة أم الطوارئ أم الاستشارة عن بعد؟ كيف تختار المسار الصحيح؟',
      en: 'Urgent Clinic, Emergency Room, or Telehealth? Choosing the Right Care',
    },
    summary: {
      ar: 'دليل فرز مبسط يوفر وقتك ويضمن حصولك على المستوى الطبي المناسب في اللحظة المناسبة.',
      en: 'A practical patient triage guide to getting timely care at the right clinical setting.',
    },
    sections: [
      {
        heading: {ar: 'مطابقة الأعراض مع مسار الرعاية', en: 'Matching Symptoms to the Right Setting'},
        body: {
          ar: 'الحالات الحرجة تتوجه للطوارئ فوراً، والحالات الحادة المتوسطة تناسبها العيادة العاجلة، أما المتابعات وتفسير التحاليل فتُنجز بكفاءة عبر الاستشارة عن بعد.',
          en: 'Life-threatening emergencies belong in the ER; acute moderate illnesses fit the Urgent Clinic; follow-ups and lab reviews excel via Telehealth.',
        },
      },
    ],
    keyTakeaways: [
      {ar: 'طبيب الأسرة يساعدك في الفرز المبدئي وتنسيق التحويل الدقيق عند اللزوم.', en: 'Your family physician guides safe triage and seamless specialist referrals.'},
    ],
    relatedArticleIds: ['art-chest-pain-triage', 'art-elderly-meds'],
    recommendedServiceId: 'specialist-referral',
  },
];
