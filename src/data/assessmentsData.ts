import type {AssessmentDefinition, AssessmentId, BilingualText} from '../types/medical';

export const HEALTH_ASSESSMENTS: AssessmentDefinition[] = [
  {
    id: 'diabetes-risk',
    title: {ar: 'اختبار خطر السكري', en: 'Diabetes Risk Assessment'},
    shortDesc: {
      ar: 'تقييم علمي مبني على عوامل الخطورة للسكري من النوع الثاني ومقاومة الإنسولين.',
      en: 'Evidence-based screening of metabolic and lifestyle factors for Type 2 diabetes risk.',
    },
    estimatedMinutes: 2,
    relatedArticleIds: ['art-hba1c-prediabetes', 'art-insulin-resistance'],
    recommendedServiceId: 'chronic-disease-management',
    questions: [
      {
        id: 'age',
        prompt: {ar: 'ما هي فئتك العمرية؟', en: 'What is your age group?'},
        options: [
          {label: {ar: 'أقل من 35 عاماً', en: 'Under 35 years'}, points: 0},
          {label: {ar: '35 – 44 عاماً', en: '35 – 44 years'}, points: 1},
          {label: {ar: '45 – 54 عاماً', en: '45 – 54 years'}, points: 2},
          {label: {ar: '55 عاماً فأكثر', en: '55 years or older'}, points: 3},
        ],
      },
      {
        id: 'family',
        prompt: {ar: 'هل يوجد تاريخ عائلي للسكري (الأب، الأم، الإخوة)؟', en: 'Do you have a family history of diabetes (parent or sibling)?'},
        options: [
          {label: {ar: 'لا يوجد', en: 'No family history'}, points: 0},
          {label: {ar: 'أقارب من الدرجة الثانية (جد/عم/خال)', en: 'Second-degree relative'}, points: 2},
          {label: {ar: 'أقارب من الدرجة الأولى (والدان أو إخوة)', en: 'First-degree relative (parent/sibling)'}, points: 4},
        ],
      },
      {
        id: 'waist',
        prompt: {ar: 'كيف تصف الوزن ومحيط الخصر لديك؟', en: 'How would you describe your weight and waist circumference?'},
        options: [
          {label: {ar: 'وزن طبيعي ومحيط خصر صحي', en: 'Healthy weight and waist size'}, points: 0},
          {label: {ar: 'زيادة وزن بسيطة أو امتلاء حول البطن', en: 'Mild overweight or central fullness'}, points: 2},
          {label: {ar: 'سمنة واضحة أو محيط خصر مرتفع', en: 'Obesity or elevated waist circumference'}, points: 4},
        ],
      },
      {
        id: 'activity',
        prompt: {ar: 'كم يوماً في الأسبوع تمارس نشاطاً بدنياً 30 دقيقة على الأقل؟', en: 'How many days per week do you get at least 30 minutes of physical activity?'},
        options: [
          {label: {ar: '5 أيام أو أكثر', en: '5 or more days'}, points: 0},
          {label: {ar: '2 – 4 أيام', en: '2 – 4 days'}, points: 1},
          {label: {ar: 'أقل من يومين أو خمول أغلب الأسبوع', en: 'Less than 2 days / mostly sedentary'}, points: 3},
        ],
      },
      {
        id: 'glucose_history',
        prompt: {ar: 'هل سبق وسُجل لديك ارتفاع في السكر أو ضغط الدم؟', en: 'Have you ever been told you have borderline glucose or high blood pressure?'},
        options: [
          {label: {ar: 'لا، جميع الفحوصات السابقة طبيعية', en: 'No, previous checks were normal'}, points: 0},
          {label: {ar: 'نعم، في فحص عابر أو سكري حمل سابق', en: 'Yes, borderline reading or prior gestational diabetes'}, points: 4},
        ],
      },
    ],
  },
  {
    id: 'blood-pressure',
    title: {ar: 'اختبار ضغط الدم والخطر القلبي', en: 'Blood Pressure & Vascular Risk Test'},
    shortDesc: {
      ar: 'مراجعة سريعة لقراءات الضغط، استهلاك الصوديوم، والتوتر لتقدير الحاجة للمتابعة.',
      en: 'Quick clinical review of BP habits, sodium intake, and cardiovascular warning indicators.',
    },
    estimatedMinutes: 2,
    relatedArticleIds: ['art-home-bp', 'art-silent-hypertension'],
    recommendedServiceId: 'chronic-disease-management',
    questions: [
      {
        id: 'bp_reading',
        prompt: {ar: 'ما متوسط قراءات ضغط الدم الأخيرة لديك؟', en: 'What are your recent blood pressure readings?'},
        options: [
          {label: {ar: 'أقل من 120/80 ملم زئبق', en: 'Below 120/80 mmHg'}, points: 0},
          {label: {ar: 'بين 120–139 / 80–89 ملم زئبق', en: '120–139 / 80–89 mmHg'}, points: 2},
          {label: {ar: '140/90 ملم زئبق فأعلى أو لا أتابع القياس', en: '140/90 mmHg or higher / unmonitored'}, points: 4},
        ],
      },
      {
        id: 'salt',
        prompt: {ar: 'ما مدى تناولك للأطعمة المالحة والوجبات السريعة؟', en: 'How frequent is your intake of salty or processed foods?'},
        options: [
          {label: {ar: 'نادراً، أحرص على قلة الملح', en: 'Rarely, low-sodium diet'}, points: 0},
          {label: {ar: 'أحياناً (2–3 مرات أسبوعياً)', en: 'Occasionally (2–3 times/week)'}, points: 2},
          {label: {ar: 'يومياً أو شبه يومي', en: 'Daily or nearly daily'}, points: 3},
        ],
      },
      {
        id: 'smoking',
        prompt: {ar: 'هل تدخن السجائر أو الشيشة أو الفيب؟', en: 'Do you smoke cigarettes, shisha, or vape?'},
        options: [
          {label: {ar: 'لا أدخن نهائياً', en: 'Non-smoker'}, points: 0},
          {label: {ar: 'مقلع سابقاً', en: 'Former smoker'}, points: 1},
          {label: {ar: 'مدخن حالياً', en: 'Current smoker'}, points: 4},
        ],
      },
      {
        id: 'symptoms',
        prompt: {ar: 'هل تشعر أحياناً بصداع صباحي، خفقان، أو دوار غير مفسر؟', en: 'Do you experience morning headaches, palpitations, or unexplained dizziness?'},
        options: [
          {label: {ar: 'لا', en: 'No'}, points: 0},
          {label: {ar: 'أحياناً مع الإجهاد', en: 'Occasionally with stress'}, points: 2},
          {label: {ar: 'بشكل متكرر', en: 'Frequently'}, points: 3},
        ],
      },
    ],
  },
  {
    id: 'healthy-lifestyle',
    title: {ar: 'اختبار نمط الحياة الصحي', en: 'Healthy Lifestyle Assessment'},
    shortDesc: {
      ar: 'قياس توازن التغذية، النشاط، شرب الماء، والعادات اليومية المؤثرة على المناعة.',
      en: 'Evaluates nutrition balance, daily movement, hydration, and preventive habits.',
    },
    estimatedMinutes: 2,
    relatedArticleIds: ['art-mediterranean-plate', 'art-hydration-immunity'],
    recommendedServiceId: 'preventive-programs',
    questions: [
      {
        id: 'veg',
        prompt: {ar: 'كم حصة من الخضروات والفواكه الطازجة تتناول يومياً؟', en: 'How many servings of fresh vegetables and fruit do you eat daily?'},
        options: [
          {label: {ar: '4 حصص أو أكثر يومياً', en: '4 or more servings daily'}, points: 0},
          {label: {ar: '2 – 3 حصص يومياً', en: '2 – 3 servings daily'}, points: 2},
          {label: {ar: 'حصة واحدة أو أقل', en: '1 serving or less'}, points: 4},
        ],
      },
      {
        id: 'sugar',
        prompt: {ar: 'كم مرة تتناول المشروبات الغازية أو العصائر المحلاة والحلويات؟', en: 'How often do you consume sugary drinks or pastries?'},
        options: [
          {label: {ar: 'نادراً (أقل من مرة أسبوعياً)', en: 'Rarely (<1/week)'}, points: 0},
          {label: {ar: '2 – 4 مرات أسبوعياً', en: '2 – 4 times/week'}, points: 2},
          {label: {ar: 'يومياً', en: 'Daily'}, points: 4},
        ],
      },
      {
        id: 'water',
        prompt: {ar: 'كم لتراً من الماء تشرب يومياً تقريباً؟', en: 'Approximately how much plain water do you drink daily?'},
        options: [
          {label: {ar: '2 لتر فأكثر', en: '2 liters or more'}, points: 0},
          {label: {ar: '1 – 1.5 لتر', en: '1 – 1.5 liters'}, points: 2},
          {label: {ar: 'أقل من لتر واحد', en: 'Less than 1 liter'}, points: 3},
        ],
      },
      {
        id: 'checkup',
        prompt: {ar: 'متى أجريت آخر فحص دوري شامل؟', en: 'When did you last complete a periodic preventive checkup?'},
        options: [
          {label: {ar: 'خلال آخر 12 شهراً', en: 'Within the past 12 months'}, points: 0},
          {label: {ar: 'منذ 1 – 2 سنة', en: '1 – 2 years ago'}, points: 2},
          {label: {ar: 'منذ أكثر من سنتين أو لم أقم به', en: 'Over 2 years ago or never'}, points: 3},
        ],
      },
    ],
  },
  {
    id: 'sleep-quality',
    title: {ar: 'اختبار جودة النوم', en: 'Sleep Quality Assessment'},
    shortDesc: {
      ar: 'تقييم مدة النوم، الاستيقاظ الليلي، الشخير، والنعاس النهاري.',
      en: 'Assesses sleep duration, continuity, snoring risk, and daytime alertness.',
    },
    estimatedMinutes: 2,
    relatedArticleIds: ['art-sleep-hygiene', 'art-burnout-stress'],
    recommendedServiceId: 'general-consultations',
    questions: [
      {
        id: 'hours',
        prompt: {ar: 'كم ساعة تنام فعلياً في الليلة؟', en: 'How many hours of actual sleep do you get per night?'},
        options: [
          {label: {ar: '7 – 8.5 ساعات بانتظام', en: '7 – 8.5 hours consistently'}, points: 0},
          {label: {ar: '6 – 7 ساعات', en: '6 – 7 hours'}, points: 2},
          {label: {ar: 'أقل من 6 ساعات أو نوم متقطع جداً', en: 'Under 6 hours or severely fragmented'}, points: 4},
        ],
      },
      {
        id: 'onset',
        prompt: {ar: 'هل تجد صعوبة في الدخول في النوم أو تستيقظ متكرراً ليلاً؟', en: 'Do you struggle to fall asleep or wake repeatedly during the night?'},
        options: [
          {label: {ar: 'نادراً، أنام بسهولة', en: 'Rarely, sleep comes easily'}, points: 0},
          {label: {ar: '1 – 2 ليلة أسبوعياً', en: '1 – 2 nights/week'}, points: 2},
          {label: {ar: '3 ليالٍ أو أكثر أسبوعياً', en: '3 or more nights/week'}, points: 4},
        ],
      },
      {
        id: 'snoring',
        prompt: {ar: 'هل تعاني من شخير مرتفع أو انقطاع نفس ملحوظ أثناء النوم؟', en: 'Do you experience loud snoring or witnessed breathing pauses?'},
        options: [
          {label: {ar: 'لا', en: 'No'}, points: 0},
          {label: {ar: 'شخير خفيف أحياناً', en: 'Mild occasional snoring'}, points: 1},
          {label: {ar: 'شخير مرتفع مع تعب صباحي', en: 'Loud snoring with morning fatigue'}, points: 4},
        ],
      },
      {
        id: 'screens',
        prompt: {ar: 'هل تستخدم الهاتف أو تشرب الكافيين قبل النوم بساعتين؟', en: 'Do you use bright screens or consume caffeine within 2–6 hours of bedtime?'},
        options: [
          {label: {ar: 'أتجنبهما غالباً', en: 'Mostly avoided'}, points: 0},
          {label: {ar: 'أحياناً', en: 'Occasionally'}, points: 2},
          {label: {ar: 'بشكل يومي', en: 'Daily'}, points: 3},
        ],
      },
    ],
  },
  {
    id: 'physical-fitness',
    title: {ar: 'اختبار اللياقة الصحية والنشاط', en: 'Physical Fitness & Vitality Test'},
    shortDesc: {
      ar: 'قياس التحمل البدني، ساعات الجلوس، القوة العضلية، وصحة المفاصل.',
      en: 'Measures cardiovascular stamina, sedentary sitting hours, and musculoskeletal vitality.',
    },
    estimatedMinutes: 2,
    relatedArticleIds: ['art-pre-employment-check', 'art-insulin-resistance'],
    recommendedServiceId: 'employee-health-clinic',
    questions: [
      {
        id: 'sitting',
        prompt: {ar: 'كم ساعة تقضيها جالساً (عمل مكتبي، قيادة، شاشات) يومياً؟', en: 'How many hours per day do you spend sitting (desk, driving, screens)?'},
        options: [
          {label: {ar: 'أقل من 5 ساعات مع حركة منتظمة', en: 'Under 5 hours with regular breaks'}, points: 0},
          {label: {ar: '5 – 8 ساعات', en: '5 – 8 hours'}, points: 2},
          {label: {ar: 'أكثر من 8 ساعات متواصلة', en: 'Over 8 hours daily'}, points: 4},
        ],
      },
      {
        id: 'stairs',
        prompt: {ar: 'كيف تشعر عند صعود طابقين من الدرج أو المشي السريع 15 دقيقة؟', en: 'How do you feel climbing two flights of stairs or brisk walking 15 minutes?'},
        options: [
          {label: {ar: 'بسهولة ودون ضيق نفس مزعج', en: 'Comfortable with mild breathing increase'}, points: 0},
          {label: {ar: 'إجهاد متوسط وتنفس سريع', en: 'Moderate breathlessness'}, points: 2},
          {label: {ar: 'لهاث سريع أو ألم بالمفاصل/الصدر', en: 'Rapid exhaustion or joint/chest discomfort'}, points: 4},
        ],
      },
      {
        id: 'strength',
        prompt: {ar: 'هل تمارس تمارين تقوية العضلات أو المقاومة أسبوعياً؟', en: 'Do you perform muscle-strengthening or resistance exercises weekly?'},
        options: [
          {label: {ar: 'مرتين أو أكثر أسبوعياً', en: '2+ sessions/week'}, points: 0},
          {label: {ar: 'مرة واحدة أسبوعياً', en: 'Once weekly'}, points: 2},
          {label: {ar: 'لا أمارس تمارين مقاومة', en: 'None'}, points: 3},
        ],
      },
    ],
  },
  {
    id: 'bmi-obesity',
    title: {ar: 'اختبار السمنة ومؤشر كتلة الجسم (BMI)', en: 'Obesity & BMI Clinical Assessment'},
    shortDesc: {
      ar: 'حاسبة طبية دقيقة لمؤشر كتلة الجسم ومحيط الخصر مع تصنيف الخطورة الأيضية.',
      en: 'Precision BMI and waist-risk calculator with personalized metabolic guidance.',
    },
    estimatedMinutes: 1,
    isBmiCalculator: true,
    relatedArticleIds: ['art-bmi-waist-ratio', 'art-insulin-resistance'],
    recommendedServiceId: 'preventive-programs',
    questions: [],
  },
];

export interface AssessmentReport {
  tierLabel: BilingualText;
  level: 'low' | 'moderate' | 'elevated';
  scoreDisplay: string;
  summary: BilingualText;
  recommendations: BilingualText[];
}

export function evaluateStandardAssessment(id: AssessmentId, totalScore: number, maxScore: number): AssessmentReport {
  const ratio = maxScore > 0 ? totalScore / maxScore : 0;

  if (ratio <= 0.3) {
    return {
      level: 'low',
      scoreDisplay: `${totalScore} / ${maxScore}`,
      tierLabel: {ar: 'مؤشر مطمئن / خطورة منخفضة', en: 'Favorable / Low Risk'},
      summary: {
        ar: 'تُظهر إجاباتك مؤشرات صحية إيجابية ومستوى خطورة منخفض حالياً. الاستمرار على الفحص الدوري السنوي يحافظ على هذا التوازن.',
        en: 'Your responses indicate positive baseline habits and low current risk. Continuing annual preventive checkups keeps you on track.',
      },
      recommendations: [
        {ar: 'الالتزام بفحص سنوي دوري لضبط الضغط والسكر والدهون.', en: 'Maintain an annual preventive checkup for BP, glucose, and lipids.'},
        {ar: 'الحفاظ على 150 دقيقة من النشاط البدني أسبوعياً ونوم منتظم.', en: 'Sustain 150 minutes of weekly activity and consistent sleep.'},
      ],
    };
  }

  if (ratio <= 0.62) {
    return {
      level: 'moderate',
      scoreDisplay: `${totalScore} / ${maxScore}`,
      tierLabel: {ar: 'خطورة متوسطة — يُنصح بالوقاية المبكرة', en: 'Moderate Risk — Early Prevention Advised'},
      summary: {
        ar: 'توجد بعض عوامل الخطورة القابلة للتعديل قبل تطورها إلى حالة مزمنة. جلسة تقييم مع د. معتصم تساعدك في وضع خطة تصحيح مبكرة.',
        en: 'Several modifiable risk factors were identified. An early preventive review with Dr. Motasem can reverse trends before chronic issues develop.',
      },
      recommendations: [
        {ar: 'إجراء تحاليل مخبرية أساسية (سكر صائم، تراكمي، دهون، فيتامين د).', en: 'Complete baseline labs (fasting glucose, HbA1c, lipid panel, Vitamin D).'},
        {ar: 'مراجعة العادات الغذائية وساعات النوم والحركة خلال زيارة استشارية.', en: 'Review nutrition, sleep hygiene, and physical activity in a structured visit.'},
      ],
    };
  }

  return {
    level: 'elevated',
    scoreDisplay: `${totalScore} / ${maxScore}`,
    tierLabel: {ar: 'خطورة مرتفعة — يستدعي تقييماً طبياً قريباً', en: 'Elevated Risk — Clinical Consultation Recommended'},
    summary: {
      ar: 'تشير نتيجتك إلى وجود مؤشرات تستحق مراجعة طبية متخصصة لإجراء الفحوصات اللازمة ووضع خطة متابعة وعلاج وقائية واضحة.',
      en: 'Your score highlights notable risk markers that warrant prompt medical evaluation for targeted testing and a personalized care plan.',
    },
    recommendations: [
      {ar: 'حجز استشارة مع د. معتصم النسور (حضورياً أو أونلاين) لتقييم الفحوصات المطلوبة.', en: 'Schedule a consultation with Dr. Motasem Alnsour (In-Clinic or Online) for workup.'},
      {ar: 'تسجيل قراءات الضغط والسكر والأعراض لمدة أسبوع قبل الموعد إن أمكن.', en: 'Bring any recent lab reports or 7-day home readings if available.'},
    ],
  };
}

export function evaluateBmiAssessment(weightKg: number, heightCm: number, waistCm: number, gender: 'male' | 'female'): AssessmentReport {
  const heightM = heightCm / 100;
  const bmi = heightM > 0 ? weightKg / (heightM * heightM) : 0;
  const roundedBmi = bmi.toFixed(1);
  const highWaist = gender === 'male' ? waistCm >= 94 : waistCm >= 80;

  if (bmi < 18.5) {
    return {
      level: 'moderate',
      scoreDisplay: `BMI ${roundedBmi} kg/m²`,
      tierLabel: {ar: 'نقص في الوزن (أقل من 18.5)', en: 'Underweight (BMI < 18.5)'},
      summary: {
        ar: 'مؤشر كتلة الجسم أقل من النطاق المثالي، مما قد يستدعي استبعاد فقر الدم أو فرط نشاط الغدة الدرقية أو سوء الامتصاص.',
        en: 'Your BMI is below the optimal range, warranting evaluation for iron deficiency, thyroid balance, and nutritional intake.',
      },
      recommendations: [
        {ar: 'إجراء تحاليل صورة الدم والفيريتين والغدة الدرقية.', en: 'Check CBC, ferritin, and thyroid function (TSH).'},
        {ar: 'خطة تغذية صحية لزيادة الكتلة العضلية بأمان.', en: 'Build a nutrient-dense plan for healthy lean mass gain.'},
      ],
    };
  }

  if (bmi < 25 && !highWaist) {
    return {
      level: 'low',
      scoreDisplay: `BMI ${roundedBmi} kg/m²`,
      tierLabel: {ar: 'وزن صحي ومثالي (18.5 – 24.9)', en: 'Healthy Weight Range (18.5 – 24.9)'},
      summary: {
        ar: 'مؤشر كتلة الجسم ومحيط الخصر ضمن النطاق الصحي المتوازن مما يدعم صحة القلب والمفاصل والأيض.',
        en: 'Both your BMI and waist measurement fall within the healthy clinical range supporting cardiovascular and metabolic wellness.',
      },
      recommendations: [
        {ar: 'حافظ على التوازن الغذائي الحالي ونشاطك الأسبوعي.', en: 'Maintain your balanced meals and weekly resistance/cardio activity.'},
        {ar: 'فحص دوري سنوي للحفاظ على المؤشرات الحيوية.', en: 'Continue annual preventive wellness exams.'},
      ],
    };
  }

  if (bmi < 30) {
    return {
      level: 'moderate',
      scoreDisplay: `BMI ${roundedBmi} kg/m²`,
      tierLabel: {
        ar: highWaist ? 'زيادة وزن مع ارتفاع محيط الخصر' : 'زيادة في الوزن (25.0 – 29.9)',
        en: highWaist ? 'Overweight With Elevated Waist Risk' : 'Overweight Range (25.0 – 29.9)',
      },
      summary: {
        ar: 'يشير المؤشر إلى زيادة في الوزن أو دهون حشوية تتطلب خطة وقائية لتقليل خطر مقاومة الإنسولين والضغط.',
        en: 'Indicates overweight or central adiposity that benefits from early nutritional and metabolic guidance to prevent insulin resistance.',
      },
      recommendations: [
        {ar: 'فحص السكر التراكمي HbA1c ومستوى الدهون الثلاثية.', en: 'Evaluate HbA1c and lipid profile as a baseline.'},
        {ar: 'تقليل السكريات المكررة والمشي السريع 150–200 دقيقة أسبوعياً.', en: 'Reduce refined sugars and aim for 150–200 minutes of brisk weekly walking.'},
      ],
    };
  }

  return {
    level: 'elevated',
    scoreDisplay: `BMI ${roundedBmi} kg/m²`,
    tierLabel: {ar: 'سمنة (BMI ≥ 30) — يُنصح ببرنامج طبي متكامل', en: 'Obesity Range (BMI ≥ 30) — Medical Program Advised'},
    summary: {
      ar: 'ارتفاع مؤشر كتلة الجسم إلى 30 فأعلى يزيد القابلية للسكري وضغط الدم وخشونة المفاصل، وتتوفر حالياً برامج طبية آمنة وفعالة بإشراف طبيب الأسرة.',
      en: 'A BMI of 30 or above increases metabolic, blood pressure, and joint stress. Physician-guided weight management offers safe, structured solutions.',
    },
    recommendations: [
      {ar: 'حجز استشارة برنامج إدارة الوزن الطبي لتقييم الهرمونات والأيض.', en: 'Book a medical weight-management consultation for metabolic and hormonal screening.'},
      {ar: 'البدء بخطة تغذية علاجية ومناقشة الخيارات الطبية المناسبة لحالتك.', en: 'Establish a structured clinical nutrition plan and discuss safe therapeutic options.'},
    ],
  };
}
