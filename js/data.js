/* ===== EDIT THIS FILE: school name, contact details and fixed text. News, calendar, slides, gallery and programs live in your Google Sheet. ===== */
const SITE={
  name:"Sample School",nameNe:"नमुना विद्यालय",tagline:"Learning today, leading tomorrow",taglineNe:"आजको शिक्षा, भोलिको नेतृत्व",
  email:"bishal94110@gmail.com",phone:"+977-XX-XXXXXX",address:"[School address, City, Nepal]",addressNe:"[विद्यालयको ठेगाना, सहर, नेपाल]",hours:"Sun-Fri, 9:00 AM - 4:00 PM",hoursNe:"आइत–शुक्र, बिहान ९:०० – दिउँसो ४:००",
  API:"PASTE_APPS_SCRIPT_WEB_APP_URL_HERE",   // Google Sheet database (see README)
  nav:[["index","Home"],["about","About"],["academics","Academics"],["admissions","Admissions"],["calendar","Calendar"],["notices","Notices"],["gallery","Gallery"],["contact","Contact"]],
  cta:["Apply Now","admissions.html"],
  principal:{name:"[Principal Name]",nameNe:"[प्रधानाध्यापकको नाम]",role:"Principal",photo:"assets/images/principal.svg",message:"[Write the principal's welcome message here. Two or three short paragraphs work best.]",messageNe:"[प्रधानाध्यापकको स्वागत सन्देश यहाँ लेख्नुहोस्।]"},
  about:["[Write about your school's history, vision and values here.]","[Add more: mission, achievements, teaching approach.]"],
  aboutNe:["[विद्यालयको इतिहास, दृष्टिकोण र मूल्यबारे यहाँ लेख्नुहोस्।]","[थप्नुहोस्: लक्ष्य, उपलब्धि र शिक्षण पद्धति।]"],
  facilities:["Library","Science Laboratory","Computer Lab","Sports Ground","Canteen","School Transport"],
  stats:[["25+","Years of service"],["1200","Students"],["60","Teachers"],["98%","Pass rate"]],
  admission:["Collect the admission form from the office or fill the form below.","Submit the form with the required documents.","Attend the entrance test or interview, if required.","Pay the admission fee and join your class."],
  admissionNe:["कार्यालयबाट भर्ना फाराम लिनुहोस् वा तलको फाराम भर्नुहोस्।","आवश्यक कागजातसहित फाराम बुझाउनुहोस्।","आवश्यक भए प्रवेश परीक्षा वा अन्तर्वार्तामा सहभागी हुनुहोस्।","भर्ना शुल्क बुझाएर आफ्नो कक्षामा सहभागी हुनुहोस्।"],
  documents:"[Birth certificate, previous mark sheet, passport size photos, guardian's citizenship copy...]",
  documentsNe:"[जन्मदर्ता, अघिल्लो कक्षाको लब्धाङ्कपत्र, पासपोर्ट साइज तस्बिर, अभिभावकको नागरिकता प्रतिलिपि...]",
  classes:["Nursery","LKG","UKG","Grade 1","Grade 2","Grade 3","Grade 4","Grade 5","Grade 6","Grade 7","Grade 8","Grade 9","Grade 10","Grade 11","Grade 12"]
};
/* Demo content shown until your Google Sheet is connected (or if it cannot be reached). */
const DEMO={
 "slides": [
  {
   "image": "assets/images/slide1.svg",
   "title": "Welcome to Sample School",
   "caption": "Learning today, leading tomorrow.",
   "link": "about.html",
   "cta": "About us"
  },
  {
   "image": "assets/images/slide2.svg",
   "title": "Admissions Open for the New Session",
   "caption": "Apply online - we will contact you within two working days.",
   "link": "admissions.html",
   "cta": "Apply now"
  },
  {
   "image": "assets/images/slide3.svg",
   "title": "Annual Sports Day 2026",
   "caption": "Join us on 15 November for a day of games and celebration.",
   "link": "calendar.html",
   "cta": "See calendar"
  },
  {
   "image": "assets/images/slide4.svg",
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
   "date": "2026-11-15",
   "enddate": "",
   "title": "Annual Sports Day",
   "type": "Event"
  },
  {
   "date": "2026-11-23",
   "enddate": "2026-11-30",
   "title": "Mid-term Examinations",
   "type": "Exam"
  },
  {
   "date": "2026-12-05",
   "enddate": "",
   "title": "Parents-Teachers Meeting",
   "type": "Event"
  },
  {
   "date": "2026-12-25",
   "enddate": "2027-01-10",
   "title": "Winter Vacation",
   "type": "Holiday"
  },
  {
   "date": "2027-01-15",
   "enddate": "",
   "title": "New Session Admission Begins",
   "type": "Admission"
  },
  {
   "date": "2027-02-12",
   "enddate": "",
   "title": "Science Fair",
   "type": "Event"
  },
  {
   "date": "2027-03-01",
   "enddate": "2027-03-12",
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
 ]
};
