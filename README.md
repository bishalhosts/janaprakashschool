# School / College Website
Plain HTML + CSS + JavaScript, hosted free on GitHub Pages. Google Sheets is the database (Google Apps Script is the bridge).

**Design:** a civic-inspired Nepal school identity with official navy, national red and gold accents; responsive navigation; bilingual English/Nepali controls; a Bikram Sambat calendar; admin-managed Drive folders for class PDFs, gallery images, notices, and admission forms; light/dark mode; and keyboard focus styles.

## Connect the Google Sheet database (10 minutes, free)
1. Sign in to Google as **bishal94110@gmail.com** and open https://script.google.com -> **New project**.
2. Delete the sample code and paste the whole of `google-apps-script/Code.gs`. Save.
3. Choose the function **setup** and press **Run**. Allow the permissions. This creates the spreadsheet (check *Execution log* for its link) with all tabs and demo rows.
4. **Deploy -> New deployment -> Web app**. Execute as: **Me**. Who has access: **Anyone**. Deploy and copy the **Web app URL**.
5. Open `js/data.js` and paste the URL into `API:"..."`. Upload the files to GitHub (or refresh the page locally).
6. After updating `Code.gs`: run `setup()` again to add the new tabs/columns without deleting existing rows. Then Deploy -> Manage deployments -> edit -> **New version**.

## How the database works
- **Google Sheets is the data store for editable school information:** public tabs (see below) hold content and metadata, and changes show within about two minutes. PDF and image file bytes live in Google Drive; Drive file links are published through Apps Script. Set a Sheet row's `Published` to `No` to hide it.
- **Private tabs** (visitors' form submissions): never shown on the website. You also get an e-mail at bishal94110@gmail.com for each new submission.
- Images: use `assets/images/...` paths, any direct image URL, or a Google Drive share link (set sharing to *Anyone with the link*).
- Until the URL is added, the site shows demo content and forms say the database is not connected.
- Spam protection: hidden honeypot field, time check, duplicate check, rate limit, input validation and formula-injection protection run on the server.

### Sheet tabs
| Tab            | Public?     | Columns                                                                                        |
| -------------- | ----------- | ---------------------------------------------------------------------------------------------- |
| Slides         | yes         | Image, Title, Caption, Link, CTA, Title_ne, Caption_ne, CTA_ne, Published (home-page slider)   |
| Notices        | yes         | ID, Date, Title, Category, Description, Title_ne, Category_ne, Description_ne, File, Published |
| Calendar       | yes         | legacy Date / EndDate, Title, Type, Title_ne, Type_ne, Published, DateBS, EndDateBS (optional) |
| Gallery        | yes         | Image, Caption, Caption_ne, Category, Published                                                |
| Programs       | yes         | Title, Description, Title_ne, Description_ne, Published                                        |
| ClassSubjects  | yes         | Class, Subject, Description, Class_ne, Subject_ne, Description_ne, File, Published             |
| AdmissionFiles | yes         | Title, File, Description, Title_ne, Description_ne, Published                                  |
| Enquiries      | **private** | admission and contact form submissions (set Status / Notes yourself)                           |

Use the **नेपाली** button in the header to switch the interface language; the choice is remembered on the visitor's device. The interface and demo content have Nepali translations. For your own Google Sheet content, fill the optional `_ne` columns with Nepali text; if left blank, the English entry is shown. If your spreadsheet already exists, add those columns to its relevant tabs manually. Fixed text such as the principal message, about text, school name, contact details and class list is configured in `js/data.js`; optional Nepali versions use corresponding properties such as `nameNe`, `taglineNe`, `addressNe`, `hoursNe`, `messageNe`, `aboutNe`, `admissionNe` and `documentsNe`.

### Admin publishing
- Keep the spreadsheet private to school administrators. The website reads only rows from public tabs that are not marked `No` in `Published`; visitors cannot edit the sheet. Changes usually appear within two minutes.
- **Calendar:** enter dates in `DateBS` and optional `EndDateBS` as Bikram Sambat `YYYY-MM-DD` text, for example `2083-07-29`. `setup()` formats these columns as plain text. If editing an existing spreadsheet, run `setup()` after updating the Apps Script, and check that the new date columns are formatted as plain text. Activities are entered as rows in the Calendar tab; set `Published` to `Yes` to show them.
- **Google Drive uploads:** after updating Apps Script, run `setup()` and grant the requested Google Drive permission. Find the **Notices**, **Gallery**, **Admissions**, and **Academics** folder URLs in the Apps Script execution log. Bookmark these folders and upload files directly; no website-code or Sheet-link edits are needed for uploads. The root and folders remain admin-only; each supported uploaded file is automatically shared as **Anyone with the link — Viewer** because it is being published on a public website. Do not upload student records, personal information, or unpublished/private documents.
- **Notices:** upload notice PDFs into the Notices folder (subfolders are scanned too). Use `YYYY-MM-DD__Category__Title.pdf`, for example `2026-11-03__Admission__New-session-admission.pdf`, to set its displayed date, category and title. PDFs without that naming pattern still appear using the upload date and filename. They appear as downloadable document cards on the Notices page. Existing notices entered in the Notices sheet remain supported; provide a Drive file URL in `File` to show a PDF download button.
- **Gallery:** create a folder for each category inside Gallery (for example, `Sports` or `Events`) and upload images there. The site uses each first-level folder as a clickable gallery category; deeper subfolders are also scanned. Images in the Gallery root appear under `General`. Upload browser-supported image formats such as JPG, PNG, GIF, WebP, SVG, or AVIF; Drive images automatically appear using thumbnail links. The filename becomes the caption.
- **Admission form papers:** upload PDFs to the **Admissions** folder (subfolders are scanned too). The filename becomes the document title; underscores and hyphens are shown as spaces, and a subfolder name is prepended for organization. PDFs automatically appear as download links on the Admissions page. Remove a file from the folder to take it off the site. Existing `AdmissionFiles` Sheet rows remain supported for documents managed there.
- **Class courses:** create a folder for each class inside Academics (for example, `Class 1`, `Class 2`) and put that class's subject PDFs in it. The site lists the classes like expandable playlists; opening a class reveals links to its PDFs. The PDF filename becomes the subject name, and deeper folders are included under their first-level class folder. Only PDFs inside a class folder are shown. Existing `ClassSubjects` rows remain supported; add a `File` link to make a sheet-managed subject downloadable.
- Directly managed sheet rows remain supported: set `Published` to `No` to hide them. Drive-folder uploads are automatically published; remove a file from its upload folder to take it off the site. New uploads appear automatically when the site next loads after the short content cache expires (up to about two minutes). Protect spreadsheet access and grant edit permission only to administrators.

The Bikram Sambat calendar uses the MIT-licensed [`nepali-date-converter` 3.4.2](https://github.com/subeshb1/Nepali-Date) library from jsDelivr; visitors need an internet connection to load that calendar conversion script. `DateBS` is the authoritative calendar date. Existing AD `Date` / `EndDate` entries remain readable as a compatibility fallback until you replace them with BS dates.

The calendar requests only the Calendar tab from Apps Script instead of loading the complete site content and scanning Drive folders. The date-conversion library is loaded asynchronously only for the home page and calendar, in parallel with the content request.

## Publish on GitHub Pages
Create a repository -> upload all files of this folder -> Settings -> Pages -> Deploy from branch `main` / root. Test every page and submit a test enquiry.
