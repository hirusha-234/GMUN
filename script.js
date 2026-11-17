// GMUN website script: EXCO year tabs, past editions, filters, menu, contact form.
const DATA = window.GMUN_DATA || {};
const excoGrid = document.getElementById("excoGrid");
const yearHeading = document.getElementById("excoYearHeading");
const excoEditNote = document.getElementById("excoEditNote");
const joinPanel = document.getElementById("joinTeamPanel");
const pastMunGrid = document.getElementById("pastMunGrid");

function initialsFromName(name, fallback) {
  if (!name) return fallback || "GM";
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map(p => p[0]).join("").toUpperCase();
}

let excoCarouselTimer = null;
let excoCarouselCleanup = null;

function renderExco(year) {
  if (!excoGrid || !yearHeading) return;
  const members = (DATA.exco && DATA.exco[year]) || [];

  document.querySelectorAll(".year-tab").forEach(tab => {
    const active = tab.dataset.year === year;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", String(active));
  });

  if (excoCarouselTimer) {
    clearInterval(excoCarouselTimer);
    excoCarouselTimer = null;
  }
  if (excoCarouselCleanup) {
    excoCarouselCleanup();
    excoCarouselCleanup = null;
  }

  if (year === "2027") {
    yearHeading.innerHTML = `<span class="archive-dot"></span><div><p class="eyebrow">GMUN 2027</p><h3>Help build the next <em>EXCO.</em></h3></div><span class="archive-year">2027</span>`;
    if (excoEditNote) excoEditNote.textContent = "The GMUN 2027 team has not been announced yet. Interested in joining the team? Get in touch with the organising committee.";
    if (joinPanel) joinPanel.style.display = "flex";
    excoGrid.innerHTML = "";
    excoGrid.style.display = "none";
    return;
  }

  yearHeading.innerHTML = `<span class="archive-dot"></span><div><p class="eyebrow">THE PEOPLE BEHIND GMUN</p><h3>GMUN ${year} <em>Executive Committee</em></h3></div><span class="archive-year">${year}</span>`;
  if (excoEditNote) excoEditNote.textContent = `Meet the ${members.length} members who brought GMUN ${year} to life. Select a portrait to focus on that member.`;
  if (joinPanel) joinPanel.style.display = "none";
  excoGrid.style.display = "block";

  if (!members.length) {
    excoGrid.innerHTML = '<p class="edit-note">EXCO members for this edition will be announced soon.</p>';
    return;
  }

  excoGrid.innerHTML = `
    <div class="exco-stage" aria-label="GMUN ${year} executive committee portraits">
      <div class="exco-track">
        ${members.map((m, i) => `
          <button class="exco-slide" type="button" data-exco-index="${i}" aria-label="${m.name}, ${m.role}">
            <span class="exco-slide-photo">
              ${m.photo ? `<img src="${m.photo}" alt="${m.name}" loading="lazy" onerror="this.style.display='none'">` : `<span class="exco-initials">${initialsFromName(m.name, m.initials)}</span>`}
            </span>
            <span class="exco-slide-caption">
              <strong>${m.name}</strong>
              <small>${m.role}</small>
            </span>
          </button>
        `).join("")}
      </div>
      <div class="exco-stage-footer">
        <span class="exco-stage-count"><b class="exco-current">01</b> / ${String(members.length).padStart(2, "0")}</span>
        <span class="exco-stage-hint">SELECT A MEMBER · AUTO-ADVANCING</span>
        <span class="exco-stage-controls">
          <button type="button" class="exco-prev" aria-label="Previous EXCO member">←</button>
          <button type="button" class="exco-next" aria-label="Next EXCO member">→</button>
        </span>
      </div>
    </div>`;

  const stage = excoGrid.querySelector(".exco-stage");
  const track = excoGrid.querySelector(".exco-track");
  const slides = Array.from(excoGrid.querySelectorAll(".exco-slide"));
  const currentLabel = excoGrid.querySelector(".exco-current");
  let activeIndex = 0;
  let paused = false;
  let pointerStart = null;

  function positionTrack(animate = true) {
    const active = slides[activeIndex];
    if (!active) return;
    track.style.transition = animate ? "" : "none";
    const x = stage.clientWidth / 2 - (active.offsetLeft + active.offsetWidth / 2);
    track.style.transform = `translate3d(${x}px,0,0)`;
    if (!animate) {
      track.offsetHeight;
      track.style.transition = "";
    }
  }

  function selectMember(index, animate = true) {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const rawDistance = Math.abs(i - activeIndex);
      const distance = Math.min(rawDistance, slides.length - rawDistance);
      slide.classList.toggle("is-active", i === activeIndex);
      slide.classList.toggle("is-near", distance === 1);
      slide.setAttribute("aria-pressed", String(i === activeIndex));
    });
    currentLabel.textContent = String(activeIndex + 1).padStart(2, "0");
    positionTrack(animate);
  }

  const next = () => selectMember(activeIndex + 1);
  const previous = () => selectMember(activeIndex - 1);
  slides.forEach((slide, i) => slide.addEventListener("click", () => selectMember(i)));
  excoGrid.querySelector(".exco-next").addEventListener("click", next);
  excoGrid.querySelector(".exco-prev").addEventListener("click", previous);

  stage.addEventListener("mouseenter", () => { paused = true; });
  stage.addEventListener("mouseleave", () => { paused = false; });
  stage.addEventListener("focusin", () => { paused = true; });
  stage.addEventListener("focusout", () => { paused = false; });
  stage.addEventListener("pointerdown", event => { pointerStart = event.clientX; });
  stage.addEventListener("pointerup", event => {
    if (pointerStart === null) return;
    const delta = event.clientX - pointerStart;
    if (Math.abs(delta) > 45) delta < 0 ? next() : previous();
    pointerStart = null;
  });
  const onResize = () => positionTrack(false);
  window.addEventListener("resize", onResize);
  const onVisibility = () => { paused = document.hidden; };
  document.addEventListener("visibilitychange", onVisibility);

  selectMember(0, false);
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    excoCarouselTimer = setInterval(() => { if (!paused && !document.hidden) next(); }, 2700);
  }
  excoCarouselCleanup = () => {
    window.removeEventListener("resize", onResize);
    document.removeEventListener("visibilitychange", onVisibility);
  };
}

function renderPastEditions() {
  if (!pastMunGrid) return;

  const edition = (DATA.pastEditions || []).find(item => String(item.year) === "2025");
  const photos = edition && Array.isArray(edition.photos) ? edition.photos : [];

  pastMunGrid.classList.add("past-gallery-grid");
  pastMunGrid.innerHTML = photos.map((photo, index) => `
    <a class="archive-gallery-tile" href="${photo}" data-event-photo="${photo}"
       aria-label="View GMUN 2025 conference photograph ${index + 1}">
      <img src="${photo}" alt="GMUN 2025 conference moment ${index + 1}" loading="lazy">
      <span class="archive-gallery-shade"></span>
      <span class="archive-gallery-meta">
        <span class="archive-gallery-kicker">FROM THE ARCHIVES · 2025</span>
        <strong>GMUN 2025</strong>
        <span class="archive-gallery-bottom">
          <span>MOMENT ${String(index + 1).padStart(2, "0")}</span>
          <b aria-hidden="true">↗</b>
        </span>
      </span>
    </a>
  `).join("");

  if (!photos.length) {
    pastMunGrid.innerHTML = '<p class="edit-note">Add the GMUN 2025 photo paths to the photos array in data.js to display the archive gallery.</p>';
  }
}

// One click handler for year tabs and "Meet the EXCO" links on past edition cards
document.addEventListener("click", event => {
  const tab = event.target.closest(".year-tab");
  if (tab) {
    renderExco(tab.dataset.year);
    return;
  }
  const editionLink = event.target.closest("[data-edition-year]");
  if (editionLink) {
    event.preventDefault();
    renderExco(editionLink.dataset.editionYear);
    document.getElementById("exco").scrollIntoView({ behavior: "smooth" });
  }
});

renderExco("2025");
renderPastEditions();

// Registration filters
document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    document.querySelectorAll(".registration-card").forEach(card => {
      card.style.display = filter === "all" || card.dataset.category === filter ? "flex" : "none";
    });
  });
});

// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => nav.classList.remove("open")));
}

// Contact form -> opens email app
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", event => {
    event.preventDefault();
    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const message = document.getElementById("contactMessage").value.trim();
    const subject = encodeURIComponent("GMUN enquiry from " + name);
    const body = encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\n" + message);
    window.location.href = "mailto:gmun.srilanka@gmail.com?subject=" + subject + "&body=" + body;
  });
}

// GMUN EVENT GALLERY JS START
(() => {
  const box = document.getElementById("eventLightbox");
  const large = document.getElementById("eventLightboxImage");
  if (!box || !large) return;
  const links = Array.from(document.querySelectorAll("[data-event-photo]"));
  let current = 0;
  function show(index) {
    if (!links.length) return;
    current = (index + links.length) % links.length;
    large.src = links[current].dataset.eventPhoto;
    large.alt = links[current].querySelector("img")?.alt || "GMUN event photograph";
    box.classList.add("open");
    box.setAttribute("aria-hidden", "false");
  }
  function close() {
    box.classList.remove("open");
    box.setAttribute("aria-hidden", "true");
    large.src = "";
  }
  links.forEach((link, index) => link.addEventListener("click", event => {
    event.preventDefault();
    show(index);
  }));
  box.querySelector(".event-lightbox-close")?.addEventListener("click", close);
  box.querySelector(".event-lightbox-prev")?.addEventListener("click", () => show(current - 1));
  box.querySelector(".event-lightbox-next")?.addEventListener("click", () => show(current + 1));
  box.addEventListener("click", event => { if (event.target === box) close(); });
  document.addEventListener("keydown", event => {
    if (!box.classList.contains("open")) return;
    if (event.key === "Escape") close();
    if (event.key === "ArrowLeft") show(current - 1);
    if (event.key === "ArrowRight") show(current + 1);
  });
})();
// GMUN EVENT GALLERY JS END


/* =================================
   GMUN DUCK LOADER ANIMATION
================================= */

(function () {
  const loader = document.getElementById('duck-loader');

  if (!loader) return;

  let progress = 0;
  let lastTime = null;
  let animationFrame;

  const floor = document.getElementById('dl-floor');
  const body = document.getElementById('dl-body');

  const nearLeg = document.getElementById('dl-nl');
  const nearWeb = document.getElementById('dl-nw');

  const farLeg = document.getElementById('dl-fl');
  const farWeb = document.getElementById('dl-fw');

  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  function step(leg, web, hx, phase) {
    const t = ((phase % (2 * Math.PI)) + 2 * Math.PI)
      % (2 * Math.PI);

    let x = hx;
    let y = 0;
    let angle = 0;

    if (t < Math.PI) {
      x = hx - 12 + (t / Math.PI) * 24;
    } else {
      const q = (t - Math.PI) / Math.PI;

      x = hx + 12 -
        (0.5 - 0.5 * Math.cos(q * Math.PI)) * 24;

      y = -Math.sin(q * Math.PI) * 7.5;
      angle = Math.sin(q * Math.PI) * -14;
    }

    leg.setAttribute('x1', (hx * .85).toFixed(1));
    leg.setAttribute('x2', x.toFixed(1));
    leg.setAttribute('y2', (y - 2).toFixed(1));

    web.setAttribute(
      'transform',
      `translate(${x.toFixed(1)},${y.toFixed(1)})
       rotate(${angle.toFixed(1)})`
    );
  }

  function animate(time) {
    if (!lastTime) lastTime = time;

    const delta = Math.min(time - lastTime, 40);
    lastTime = time;

    progress += (2 * Math.PI / 1.25) * delta / 1000;

    const distance =
      ((progress / (2 * Math.PI)) * 48) % 120;

    if (floor) {
      floor.setAttribute(
        'transform',
        `translate(${-distance},0)`
      );
    }

    step(nearLeg, nearWeb, -4, progress);
    step(farLeg, farWeb, 6, progress + Math.PI);

    body.setAttribute(
      'transform',
      `translate(${(Math.cos(progress * 2) * 1.4).toFixed(2)},
      ${(-Math.abs(Math.sin(progress)) * 3.8).toFixed(2)})
      rotate(${(Math.sin(progress) * 5.5).toFixed(2)},0,-36)`
    );

    animationFrame = requestAnimationFrame(animate);
  }

  if (!reducedMotion) {
    animationFrame = requestAnimationFrame(animate);
  }

  function hideLoader() {
    if (loader.classList.contains('loader-hidden')) return;

    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }

    loader.classList.add('loader-hidden');

    setTimeout(() => {
      loader.remove();
    }, 900);
  }

  // Wait until the website and its assets are loaded.
  window.addEventListener('load', () => {
    setTimeout(hideLoader, 900);
  }, { once: true });

  // Safety fallback if loading takes too long.
  setTimeout(hideLoader, 10000);

})();

