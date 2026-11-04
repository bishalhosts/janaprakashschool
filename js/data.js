/* ===== EDIT THIS FILE: school name, contact details and fixed text. News, B.S. activities, slides, gallery, programs, class subjects and admission files live in your Google Sheet. ===== */
const SITE = {
  // School Information
  name: "Shree JanaPrakash Sec. School",
  nameNe: "श्री जनप्रकाश माध्यमिक विद्यालय",

  tagline: "Learning today, leading tomorrow",
  taglineNe: "आजको शिक्षा, भोलिको नेतृत्व",

  // Change this path to use a different logo in the header and browser tab.
  logo: "assets/images/logo.png",

  // Contact Information
  email: "janaprakashschool@gmail.com",
  phone: "+977-9841109411",

  address: "Kolti-2, Bajura",
  addressNe: "कोल्टी–२, बाजुरा",

  hours: "Sun-Fri, 9:00 AM - 4:00 PM",
  hoursNe: "आइत–शुक्र, बिहान ९:०० – दिउँसो ४:००",

  // Google Sheets Database API
  API: "https://script.google.com/macros/s/AKfycbz6QAcnXgmONf8GNCTx9n5yKQ78bYDOa5Z0Vr6-NQcob8HaxzRGLyn1uwDtSvW1oUtM/exec",

  // Navigation Menu
  nav: [
    ["index", "Home", "गृहपृष्ठ"],
    ["about", "About", "हाम्रो बारेमा"],
    ["academics", "Academics", "शैक्षिक कार्यक्रम"],
    ["admissions", "Admissions", "भर्ना"],
    ["calendar", "Calendar", "पात्रो"],
    ["notices", "Notices", "सूचनाहरू"],
    ["gallery", "Gallery", "ग्यालरी"],
    ["contact", "Contact", "सम्पर्क"]
  ],

  // Main Call-to-Action Button
  cta: ["Apply Now", "admissions.html"],
  ctaNe: ["अहिले आवेदन दिनुहोस्", "admissions.html"],


  principal: {
    name: "Jayalal Karki",
    nameNe: "जयलाल कार्की",
    role: "Vice.Principal",
    photo: "assets/images/principal.jpg",

    message: "Welcome to Shree Jana Prakash Secondary School, Kolti, Bajura. We are committed to providing quality education in a supportive, disciplined, and student-friendly environment. Our goal is to help every student develop knowledge, skills, creativity, confidence, and good moral values. We believe that education is the foundation of a successful and responsible society. Together with our dedicated teachers, supportive parents, and community, we strive to create a bright future for every learner.",

    messageNe: "श्री जनप्रकाश माध्यमिक विद्यालय, कोल्टी, बाजुरामा हार्दिक स्वागत गर्दछु। हामी विद्यार्थीहरूलाई गुणस्तरीय, व्यावहारिक तथा जीवनोपयोगी शिक्षा प्रदान गर्न प्रतिबद्ध छौँ। प्रत्येक विद्यार्थीमा ज्ञान, सीप, सिर्जनशीलता, आत्मविश्वास र नैतिक मूल्यको विकास गर्नु हाम्रो मुख्य उद्देश्य हो। शिक्षा नै सफल र जिम्मेवार समाज निर्माणको आधार हो भन्ने हाम्रो विश्वास छ। समर्पित शिक्षक, अभिभावक तथा समुदायको सहकार्यमा प्रत्येक विद्यार्थीको उज्ज्वल भविष्य निर्माण गर्न हामी निरन्तर प्रयासरत छौँ।"
  },

  // Add teacher profiles here; each teacher can have an optional photo.
  teachers: [
    {
      name: "Jayalal Karki",
      nameNe: "जयलाल कार्की",
      role: "Vice Principal",
      roleNe: "उपप्रधानाध्यापक",
      photo: "assets/images/principal.jpg"
    }
  ],


  about: [
    "Shree Jana Prakash Secondary School is a community-based educational institution located in Kolti, Budhinanda Municipality, Ward No. 2, Bajura District, Sudurpashchim Province, Nepal. The school has been contributing to the educational development of the Kolti region by providing learning opportunities to children from different communities. It aims to provide quality education, develop students' abilities, and prepare them to become responsible and capable citizens.",

    "The school focuses on academic excellence, practical learning, discipline, creativity, moral values, and overall personality development. Through the combined efforts of dedicated teachers, supportive parents, students, and the local community, the institution strives to create a friendly and inclusive learning environment where every student gets an opportunity to learn, grow, and succeed."
  ],



  aboutNe: [
    "श्री जनप्रकाश माध्यमिक विद्यालय नेपालको सुदूरपश्चिम प्रदेश, बाजुरा जिल्ला, बुढीनन्दा नगरपालिका वडा नं. २, कोल्टीमा अवस्थित एक सामुदायिक शैक्षिक संस्था हो। यस विद्यालयले कोल्टी क्षेत्र तथा आसपासका विभिन्न समुदायका बालबालिकालाई शिक्षाको अवसर प्रदान गर्दै स्थानीय शैक्षिक विकासमा योगदान पुर्‍याउँदै आएको छ। गुणस्तरीय शिक्षा प्रदान गर्नु, विद्यार्थीहरूको क्षमता विकास गर्नु तथा असल, सक्षम र जिम्मेवार नागरिक निर्माण गर्नु विद्यालयको प्रमुख उद्देश्य हो।",

    "विद्यालयले शैक्षिक उत्कृष्टता, व्यावहारिक सिकाइ, अनुशासन, सिर्जनशीलता, नैतिक मूल्य र विद्यार्थीहरूको सर्वाङ्गीण विकासमा विशेष जोड दिँदै आएको छ। समर्पित शिक्षक, सहयोगी अभिभावक, मेहनती विद्यार्थी तथा स्थानीय समुदायको सहकार्यबाट विद्यालयले मैत्रीपूर्ण, समावेशी र गुणस्तरीय शैक्षिक वातावरण निर्माण गर्ने लक्ष्य राखेको छ। प्रत्येक विद्यार्थीलाई सिक्ने, अघि बढ्ने र सफल हुने समान अवसर प्रदान गर्नु हाम्रो प्रतिबद्धता हो।"
  ],

  facilities: [
    "Library",
    "Science Laboratory",
    "Computer Lab",
    "Sports Ground",
    "Canteen",
    "School Transport"
  ],

  facilitiesNe: [
    "पुस्तकालय",
    "विज्ञान प्रयोगशाला",
    "कम्प्युटर प्रयोगशाला",
    "खेल मैदान",
    "खाजा घर",
    "विद्यालय यातायात"
  ],

  stats: [
    ["65+", "Years of Service"],
    ["1200", "Students"],
    ["60", "Teachers"],
    ["98%", "Pass Rate"]
  ],

  statsNe: [
    ["६५+", "सेवाका वर्षहरू"],
    ["१२००", "विद्यार्थीहरू"],
    ["६०", "शिक्षकहरू"],
    ["९८%", "उत्तीर्ण दर"]
  ],

  admission: [
    "Collect the admission form from the office or fill out the online form.",
    "Submit the form with the required documents.",
    "Attend the entrance test or interview, if required.",
    "Pay the admission fee and join your class."
  ],

  admissionNe: [
    "कार्यालयबाट भर्ना फाराम लिनुहोस् वा अनलाइन फाराम भर्नुहोस्।",
    "आवश्यक कागजातसहित फाराम बुझाउनुहोस्।",
    "आवश्यक भए प्रवेश परीक्षा वा अन्तर्वार्तामा सहभागी हुनुहोस्।",
    "भर्ना शुल्क बुझाएर आफ्नो कक्षामा सहभागी हुनुहोस्।"
  ],

  documents: [
    "Birth Certificate",
    "Previous Grade Mark Sheet",
    "Passport-size Photographs",
    "Guardian's Citizenship Certificate Copy",
    "Transfer Certificate (if applicable)"
  ],

  documentsNe: [
    "जन्मदर्ता प्रमाणपत्र",
    "अघिल्लो कक्षाको लब्धाङ्कपत्र",
    "पासपोर्ट साइजका तस्बिरहरू",
    "अभिभावकको नागरिकता प्रमाणपत्रको प्रतिलिपि",
    "स्थानान्तरण प्रमाणपत्र (आवश्यक भएमा)"
  ],

  classes: [
    "Nursery",
    "LKG",
    "UKG",
    "Grade 1",
    "Grade 2",
    "Grade 3",
    "Grade 4",
    "Grade 5",
    "Grade 6",
    "Grade 7",
    "Grade 8",
    "Grade 9",
    "Grade 10",
    "Grade 11",
    "Grade 12"
  ],

  classesNe: [
    "नर्सरी",
    "एलकेजी",
    "युकेजी",
    "कक्षा १",
    "कक्षा २",
    "कक्षा ३",
    "कक्षा ४",
    "कक्षा ५",
    "कक्षा ६",
    "कक्षा ७",
    "कक्षा ८",
    "कक्षा ९",
    "कक्षा १०",
    "कक्षा ११",
    "कक्षा १२"
  ]


};
const DEMO = {
  "slides": [
    {
      "image": "assets/images/slide1.jpg",
      "title": "Welcome to Shree JanaPrakash Sec. School",
      "caption": "Learning today, leading tomorrow.",
      "link": "about.html",
      "cta": "About us"
    },
    {
      "image": "assets/images/slide2.jpg",
      "title": "Admissions Open for the New Session",
      "caption": "Apply online - we will contact you within two working days.",
      "link": "admissions.html",
      "cta": "Apply now"
    },
    {
      "image": "assets/images/slide3.jpg",
      "title": "Annual Sports Day 2026",
      "caption": "Join us on 15 November for a day of games and celebration.",
      "link": "calendar.html",
      "cta": "See calendar"
    },
    {
      "image": "assets/images/slide4.jpg",
      "title": "Our Library and Learning Spaces",
      "caption": "A quiet, well-stocked place for reading and research.",
      "link": "gallery.html",
      "cta": "View gallery"
    }
  ],
  "notices": [
    {
      "id": "n1",
      "date": "2026-10-30",
      "title": "Admission open for the new session",
      "category": "Admission",
      "description": "Admission forms are available at the office and on the Admissions page. Replace this text with the real notice."
    },
    {
      "id": "n2",
      "date": "2026-10-26",
      "title": "Mid-term examination routine published",
      "category": "Exam",
      "description": "Exam routine for all classes. Replace this text with the real notice."
    },
    {
      "id": "n3",
      "date": "2026-10-20",
      "title": "Parents-Teachers meeting on 5 December",
      "category": "Event",
      "description": "All parents are requested to attend. Replace this text with the real notice."
    },
    {
      "id": "n4",
      "date": "2026-10-12",
      "title": "Winter vacation schedule",
      "category": "Holiday",
      "description": "School will remain closed during the vacation. Replace this text with the real notice."
    },
    {
      "id": "n5",
      "date": "2026-09-28",
      "title": "Result of first terminal exam",
      "category": "Result",
      "description": "Results are available from class teachers. Replace this text with the real notice."
    }
  ],
  "calendar": [
    {
      "datebs": "2083-07-29",
      "enddatebs": "",
      "title": "Annual Sports Day",
      "type": "Event"
    },
    {
      "datebs": "2083-08-07",
      "enddatebs": "2083-08-14",
      "title": "Mid-term Examinations",
      "type": "Exam"
    },
    {
      "datebs": "2083-08-19",
      "enddatebs": "",
      "title": "Parents-Teachers Meeting",
      "type": "Event"
    },
    {
      "datebs": "2083-09-10",
      "enddatebs": "2083-09-26",
      "title": "Winter Vacation",
      "type": "Holiday"
    },
    {
      "datebs": "2083-10-01",
      "enddatebs": "",
      "title": "New Session Admission Begins",
      "type": "Admission"
    },
    {
      "datebs": "2083-10-29",
      "enddatebs": "",
      "title": "Science Fair",
      "type": "Event"
    },
    {
      "datebs": "2083-11-17",
      "enddatebs": "2083-11-28",
      "title": "Annual Examinations",
      "type": "Exam"
    }
  ],
  "gallery": [
    {
      "image": "assets/images/gallery/g1.svg",
      "caption": "Morning assembly"
    },
    {
      "image": "assets/images/gallery/g2.svg",
      "caption": "Science laboratory"
    },
    {
      "image": "assets/images/gallery/g3.svg",
      "caption": "Sports day"
    },
    {
      "image": "assets/images/gallery/g4.svg",
      "caption": "Library"
    },
    {
      "image": "assets/images/gallery/g5.svg",
      "caption": "Art exhibition"
    },
    {
      "image": "assets/images/gallery/g6.svg",
      "caption": "Annual function"
    }
  ],
  "programs": [
    {
      "title": "Pre-Primary",
      "description": "Nursery to UKG with play-based learning and early literacy."
    },
    {
      "title": "Primary (Grades 1-5)",
      "description": "Strong foundations in language, mathematics and science."
    },
    {
      "title": "Lower Secondary (6-8)",
      "description": "Building skills, curiosity and good study habits."
    },
    {
      "title": "Secondary (9-10)",
      "description": "SEE preparation with extra support and regular assessments."
    },
    {
      "title": "Higher Secondary (11-12)",
      "description": "[Add the streams you offer: Science, Management, Education...]"
    },
    {
      "title": "Co-curricular",
      "description": "Sports, music, art, debate, scouts and computer club."
    }
  ],
  "classSubjects": [],
  "admissionFiles": []
};
