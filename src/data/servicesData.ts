import type {MedicalService} from '../types/medical';

export const MEDICAL_SERVICES: MedicalService[] = [
  {
    id: 'general-consultations',
    number: '01',
    category: 'primary',
    title: {ar: 'الاستشارات الطبية العامة', en: 'General Medical Consultations'},
    subtitle: {ar: 'التقييم السريري الشامل للبالغين والعائلات', en: 'Comprehensive Clinical Evaluation for Adults & Families'},
    shortDesc: {
      ar: 'تشخيص دقيق للأعراض الحادة والعامة ووضع خطة علاجية متكاملة لجميع أفراد الأسرة.',
      en: 'Accurate diagnosis of acute and general symptoms with clear, evidence-based treatment plans.',
    },
    detailedDesc: {
      ar: 'نقطة الانطلاق الأولى لأي شكوى صحية. يتم خلال الاستشارة أخذ التاريخ المرضي المفصل، تقييم العلامات الحيوية والأعراض، طلب الفحوصات الموجهة فقط دون إسراف، ووصف العلاج المناسب مع خطة متابعة واضحة.',
      en: 'Your primary entry point for any health concern. Each consultation includes a structured medical history, focused symptom and risk assessment, targeted diagnostics without unnecessary testing, and a clear treatment and follow-up plan.',
    },
    features: [
      {ar: 'تقييم طبي شامل وفق أحدث الأدلة الإرشادية العالمية', en: 'Evidence-based clinical evaluation aligned with international guidelines'},
      {ar: 'توضيح التشخيص والبدائل العلاجية بلغة مفهومة', en: 'Clear explanation of diagnosis and treatment options'},
      {ar: 'تجنب الفحوصات المكررة أو الأدوية غير الضرورية', en: 'Prevents redundant lab work and polypharmacy'},
    ],
    suitableCases: [
      {ar: 'التهابات الجهاز التنفسي والحمى والصداع', en: 'Respiratory infections, fever, and headaches'},
      {ar: 'اضطرابات الجهاز الهضمي والإرهاق المزمن', en: 'Digestive complaints and persistent fatigue'},
      {ar: 'آلام المفاصل والعضلات والحساسية الموسمية', en: 'Musculoskeletal pain and seasonal allergies'},
    ],
    steps: [
      {ar: 'اختيار موعد الاستشارة أونلاين المناسب لك', en: 'Select your convenient Online Consultation slot'},
      {ar: 'تقييم الأعراض والتاريخ الدوائي والعائلي', en: 'Comprehensive symptom, medication, and family history review'},
      {ar: 'استلام الخطة العلاجية وتوصيات المتابعة', en: 'Receive treatment plan, guidance, and follow-up roadmap'},
    ],
    faqs: [
      {
        question: {ar: 'هل يمكن تقييم الأعراض العامة عبر الاستشارة أونلاين؟', en: 'Can general symptoms be evaluated via online consultation?'},
        answer: {
          ar: 'نعم، في معظم الحالات يتم التقييم الطبي الدقيق عبر الاستشارة أونلاين وطلب الفحوصات اللازمة ووضع الخطة العلاجية، أما الحالات الإسعافية الخطيرة فيُوجّه المريض للطوارئ فوراً.',
          en: 'Yes, most acute and general complaints can be thoroughly evaluated online with targeted lab orders and clear care plans; red-flag emergency symptoms are directed immediately to urgent emergency care.',
        },
      },
    ],
    durationMinutes: 25,
    modes: ['online'],
  },
  {
    id: 'chronic-disease-management',
    number: '02',
    category: 'chronic',
    title: {ar: 'متابعة الأمراض المزمنة (السكري، الضغط، الكوليسترول)', en: 'Chronic Disease Management (Diabetes, Hypertension, Cholesterol)'},
    subtitle: {ar: 'برامج ضبط طويلة الأمد لمنع المضاعفات', en: 'Structured Long-Term Control to Prevent Complications'},
    shortDesc: {
      ar: 'رعاية منتظمة لضبط السكر التراكمي وضغط الدم ودهون الدم وتقليل مخاطر القلب والكلى.',
      en: 'Ongoing management to stabilize HbA1c, blood pressure, and lipid profiles while protecting heart and kidney health.',
    },
    detailedDesc: {
      ar: 'تتطلب الأمراض المزمنة متابعة دورية ذكية تتجاوز مجرد صرف الوصفة الشهرية. نعمل مع المريض على ضبط الجرعات بدقة، مراقبة وظائف الكلى والشبكية والقلب، وتصميم خطة غذائية وحركية واقعية تحسن جودة الحياة.',
      en: 'Chronic conditions require structured continuity beyond routine prescription refills. We titrate medications safely, monitor kidney, retinal, and cardiovascular targets, and build realistic nutrition and activity plans.',
    },
    features: [
      {ar: 'متابعة السكر التراكمي HbA1c وقراءات الضغط المنزلية', en: 'HbA1c tracking and structured home blood pressure log review'},
      {ar: 'مراجعة تداخلات الأدوية وضبط الجرعات بأمان', en: 'Medication reconciliation and safe dose titration'},
      {ar: 'فحوصات وقائية دورية للقلب والكلى والأعصاب', en: 'Scheduled screening for cardiac, renal, and nerve protection'},
    ],
    suitableCases: [
      {ar: 'السكري من النوع الثاني ومقدمات السكري', en: 'Type 2 diabetes and prediabetes'},
      {ar: 'ارتفاع ضغط الدم الأساسي أو غير المنتظم', en: 'Essential or uncontrolled hypertension'},
      {ar: 'ارتفاع الكوليسترول والدهون الثلاثية ومقاومة الإنسولين', en: 'Dyslipidemia, high triglycerides, and insulin resistance'},
    ],
    steps: [
      {ar: 'مراجعة القراءات المنزلية والتحاليل السابقة', en: 'Review home logs and prior laboratory results'},
      {ar: 'ضبط الخطة الدوائية ونمط الحياة', en: 'Optimize medication regimen and lifestyle targets'},
      {ar: 'جدولة موعد المتابعة الدوري كل 3 أشهر', en: 'Schedule structured 3-month clinical follow-up'},
    ],
    faqs: [
      {
        question: {ar: 'كم مرة يجب متابعة السكري والضغط؟', en: 'How frequently should diabetes and blood pressure be reviewed?'},
        answer: {
          ar: 'غالباً كل 3 أشهر عند استقرار الحالة أو كل 2–4 أسابيع عند تعديل الجرعات حتى الوصول للمستهدف الآمن.',
          en: 'Typically every 3 months once stable, or every 2–4 weeks during medication adjustments until target levels are achieved.',
        },
      },
    ],
    durationMinutes: 30,
    modes: ['online'],
  },
  {
    id: 'employee-health-clinic',
    number: '03',
    category: 'urgent',
    title: {ar: 'عيادة الموظفين', en: 'Employee Health Clinic'},
    subtitle: {ar: 'فحوصات اللياقة المهنية والوقاية في بيئة العمل', en: 'Occupational Fitness & Workplace Preventive Care'},
    shortDesc: {
      ar: 'تقييم اللياقة الصحية للتوظيف، الفحوصات الدورية للموظفين، وإدارة الإجهاد المهني.',
      en: 'Pre-employment medical fitness evaluations, corporate periodic screenings, and workplace wellness management.',
    },
    detailedDesc: {
      ar: 'خدمة متخصصة للموظفين والشركات تهدف إلى تعزيز الصحة الإنتاجية، إجراء فحوصات ما قبل التوظيف والتجديد السنوي، ومتابعة أمراض بيئة العمل مثل آلام الظهر، الإجهاد، واضطرابات النوم.',
      en: 'Dedicated occupational care for professionals and organizations covering pre-employment clearance, annual executive screenings, and workplace-related ergonomics, fatigue, and stress management.',
    },
    features: [
      {ar: 'فحوصات شاملة وسريعة لتقييم اللياقة الوظيفية', en: 'Streamlined pre-employment and annual fitness assessments'},
      {ar: 'برامج وقائية للموظفين وإدارة الإجهاد المهني', en: 'Workplace wellness and burnout prevention guidance'},
      {ar: 'تقارير طبية معتمدة وواضحة', en: 'Structured clinical fitness documentation'},
    ],
    suitableCases: [
      {ar: 'المتقدمون الجدد للوظائف والهيئات', en: 'New hires requiring medical fitness clearance'},
      {ar: 'موظفو الشركات في برامج الفحص السنوي', en: 'Corporate employees undergoing annual wellness checks'},
      {ar: 'العاملون بنظام المناوبات واضطرابات النوم', en: 'Shift workers experiencing fatigue or sleep disruption'},
    ],
    steps: [
      {ar: 'حجز موعد عيادة الموظفين', en: 'Book Employee Health Clinic slot'},
      {ar: 'إجراء الفحص السريري والتحاليل المطلوبة', en: 'Complete physical evaluation and required diagnostics'},
      {ar: 'استلام التقرير الطبي والتوصيات الوقائية', en: 'Receive fitness report and personalized preventive advice'},
    ],
    faqs: [
      {
        question: {ar: 'هل تتوفر الفحوصات الدورية للشركات والمؤسسات؟', en: 'Do you support periodic corporate employee checkups?'},
        answer: {
          ar: 'نعم، يتم تنسيق حزم فحوصات دورية فردية ومؤسسية مع تفسير كامل للنتائج لكل موظف.',
          en: 'Yes, individual and corporate screening panels are supported with personalized result reviews.',
        },
      },
    ],
    durationMinutes: 25,
    modes: ['online'],
  },
  {
    id: 'urgent-clinic',
    number: '04',
    category: 'urgent',
    title: {ar: 'العيادات العاجلة', en: 'Urgent Clinic'},
    subtitle: {ar: 'تقييم سريع للحالات الحادة غير المهددة للحياة', en: 'Prompt Care for Acute Non-Life-Threatening Conditions'},
    shortDesc: {
      ar: 'رعاية طبية فورية للحالات الطارئة البسيطة والمتوسطة دون انتظار ساعات طويلة في أقسام الطوارئ.',
      en: 'Rapid clinical attention for acute illnesses and minor injuries without prolonged emergency room waits.',
    },
    detailedDesc: {
      ar: 'تستقبل العيادة العاجلة الحالات المفاجئة التي تحتاج تدخلاً سريعاً في نفس اليوم مثل الحرارة المرتفعة، التهابات الحلق والأذن، المغص الحاد، الجفاف، أو نوبات التحسس غير الشديدة مع فرز دقيق لأي علامات خطورة.',
      en: 'Same-day medical evaluation for sudden symptoms such as high fever, ear or throat infections, acute abdominal discomfort, dehydration, or moderate allergic reactions, with strict triage for emergency red flags.',
    },
    features: [
      {ar: 'مواعيد سريعة في نفس اليوم أونلاين للفرز والتقييم', en: 'Same-day rapid online triage and acute guidance'},
      {ar: 'تخفيف العبء عن أقسام الطوارئ للحالات المتوسطة', en: 'Faster alternative to crowded ERs for non-critical acute care'},
      {ar: 'تحويل فوري للمستشفى عند وجود أي علامات خطورة', en: 'Immediate hospital escalation if red-flag signs are present'},
    ],
    suitableCases: [
      {ar: 'الحمى المفاجئة والتهاب اللوزتين والجيوب الأنفية', en: 'Sudden fever, tonsillitis, and acute sinusitis'},
      {ar: 'التهابات المسالك البولية والنزلات المعوية', en: 'Urinary tract infections and acute gastroenteritis'},
      {ar: 'الصداع الحاد غير المصحوب بأعراض عصبية خطيرة', en: 'Acute headaches without neurological red flags'},
    ],
    steps: [
      {ar: 'تحديد موعد العيادة العاجلة أو التواصل المباشر', en: 'Select Urgent Clinic appointment or direct contact'},
      {ar: 'فرز وتقييم سريع للأعراض والعلامات الحيوية', en: 'Rapid triage of symptoms and vital signs'},
      {ar: 'بدء العلاج الفوري ومتابعة التحسن خلال 48 ساعة', en: 'Initiate immediate treatment and 48-hour recovery check'},
    ],
    faqs: [
      {
        question: {ar: 'متى أتوجه للطوارئ بدلاً من العيادة العاجلة؟', en: 'When should I go to the ER instead of the Urgent Clinic?'},
        answer: {
          ar: 'في حالات ألم الصدر الضاغط، ضيق التنفس الشديد، فقدان الوعي، ضعف مفاجئ في الأطراف، أو النزيف الشديد يجب التوجه للطوارئ فوراً.',
          en: 'Seek emergency care immediately for crushing chest pain, severe shortness of breath, loss of consciousness, sudden limb weakness, or severe bleeding.',
        },
      },
    ],
    durationMinutes: 20,
    modes: ['online'],
  },
  {
    id: 'periodic-checkups',
    number: '05',
    category: 'preventive',
    title: {ar: 'الفحوصات الدورية', en: 'Periodic Checkups'},
    subtitle: {ar: 'الفحص الطبي السنوي الشامل حسب العمر والجنس', en: 'Age- and Gender-Tailored Annual Wellness Exams'},
    shortDesc: {
      ar: 'مراجعة صحية متكاملة سنوياً للاطمئنان على الوظائف الحيوية واكتشاف أي تغيرات مبكراً.',
      en: 'Structured annual physical and metabolic checkups designed around your age, gender, and family risk profile.',
    },
    detailedDesc: {
      ar: 'الفحص الدوري ليس باقة عشوائية من التحاليل، بل تقييم سريري مخصص يحدد الفحوصات التي تحتاجها فعلاً وفق عمرك وتاريخك العائلي مثل وظائف الكبد والكلى، السكر، الدهون، الغدة الدرقية، والفيتامينات.',
      en: 'An effective periodic checkup is personalized rather than a generic bundle. We tailor physical screening and lab panels to your age, gender, and family history—covering metabolic, thyroid, renal, hepatic, and micronutrient health.',
    },
    features: [
      {ar: 'تخصيص الفحوصات حسب العمر والتاريخ العائلي', en: 'Personalized screening based on age and family risk'},
      {ar: 'تقييم الضغط والوزن ومؤشرات الخطر القلبي', en: 'Cardiovascular risk scoring, blood pressure, and BMI tracking'},
      {ar: 'خطة صحية سنوية واضحة وقابلة للتطبيق', en: 'Actionable annual health roadmap'},
    ],
    suitableCases: [
      {ar: 'البالغون الراغبون بالاطمئنان السنوي الشامل', en: 'Adults seeking comprehensive yearly health reassurance'},
      {ar: 'من لديهم تاريخ عائلي لأمراض القلب أو السكري', en: 'Individuals with a family history of heart disease or diabetes'},
      {ar: 'متابعة ما بعد سن الأربعين لكلا الجنسين', en: 'Preventive wellness after age 40 for men and women'},
    ],
    steps: [
      {ar: 'مراجعة التاريخ الصحي وتحديد حزمة الفحوصات المناسبة', en: 'Pre-test clinical review to select relevant lab panels'},
      {ar: 'إجراء الفحوصات المخبرية والقياسات السريرية', en: 'Complete laboratory testing and clinical measurements'},
      {ar: 'جلسة قراءة النتائج ووضع خطة السنة القادمة', en: 'Full result review and annual preventive plan'},
    ],
    faqs: [
      {
        question: {ar: 'هل يجب الصيام قبل الفحص الدوري؟', en: 'Is fasting required before a periodic checkup?'},
        answer: {
          ar: 'يُفضل الصيام 8–10 ساعات مع شرب الماء فقط عند قياس سكر الصائم والدهون الثلاثية.',
          en: 'Fasting for 8–10 hours (water permitted) is recommended for accurate fasting glucose and triglyceride profiles.',
        },
      },
    ],
    durationMinutes: 30,
    modes: ['online'],
  },
  {
    id: 'preventive-screenings',
    number: '06',
    category: 'preventive',
    title: {ar: 'الفحوصات الوقائية', en: 'Preventive Screenings'},
    subtitle: {ar: 'الكشف المبكر قبل ظهور الأعراض', en: 'Early Disease Detection Before Symptoms Begin'},
    shortDesc: {
      ar: 'بروتوكولات مسح مبكر معتمدة للكشف عن الأورام الشائعة، هشاشة العظام، ومخاطر الأيض.',
      en: 'Guideline-driven screening protocols for early cancer detection, bone density, and silent cardiometabolic risk.',
    },
    detailedDesc: {
      ar: 'نطبّق توصيات الهيئات الطبية العالمية (مثل USPSTF) في الكشف المبكر عن سرطان القولون، الثدي، عنق الرحم، البروستاتا، وهشاشة العظام وتمدد الشريان الأبهري وفق الفئة العمرية وعوامل الخطورة.',
      en: 'We apply international screening standards (such as USPSTF guidelines) for timely early detection of colorectal, breast, cervical, and prostate conditions, osteoporosis, and silent vascular risk.',
    },
    features: [
      {ar: 'توقيت علمي دقيق للفحوصات المسحية دون إفراط', en: 'Evidence-timed screening intervals without over-testing'},
      {ar: 'تقييم المخاطر الوراثية وعوامل نمط الحياة', en: 'Hereditary and lifestyle risk stratification'},
      {ar: 'متابعة دقيقة لأي نتيجة تتطلب استقصاءً إضافياً', en: 'Structured follow-through for any abnormal screening finding'},
    ],
    suitableCases: [
      {ar: 'فحوصات الكشف المبكر بعد سن 40 و45 و50', en: 'Age-based cancer and vascular screenings (40+, 45+, 50+)'},
      {ar: 'المدخنون ومن لديهم عوامل خطورة قلبية', en: 'Smokers and individuals with elevated cardiovascular risk'},
      {ar: 'النساء بعد انقطاع الطمث لتقييم هشاشة العظام', en: 'Postmenopausal bone mineral density screening'},
    ],
    steps: [
      {ar: 'حساب درجة الخطورة الفردية والعائلية', en: 'Individual and family risk profiling'},
      {ar: 'توجيه الفحص الوقائي المعتمد (أشعة/منظار/مختبر)', en: 'Ordering guideline-indicated screening tests'},
      {ar: 'تفسير النتيجة وتحديد موعد المسح التالي', en: 'Interpreting outcomes and setting next screening interval'},
    ],
    faqs: [
      {
        question: {ar: 'متى يبدأ فحص الكشف المبكر عن القولون؟', en: 'At what age does colorectal screening begin?'},
        answer: {
          ar: 'توصي الإرشادات الحديثة بالبدء عند سن 45 عاماً لذوي الخطورة المتوسطة، أو قبل ذلك لمن لديهم تاريخ عائلي.',
          en: 'Current guidelines recommend starting at age 45 for average-risk adults, or earlier if there is a family history.',
        },
      },
    ],
    durationMinutes: 25,
    modes: ['online'],
  },
  {
    id: 'lab-tests-analysis',
    number: '07',
    category: 'preventive',
    title: {ar: 'التحاليل المخبرية', en: 'Lab Tests & Analysis'},
    subtitle: {ar: 'طلب التحاليل الموجهة ومراجعة المؤشرات الحيوية', en: 'Targeted Diagnostic Lab Panels & Biomarker Review'},
    shortDesc: {
      ar: 'تحديد التحاليل المخبرية الدقيقة اللازمة لتشخيص الأعراض أو مراقبة العلاج في مختبرات معتمدة.',
      en: 'Precision ordering of blood, metabolic, hormonal, and infectious panels through accredited laboratories.',
    },
    detailedDesc: {
      ar: 'تساعد التحاليل المخبرية الموجهة في كشف أسباب التعب، فقر الدم، اضطرابات الغدة الدرقية، نقص الفيتامينات (D و B12)، والالتهابات، مع التأكد من طلب الفحص الصحيح في التوقيت الصحيح.',
      en: 'Targeted lab testing uncovers root causes of fatigue, anemia, thyroid dysfunction, vitamin D/B12 deficiencies, and inflammation—ensuring the right test is ordered at the right time.',
    },
    features: [
      {ar: 'تحديد التحاليل المطلوبة بدقة دون تكاليف زائدة', en: 'Focused diagnostic ordering avoiding unnecessary costs'},
      {ar: 'تغطية شاملة لتحاليل الدم والهرمونات والمناعة', en: 'Covers hematology, metabolic, endocrine, and autoimmune panels'},
      {ar: 'ربط مباشر مع خدمة تفسير نتائج الفحوصات', en: 'Seamless pairing with medical interpretation'},
    ],
    suitableCases: [
      {ar: 'تساقط الشعر والإرهاق واضطرابات الوزن', en: 'Hair loss, unexplained fatigue, and weight changes'},
      {ar: 'متابعة فعالية الأدوية ومستويات الفيتامينات', en: 'Monitoring medication safety and micronutrient levels'},
      {ar: 'تحاليل ما قبل الزواج أو الفحوصات الروتينية', en: 'Routine baseline and wellness panels'},
    ],
    steps: [
      {ar: 'استشارة سريعة لتحديد التحاليل المناسبة لحالتك', en: 'Brief assessment to select indicated lab tests'},
      {ar: 'إجراء السحب المخبري في المختبر المعتمد', en: 'Sample collection at an accredited laboratory'},
      {ar: 'مراجعة النتائج وإصدار التوصيات العلاجية', en: 'Clinical review and treatment recommendations'},
    ],
    faqs: [
      {
        question: {ar: 'هل يمكنني طلب قائمة التحاليل قبل الذهاب للمختبر عبر استشارة أونلاين؟', en: 'Can I get a tailored lab test list online before visiting a lab?'},
        answer: {
          ar: 'نعم، نوفر قائمة تحاليل دقيقة مخصصة لحالتك ثم نراجع النتائج فور صدورها.',
          en: 'Yes, we provide a customized lab requisition list online and review your results once issued.',
        },
      },
    ],
    durationMinutes: 20,
    modes: ['online'],
  },
  {
    id: 'lab-results-interpretation',
    number: '08',
    category: 'preventive',
    title: {ar: 'تفسير نتائج الفحوصات', en: 'Lab Results Interpretation'},
    subtitle: {ar: 'قراءة طبية متخصصة للتحاليل والأشعة', en: 'Physician Interpretation of Labs & Imaging Reports'},
    shortDesc: {
      ar: 'تفسير واضح ومطمئن لنتائج تحاليل الدم والأشعة مع ربطها بالأعراض وتحديد الخطوة التالية.',
      en: 'Clear, reassuring physician review of blood tests and radiology reports linked directly to your symptoms.',
    },
    detailedDesc: {
      ar: 'قراءة أرقام التحاليل عبر الإنترنت قد تسبب قلقاً غير مبرر أو إغفالاً لمؤشر مهم. يقوم د. معتصم بقراءة نتائجك ضمن السياق السريري الكامل وتوضيح ما هو طبيعي وما يستدعي متابعة أو علاجاً.',
      en: 'Searching lab numbers online often causes unnecessary anxiety or misses subtle clinical trends. Dr. Motasem interprets your reports in full clinical context, clarifying normal variations versus actionable findings.',
    },
    features: [
      {ar: 'تفسير شامل لتحاليل الدم والأشعة والتقارير الطبية', en: 'Review of blood work, imaging, and medical summaries'},
      {ar: 'ربط الأرقام بالأعراض الفعلية والتاريخ الدوائي', en: 'Contextualizes numbers alongside symptoms and medications'},
      {ar: 'خطة خطوة بخطوة لما بعد النتيجة', en: 'Clear next-step diagnostic or treatment guidance'},
    ],
    suitableCases: [
      {ar: 'نتائج تحاليل حديثة تحتوي قيماً خارج النطاق المرجعي', en: 'Recent lab reports showing flagged or borderline values'},
      {ar: 'تقارير الأشعة التلفزيونية أو الرنين والأشعة المقطعية', en: 'Ultrasound, CT, or MRI report clarification'},
      {ar: 'الحصول على رأي طبي ثانٍ مطمئن', en: 'Seeking a clear, reassuring second clinical opinion'},
    ],
    steps: [
      {ar: 'حجز استشارة تفسير النتائج أونلاين', en: 'Book Online Lab Interpretation'},
      {ar: 'مشاركة التقارير والقيم خلال الجلسة', en: 'Share reports and clinical background during consultation'},
      {ar: 'الحصول على ملخص التفسير وخطة الإجراء التالي', en: 'Receive plain-language explanation and action plan'},
    ],
    faqs: [
      {
        question: {ar: 'هل يمكن تفسير تحاليل أجريتها في مستشفى أو مختبر آخر؟', en: 'Can you interpret tests performed at another hospital or lab?'},
        answer: {
          ar: 'بالتأكيد، نراجع أي تحاليل أو تقارير أشعة معتمدة من داخل السعودية أو الأردن أو خارجهما.',
          en: 'Yes, we review accredited laboratory and radiology reports from Saudi Arabia, Jordan, or abroad.',
        },
      },
    ],
    durationMinutes: 20,
    modes: ['online'],
  },
  {
    id: 'elderly-health-care',
    number: '09',
    category: 'chronic',
    title: {ar: 'متابعة صحة كبار السن', en: 'Elderly Health Care'},
    subtitle: {ar: 'رعاية شاملة لكبار السن ومنع تعدد الأدوية', en: 'Comprehensive Geriatric Care & Medication Safety'},
    shortDesc: {
      ar: 'متابعة دقيقة لأمراض الشيخوخة، الذاكرة، التوازن، هشاشة العظام، ومراجعة سلامة الأدوية.',
      en: 'Attentive care for senior mobility, bone health, memory, chronic conditions, and polypharmacy safety.',
    },
    detailedDesc: {
      ar: 'يحتاج كبار السن إلى طبيب أسرة متمرس يوازن بين عدة أمراض مزمنة في آنٍ واحد. نركز على مراجعة جميع الأدوية لمنع التفاعلات الضارة، الوقاية من السقوط، تقييم التغذية والذاكرة، ودعم الأسرة في رعاية الوالدين.',
      en: 'Older adults benefit from a dedicated family physician who balances multiple co-existing conditions. We conduct thorough medication reviews to eliminate harmful interactions, assess fall risk, nutrition, and cognition, and support family caregivers.',
    },
    features: [
      {ar: 'مراجعة شاملة للأدوية (Polypharmacy Review)', en: 'Comprehensive polypharmacy and drug interaction review'},
      {ar: 'تقييم مخاطر السقوط وهشاشة العظام والتوازن', en: 'Fall prevention, mobility, and osteoporosis assessment'},
      {ar: 'تطعيمات كبار السن والرعاية الأسرية المساندة', en: 'Senior immunizations and caregiver support plans'},
    ],
    suitableCases: [
      {ar: 'كبار السن ممن يتناولون 4 أدوية أو أكثر يومياً', en: 'Seniors taking 4 or more daily medications'},
      {ar: 'تراجع الشهية، اضطرابات النوم، أو النسيان المتكرر', en: 'Appetite decline, sleep changes, or memory concerns'},
      {ar: 'المتابعة الدورية لمرضى الضغط والسكري والقلب كبار السن', en: 'Longitudinal chronic care for elderly parents'},
    ],
    steps: [
      {ar: 'إحضار قائمة أو صور جميع الأدوية والمكملات', en: 'Bring list or photos of all current medications and supplements'},
      {ar: 'فحص شامل للوظائف الحيوية والتوازن والذاكرة', en: 'Comprehensive vital, mobility, and cognitive check'},
      {ar: 'وضع خطة مبسطة وآمنة للأسرة والمريض', en: 'Simplified, safe daily care plan for patient and family'},
    ],
    faqs: [
      {
        question: {ar: 'هل يمكن متابعة الوالدين كبار السن عبر الاستشارة المرئية بمشاركة أحد الأبناء؟', en: 'Can an adult child join an online consultation with elderly parents?'},
        answer: {
          ar: 'نعم، نرحب بحضور أحد أفراد الأسرة خلال الاستشارة المرئية أونلاين لتسهيل المتابعة وضمان وضوح الخطة الدوائية.',
          en: 'Yes, family caregivers are warmly welcomed during online video consultations to coordinate senior care safely.',
        },
      },
    ],
    durationMinutes: 35,
    modes: ['online'],
  },
  {
    id: 'womens-health',
    number: '10',
    category: 'primary',
    title: {ar: 'صحة المرأة', en: 'Women’s Health'},
    subtitle: {ar: 'الرعاية الوقائية والهرمونية عبر مراحل العمر', en: 'Preventive, Hormonal & Metabolic Care Across Life Stages'},
    shortDesc: {
      ar: 'متابعة فقر الدم، الغدة الدرقية، الفحوصات الوقائية النسائية، صحة العظام، واضطرابات ما قبل وبعد انقطاع الطمث.',
      en: 'Dedicated care for iron deficiency, thyroid balance, preventive screenings, bone health, and perimenopausal wellness.',
    },
    detailedDesc: {
      ar: 'رعاية صحية تراعي الخصوصية والاحتياجات الفسيولوجية للمرأة في كل مرحلة، بدءاً من تصحيح نقص الحديد والفيتامينات، واضطرابات الغدة الدرقية وتكيس المبايض، وصولاً إلى الفحوصات الوقائية للثدي وعنق الرحم وهشاشة العظام.',
      en: 'Personalized primary care addressing women’s unique health needs across all ages—including anemia and thyroid management, PCOS metabolic care, breast and cervical screening guidance, and menopause support.',
    },
    features: [
      {ar: 'متابعة فقر الدم ونقص الحديد وفيتامين د', en: 'Anemia, ferritin, and vitamin D optimization'},
      {ar: 'توجيه الفحوصات الوقائية الدورية للمرأة', en: 'Guidance on periodic breast, cervical, and bone screenings'},
      {ar: 'رعاية التوازن الهرموني وصحة ما بعد الولادة وانقطاع الطمث', en: 'Postpartum, metabolic, and menopausal wellness care'},
    ],
    suitableCases: [
      {ar: 'الإرهاق المزمن، تساقط الشعر، واضطرابات الدورة', en: 'Chronic fatigue, hair thinning, and menstrual irregularities'},
      {ar: 'متابعة خمول أو نشاط الغدة الدرقية', en: 'Hypothyroidism or hyperthyroidism management'},
      {ar: 'الفحص الوقائي الشامل للنساء فوق سن 35 و40', en: 'Comprehensive preventive checks for women 35+'},
    ],
    steps: [
      {ar: 'مناقشة التاريخ الصحي والهرموني بخصوصية تامة', en: 'Confidential review of medical and hormonal history'},
      {ar: 'تحديد الفحوصات المخبرية والتصويرية المناسبة', en: 'Targeted lab and screening coordination'},
      {ar: 'خطة علاجية وتغذوية متوازنة', en: 'Balanced medical and nutritional care plan'},
    ],
    faqs: [
      {
        question: {ar: 'متى يُنصح بإجراء فحص الماموجرام وكثافة العظام؟', en: 'When are mammogram and bone density screenings advised?'},
        answer: {
          ar: 'يبدأ فحص الماموجرام الدوري عادة من سن 40 عاماً (أو أبكر مع التاريخ العائلي)، وتُقيّم كثافة العظام بعد انقطاع الطمث أو عند وجود عوامل خطورة.',
          en: 'Mammography typically starts around age 40 (earlier with family history), and bone density is assessed post-menopause or with risk factors.',
        },
      },
    ],
    durationMinutes: 30,
    modes: ['online'],
  },
  {
    id: 'child-health',
    number: '11',
    category: 'primary',
    title: {ar: 'صحة الطفل', en: 'Pediatric & Child Health'},
    subtitle: {ar: 'متابعة النمو، التطعيمات، والأمراض الشائعة لدى الأطفال', en: 'Growth Monitoring, Immunizations & Childhood Illnesses'},
    shortDesc: {
      ar: 'رعاية طبية لطيفة ودقيقة للأطفال تشمل متابعة النمو والتغذية، التطعيمات، وعلاج التهابات الطفولة الشائعة.',
      en: 'Gentle, thorough pediatric primary care covering growth milestones, vaccination schedules, nutrition, and common infections.',
    },
    detailedDesc: {
      ar: 'نرافق الأهل في رعاية أطفالهم منذ السنوات الأولى عبر متابعة منحنيات النمو والطول والوزن، التأكد من استكمال التطعيمات الوطنية والموسمية، معالجة التهابات الأذن والحلق والربو التحسسي، وتقديم الإرشاد التغذوي.',
      en: 'Supporting parents with attentive child healthcare: monitoring growth percentiles, reviewing vaccination schedules, treating acute ear, throat, and respiratory illnesses, managing childhood eczema/asthma, and guiding healthy nutrition.',
    },
    features: [
      {ar: 'متابعة منحنيات النمو والتطور الحركي والتغذوي', en: 'Growth percentile and nutritional milestone tracking'},
      {ar: 'ترشيد استخدام المضادات الحيوية للأطفال', en: 'Judicious, evidence-based antibiotic stewardship'},
      {ar: 'توعية الأهل بعلامات الأمان وإدارة الحرارة بالمنزل', en: 'Parent guidance on fever management and safety signs'},
    ],
    suitableCases: [
      {ar: 'السعال، الزكام، التهاب الأذن والحلق والحمى', en: 'Coughs, colds, ear infections, and childhood fever'},
      {ar: 'حساسية الصدر (الربو) والإكزيما وحساسية الطعام', en: 'Childhood asthma, eczema, and allergy management'},
      {ar: 'نقص الوزن أو ضعف الشهية ومراجعة التطعيمات', en: 'Growth checks, appetite concerns, and immunization review'},
    ],
    steps: [
      {ar: 'تقييم شكوى الطفل وسجل النمو والتطعيمات', en: 'Review child’s symptoms, growth record, and vaccinations'},
      {ar: 'فحص سريري هادئ ومطمئن للطفل والوالدين', en: 'Calm, child-friendly clinical evaluation'},
      {ar: 'خطة علاج واضحة بجرعات محسوبة بدقة حسب الوزن', en: 'Weight-calibrated prescription and home care instructions'},
    ],
    faqs: [
      {
        question: {ar: 'هل كل ارتفاع في حرارة الطفل يحتاج مضاداً حيوياً؟', en: 'Does every childhood fever require antibiotics?'},
        answer: {
          ar: 'لا، معظم حالات الحمى عند الأطفال سببها التهابات فيروسية تتحسن بالرعاية الداعمة، ولا يُصرف المضاد إلا عند ثبوت عدوى بكتيرية.',
          en: 'No. Most childhood fevers are viral and resolve with supportive care; antibiotics are prescribed only when bacterial infection is confirmed.',
        },
      },
    ],
    durationMinutes: 25,
    modes: ['online'],
  },
  {
    id: 'preventive-programs',
    number: '12',
    category: 'preventive',
    title: {ar: 'البرامج الوقائية', en: 'Preventive Health Programs'},
    subtitle: {ar: 'برامج متكاملة للإقلاع عن التدخين وإنقاص الوزن والوقاية القلبية', en: 'Structured Smoking Cessation, Weight & Heart Prevention Plans'},
    shortDesc: {
      ar: 'برامج صحية مخصصة لمدة 3 إلى 6 أشهر لتحسين اللياقة الأيضية، الإقلاع عن التدخين، والوقاية من السكري.',
      en: 'Guided 3-to-6-month wellness programs for smoking cessation, metabolic weight management, and diabetes reversal/prevention.',
    },
    detailedDesc: {
      ar: 'برامج عملية منظمة تتضمن خطة أهداف قابلة للقياس ومتابعة دورية لتعديل نمط الحياة، إدارة الوزن الطبي الآمن، برامج الإقلاع عن التدخين والفيب، والوقاية الاستباقية من أمراض القلب.',
      en: 'Action-oriented structured programs featuring measurable milestones and regular check-ins for safe medical weight management, smoking/vaping cessation, sleep hygiene, and cardiometabolic risk reduction.',
    },
    features: [
      {ar: 'برنامج طبي متدرج لإدارة الوزن ومقاومة الإنسولين', en: 'Medically supervised weight and insulin-resistance program'},
      {ar: 'خطة علمية متكاملة للإقلاع عن التدخين', en: 'Evidence-based smoking and nicotine cessation protocols'},
      {ar: 'متابعة شهرية للمؤشرات والقياسات', en: 'Monthly biometric and clinical progress tracking'},
    ],
    suitableCases: [
      {ar: 'زيادة الوزن والسمنة ومقدمات السكري', en: 'Overweight, obesity, and prediabetes'},
      {ar: 'الراغبون في الإقلاع عن التدخين أو الشيشة الإلكترونية', en: 'Adults ready to quit smoking or vaping'},
      {ar: 'إعادة ضبط نمط الحياة والنوم واللياقة', en: 'Lifestyle, sleep, and cardiovascular risk reset'},
    ],
    steps: [
      {ar: 'تقييم خط الأساس الصحي وتحديد الأهداف الواقعية', en: 'Baseline metabolic assessment and realistic goal setting'},
      {ar: 'تطبيق الخطة الطبية والتغذوية والسلوكية', en: 'Start medical, nutritional, and behavioral roadmap'},
      {ar: 'جلسات متابعة منتظمة لضمان الاستمرارية', en: 'Scheduled check-ins to sustain long-term progress'},
    ],
    faqs: [
      {
        question: {ar: 'هل تتوفر متابعة دوائية حديثة وآمنة لإنقاص الوزن عند الحاجة؟', en: 'Are modern medical weight management options assessed when indicated?'},
        answer: {
          ar: 'نعم، يتم تقييم الحاجة الطبية لأدوية إدارة الوزن وفق الضوابط السريرية ومؤشر كتلة الجسم بعد استبعاد الموانع.',
          en: 'Yes, medical weight-loss options are evaluated strictly based on BMI, comorbidities, and clinical safety screening.',
        },
      },
    ],
    durationMinutes: 30,
    modes: ['online'],
  },
  {
    id: 'specialist-referral',
    number: '13',
    category: 'primary',
    title: {ar: 'التحويل إلى الاختصاص المناسب', en: 'Specialist Referral'},
    subtitle: {ar: 'توجيه طبي دقيق وملخص سريري معتمد للتخصص الفرعي', en: 'Targeted Triage & Structured Clinical Referral Summary'},
    shortDesc: {
      ar: 'تحديد التخصص الدقيق الأنسب لحالتك وتجهيز ملف طبي متكامل يختصر الوقت ويضمن دقة التشخيص.',
      en: 'Pinpoints the exact subspecialty you need with a structured medical summary that streamlines specialist care.',
    },
    detailedDesc: {
      ar: 'كثير من المرضى يضيعون وقتاً وجهداً في زيارة تخصص غير مناسب لشكواهم. يقوم طبيب الأسرة بتقييم الحالة أولاً، إجراء الفحوصات التمهيدية الضرورية، ثم تحويلك إلى التخصص الفرعي الدقيق مع تقرير سريري واضح.',
      en: 'Patients frequently lose time visiting the wrong subspecialist first. Your family physician performs the initial workup, orders foundational diagnostics, and prepares a clear referral summary for the exact specialist required.',
    },
    features: [
      {ar: 'توجيه دقيق للتخصص الفرعي الصحيح من المرة الأولى', en: 'Accurate first-time routing to the appropriate subspecialty'},
      {ar: 'إعداد تقرير تحويل طبي احترافي يضم التاريخ والتحاليل', en: 'Concise clinical referral letter with history and workup'},
      {ar: 'متابعة ما بعد زيارة الاختصاصي لتنسيق الخطة العلاجية', en: 'Post-referral coordination to unify medications and care'},
    ],
    suitableCases: [
      {ar: 'الأعراض المتداخلة التي يصعب تحديد تخصصها (قلب، أعصاب، باطنة، روماتيزم)', en: 'Overlapping symptoms needing triage across specialties'},
      {ar: 'الحالات المرشحة لتدخل جراحي أو إجراء تخصصي', en: 'Conditions requiring surgical or subspecialty procedures'},
      {ar: 'مراجعة توصيات أكثر من طبيب اختصاصي', en: 'Integrating advice from multiple specialists'},
    ],
    steps: [
      {ar: 'تقييم سريري شامل لتحديد مصدر الشكوى', en: 'Comprehensive assessment to identify the root system involved'},
      {ar: 'استكمال الفحوصات المبدئية اللازمة قبل التحويل', en: 'Complete essential baseline tests prior to referral'},
      {ar: 'تسليم تقرير التحويل وتوجيه المريض للتخصص الدقيق', en: 'Deliver structured referral report and guide specialist booking'},
    ],
    faqs: [
      {
        question: {ar: 'لماذا أستشير طبيب الأسرة قبل طبيب الاختصاص الدقيق؟', en: 'Why consult a family physician before a subspecialist?'},
        answer: {
          ar: 'لأن طبيب الأسرة يعالج 85% من الحالات مباشرة دون الحاجة لتحويل، وعند لزوم التحويل يوجهك للتخصص الأدق ومعك فحوصاتك جاهزة.',
          en: 'Family physicians resolve up to 85% of issues directly; when subspecialty care is needed, you arrive with the right workup at the right clinic.',
        },
      },
    ],
    durationMinutes: 25,
    modes: ['online'],
  },
  {
    id: 'remote-telemedicine',
    number: '14',
    category: 'telehealth-aesthetics',
    title: {ar: 'الاستشارات الطبية عن بعد', en: 'Remote Medical Consultations'},
    subtitle: {ar: 'استشارات مرئية وصوتية آمنة من أي مكان', en: 'Secure Video & Audio Telehealth From Anywhere'},
    shortDesc: {
      ar: 'تواصل طبي مباشر مع د. معتصم النسور من منزلك أو عملك في السعودية والأردن وخارجهما.',
      en: 'Direct, confidential medical consultations with Dr. Motasem Alnsour from home or work across KSA, Jordan, and abroad.',
    },
    detailedDesc: {
      ar: 'توفر الاستشارة عن بعد وصولاً سريعاً ومرناً لطبيب الأسرة دون عناء التنقل أو الانتظار، وهي مثالية لمتابعة الأمراض المزمنة، قراءة نتائج التحاليل، الاستشارات التغذوية والوقائية، والحصول على رأي طبي موثوق.',
      en: 'Telehealth delivers prompt, convenient access to your family physician without travel or waiting rooms—ideal for chronic care follow-ups, lab interpretation, preventive advice, and trusted second opinions.',
    },
    features: [
      {ar: 'سرية وخصوصية كاملة وفق المعايير الطبية', en: 'Strict medical confidentiality and privacy standards'},
      {ar: 'ملخص خطة علاجية رقمي وإرشادات واضحة بعد الجلسة', en: 'Written post-visit summary and actionable care plan'},
      {ar: 'مناسبة للمسافرين والمقيمين في مختلف المدن', en: 'Accessible across cities in Saudi Arabia, Jordan, and abroad'},
    ],
    suitableCases: [
      {ar: 'تفسير نتائج المختبر والأشعة ومراجعة الأدوية', en: 'Lab and imaging review and medication reconciliation'},
      {ar: 'متابعة استقرار السكري وضغط الدم والغدة الدرقية', en: 'Ongoing diabetes, blood pressure, and thyroid follow-up'},
      {ar: 'الاستشارات الصحية العامة وتوجيه الفحوصات', en: 'General medical advice and diagnostic guidance'},
    ],
    steps: [
      {ar: 'اختيار "استشارة أونلاين" وتحديد الوقت المناسب', en: 'Choose Online Consultation and select your preferred time slot'},
      {ar: 'إجراء الاستشارة المرئية أو الصوتية في الموعد المحدد', en: 'Join your scheduled video or audio consultation'},
      {ar: 'استلام الملخص الطبي وخطة المتابعة', en: 'Receive your digital clinical summary and follow-up plan'},
    ],
    faqs: [
      {
        question: {ar: 'ما هي متطلبات الاستشارة الطبية عن بعد؟', en: 'What do I need for an online consultation?'},
        answer: {
          ar: 'هاتف ذكي أو حاسوب مع اتصال إنترنت، بالإضافة إلى آخر تحاليلك أو قائمة أدويتك الحالية إن وجدت.',
          en: 'A smartphone or computer with internet access, plus any recent lab reports or your current medication list.',
        },
      },
    ],
    durationMinutes: 25,
    modes: ['online'],
  },
  {
    id: 'filler-botox',
    number: '15',
    category: 'telehealth-aesthetics',
    title: {ar: 'خدمات الفيلر والبوتوكس', en: 'Filler & Botox Services'},
    subtitle: {ar: 'استشارة تجميلية طبية أونلاين للتقييم والتخطيط الآمن', en: 'Online Medical Aesthetics Consultation & Safety Assessment'},
    shortDesc: {
      ar: 'استشارة طبية أونلاين لتقييم ملامح الوجه ووضع خطة البوتوكس والفيلر المناسبة بأمان ونتائج طبيعية.',
      en: 'Online physician consultation for facial assessment and personalized natural Botox and dermal filler planning.',
    },
    detailedDesc: {
      ar: 'تبدأ خدمات الطب التجميلي باستشارة طبية دقيقة أونلاين مع د. معتصم لتقييم تشريح الوجه والتاريخ الطبي والتحسس وتحديد الإجراء والمواد الأنسب لتحقيق نتائج متوازنة وطبيعية بعيداً عن المبالغة.',
      en: 'Medical aesthetic care starts with an online physician consultation to review facial anatomy, medical history, and realistic goals for natural-looking Botox and dermal filler plans.',
    },
    features: [
      {ar: 'تقييم طبي مسبق للوجه وموانع الاستخدام أونلاين', en: 'Pre-treatment facial and medical safety screening online'},
      {ar: 'خطة واضحة بنتائج طبيعية متناغمة', en: 'Subtle, natural-looking treatment planning'},
      {ar: 'يشمل استشارات البوتوكس العلاجي لفرط التعرق وشد الفك', en: 'Covers therapeutic Botox guidance for hyperhidrosis and jaw tension'},
    ],
    suitableCases: [
      {ar: 'التقييم المبدئي لخطوط الجبهة وحول العينين (البوتوكس)', en: 'Assessment for dynamic forehead and periorbital lines (Botox)'},
      {ar: 'استشارات تعويض الحجم وتحديد الملامح بالفيلر الطبي', en: 'Planning natural volume restoration (Dermal Fillers)'},
      {ar: 'تقييم حالات فرط التعرق الإبطي والراحي وشد الفك', en: 'Evaluation for hyperhidrosis and masseter relaxation'},
    ],
    steps: [
      {ar: 'حجز استشارة التقييم التجميلي أونلاين', en: 'Book Online Medical Aesthetics Consultation'},
      {ar: 'تقييم الحالة وتاريخ التحسس وتحديد الخطة الأنسب', en: 'Evaluate medical history and tailored aesthetic plan'},
      {ar: 'استلام التوصيات الكاملة وتوجيه الخطوة التنفيذية', en: 'Receive comprehensive plan and follow-up recommendations'},
    ],
    faqs: [
      {
        question: {ar: 'متى تظهر نتائج البوتوكس والفيلر وكم تدوم؟', en: 'When do Botox and Filler results appear and how long do they last?'},
        answer: {
          ar: 'تظهر نتائج البوتوكس خلال 5–14 يوماً وتدوم 4–6 أشهر، بينما يظهر الفيلر فوراً ويستقر خلال أسبوعين ويدوم غالباً 9–15 شهراً حسب المنطقة.',
          en: 'Botox takes effect within 5–14 days and lasts 4–6 months; dermal fillers show immediate results that settle over 2 weeks and typically last 9–15 months.',
        },
      },
    ],
    durationMinutes: 35,
    modes: ['online'],
  },
];
