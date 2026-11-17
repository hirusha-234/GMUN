/*
  GMUN WEBSITE CONTENT EDITOR
  ---------------------------
  Update EXCO names/roles and photo paths here. Put image files in assets/.
  2027 intentionally has no team list yet: it displays a "Join the team" call-to-action.
  2026 is the team from the ten images supplied later in the conversation.
  2025 is the original team from the GMUN'25 website content.
  No 2024 edition is listed.
*/
window.GMUN_DATA = {
  exco: {
    "2027": [],
    "2026": [
      { role: "Secretary General", name: "Sandara Ruwanmee", photo: "assets/exco-2026-sandara-ruwanmee.jpg", initials: "SR" },
      { role: "Deputy Secretary General", name: "Gethmini Gihansa", photo: "assets/exco-2026-gethmini-gihansa.jpg", initials: "GG" },
      { role: "USG of Conference Management", name: "Aakhilah Imara", photo: "assets/exco-2026-aakhilah-imara.jpg", initials: "AI" },
      { role: "USG of Finance", name: "Gayandi Perera", photo: "assets/exco-2026-gayandi-perera.jpg", initials: "GP" },
      { role: "USG of Logistics", name: "Manula Jayasekara", photo: "assets/exco-2026-manula-jayasekara.jpg", initials: "MJ" },
      { role: "USG of Outreach", name: "Vihanga Kannangoda", photo: "assets/exco-2026-vihanga-kannangoda.jpg", initials: "VK" },
      { role: "USG of Administration", name: "Isumi Senevirathna", photo: "assets/exco-2026-isumi-senevirathna.jpg", initials: "IS" },
      { role: "USG of Registration", name: "Wethum Dhanawardhana", photo: "assets/exco-2026-wethum-dhanawardhana.jpg", initials: "WD" },
      { role: "USG of Public Relations", name: "Thedin Kudagama", photo: "assets/exco-2026-thedin-kudagama.jpg", initials: "TK" },
      { role: "Special Envoy", name: "Milindu Mahagamage", photo: "assets/exco-2026-milindu-mahagamage.jpg", initials: "MM" }
    ],
    "2025": [
      { role: "Secretary General", name: "Sanumi Gamage", photo: "assets/exco-2025-sanumi-gamage.jpg", initials: "SG" },
      { role: "Deputy Secretary General", name: "Amaya Ranatunge", photo: "assets/exco-2025-amaya-ranatunge.jpg", initials: "AR" },
      { role: "USG of Conference Management", name: "Gethmini Gihansa", photo: "assets/exco-2025-gethmini-gihansa.jpg", initials: "GG" },
      { role: "USG of News and Media", name: "Naduni Kalungalla", photo: "assets/exco-2025-naduni-kalungalla.jpg", initials: "NK" },
      { role: "USG of Outreach", name: "Binuthi Ariyaratne", photo: "assets/exco-2025-binuthi-ariyaratne.jpg", initials: "BA" },
      { role: "USG of Marketing", name: "Kusalya Senanayake", photo: "assets/exco-2025-kusalya-senanayake.jpg", initials: "KS" },
      { role: "Head of IT", name: "Hirusha Lochana", photo: "assets/exco-2025-hirusha-lochana.jpg", initials: "HL" },
      { role: "USG of Logistics", name: "Minsandi Chanulya", photo: "assets/exco-2025-minsandi-chanulya.jpg", initials: "MC" },
      { role: "Head of Registration", name: "Bimandi Anuruddha", photo: "assets/exco-2025-bimandi-anuruddha.jpg", initials: "BA" },
      { role: "Special Envoy", name: "Pamath Jayawardana", photo: "assets/exco-2025-pamath-jayawardana.jpg", initials: "PJ" },
      { role: "Head of Admin", name: "Sandara Ruwanmee", photo: "assets/exco-2025-sandara-ruwanmee.jpg", initials: "SR" },
      { role: "USG of Finance", name: "Kalika Senadeera", photo: "assets/exco-2025-kalika-senadeera.jpg", initials: "KS" }
    ]
  },
  committees: [
    { acronym: "GA1", title: "General Assembly 1", description: "Discusses global peace and security through international cooperation on disarmament and arms control.", studyGuide: "https://drive.google.com/file/d/1Z4nVuk1_8wid2NqjzzQJe7zq_E4yTJAL/view?usp=sharing" },
    { acronym: "UNESCO", title: "UNESCO", description: "Promotes collaboration in education, science, and culture to foster peace and mutual understanding.", studyGuide: "https://drive.google.com/file/d/1VCce5bxdYInZM812D_gpWnGnDSgVjEdE/view?usp=sharing" },
    { acronym: "WTO", title: "World Trade Organization", description: "Regulates international trade and fosters cooperation to ensure smooth and fair economic exchange.", studyGuide: "https://drive.google.com/file/d/1NUanVcQXkVL5PhJFNs1JwlvIA64_gDdG/view?usp=sharing" },
    { acronym: "War Cabinet", title: "War Cabinet", description: "A high-stakes crisis simulation where delegates act as top officials responding to global emergencies.", studyGuide: "https://drive.google.com/file/d/1LqOFIvVQnupSvQkGZquW8xKtsdM7PK_Z/view?usp=sharing" },
    { acronym: "CSTD", title: "Commission on Science and Technology for Development", description: "Explores how science and technology can drive sustainable development and global innovation.", studyGuide: "https://drive.google.com/file/d/1TlYe7gZEH1hvSz12NBnvPFrzev2VdZEf/view?usp=sharing" },
    { acronym: "IPC", title: "International Press Corps", description: "Covers live committee proceedings through journalism, recordings and interviews.", studyGuide: "https://drive.google.com/file/d/18DvHBj05wZjTvkOEDTfje9rF492l6f46/view?usp=sharing" }
  ],
  pastEditions: [
    { year: "2026", title: "GMUN 2026", subtitle: "Conference archive", description: "Meet the 2026 executive committee and explore the people behind this edition.", image: "assets/gmun-2026-archive-placeholder.png", link: "#exco" },
    { year: "2025", title: "GMUN 2025", subtitle: "Conference archive", description: "250+ delegates · 50 schools · 70 members · 15 EXCO. Held 21–22 June 2025 at the Management Development and Training Institute.", image: "assets/gmun-2025-archive-placeholder.png", link: "#exco", photos: ["assets/event-gallery/2025/gmun-2025-001-511307444-122183623310300829-5560877865276992935-n.jpg", "assets/event-gallery/2025/gmun-2025-002-511026241-122183625278300829-460539205293573824-n.jpg", "assets/event-gallery/2025/gmun-2025-003-513455206-122183616986300829-4738363643758998706-n.jpg", "assets/event-gallery/2025/gmun-2025-004-511197578-122183612876300829-869643030123606692-n.jpg", "assets/event-gallery/2025/gmun-2025-005-508869705-122183611622300829-7097884192076666546-n.jpg", "assets/event-gallery/2025/gmun-2025-006-511968895-122183608556300829-2219308103579679065-n.jpg"] }
  ]
};
