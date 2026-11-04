/* School page renderers. Data: Google Sheet (or DEMO fallback). */
const byDate = (a, b) => String(b.date).localeCompare(String(a.date));
let noticeCategory = "", noticeQuery = null, calendarViewMonth = null;
const bsNumbers = n => String(n).replace(/\d/g, d => "०१२३४५६७८९"[+d]);
function bsParts(value, legacyAd) {
    if (typeof NepaliDate === "undefined") return null;
    if (value) {
        const m = String(value).trim().match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/);
        if (m) { const y = +m[1], mo = +m[2] - 1, d = +m[3], v = new NepaliDate(y, mo, d).getBS(); return v.year === y && v.month === mo && v.date === d ? v : null }
    }
    if (legacyAd) { const a = new NepaliDate(new Date(String(legacyAd).slice(0, 10) + "T00:00:00")).getBS(); return a }
    return null
}
function bsKey(value, legacyAd) { const p = bsParts(value, legacyAd); return p ? `${p.year}-${String(p.month + 1).padStart(2, "0")}-${String(p.date).padStart(2, "0")}` : "" }
function bsDateBlock(key) { const p = bsParts(key); if (!p) return ""; const d = new NepaliDate(p.year, p.month, p.date); return `<div class="date"><b>${bsNumbers(p.date)}</b><small> ${esc(d.format("MMM", "np"))}</small></div>` }
function bsDateText(key) { const p = bsParts(key); return p ? new NepaliDate(p.year, p.month, p.date).format("DD MMMM YYYY", "np") : "" }
const bsTypeLabels = { holiday: "बिदा", exam: "परीक्षा", event: "कार्यक्रम", admission: "भर्ना" };
const bsTypeLabel = type => bsTypeLabels[type] || String(type || "").toLocaleUpperCase("ne-NP");
function calendarEvent(e) {
    const start = e.datebs ? bsKey(e.datebs) : bsKey("", e.date), hasEnd = e.datebs ? !!e.enddatebs : !!e.enddate;
    let end = e.datebs ? bsKey(e.enddatebs) : bsKey("", e.enddate); if (!hasEnd) end = start;
    if (!start) { console.warn("Skipping calendar row with an invalid BS date", e); return null }
    if (hasEnd && !end) { console.warn("Using the start date because a calendar end date is invalid", e); end = start }
    if (end < start) { console.warn("Using the start date because a calendar end date is earlier", e); end = start }
    return { ...e, _start: start, _end: end, _type: String(e.type || "event").toLowerCase() }
}
R.slider = (el, n, D) => slider(el, D.slides);
R.ticker = (el, n, D) => { const l = [...D.notices].sort(byDate).slice(0, 5); if (!l.length) { el.remove(); return } el.innerHTML = `<div class="wrap"><b>${esc(tr("LATEST"))}</b><div class="tk"><span>${l.map(x => `<a href="notices.html#${esc(x.id)}">${esc(tr(localText(x, "title")))}</a>`).join(" &nbsp;&bull;&nbsp; ")}</span></div></div>` };
R.welcome = el => { const p = SITE.principal; el.innerHTML = `<img src="${esc(p.photo)}" alt="${esc(tr(p.role))}"><div><h2>${esc(tr("Welcome to"))} ${esc(language === "ne" ? (SITE.nameNe || "नमुना विद्यालय") : SITE.name)}</h2><p>${esc(language === "ne" ? (p.messageNe || p.message) : p.message)}</p><p><b>${esc(language === "ne" ? (p.nameNe || p.name) : p.name)}</b><br><small>${esc(tr(p.role))}</small></p><a class="btn ghost" href="about.html">${esc(tr("About our school"))}</a></div>`; el.className += " welcome" };
R.upcoming = (el, n, D) => {
    el.className += " side"; if (typeof NepaliDate === "undefined") { el.innerHTML = `<h3>${esc(tr("Upcoming dates"))}</h3><p>${esc(tr("Nepali calendar could not load. Check your internet connection and reload."))}</p>`; return }
    const nowAd = new Date(), today = bsKey("", `${nowAd.getFullYear()}-${String(nowAd.getMonth() + 1).padStart(2, "0")}-${String(nowAd.getDate()).padStart(2, "0")}`), events = D.calendar.map(calendarEvent).filter(e => e && e._end >= today).sort((a, b) => a._start.localeCompare(b._start)).slice(0, 4);
    el.innerHTML = `<h3>${esc(tr("Upcoming dates"))}</h3><div class="rows">${events.map(e => `<div>${bsDateBlock(e._start)}<div><b>${esc(tr(localText(e, "title")))}</b><br><small>${esc(tr(localText(e, "type")))}${e._end !== e._start ? " · " + tr("until") + " " + bsDateText(e._end) : ""}</small></div></div>`).join("") || `<p>${esc(tr("No upcoming dates."))}</p>`}</div><p><a href="calendar.html">${esc(tr("Full academic calendar &rarr;"))}</a></p>`
};
R.notices = (el, n, D) => {
    const l = [...D.notices].sort(byDate), c = document.getElementById("nCat"), s = document.getElementById("nQ"), q = new URLSearchParams(location.search).get("q") || "";
    const draw = () => { const cv = c ? c.value : noticeCategory, sv = (s ? s.value : (noticeQuery === null ? q : noticeQuery)).toLowerCase(); noticeCategory = cv; noticeQuery = sv; el.innerHTML = l.filter(x => (!cv || x.category === cv) && (x.title + x.description).toLowerCase().includes(sv)).slice(0, n || 99).map((x, i) => `<div class="row notice-doc-row${!n && x.file && fileUrl(x.file) ? " has-file" : ""}" id="${esc(x.id || "n" + i)}">${dblock(x.date)}<div><span class="tag">${esc(tr(localText(x, "category")))}</span><h3>${esc(tr(localText(x, "title")))}</h3>${n ? "" : localText(x, "description") ? `<p>${esc(tr(localText(x, "description")))}</p>` : ""}</div>${!n && x.file && fileUrl(x.file) ? `<a class="btn notice-download" href="${esc(fileUrl(x.file))}" target="_blank" rel="noopener">${esc(tr("Download notice"))}</a>` : ""}</div>`).join("") || `<p>${esc(tr("No notices found."))}</p>` };
    if (c) { c.innerHTML = '<option value="">All categories</option>';[...new Set(l.map(x => x.category))].forEach(v => c.add(new Option(tr(v), v))); c.value = noticeCategory; if (!c.value) noticeCategory = ""; s.value = noticeQuery === null ? q : noticeQuery; c.onchange = () => draw(); s.oninput = () => draw() } draw()
};
R.stats = el => {
    el.innerHTML = SITE.stats.map(([n, l]) => `<div><b data-to="${esc(n)}">${esc(n)}</b>${esc(l)}</div>`).join("");
    const io = new IntersectionObserver(es => es.forEach(x => { if (!x.isIntersecting) return; io.unobserve(x.target); const b = x.target, m = b.dataset.to.match(/^(\d+)(.*)$/); if (!m || matchMedia("(prefers-reduced-motion:reduce)").matches) return; let s = null; const st = ts => { s = s || ts; const p = Math.min((ts - s) / 1300, 1); b.textContent = Math.round(+m[1] * p) + m[2]; if (p < 1) requestAnimationFrame(st) }; requestAnimationFrame(st) })); el.querySelectorAll("b").forEach(b => io.observe(b))
};
R.programs = (el, n, D) => { el.innerHTML = D.programs.map(p => `<div><h3>${esc(tr(localText(p, "title")))}</h3><p>${esc(tr(localText(p, "description")))}</p></div>`).join("") };
R.teachers = el => {
    const teachers = SITE.teachers || [];
    if (!teachers.length) {
        el.innerHTML = `<p class="empty-note">${esc(tr("Teacher profiles will be added soon."))}</p>`;
        return;
    }
    const teacherCards = teachers.map(teacher => {
        const name = language === "ne" ? (teacher.nameNe || teacher.name) : teacher.name;
        const role = language === "ne" ? (teacher.roleNe || teacher.role) : teacher.role;
        const initials = String(name || "").trim().split(/\s+/).slice(0, 2).map(part => part[0] || "").join("");
        return `<article class="teacher-card">${teacher.photo ? `<img src="${esc(teacher.photo)}" alt="${esc(name)}" loading="lazy">` : `<span class="teacher-avatar" aria-hidden="true">${esc(initials)}</span>`}<h3>${esc(name)}</h3><p>${esc(role)}</p></article>`;
    }).join("");
    const copies = Math.max(1, Math.ceil(6 / teachers.length));
    const cards = Array.from({ length: copies }, () => teacherCards).join("");
    el.innerHTML = `<div class="teacher-window" role="region" aria-label="${esc(tr("Our Teachers"))}"><div class="teacher-track"><div class="teacher-group">${cards}</div><div class="teacher-group" aria-hidden="true">${cards}</div></div></div>`;
};
R.subjects = (el, n, D) => {
    const rows = D.classSubjects || [], groups = new Map(); rows.forEach(r => { const name = String(r.class_name || r.class || "").trim(); if (!name) return; if (!groups.has(name)) groups.set(name, []); groups.get(name).push(r) });
    const classes = [...groups.keys()].sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));
    el.innerHTML = classes.length ? classes.map(name => { const items = groups.get(name), classNe = items.find(r => r.class_ne)?.class_ne; return `<details class="class-playlist"><summary><span>${esc(tr(localText({ title: name, title_ne: classNe }, "title")))}</span><small>${items.length} ${esc(tr("subjects"))}</small></summary><div class="playlist-items">${items.map(r => { const subject = localText(r, "subject"), url = r.file && fileUrl(r.file); return `<article class="playlist-item"><div><h3>${esc(tr(subject))}</h3>${localText(r, "description") ? `<p>${esc(tr(localText(r, "description")))}</p>` : ""}</div>${url ? `<a class="btn" href="${esc(url)}" target="_blank" rel="noopener">${esc(tr("Open PDF"))}</a>` : ""}</article>` }).join("")}</div></details>` }).join("") : `<p class="empty-note">${esc(tr("Class subjects will be available soon."))}</p>`
};
R.admissionFiles = (el, n, D) => { const files = (D.admissionFiles || []).filter(f => f.file && fileUrl(f.file)); el.innerHTML = files.length ? `<div class="document-list">${files.map(f => `<article class="document-card"><div><h3>${esc(tr(localText(f, "title")))}</h3>${localText(f, "description") ? `<p>${esc(tr(localText(f, "description")))}</p>` : ""}</div><a class="btn" href="${esc(fileUrl(f.file))}" target="_blank" rel="noopener">${esc(tr("Download form"))}</a></article>`).join("")}</div>` : `<p class="empty-note">${esc(tr("Admission forms will be available here."))}</p>` };
R.gallery = (el, n, D) => {
    const photos = D.gallery.slice(0, n || 99), categories = [...new Set(photos.map(g => String(g.category || "General").trim() || "General"))].sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));
    const draw = category => { el.innerHTML = `<div class="gallery-playlist"><div class="gallery-categories" role="group" aria-label="${esc(tr("Gallery categories"))}"><button type="button" class="gallery-category${category ? "" : " active"}" data-category="">${esc(tr("All photos"))}</button>${categories.map(c => `<button type="button" class="gallery-category${category === c ? " active" : ""}" data-category="${esc(c)}">${esc(tr(c))}</button>`).join("")}</div><div class="gal">${photos.filter(g => !category || (g.category || "General") === category).map(g => `<figure><img src="${esc(imgUrl(g.image))}" alt="${esc(tr(localText(g, "caption")))}" loading="lazy"></figure>`).join("")}</div></div>`; el.querySelectorAll(".gallery-category").forEach(button => { button.setAttribute("aria-pressed", String(button.dataset.category === category)); button.onclick = () => draw(button.dataset.category) }) };
    draw("")
};
R.about = el => { el.innerHTML = SITE.about.map(x => `<p>${esc(language === "ne" ? (SITE.aboutNe && SITE.aboutNe[SITE.about.indexOf(x)] || x) : x)}</p>`).join("") + `<h3>${esc(tr("Facilities"))}</h3><p>${SITE.facilities.map(f => `<span class="tag">${esc(tr(f))}</span>`).join(" &middot; ")}</p>` };
R.steps = el => { el.innerHTML = `<ol class="steps">${SITE.admission.map(x => `<li>${esc(language === "ne" ? (SITE.admissionNe && SITE.admissionNe[SITE.admission.indexOf(x)] || x) : x)}</li>`).join("")}</ol><p><b>${esc(tr("Documents needed:"))}</b> ${esc(language === "ne" ? (SITE.documentsNe || SITE.documents) : SITE.documents)}</p>` };
R.classes = el => { el.innerHTML = `<option value="">${esc(tr("Select class"))}</option>` + SITE.classes.map(c => `<option>${esc(c)}</option>`).join("") };
R.info = el => { el.innerHTML = `<h3>${esc(tr("Visit us"))}</h3><p>${esc(siteText("address"))}</p><p>${esc(tr("Phone:"))} ${esc(SITE.phone)}<br>${esc(tr("Email:"))} <a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a></p><p>${esc(siteText("hours"))}</p>` };
/* The calendar grid and activity dates are always Bikram Sambat. */
R.calendar = (el, n, D) => {
    if (typeof NepaliDate === "undefined") { el.innerHTML = `<p class="msg bad">${esc(tr("Nepali calendar could not load. Check your internet connection and reload."))}</p>`; return }
    const now = new NepaliDate(new Date()).getBS(); let month = calendarViewMonth ? { ...calendarViewMonth } : { year: now.year, month: now.month }; let type = "";
    const events = (D.calendar || []).map(calendarEvent).filter(Boolean);
    const key = (y, m, d) => `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const draw = () => {
        const y = month.year, mo = month.month, first = new NepaliDate(y, mo, 1).getDay(), nextStart = new NepaliDate(y, mo + 1, 1).toJsDate(), lastAd = new Date(nextStart.getFullYear(), nextStart.getMonth(), nextStart.getDate() - 1), days = new NepaliDate(lastAd).getDate(), today = key(now.year, now.month, now.date), list = events.filter(e => !type || e._type === type), start = key(y, mo, 1), end = key(y, mo, days);
        const occurrences = new Map(); list.forEach(e => { const from = e._start > start ? e._start : start, to = e._end < end ? e._end : end; if (from > to) return; for (let d = Number(from.slice(8)); d <= Number(to.slice(8)); d++) { const k = key(y, mo, d); if (!occurrences.has(k)) occurrences.set(k, []); occurrences.get(k).push(e) } });
        let cells = ["आइत", "सोम", "मङ्गल", "बुध", "बिही", "शुक्र", "शनि"].map(d => `<div class="dow">${d}</div>`).join("") + '<div class="off"></div>'.repeat(first);
        for (let d = 1; d <= days; d++) { const k = key(y, mo, d); cells += `<div class="${k === today ? "today" : ""}"><b>${bsNumbers(d)}</b>${(occurrences.get(k) || []).map(e => `<span class="ev" data-t="${esc(e._type)}" title="${esc(tr(localText(e, "title")))}">${esc(tr(localText(e, "title")))}</span>`).join("")}</div>` }
        const inMonth = list.filter(e => e._start <= end && e._end >= start).sort((a, b) => a._start.localeCompare(b._start)), monthTitle = new NepaliDate(y, mo, 1).format("MMMM", "np") + " " + bsNumbers(y), types = [...new Set(events.map(e => e._type))];
        el.innerHTML = `<div class="cal-h"><h2>${monthTitle}</h2><div class="ctl"><button class="btn ghost" id="pm">अघिल्लो</button><button class="btn ghost" id="tm">आज</button><button class="btn ghost" id="nm">अर्को</button><button class="btn" onclick="print()">छाप्नुहोस्</button></div></div>
  <div class="filters"><select id="ty" aria-label="कार्यक्रमको प्रकार छान्नुहोस्"><option value="">सबै प्रकार</option>${types.map(k => `<option value="${esc(k)}"${k === type ? " selected" : ""}>${esc(bsTypeLabel(k))}</option>`).join("")}</select></div>
  <div class="cal">${cells}</div><h3 class="month-events">यस महिनाका कार्यक्रम</h3><div class="rows">${inMonth.map(e => `<div>${bsDateBlock(e._start)}<div><b>${esc(tr(localText(e, "title")))}</b><br><small data-t="${esc(e._type)}">${esc(bsTypeLabel(e._type))}${e._end !== e._start ? " · " + bsDateText(e._end) : ""}</small></div></div>`).join("") || `<p>यस महिनामा कुनै कार्यक्रम छैन।</p>`}</div>`;
        el.querySelector("#pm").onclick = () => { month = { year: mo === 0 ? y - 1 : y, month: (mo + 11) % 12 }; calendarViewMonth = { ...month }; draw() }; el.querySelector("#nm").onclick = () => { month = { year: mo === 11 ? y + 1 : y, month: (mo + 1) % 12 }; calendarViewMonth = { ...month }; draw() }; el.querySelector("#tm").onclick = () => { month = { year: now.year, month: now.month }; calendarViewMonth = { ...month }; draw() }; el.querySelector("#ty").onchange = e => { type = e.target.value; draw() }
    };
    draw()
};