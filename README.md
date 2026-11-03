# School / College Website
Plain HTML + CSS + JavaScript, hosted free on GitHub Pages. Google Sheets is the database (Google Apps Script is the bridge).

**Design:** a civic-inspired Nepal school identity with official navy, national red and gold accents; responsive navigation; bilingual English/Nepali controls; image slider; notices; academic calendar; light/dark mode; and accessible keyboard focus styles.

## Connect the Google Sheet database (10 minutes, free)
1. Sign in to Google as **bishal94110@gmail.com** and open https://script.google.com -> **New project**.
2. Delete the sample code and paste the whole of `google-apps-script/Code.gs`. Save.
3. Choose the function **setup** and press **Run**. Allow the permissions. This creates the spreadsheet (check *Execution log* for its link) with all tabs and demo rows.
4. **Deploy -> New deployment -> Web app**. Execute as: **Me**. Who has access: **Anyone**. Deploy and copy the **Web app URL**.
5. Open `js/data.js` and paste the URL into `API:"..."`. Upload the files to GitHub (or refresh the page locally).
6. After you change `Code.gs` later: Deploy -> Manage deployments -> edit -> **New version**.

## How the database works
- **Public tabs** (you edit them directly in Google Sheets - changes show on the website within ~2 minutes): see list below. Set `Published` to `No` to hide a row.
- **Private tabs** (visitors' form submissions): never shown on the website. You also get an e-mail at bishal94110@gmail.com for each new submission.
- Images: use `assets/images/...` paths, any direct image URL, or a Google Drive share link (set sharing to *Anyone with the link*).
- Until the URL is added, the site shows demo content and forms say the database is not connected.
- Spam protection: hidden honeypot field, time check, duplicate check, rate limit, input validation and formula-injection protection run on the server.

### Sheet tabs
| Tab | Public? | Columns |
|---|---|---|
| Slides | yes | Image, Title, Caption, Link, CTA, Title_ne, Caption_ne, CTA_ne, Published (home-page slider) |
| Notices | yes | ID, Date, Title, Category, Description, Title_ne, Category_ne, Description_ne, Published |
| Calendar | yes | Date, EndDate (optional), Title, Type, Title_ne, Type_ne, Published |
| Gallery | yes | Image, Caption, Caption_ne, Published |
| Programs | yes | Title, Description, Title_ne, Description_ne, Published |
| Enquiries | **private** | admission and contact form submissions (set Status / Notes yourself) |

Use the **नेपाली** button in the header to switch the interface language; the choice is remembered on the visitor's device. The interface and demo content have Nepali translations. For your own Google Sheet content, fill the optional `_ne` columns with Nepali text; if left blank, the English entry is shown. If your spreadsheet already exists, add those columns to its relevant tabs manually. Fixed text such as the principal message, about text, school name, contact details and class list is configured in `js/data.js`; optional Nepali versions use corresponding properties such as `nameNe`, `taglineNe`, `addressNe`, `hoursNe`, `messageNe`, `aboutNe`, `admissionNe` and `documentsNe`.

Dates are written like `2026-11-15`.

## Publish on GitHub Pages
Create a repository -> upload all files of this folder -> Settings -> Pages -> Deploy from branch `main` / root. Test every page and submit a test enquiry.
