// ============================================================
// Nav scroll state
// ============================================================
const nav = document.getElementById('nav');
const onScroll = () => {
  if (window.scrollY > 12) {
    nav.classList.add('is-scrolled');
  } else {
    nav.classList.remove('is-scrolled');
  }
};
document.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ============================================================
// Mobile nav toggle
// ============================================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ============================================================
// Active section highlight
// ============================================================
const sections = document.querySelectorAll('main section[id]');
const navAnchors = document.querySelectorAll('.nav__links a');

const setActive = (id) => {
  navAnchors.forEach((a) => {
    a.classList.toggle('is-active', a.getAttribute('href') === `#${id}`);
  });
};

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActive(entry.target.id);
      }
    });
  },
  { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
);

sections.forEach((section) => sectionObserver.observe(section));

// ============================================================
// Hero telemetry readout (decorative, loops continuously)
// ============================================================
const hudAlt = document.getElementById('hudAlt');
const hudVel = document.getElementById('hudVel');

if (hudAlt && hudVel) {
  let alt = 0;
  setInterval(() => {
    alt += Math.random() * 900 + 200;
    if (alt > 118000) alt = 0;
    const vel = 180 + Math.sin(alt / 9000) * 60 + Math.random() * 10;
    hudAlt.textContent = `${Math.round(alt).toLocaleString()} M`;
    hudVel.textContent = `${Math.max(0, Math.round(vel))} M/S`;
  }, 220);
}

// ============================================================
// Project data (feeds both cards' click-through and the modal)
// ============================================================
const projectData = {
  'orbital-stand': {
    tag: 'TREL',
    title: 'Orbital Engine Test Stand',
    detail: "As Structures Lead, I'm coordinating a team of ten through the full design cycle of an underground test stand built to qualify orbital-class rocket engines at Spaceport America. That covers setting the structural requirements, running design reviews, and making the calls on how the stand needs to handle repeated high-thrust, high-vibration test fires underground.",
    highlights: [
      'Leading a 10-person team from concept through fabrication',
      'Setting structural requirements for an underground engine stand',
      'Directing design reviews covering foundation loading and blast containment'
    ],
    chips: ['SolidWorks', 'Team leadership', 'Structural design'],
    images: ['project-orbital-stand-1.jpg', 'project-orbital-stand-2.jpg']
  },
  'copv': {
    tag: 'TREL',
    title: 'Carbon Overwrapped Pressure Vessels',
    detail: 'On the Carbon Overwrapped Pressure Vessel team, I worked on the procedures and hardware that let us validate flight tanks in-house instead of relying on outside test facilities. I designed test fixtures in SolidWorks, ran structural simulations in ANSYS, and installed instrumentation on tanks going through cryogenic cycling.',
    highlights: [
      'Wrote validation procedures for flight-qualified pressure vessels',
      'Designed test hardware in SolidWorks and simulated loads in ANSYS',
      'Instrumented tanks under cryogenic conditions to feed qualification data'
    ],
    chips: ['SolidWorks', 'ANSYS', 'Cryogenic testing'],
    images: ['project-copv-1.jpg', 'project-copv-2.jpg']
  },
  'hybrid-engine': {
    tag: 'Longhorn Rocketry',
    title: 'Hybrid Rocket Engine',
    detail: "For the Longhorn Rocketry Association, I'm developing and manufacturing components for a hybrid rocket engine ahead of hotfire testing at Spaceport America, including fabricating solid fuel grains in HDPE and ABS. Hybrid propulsion sits between solid and liquid engines, and a lot of the work is in getting grain geometry and material choice right so the burn stays consistent.",
    highlights: [
      'Manufacturing fuel grains in HDPE and ABS',
      'Developing propulsion hardware ahead of hotfire testing',
      'Working within a student team toward a Spaceport America test campaign'
    ],
    chips: ['HDPE / ABS', 'Manufacturing'],
    images: ['project-hybrid-engine-1.jpg', 'project-hybrid-engine-2.jpg']
  },
  'battlebot': {
    tag: 'UT Battle Bots',
    title: 'Combat Robot — Design Lead',
    detail: 'As design lead for UT Battle Bots, I built a combat robot in SolidWorks engineered to survive direct hits in its most vulnerable areas, working out armor geometry, weapon mounting, and drivetrain protection before a single part got cut. I fabricated the final robot myself using mills, 3D printers, and laser cutters.',
    highlights: [
      'Designed armor and drivetrain protection for repeated direct impacts',
      'Fabricated the robot using mills, 3D printers, and laser cutters',
      'Iterated through multiple prototypes to balance weight and durability'
    ],
    chips: ['SolidWorks', 'CNC milling', '3D printing'],
    images: ['project-battlebot-1.jpg', 'project-battlebot-2.jpg']
  },
  'motorcycle': {
    tag: 'Personal',
    title: 'Project Motorcycle',
    detail: "Project Motorcycle is a ground-up rebuild of a 2003 Honda Shadow A.C.E, starting with reconstructing sections of the body structure that had corroded or been damaged over two decades of use. From there I've been upgrading the fuel and air systems to get more performance out of the stock engine.",
    highlights: [
      'Reconstructed corroded and damaged body structure',
      'Upgraded fuel and air systems for more performance',
      'Applying rocket-hardware fabrication skills to something rideable'
    ],
    chips: ['Fabrication'],
    images: ['project-motorcycle-1.jpg', 'project-motorcycle-2.jpg']
  },
  'printer-3d': {
    tag: 'Personal',
    title: '3D Printer Rebuild',
    detail: "I rebuilt a stock Ender 3 from the ground up: added structural supports to cut down on ringing and vibration, retrofitted self-leveling for reliable first layers, improved cooling for cleaner overhangs, and added wireless monitoring so I can keep an eye on long prints remotely.",
    highlights: [
      'Added structural supports to reduce ringing and vibration',
      'Retrofitted self-leveling and improved cooling',
      'Added wireless monitoring for remote print tracking'
    ],
    chips: ['Mechatronics'],
    images: ['project-3dprinter-1.jpg', 'project-3dprinter-2.jpg']
  }
};

// ============================================================
// Project modal
// ============================================================
const modalOverlay = document.getElementById('modalOverlay');
const modalPanel = document.getElementById('modalPanel');
const modalClose = document.getElementById('modalClose');
const modalGallery = document.getElementById('modalGallery');
const modalTag = document.getElementById('modalTag');
const modalTitle = document.getElementById('modalTitle');
const modalDetail = document.getElementById('modalDetail');
const modalHighlights = document.getElementById('modalHighlights');
const modalChips = document.getElementById('modalChips');

const cameraIconSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13" r="3.5"/></svg>';

let lastFocused = null;

function buildGallerySlot(filename, alt) {
  const slot = document.createElement('div');
  slot.className = 'card__media';
  slot.innerHTML = `
    <img src="images/${filename}" alt="${alt}">
    <div class="card__media-placeholder">
      ${cameraIconSvg}
      <span>images/${filename}</span>
    </div>
  `;
  const img = slot.querySelector('img');
  img.addEventListener('error', () => slot.classList.add('is-empty'));
  return slot;
}

function openProjectModal(id) {
  const data = projectData[id];
  if (!data || !modalOverlay) return;

  modalTag.textContent = data.tag;
  modalTitle.textContent = data.title;
  modalDetail.textContent = data.detail;

  modalHighlights.innerHTML = '';
  data.highlights.forEach((point) => {
    const li = document.createElement('li');
    li.textContent = point;
    modalHighlights.appendChild(li);
  });

  modalChips.innerHTML = '';
  data.chips.forEach((chip) => {
    const span = document.createElement('span');
    span.className = 'chip';
    span.textContent = chip;
    modalChips.appendChild(span);
  });

  modalGallery.innerHTML = '';
  data.images.forEach((filename) => {
    modalGallery.appendChild(buildGallerySlot(filename, data.title));
  });

  modalOverlay.setAttribute('data-open', 'true');
  document.body.classList.add('modal-open');
  modalClose.focus();
}

function closeProjectModal() {
  if (!modalOverlay) return;
  modalOverlay.setAttribute('data-open', 'false');
  document.body.classList.remove('modal-open');
  if (lastFocused) lastFocused.focus();
}

document.querySelectorAll('[data-project]').forEach((card) => {
  card.addEventListener('click', () => {
    lastFocused = card;
    openProjectModal(card.getAttribute('data-project'));
  });
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      lastFocused = card;
      openProjectModal(card.getAttribute('data-project'));
    }
  });
});

if (modalOverlay) {
  modalClose.addEventListener('click', closeProjectModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeProjectModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.getAttribute('data-open') === 'true') {
      closeProjectModal();
    }
  });
}

// ============================================================
// Skill tiles — jump to and briefly highlight the related project
// ============================================================
document.querySelectorAll('.skill-tile[data-projects]').forEach((tile) => {
  tile.addEventListener('click', () => {
    const ids = tile.getAttribute('data-projects').split(',').map((s) => s.trim());
    const cards = ids
      .map((id) => document.querySelector(`[data-project="${id}"]`))
      .filter(Boolean);

    if (!cards.length) return;

    cards[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
    cards.forEach((card) => {
      card.classList.add('is-highlighted');
      setTimeout(() => card.classList.remove('is-highlighted'), 1800);
    });
  });
});
