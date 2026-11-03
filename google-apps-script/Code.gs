/**
 * Google Apps Script backend  -  Google Sheets is the database.
 * Setup: paste this file in script.google.com, run setup() once (authorise), then
 * Deploy > New deployment > Web app > Execute as: Me, Who has access: Anyone. Copy the URL into js/data.js (SITE.API).
 *
 * - GET  ?action=content  -> returns public sheet rows and files from managed Drive folders (cached 2 min).
 * - POST {form:"..."}     -> validated, rate-limited and saved into a private tab.
 * Private tabs (enquiries, messages, e-mails...) are never returned by the public URL.
 */
const ADMIN_EMAIL = 'bishal94110@gmail.com';   // receives a notification for every new submission
const CONFIG = {
 "title": "Sample School Database",
 "uploadFolders": {
  "root": "School Website Uploads",
  "notices": "Notices",
  "gallery": "Gallery",
  "admissions": "Admissions"
 },
 "tabs": [
  {
   "name": "Slides",
   "key": "slides",
   "headers": [
    "Image",
    "Title",
    "Caption",
    "Link",
    "CTA",
    "Title_ne",
    "Caption_ne",
    "CTA_ne",
    "Published"
   ],
   "seed": [
    [
     "assets/images/slide1.svg",
     "Welcome to Sample School",
     "Learning today, leading tomorrow.",
     "about.html",
     "About us",
     "",
     "",
     "",
     "Yes"
    ],
    [
     "assets/images/slide2.svg",
     "Admissions Open for the New Session",
     "Apply online - we will contact you within two working days.",
     "admissions.html",
     "Apply now",
     "",
     "",
     "",
     "Yes"
    ],
    [
     "assets/images/slide3.svg",
     "Annual Sports Day 2026",
     "Join us on 15 November for a day of games and celebration.",
     "calendar.html",
     "See calendar",
     "",
     "",
     "",
     "Yes"
    ],
    [
     "assets/images/slide4.svg",
     "Our Library and Learning Spaces",
     "A quiet, well-stocked place for reading and research.",
     "gallery.html",
     "View gallery",
     "",
     "",
     "",
     "Yes"
    ]
   ],
   "public": [
    "image",
    "title",
    "caption",
    "link",
    "cta",
    "title_ne",
    "caption_ne",
    "cta_ne"
   ],
   "hide": [
    "published",
    "no"
   ]
  },
  {
   "name": "Notices",
   "key": "notices",
   "headers": [
    "ID",
    "Date",
    "Title",
    "Category",
    "Description",
    "Title_ne",
    "Category_ne",
    "Description_ne",
    "File",
    "Published"
   ],
   "seed": [
    [
     "n1",
     "2026-10-30",
     "Admission open for the new session",
     "Admission",
     "Admission forms are available at the office and on the Admissions page. Replace this text with the real notice.",
     "",
     "",
     "",
     "",
     "Yes"
    ],
    [
     "n2",
     "2026-10-26",
     "Mid-term examination routine published",
     "Exam",
     "Exam routine for all classes. Replace this text with the real notice.",
     "",
     "",
     "",
     "",
     "Yes"
    ],
    [
     "n3",
     "2026-10-20",
     "Parents-Teachers meeting on 5 December",
     "Event",
     "All parents are requested to attend. Replace this text with the real notice.",
     "",
     "",
     "",
     "",
     "Yes"
    ],
    [
     "n4",
     "2026-10-12",
     "Winter vacation schedule",
     "Holiday",
     "School will remain closed during the vacation. Replace this text with the real notice.",
     "",
     "",
     "",
     "",
     "Yes"
    ],
    [
     "n5",
     "2026-09-28",
     "Result of first terminal exam",
     "Result",
     "Results are available from class teachers. Replace this text with the real notice.",
     "",
     "",
     "",
     "",
     "Yes"
    ]
   ],
   "public": [
    "id",
    "date",
    "title",
    "category",
    "description",
    "title_ne",
    "category_ne",
    "description_ne",
    "file"
   ],
   "hide": [
    "published",
    "no"
   ]
  },
  {
   "name": "Calendar",
   "key": "calendar",
   "headers": [
    "Date",
    "EndDate",
    "Title",
    "Type",
    "Title_ne",
    "Type_ne",
    "Published",
    "DateBS",
    "EndDateBS"
   ],
   "seed": [
    [
     "",
     "",
     "Annual Sports Day",
     "Event",
     "",
     "",
     "Yes",
     "2083-07-29",
     ""
    ],
    [
     "",
     "",
     "Mid-term Examinations",
     "Exam",
     "",
     "",
     "Yes",
     "2083-08-07",
     "2083-08-14"
    ],
    [
     "",
     "",
     "Parents-Teachers Meeting",
     "Event",
     "",
     "",
     "Yes",
     "2083-08-19",
     ""
    ],
    [
     "",
     "",
     "Winter Vacation",
     "Holiday",
     "",
     "",
     "Yes",
     "2083-09-10",
     "2083-09-26"
    ],
    [
     "",
     "",
     "New Session Admission Begins",
     "Admission",
     "",
     "",
     "Yes",
     "2083-10-01",
     ""
    ],
    [
     "",
     "",
     "Science Fair",
     "Event",
     "",
     "",
     "Yes",
     "2083-10-29",
     ""
    ],
    [
     "",
     "",
     "Annual Examinations",
     "Exam",
     "",
     "",
     "Yes",
     "2083-11-17",
     "2083-11-28"
    ]
   ],
   "public": [
    "date",
    "enddate",
    "datebs",
    "enddatebs",
    "title",
    "type",
    "title_ne",
    "type_ne"
   ],
   "hide": [
    "published",
    "no"
   ]
  },
  {
   "name": "Gallery",
   "key": "gallery",
   "headers": [
    "Image",
    "Caption",
    "Caption_ne",
    "Published"
   ],
   "seed": [
    [
     "assets/images/gallery/g1.svg",
     "Morning assembly",
     "",
     "Yes"
    ],
    [
     "assets/images/gallery/g2.svg",
     "Science laboratory",
     "",
     "Yes"
    ],
    [
     "assets/images/gallery/g3.svg",
     "Sports day",
     "",
     "Yes"
    ],
    [
     "assets/images/gallery/g4.svg",
     "Library",
     "",
     "Yes"
    ],
    [
     "assets/images/gallery/g5.svg",
     "Art exhibition",
     "",
     "Yes"
    ],
    [
     "assets/images/gallery/g6.svg",
     "Annual function",
     "",
     "Yes"
    ]
   ],
   "public": [
    "image",
    "caption",
    "caption_ne"
   ],
   "hide": [
    "published",
    "no"
   ]
  },
  {
   "name": "Programs",
   "key": "programs",
   "headers": [
    "Title",
    "Description",
    "Title_ne",
    "Description_ne",
    "Published"
   ],
   "seed": [
    [
     "Pre-Primary",
     "Nursery to UKG with play-based learning and early literacy.",
     "",
     "",
     "Yes"
    ],
    [
     "Primary (Grades 1-5)",
     "Strong foundations in language, mathematics and science.",
     "",
     "",
     "Yes"
    ],
    [
     "Lower Secondary (6-8)",
     "Building skills, curiosity and good study habits.",
     "",
     "",
     "Yes"
    ],
    [
     "Secondary (9-10)",
     "SEE preparation with extra support and regular assessments.",
     "",
     "",
     "Yes"
    ],
    [
     "Higher Secondary (11-12)",
     "[Add the streams you offer: Science, Management, Education...]",
     "",
     "",
     "Yes"
    ],
    [
     "Co-curricular",
     "Sports, music, art, debate, scouts and computer club.",
     "",
     "",
     "Yes"
    ]
   ],
   "public": [
    "title",
    "description",
    "title_ne",
    "description_ne"
   ],
   "hide": [
    "published",
    "no"
   ]
  },
  {
   "name": "ClassSubjects",
   "key": "classSubjects",
   "headers": [
    "Class",
    "Subject",
    "Description",
    "Class_ne",
    "Subject_ne",
    "Description_ne",
    "Published"
   ],
   "seed": [],
   "public": [
    "class",
    "subject",
    "description",
    "class_ne",
    "subject_ne",
    "description_ne"
   ],
   "hide": [
    "published",
    "no"
   ]
  },
  {
   "name": "AdmissionFiles",
   "key": "admissionFiles",
   "headers": [
    "Title",
    "File",
    "Description",
    "Title_ne",
    "Description_ne",
    "Published"
   ],
   "seed": [],
   "public": [
    "title",
    "file",
    "description",
    "title_ne",
    "description_ne"
   ],
   "hide": [
    "published",
    "no"
   ]
  },
  {
   "name": "Enquiries",
   "key": "",
   "headers": [
    "ID",
    "Timestamp",
    "Type",
    "Name",
    "Phone",
    "Email",
    "Class",
    "Message",
    "Status",
    "Notes"
   ],
   "seed": []
  }
 ],
 "forms": {
  "admission": {
   "tab": "Enquiries",
   "prefix": "ADM",
   "cols": [
    "$id",
    "$ts",
    "=Admission",
    "name",
    "phone",
    "email",
    "class",
    "message",
    "=New",
    ""
   ],
   "fields": {
    "name": {
     "req": true,
     "max": 80,
     "min": 2
    },
    "phone": {
     "req": true,
     "max": 20,
     "type": "phone"
    },
    "email": {
     "max": 100,
     "type": "email"
    },
    "class": {
     "req": true,
     "max": 40
    },
    "message": {
     "max": 1000
    }
   },
   "fieldNames": [
    "name",
    "phone",
    "email",
    "class",
    "message"
   ]
  },
  "contact": {
   "tab": "Enquiries",
   "prefix": "MSG",
   "cols": [
    "$id",
    "$ts",
    "=Contact",
    "name",
    "phone",
    "email",
    "",
    "message",
    "=New",
    ""
   ],
   "fields": {
    "name": {
     "req": true,
     "max": 80,
     "min": 2
    },
    "phone": {
     "max": 20,
     "type": "phone"
    },
    "email": {
     "req": true,
     "max": 100,
     "type": "email"
    },
    "message": {
     "req": true,
     "min": 10,
     "max": 1000
    }
   },
   "fieldNames": [
    "name",
    "phone",
    "email",
    "message"
   ]
  }
 }
};
const RE = {email:/^[^\s@]+@[^\s@]+\.[^\s@]+$/, phone:/^[+\d][\d\s-]{6,19}$/, slug:/^[a-z0-9-]{1,80}$/i};

function json_(o){return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);}
function ss_(){
  const p=PropertiesService.getScriptProperties(), id=p.getProperty('SHEET_ID');
  if(id) return SpreadsheetApp.openById(id);
  const ss=SpreadsheetApp.create(CONFIG.title); p.setProperty('SHEET_ID',ss.getId());
  CONFIG.tabs.forEach((t,i)=>{
    const sh=i===0?ss.getSheets()[0].setName(t.name):ss.insertSheet(t.name);
    sh.appendRow(t.headers); sh.setFrozenRows(1);
    sh.getRange(1,1,1,t.headers.length).setFontWeight('bold').setBackground('#e8eefc');
    (t.seed||[]).forEach(r=>sh.appendRow(r));
  });
  return ss;
}
/** Run after updates to add new tabs/columns without replacing existing sheet data. */
function setup(){
  const ss=ss_();
  const props=PropertiesService.getScriptProperties();
  CONFIG.tabs.forEach(t=>{
    let sh=ss.getSheetByName(t.name);
    if(!sh){
      sh=ss.insertSheet(t.name);
      sh.getRange(1,1,1,t.headers.length).setValues([t.headers]);
      sh.setFrozenRows(1);
      sh.getRange(1,1,1,t.headers.length).setFontWeight('bold').setBackground('#e8eefc');
      (t.seed||[]).forEach(r=>sh.appendRow(r));
    }else{
      const last=sh.getLastColumn(),headers=last?sh.getRange(1,1,1,last).getValues()[0].map(x=>String(x).toLowerCase().replace(/\s+/g,'')):[];
      t.headers.forEach(h=>{
        const key=String(h).toLowerCase().replace(/\s+/g,'');
        if(headers.indexOf(key)<0){const col=sh.getLastColumn()+1;sh.getRange(1,col).setValue(h).setFontWeight('bold').setBackground('#e8eefc');headers.push(key);}
      });
    }
    if(t.name==='Calendar'){
      ['DateBS','EndDateBS'].forEach(h=>{
        const headers=sh.getRange(1,1,1,sh.getLastColumn()).getValues()[0].map(x=>String(x).toLowerCase().replace(/\s+/g,''));
        const col=headers.indexOf(h.toLowerCase());
        if(col>=0&&sh.getMaxRows()>1)sh.getRange(2,col+1,sh.getMaxRows()-1,1).setNumberFormat('@');
      });
    }
  });
  let rootId=props.getProperty('UPLOAD_ROOT_ID');
  const root=rootId?DriveApp.getFolderById(rootId):DriveApp.createFolder(CONFIG.uploadFolders.root);
  props.setProperty('UPLOAD_ROOT_ID',root.getId());
  const uploadLinks={};
  ['notices','gallery','admissions'].forEach(key=>{
    const property='UPLOAD_'+key.toUpperCase()+'_ID';
    const id=props.getProperty(property);
    const folder=id?DriveApp.getFolderById(id):root.createFolder(CONFIG.uploadFolders[key]);
    props.setProperty(property,folder.getId());
    uploadLinks[key]=folder.getUrl();
  });
  CacheService.getScriptCache().remove('content');
  Logger.log(ss.getUrl());
  Logger.log('Upload folders for administrators:');
  Logger.log('Notices: '+uploadLinks.notices);
  Logger.log('Gallery: '+uploadLinks.gallery);
  Logger.log('Admissions: '+uploadLinks.admissions);
}

function uploadFolder_(key){
  const id=PropertiesService.getScriptProperties().getProperty('UPLOAD_'+key.toUpperCase()+'_ID');
  if(!id) throw new Error('Upload folders are not set up. Run setup() and redeploy the Apps Script.');
  return DriveApp.getFolderById(id);
}
function publishFile_(file){
  if(file.getSharingAccess()!==DriveApp.Access.ANYONE_WITH_LINK) file.setSharing(DriveApp.Access.ANYONE_WITH_LINK,DriveApp.Permission.VIEW);
}
function folderFiles_(folder,path,rows){
  const files=folder.getFiles();
  while(files.hasNext()) rows.push({file:files.next(),folder:path});
  const folders=folder.getFolders();
  while(folders.hasNext()){
    const child=folders.next();
    folderFiles_(child,path?path+' / '+child.getName():child.getName(),rows);
  }
  return rows;
}
function galleryUploads_(){
  const rows=[],uploads=folderFiles_(uploadFolder_('gallery'),'',[]);
  uploads.forEach(upload=>{
    const file=upload.file;
    if(file.getMimeType().indexOf('image/')!==0){Logger.log('Skipping non-image in Gallery folder: '+file.getName());return}
    publishFile_(file);
    const caption=file.getName().replace(/\.[^.]+$/,'').replace(/[_-]+/g,' ');
    rows.push({image:file.getUrl(),caption:upload.folder?upload.folder+' - '+caption:caption,caption_ne:'',id:file.getId()});
  });
  return rows;
}
function noticeUploads_(){
  const rows=[],uploads=folderFiles_(uploadFolder_('notices'),'',[]),tz=Session.getScriptTimeZone();
  uploads.forEach(upload=>{
    const file=upload.file,mime=file.getMimeType();
    if(mime!=='application/pdf'){Logger.log('Skipping non-PDF in Notices folder: '+file.getName());return}
    publishFile_(file);
    const stem=file.getName().replace(/\.pdf$/i,''),parts=stem.split('__'),validDate=parts.length>=3&&/^\d{4}-\d{2}-\d{2}$/.test(parts[0])&&!isNaN(new Date(parts[0]+'T00:00:00').getTime());
    if(!validDate) Logger.log('Notice filename should be YYYY-MM-DD__Category__Title.pdf: '+file.getName());
    const date=validDate?parts[0]:Utilities.formatDate(file.getLastUpdated(),tz,'yyyy-MM-dd');
    const category=validDate?parts[1].replace(/[_-]+/g,' '):'Notice';
    const title=validDate?parts.slice(2).join('__').replace(/[_-]+/g,' '):stem.replace(/[_-]+/g,' ');
    rows.push({id:'drive-'+file.getId(),date:date,title:title,category:category,description:'',title_ne:'',category_ne:'',description_ne:'',file:file.getUrl()});
  });
  return rows;
}
function admissionUploads_(){
  const rows=[],uploads=folderFiles_(uploadFolder_('admissions'),'',[]);
  uploads.forEach(upload=>{
    const file=upload.file;
    if(file.getMimeType()!=='application/pdf'){Logger.log('Skipping non-PDF in Admissions folder: '+file.getName());return}
    publishFile_(file);
    const title=file.getName().replace(/\.pdf$/i,'').replace(/[_-]+/g,' ');
    rows.push({title:upload.folder?upload.folder+' - '+title:title,file:file.getUrl(),description:'',title_ne:'',description_ne:''});
  });
  return rows;
}
function content_(){
  const cache=CacheService.getScriptCache(), hit=cache.get('content');
  if(hit) return JSON.parse(hit);
  const ss=ss_(), tz=ss.getSpreadsheetTimeZone(), out={};
  CONFIG.tabs.filter(t=>t.public).forEach(t=>{
    const v=ss.getSheetByName(t.name).getDataRange().getValues();
    const h=v.shift().map(x=>String(x).toLowerCase().replace(/\s+/g,''));
    const col=n=>h.indexOf(n);
    out[t.key]=v.filter(r=>{
      if(r.every(c=>c==='')) return false;
      if(t.show && String(r[col(t.show[0])]).toLowerCase()!==t.show[1]) return false;
      if(t.hide && String(r[col(t.hide[0])]).toLowerCase()===t.hide[1]) return false;
      return true;
    }).map(r=>{const o={};
      t.public.forEach(k=>{let x=r[col(k)]; if(x instanceof Date) x=Utilities.formatDate(x,tz,'yyyy-MM-dd'); o[k]=x;});
      return o;});
  });
  out.gallery=out.gallery.concat(galleryUploads_());
  out.notices=out.notices.concat(noticeUploads_());
  out.admissionFiles=out.admissionFiles.concat(admissionUploads_());
  try{cache.put('content',JSON.stringify(out),120);}catch(e){}
  return out;
}
function doGet(e){
  if((e.parameter||{}).action==='content') return json_({ok:true,data:content_()});
  return json_({ok:true,service:CONFIG.title});
}
function safe_(v){v=String(v==null?'':v).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g,'').trim();return /^[=+\-@\t\r]/.test(v)?"'"+v:v;}  // blocks formula injection
function hash_(s){return Utilities.base64Encode(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,s)).slice(0,30);}
function doPost(e){
  try{
    const d=JSON.parse(e.postData.contents);
    if(d.website) return json_({ok:false,error:'Rejected.'});                    // honeypot
    const f=CONFIG.forms[d.form]; if(!f) return json_({ok:false,error:'Unknown form.'});
    const c={};
    for(const k in f.fields){
      const s=f.fields[k]; const v=String(d[k]==null?'':d[k]).trim();
      if(s.req&&!v) return json_({ok:false,error:k+' is required.'});
      if(v.length>(s.max||200)) return json_({ok:false,error:k+' is too long.'});
      if(v&&s.min&&v.length<s.min) return json_({ok:false,error:k+' is too short.'});
      if(v&&s.type&&RE[s.type]&&!RE[s.type].test(v)) return json_({ok:false,error:'Invalid '+k+'.'});
      c[k]=v;
    }
    const lock=LockService.getScriptLock(); lock.waitLock(20000);
    try{
      const cache=CacheService.getScriptCache(), rk='r'+Math.floor(Date.now()/60000), n=+(cache.get(rk)||0);
      if(n>=20) return json_({ok:false,error:'Server busy. Try again in a minute.'});
      const dk='d'+hash_(d.form+JSON.stringify(c)); if(cache.get(dk)) return json_({ok:false,error:'Duplicate submission.'});
      cache.put(rk,String(n+1),120); cache.put(dk,'1',21600);
      const id=f.prefix+'-'+Utilities.formatDate(new Date(),'UTC','yyyyMMdd')+'-'+Utilities.getUuid().slice(0,5).toUpperCase();
      const row=f.cols.map(x=>x==='$id'?id:x==='$ts'?new Date():x.charAt(0)==='='?x.slice(1):safe_(c[x]));
      ss_().getSheetByName(f.tab).appendRow(row);
      try{MailApp.sendEmail(ADMIN_EMAIL,'['+CONFIG.title+'] New '+d.form+' '+id,f.fieldNames.map(k=>k+': '+(c[k]||'-')).join('\n'));}catch(m){}
      return json_({ok:true,id:id});
    } finally {lock.releaseLock();}
  }catch(err){return json_({ok:false,error:'Invalid request.'});}
}
