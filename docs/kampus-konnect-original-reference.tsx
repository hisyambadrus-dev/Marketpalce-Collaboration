import React, { useState, useEffect, useMemo } from 'react';
import {
  Search, Moon, Sun, Globe, CheckCircle2, ShieldCheck, UserCheck, Briefcase, 
  Users, MessageSquare, User, Filter, ArrowUpRight, Send, Paperclip, ChevronRight,
  Sparkles, DollarSign, RefreshCw, Star, Github, Figma, ExternalLink, Code2, 
  Palette, Plus, Clock, AlertCircle, FileText, Check, X, Building2, GraduationCap,
  TrendingUp, Award, Layers, Zap, Eye, ChevronDown, Lock, ShieldAlert
} from 'lucide-react';

// ==========================================
// TRANSLATION DICTIONARY (EN / ID)
// ==========================================
const translations = {
  en: {
    appName: "Kampus Konnect",
    tagline: "The Ultimate Campus Marketplace & Collaboration Hub",
    verifiedStudent: "Verified Student (@ac.id)",
    campusLabel: "Campus",
    navProjects: "Projects & Gigs",
    navTalent: "Student Network",
    navWorkspace: "Workspace & Escrow",
    navProfile: "My Profile",
    searchPlaceholder: "Search projects, skills, courses, or students...",
    filterAll: "All Categories",
    filterTeam: "Team Collaboration (Tugas Besar)",
    filterGigs: "Micro-Gigs & Bounties",
    filterTech: "Tech Stack",
    filterBudget: "Compensation Type",
    cashBudget: "Paid Gig (IDR)",
    barterBudget: "Skill Barter",
    applyModalTitle: "Submit Proposal",
    bidModalTitle: "Submit Service Bid",
    pitchLabel: "Pitch Message / Intro",
    portfolioLinkLabel: "Figma / GitHub / Portfolio Link",
    proposedPriceLabel: "Proposed Rate / Value (IDR or Barter Item)",
    deliveryTimeLabel: "Estimated Delivery Time (Days)",
    submitBtn: "Send Proposal",
    cancelBtn: "Cancel",
    reviewApplicants: "Review Applicants",
    acceptBtn: "Accept & Hire",
    declineBtn: "Decline",
    chatBtn: "Direct Chat",
    openRoles: "Open Roles",
    budget: "Budget / Comp",
    deadline: "Deadline",
    postedBy: "Posted By",
    escrowStatus: "Escrow Status",
    fundsInEscrow: "Funds Secured in Kampus Escrow",
    barterVerified: "Skill-Barter Contract Verified",
    taskProgress: "Project Progress",
    stepRecruiting: "Recruiting",
    stepInProgress: "In Progress",
    stepReview: "Under Review",
    stepCompleted: "Completed",
    chatPlaceholder: "Type your message or share a deliverable link...",
    sendMsg: "Send",
    quickReplies: "Quick Actions",
    quickSubmitWork: "Submit Final Work Link",
    quickRequestReview: "Request Code Review",
    quickConfirmEscrow: "Release Escrow Payment",
    reputationScore: "Reputation Rating",
    skillsHeader: "Verified Skill Matrix",
    portfolioHeader: "Showcase & Completed Works",
    statsProjects: "Projects Completed",
    statsGigs: "Gigs Completed",
    statsEarned: "Est. Earnings",
    barterOffer: "Barter Offer",
    activeWorkspace: "Active Task Workspace",
    noActiveTasks: "No active task selected. Choose a project from the board or applicants list.",
    switchRoleNotice: "Simulated Role Active",
    applySuccess: "Proposal submitted successfully!",
    acceptedSuccess: "Applicant accepted! Workspace initialized.",
    quickApplyFigma: "Include Figma Design URL",
    quickApplyGithub: "Include GitHub Repo URL"
  },
  id: {
    appName: "Kampus Konnect",
    tagline: "Hub Kolaborasi & Marketplace Talenta Mahasiswa",
    verifiedStudent: "Mahasiswa Terverifikasi (@ac.id)",
    campusLabel: "Kampus",
    navProjects: "Proyek & Jasa",
    navTalent: "Jaringan Mahasiswa",
    navWorkspace: "Workspace & Rekber",
    navProfile: "Profil Saya",
    searchPlaceholder: "Cari proyek, keahlian, mata kuliah, atau mahasiswa...",
    filterAll: "Semua Kategori",
    filterTeam: "Kolaborasi Tim (Tugas Besar)",
    filterGigs: "Jasa & Bounty Singkat",
    filterTech: "Keahlian / Tech Stack",
    filterBudget: "Jenis Kompensasi",
    cashBudget: "Jasa Dibayar (Rp)",
    barterBudget: "Barter Keahlian",
    applyModalTitle: "Kirim Lamaran Tim",
    bidModalTitle: "Kirim Penawaran Jasa",
    pitchLabel: "Pesan Singkat / Alasan Melamar",
    portfolioLinkLabel: "Tautan Figma / GitHub / Portofolio",
    proposedPriceLabel: "Harga / Nilai Penawaran (Rp atau Jasa Barter)",
    deliveryTimeLabel: "Estimasi Waktu Pengerjaan (Hari)",
    submitBtn: "Kirim Penawaran",
    cancelBtn: "Batal",
    reviewApplicants: "Tinjau Pelamar",
    acceptBtn: "Terima & Rekrut",
    declineBtn: "Tolak",
    chatBtn: "Chat Langsung",
    openRoles: "Posisi Dibuka",
    budget: "Anggaran / Kompensasi",
    deadline: "Batas Waktu",
    postedBy: "Diunggah Oleh",
    escrowStatus: "Status Rekber (Escrow)",
    fundsInEscrow: "Dana Diamankan di Rekber Kampus",
    barterVerified: "Kontrak Barter Jasa Terverifikasi",
    taskProgress: "Progres Proyek",
    stepRecruiting: "Perekrutan",
    stepInProgress: "Pengerjaan",
    stepReview: "Ditinjau",
    stepCompleted: "Selesai",
    chatPlaceholder: "Ketik pesan atau tautkan berkas hasil kerja...",
    sendMsg: "Kirim",
    quickReplies: "Tindakan Cepat",
    quickSubmitWork: "Kirim Tautan Hasil Kerja",
    quickRequestReview: "Minta Review Hasil",
    quickConfirmEscrow: "Cairkan Dana Rekber",
    reputationScore: "Skor Reputasi",
    skillsHeader: "Matriks Keahlian Terverifikasi",
    portfolioHeader: "Galeri Karya & Hasil Proyek",
    statsProjects: "Proyek Selesai",
    statsGigs: "Jasa Diselesaikan",
    statsEarned: "Est. Pendapatan",
    barterOffer: "Penawaran Barter",
    activeWorkspace: "Ruang Kerja Aktif",
    noActiveTasks: "Belum ada tugas aktif yang dipilih. Pilih proyek dari papan atau pelamar.",
    switchRoleNotice: "Mode Simulasi Peran Aktif",
    applySuccess: "Lamaran/Penawaran berhasil dikirim!",
    acceptedSuccess: "Pelamar diterima! Ruang kerja telah diaktifkan.",
    quickApplyFigma: "Sertakan URL Desain Figma",
    quickApplyGithub: "Sertakan URL Repositori GitHub"
  }
};

// ==========================================
// MOCK INITIAL DATA & DEMO SCENARIOS
// ==========================================
const INITIAL_CAMPUSES = [
  "Universitas Darunnajah - Teknik Informatika",
  "Universitas Indonesia - Ilmu Komputer",
  "Institut Teknologi Bandung - STEI",
  "Universitas Gadjah Mada - TRPL",
  "Telkom University - Rekayasa Perangkat Lunak"
];

const INITIAL_PROJECTS = [
  // --- SCENARIO A: TUGAS BESAR ---
  {
    id: "proj-scenario-a",
    type: "team",
    category: "Pemrograman",
    title: "Pengembangan Web App Agency & Service Booking Hub - Tugas Besar MPPL",
    campus: "Universitas Darunnajah - Teknik Informatika",
    course: "Manajemen Proyek Perangkat Lunak (MPPL)",
    posterName: "Si A (Budi Santoso)",
    posterAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    posterMajor: "Teknik Informatika - Sem 6",
    posterRep: 4.9,
    posterNim: "20210801042",
    openRoles: ["UI/UX Designer", "Frontend Developer"],
    techStack: ["Next.js", "Laravel", "Tailwind CSS", "MySQL"],
    budgetType: "barter",
    budgetValue: "Barter Nilai / Prototyping & Sertifikat Tim",
    deadline: "14 Hari",
    description: "Membutuhkan rekan tim untuk Tugas Besar MPPL. Saya menangani Arsitektur Sistem & Backend Laravel API. Diharapkan UI/UX Designer dapat membuat High-Fidelity Figma Prototype.",
    status: "recruiting",
    applicants: [
      {
        id: "app-sib",
        applicantName: "Si B (Siti Rahma)",
        applicantAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
        applicantMajor: "Desain Komunikasi Visual - Sem 4",
        applicantRep: 4.95,
        appliedRole: "UI/UX Designer",
        pitch: "Halo Si A, saya berpengalaman membuat UI Kit Design System dengan Figma & pernah menjuarai Hackathon Kampus. Saya tertarik bergabung dengan tim MPPL ini!",
        portfolioUrl: "https://figma.com/@sitirahma_design",
        status: "pending"
      }
    ]
  },

  // --- SCENARIO B: MICRO-GIG DEMO ---
  {
    id: "proj-scenario-b",
    type: "gig",
    category: "Pemrograman",
    title: "Optimasi Query Database MySQL & Vector Tracing Logo CorelDRAW",
    campus: "Universitas Indonesia - Ilmu Komputer",
    course: "Basis Data & Desain Grafis",
    posterName: "Si C (Chandra Wijaya)",
    posterAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    posterMajor: "Sistem Informasi - Sem 4",
    posterRep: 4.8,
    posterNim: "20220902118",
    openRoles: ["Database Specialist", "Graphic Designer"],
    techStack: ["MySQL", "CorelDRAW", "SQL Tuning", "Vector Illustration"],
    budgetType: "cash",
    budgetValue: "Rp 150.000 / Barter Prototyping",
    deadline: "2 Hari",
    description: "Dibutuhkan bantuan cepat untuk optimasi query MySQL indexing yang slow response serta merapikan logo kampus menjadi format Vector CorelDRAW (.CDR / .SVG).",
    status: "in_progress",
    escrowStatus: "Funds Held in Kampus Escrow (Rp 150.000)",
    applicants: [
      {
        id: "app-bidder1",
        applicantName: "Ahmad Rizky",
        applicantAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
        applicantMajor: "Teknik Informatika - Sem 8",
        applicantRep: 5.0,
        appliedRole: "Database Specialist",
        pitch: "Siap bantu optimasi query MySQL dalam 24 jam. Sekalian bonus script indexing.",
        portfolioUrl: "https://github.com/ahmadrizky-dev",
        offeredRate: "Rp 150.000",
        status: "accepted"
      }
    ]
  },

  // --- KATEGORI 1: PEMROGRAMAN & SOFTWARE ENGINEERING ---
  {
    id: "gig-dev-1",
    type: "gig",
    category: "Pemrograman",
    title: "Slicing UI Figma ke React + Tailwind CSS (3 Halaman Responsif)",
    campus: "Telkom University - RPL",
    course: "Pemrograman Web Lanjut",
    posterName: "Rian Permana",
    posterAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200",
    posterMajor: "Software Engineering - Sem 5",
    posterRep: 4.7,
    posterNim: "1301204011",
    openRoles: ["Frontend Developer"],
    techStack: ["React.js", "Tailwind CSS", "Figma"],
    budgetType: "cash",
    budgetValue: "Rp 200.000",
    deadline: "2 Hari",
    description: "Dibutuhkan frontend dev untuk slicing 3 screen landing page & dashboard dari file Figma ke dalam komponen React berserta Tailwind CSS. Code harus rapi & modular.",
    status: "recruiting",
    applicants: []
  },
  {
    id: "gig-dev-2",
    type: "gig",
    category: "Pemrograman",
    title: "Setup Auth Sanctum, Middleware & Multi-role Access Control Laravel",
    campus: "Universitas Darunnajah - Teknik Informatika",
    course: "Pemrograman Web Backend",
    posterName: "Fikri Haikal",
    posterAvatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=200",
    posterMajor: "Teknik Informatika - Sem 4",
    posterRep: 4.85,
    posterNim: "20220801009",
    openRoles: ["Backend Engineer"],
    techStack: ["Laravel", "REST API", "Sanctum"],
    budgetType: "cash",
    budgetValue: "Rp 200.000",
    deadline: "2 Hari",
    description: "Butuh bantuan konfigurasi authentication Laravel Sanctum lengkap dengan role permission (Admin, Mahasiswa, Dosen) dan API middleware security.",
    status: "recruiting",
    applicants: []
  },
  {
    id: "gig-dev-3",
    type: "gig",
    category: "Pemrograman",
    title: "Bantuan Deployment Next.js App ke Vercel & SSL Custom Domain",
    campus: "Universitas Gadjah Mada - TRPL",
    course: "Komputasi Awan",
    posterName: "Nadia Utami",
    posterAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200",
    posterMajor: "TRPL - Sem 6",
    posterRep: 4.9,
    posterNim: "21/478901/SV/19200",
    openRoles: ["DevOps / Cloud Specialist"],
    techStack: ["Next.js", "Vercel", "DNS / SSL"],
    budgetType: "cash",
    budgetValue: "Rp 100.000",
    deadline: "1 Hari",
    description: "Bantuan mendesak untuk fixing error build environment variables saat deployment web Next.js ke Vercel dan mendaftarkan custom domain .ac.id.",
    status: "recruiting",
    applicants: []
  },

  // --- KATEGORI 2: DESAIN GRAFIS, UI/UX & MEDIA KREATIF ---
  {
    id: "gig-des-1",
    type: "gig",
    category: "Desain",
    title: "Desain Poster A3 & 3 Carousel Feed Instagram Event Seminar Himpunan",
    campus: "Universitas Indonesia - DKV",
    course: "Desain Media Publikasi",
    posterName: "Anisa Rahmania",
    posterAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    posterMajor: "DKV - Sem 4",
    posterRep: 4.9,
    posterNim: "2206081290",
    openRoles: ["Graphic Designer"],
    techStack: ["Figma", "Photoshop", "Illustrator"],
    budgetType: "cash",
    budgetValue: "Rp 120.000",
    deadline: "2 Hari",
    description: "Membutuhkan desainer grafis untuk membuat 1 Poster utama seminar kampus & 3 slide konten Instagram feed dengan tema Modern Soft Glassmorphism.",
    status: "recruiting",
    applicants: []
  },
  {
    id: "gig-des-2",
    type: "gig",
    category: "Desain",
    title: "Interactive Prototype Figma Dashboard Mobile App (5 Screens)",
    campus: "Institut Teknologi Bandung - STEI",
    course: "Interaksi Manusia dan Komputer",
    posterName: "Reza Febrian",
    posterAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200",
    posterMajor: "Teknik Informatika - Sem 6",
    posterRep: 4.8,
    posterNim: "13520102",
    openRoles: ["UI/UX Designer"],
    techStack: ["Figma", "UI/UX", "Prototyping"],
    budgetType: "cash",
    budgetValue: "Rp 200.000 / Barter Code",
    deadline: "3 Hari",
    description: "Mencari UI/UX desainer yang bisa merangkai komponen prototype interaktif untuk 5 screen utama aplikasi dompet digital mahasiswa.",
    status: "recruiting",
    applicants: []
  },
  {
    id: "gig-des-3",
    type: "gig",
    category: "Desain",
    title: "Editing Video Cinematic Reels TikTok Kegiatan Organisasi UKM (60 Detik)",
    campus: "Telkom University - Ilmu Komunikasi",
    course: "Produksi Konten Digital",
    posterName: "Kevin Sanjaya",
    posterAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    posterMajor: "Ilkom - Sem 4",
    posterRep: 4.75,
    posterNim: "1601202099",
    openRoles: ["Video Editor"],
    techStack: ["CapCut", "Premiere Pro", "Color Grading"],
    budgetType: "cash",
    budgetValue: "Rp 100.000",
    deadline: "1 Hari",
    description: "Tersedia mentahan footage video HD 4K kegiatan inaugurasi. Minta tolong di-edit menjadi video aesthetic berdurasi 60 detik lengkap dengan sound viral & subtitle.",
    status: "recruiting",
    applicants: []
  },

  // --- KATEGORI 3: AKADEMIK, OLAH DATA & DOKUMEN ---
  {
    id: "gig-aka-1",
    type: "gig",
    category: "Akademik",
    title: "Olah Data Statistik SPSS / SmartPLS (Uji Validitas & Regresi Linier)",
    campus: "Universitas Gadjah Mada - FEB",
    course: "Metodologi Penelitian & Pengolahan Data",
    posterName: "Maya Indah",
    posterAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    posterMajor: "Manajemen - Sem 8",
    posterRep: 4.95,
    posterNim: "20/456123/EK/22900",
    openRoles: ["Data Analyst / Statistician"],
    techStack: ["SPSS", "SmartPLS", "Statistik"],
    budgetType: "cash",
    budgetValue: "Rp 250.000",
    deadline: "2 Hari",
    description: "Membutuhkan teman yang jago olah data 120 kuesioner kualitatif menggunakan SPSS/SmartPLS. Termasuk interpretasi ringkas bab 4.",
    status: "recruiting",
    applicants: []
  },
  {
    id: "gig-aka-2",
    type: "gig",
    category: "Akademik",
    title: "Formatting Dokumen Skripsi / IEEE Template & Sitasi Otomatis Mendeley",
    campus: "Universitas Indonesia - Teknik",
    course: "Tugas Akhir / Skripsi",
    posterName: "Dimas Anggara",
    posterAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200",
    posterMajor: "Teknik Elektro - Sem 8",
    posterRep: 4.85,
    posterNim: "1906381022",
    openRoles: ["Document Specialist"],
    techStack: ["Ms Word", "Mendeley", "IEEE Style"],
    budgetType: "cash",
    budgetValue: "Rp 100.000",
    deadline: "1 Hari",
    description: "Merapikan margin 4-4-3-3, daftar isi, daftar gambar otomatis, serta memasukkan 25 referensi ke Mendeley sesuai standar IEEE.",
    status: "recruiting",
    applicants: []
  },
  {
    id: "gig-aka-3",
    type: "gig",
    category: "Akademik",
    title: "Translasi & Paraphrase Abstrak Jurnal Ilmiah (Bilingual EN - ID)",
    campus: "Universitas Darunnajah - Bahasa & Humaniora",
    course: "Academic Writing",
    posterName: "Siti Nurhaliza",
    posterAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    posterMajor: "Sastra Inggris - Sem 6",
    posterRep: 4.9,
    posterNim: "20210901011",
    openRoles: ["Academic Translator"],
    techStack: ["Academic Writing", "Grammarly", "Translation"],
    budgetType: "cash",
    budgetValue: "Rp 75.000",
    deadline: "1 Hari",
    description: "Menerjemahkan 350 kata abstrak skripsi dari Bahasa Indonesia ke Bahasa Inggris akademik tanpa grammar error dan lolos Turnitin < 15%.",
    status: "recruiting",
    applicants: []
  },

  // --- KATEGORI 4: NON-AKADEMIK & OPERASIONAL KAMPUS ---
  {
    id: "gig-ops-1",
    type: "gig",
    category: "Operasional",
    title: "Jasa Dokumentasi Foto & Video Wisuda / Kegiatan Organisasi (2 Jam)",
    campus: "Universitas Indonesia - Vokasi",
    course: "Fotografi Publik",
    posterName: "Bambang Pamungkas",
    posterAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    posterMajor: "Penyiaran - Sem 4",
    posterRep: 4.8,
    posterNim: "2206129811",
    openRoles: ["Photographer"],
    techStack: ["DSLR / Mirrorless", "Lightroom"],
    budgetType: "cash",
    budgetValue: "Rp 250.000",
    deadline: "1 Hari",
    description: "Dibutuhkan fotografer freelance lengkap dengan kamera mirrorless/DSLR untuk foto candid syukuran wisuda di pelataran rektorat.",
    status: "recruiting",
    applicants: []
  },
  {
    id: "gig-ops-2",
    type: "gig",
    category: "Operasional",
    title: "Jastip Cetak Skripsi 3 Eksemplar, Jilid Hardcover & Antar ke Fakultas",
    campus: "Universitas Darunnajah - Teknik Informatika",
    course: "Operasional Kampus",
    posterName: "Ahmad Dahlan",
    posterAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200",
    posterMajor: "Teknik Informatika - Sem 8",
    posterRep: 4.9,
    posterNim: "20200801001",
    openRoles: ["Runner / Jastip"],
    techStack: ["Jastip", "Hardcover Printing"],
    budgetType: "cash",
    budgetValue: "Rp 50.000 (+Biaya Cetak)",
    deadline: "1 Hari",
    description: "Tolong bantu bawa file PDF, cetakkan hardcover tinta emas 3 buku skripsi di percetakan terdekat kampus dan antarkan langsung ke ruang dosen.",
    status: "recruiting",
    applicants: []
  },
  {
    id: "gig-ops-3",
    type: "gig",
    category: "Operasional",
    title: "Operator Sound System Mini & Mic Wireless untuk Seminar Indoor",
    campus: "Institut Teknologi Bandung - SBM",
    course: "Event Management",
    posterName: "Taufik Hidayat",
    posterAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    posterMajor: "SBM - Sem 4",
    posterRep: 4.85,
    posterNim: "19022011",
    openRoles: ["Sound Crew"],
    techStack: ["Audio Mixer", "Microphone Wireless"],
    budgetType: "cash",
    budgetValue: "Rp 200.000",
    deadline: "1 Hari",
    description: "Dibutuhkan sound man berpengalaman untuk menjaga kestabilan mixer audio & mic wireless selama 3 jam sesi seminar Himpunan.",
    status: "recruiting",
    applicants: []
  }
];

const INITIAL_STUDENTS = [
  {
    id: "stud-1",
    name: "Si A (Budi Santoso)",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    campus: "Universitas Darunnajah",
    major: "Teknik Informatika",
    semester: "Semester 6",
    nim: "20210801042",
    repScore: 4.9,
    bio: "Backend Architect & System Analyst enthusiast. Suka merancang REST API scalable dengan Laravel & Next.js.",
    github: "https://github.com/budisantoso-dev",
    figma: "https://figma.com/@budi_system",
    portfolio: "https://budi-portfolio.dev",
    skills: [
      { name: "Next.js", category: "Tech", verified: true },
      { name: "Laravel", category: "Tech", verified: true },
      { name: "Tailwind CSS", category: "Tech", verified: true },
      { name: "MySQL", category: "Tech", verified: true },
      { name: "System Architecture", category: "Analysis", verified: true }
    ],
    stats: { completedProjects: 12, gigsDone: 8, totalEarned: "Rp 3.450.000" }
  },
  {
    id: "stud-2",
    name: "Si B (Siti Rahma)",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    campus: "Universitas Darunnajah",
    major: "Desain Komunikasi Visual",
    semester: "Semester 4",
    nim: "20220901015",
    repScore: 4.95,
    bio: "UI/UX & Product Designer dengan fokus pada Soft Glassmorphism, Micro-interactions, dan Design System.",
    github: "https://github.com/sitirahma",
    figma: "https://figma.com/@sitirahma_design",
    portfolio: "https://dribbble.com/sitirahma",
    skills: [
      { name: "Figma", category: "Design", verified: true },
      { name: "CorelDRAW", category: "Design", verified: true },
      { name: "UI/UX Design", category: "Design", verified: true },
      { name: "Vector Tracing", category: "Design", verified: true },
      { name: "Prototyping", category: "Design", verified: true }
    ],
    stats: { completedProjects: 9, gigsDone: 15, totalEarned: "Rp 4.200.000" }
  },
  {
    id: "stud-3",
    name: "Si C (Chandra Wijaya)",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    campus: "Universitas Indonesia",
    major: "Sistem Informasi",
    semester: "Semester 4",
    nim: "20220902118",
    repScore: 4.8,
    bio: "Database Admin & Fullstack Developer. Spesialisasi pada Query Optimization, Data Indexing, dan React.",
    github: "https://github.com/chandrawijaya",
    figma: "https://figma.com/@chandra_ui",
    portfolio: "https://chandra.dev",
    skills: [
      { name: "MySQL", category: "Tech", verified: true },
      { name: "PostgreSQL", category: "Tech", verified: true },
      { name: "React.js", category: "Tech", verified: true },
      { name: "CorelDRAW", category: "Design", verified: false }
    ],
    stats: { completedProjects: 7, gigsDone: 11, totalEarned: "Rp 2.800.000" }
  }
];

const INITIAL_MESSAGES = [
  {
    id: "m1",
    sender: "Si C (Chandra Wijaya)",
    senderAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    text: "Halo Ahmad! Terima kasih sudah mengambil task Optimasi Query MySQL & Logo Vector.",
    time: "10:14 AM",
    isMe: false
  },
  {
    id: "m2",
    sender: "Ahmad Rizky (You)",
    senderAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    text: "Sama-sama Si C! Saya sudah selesaikan query indexing. Tautan repositori dan file .CDR logo terlampir ya.",
    attachment: "https://github.com/ahmadrizky/query-opt-result.git",
    time: "10:18 AM",
    isMe: true
  }
];

// ==========================================
// MAIN COMPONENT ENTRY POINT
// ==========================================
export default function KampusKonnectApp() {
  // Theme & Language State
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [language, setLanguage] = useState('id'); // 'id' or 'en'
  const t = translations[language];

  // Active Tab & Category Filters
  const [activeTab, setActiveTab] = useState('projects'); // 'projects', 'network', 'workspace', 'profile'
  const [selectedCampus, setSelectedCampus] = useState(INITIAL_CAMPUSES[0]);
  const [projectFilterType, setProjectFilterType] = useState('all'); // 'all', 'team', 'gig'
  const [selectedCategory, setSelectedCategory] = useState('Semua'); // 'Semua', 'Pemrograman', 'Desain', 'Akademik', 'Operasional'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTechFilter, setSelectedTechFilter] = useState('all');

  // Application Dynamic State
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [students] = useState(INITIAL_STUDENTS);
  const [activeWorkspaceProjectId, setActiveWorkspaceProjectId] = useState("proj-scenario-b");
  const [chatMessages, setChatMessages] = useState(INITIAL_MESSAGES);
  const [chatInputText, setChatInputText] = useState('');

  // Modals & Drawers State
  const [applyModalProject, setApplyModalProject] = useState(null);
  const [reviewModalProject, setReviewModalProject] = useState(null);

  // Form inputs for proposal modal
  const [applyForm, setApplyForm] = useState({
    pitch: '',
    portfolioUrl: '',
    proposedPrice: '',
    deliveryDays: '3'
  });

  // Notification Toast State
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Switch Theme helper
  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const toggleLanguage = () => setLanguage(l => l === 'id' ? 'en' : 'id');

  // Filtered Projects Computation with Category Pills Support
  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchType = projectFilterType === 'all' ? true : p.type === projectFilterType;
      const matchCategory = selectedCategory === 'Semua' ? true : p.category === selectedCategory;
      const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.techStack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          p.course.toLowerCase().includes(searchQuery.toLowerCase());
      const matchTech = selectedTechFilter === 'all' ? true : p.techStack.includes(selectedTechFilter);
      return matchType && matchCategory && matchSearch && matchTech;
    });
  }, [projects, projectFilterType, selectedCategory, searchQuery, selectedTechFilter]);

  // Handle Apply Submission
  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!applyModalProject) return;

    const newApplicant = {
      id: `app-${Date.now()}`,
      applicantName: "Si B (Siti Rahma)",
      applicantAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
      applicantMajor: "Desain Komunikasi Visual - Sem 4",
      applicantRep: 4.95,
      appliedRole: applyModalProject.openRoles[0] || "Contributor",
      pitch: applyForm.pitch || "Saya sangat tertarik membantu proyek ini sesuai tenggat waktu.",
      portfolioUrl: applyForm.portfolioUrl || "https://figma.com/@sitirahma_design",
      offeredRate: applyForm.proposedPrice || applyModalProject.budgetValue,
      status: "pending"
    };

    setProjects(prev => prev.map(p => {
      if (p.id === applyModalProject.id) {
        return {
          ...p,
          applicants: [newApplicant, ...p.applicants]
        };
      }
      return p;
    }));

    setApplyModalProject(null);
    setApplyForm({ pitch: '', portfolioUrl: '', proposedPrice: '', deliveryDays: '3' });
    showToast(t.applySuccess);
  };

  // Handle Accept Applicant (Scenario A & B Flow)
  const handleAcceptApplicant = (projectId, applicantId) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          status: 'in_progress',
          escrowStatus: p.type === 'gig' ? 'Funds Held in Kampus Escrow (Rp 150.000)' : 'Skill-Barter Contract Verified',
          applicants: p.applicants.map(a => a.id === applicantId ? { ...a, status: 'accepted' } : a)
        };
      }
      return p;
    }));

    setActiveWorkspaceProjectId(projectId);
    setReviewModalProject(null);
    setActiveTab('workspace');
    showToast(t.acceptedSuccess);
  };

  // Handle Send Chat
  const handleSendChat = (e) => {
    e?.preventDefault();
    if (!chatInputText.trim()) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: "Ahmad Rizky (You)",
      senderAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
      text: chatInputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };

    setChatMessages([...chatMessages, newMsg]);
    setChatInputText('');
  };

  const handleQuickAction = (actionText) => {
    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: "Ahmad Rizky (You)",
      senderAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
      text: `[System Action]: ${actionText}`,
      attachment: "https://kampus-konnect.ac.id/deliverables/v1-final.zip",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };
    setChatMessages([...chatMessages, newMsg]);
    showToast(`Action dispatched: ${actionText}`);
  };

  const activeWorkspaceProject = projects.find(p => p.id === activeWorkspaceProjectId) || projects[1];

  return (
    <div className={`min-h-screen transition-colors duration-200 font-sans ${
      isDarkMode 
        ? 'bg-[#0B0F17] text-slate-100 selection:bg-indigo-500/30' 
        : 'bg-[#F8FAFC] text-slate-900 selection:bg-indigo-100'
    }`}>
      
      {/* Clean Subtle Grid Overlay instead of chaotic glowing AI orbs */}
      <div className={`fixed inset-0 pointer-events-none z-0 opacity-[0.03] ${
        isDarkMode ? 'bg-[radial-gradient(#94a3b8_1px,transparent_1px)]' : 'bg-[radial-gradient(#0f172a_1px,transparent_1px)]'
      } [background-size:16px_16px]`}></div>

      {/* ==========================================
          HEADER & NAVIGATION BAR
      ========================================== */}
      <header className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors duration-200 ${
        isDarkMode 
          ? 'bg-[#0B0F17]/90 border-slate-800/80' 
          : 'bg-white/90 border-slate-200/80'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 whitespace-nowrap">
          
          {/* Logo & Campus Switcher */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveTab('projects')}>
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-sm shrink-0">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight text-slate-100 dark:text-slate-100">
                  Kampus Konnect
                </span>
                <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider -mt-0.5">
                  CAMPUS HUB
                </span>
              </div>
            </div>

            {/* Campus Selector Dropdown */}
            <div className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all ${
              isDarkMode 
                ? 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700' 
                : 'bg-slate-100/70 border-slate-200 text-slate-700 hover:border-slate-300'
            }`}>
              <Building2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <select 
                value={selectedCampus}
                onChange={(e) => setSelectedCampus(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer pr-1 text-xs truncate max-w-[220px]"
              >
                {INITIAL_CAMPUSES.map((c, i) => (
                  <option key={i} value={c} className={isDarkMode ? 'bg-slate-900 text-slate-200' : 'bg-white text-slate-800'}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Navigation Tabs - Clean Professional Line */}
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-xl border bg-slate-900/20 border-slate-800 shrink-0">
            {[
              { id: 'projects', label: t.navProjects, icon: Briefcase },
              { id: 'network', label: t.navTalent, icon: Users },
              { id: 'workspace', label: t.navWorkspace, icon: MessageSquare, badge: projects.filter(p => p.status === 'in_progress').length },
              { id: 'profile', label: t.navProfile, icon: User }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? isDarkMode
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-indigo-600 text-white shadow-sm'
                      : isDarkMode
                        ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{tab.label}</span>
                  {tab.badge ? (
                    <span className="ml-0.5 w-4 h-4 rounded-full bg-emerald-500 text-white text-[9px] flex items-center justify-center font-bold">
                      {tab.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={toggleLanguage}
              className={`px-2.5 py-1.5 rounded-lg border transition-all text-xs font-semibold flex items-center gap-1.5 ${
                isDarkMode 
                  ? 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700' 
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              <span>{language.toUpperCase()}</span>
            </button>

            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg border transition-all ${
                isDarkMode 
                  ? 'bg-slate-900 border-slate-800 text-amber-400 hover:border-slate-700' 
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5 text-indigo-600" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 z-40 border-t p-2 flex justify-around ${
        isDarkMode ? 'bg-[#0B0F17]/95 border-slate-800' : 'bg-white/95 border-slate-200'
      }`}>
        {[
          { id: 'projects', label: t.navProjects, icon: Briefcase },
          { id: 'network', label: t.navTalent, icon: Users },
          { id: 'workspace', label: t.navWorkspace, icon: MessageSquare },
          { id: 'profile', label: t.navProfile, icon: User }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg text-[10px] font-medium ${
                isActive ? 'text-indigo-400 font-bold' : 'text-slate-400'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ==========================================
          MAIN CONTENT AREA
      ========================================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 pb-24 md:pb-12">

        {toastMessage && (
          <div className="fixed top-20 right-6 z-50">
            <div className="px-4 py-2.5 rounded-xl bg-slate-900 text-slate-100 font-medium text-xs shadow-xl flex items-center gap-2 border border-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{toastMessage}</span>
            </div>
          </div>
        )}

        {/* TAB 1: PROJECTS & GIGS BOARD */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            
            {/* Clean Minimal Hero Header */}
            <div className={`p-6 sm:p-7 rounded-2xl border transition-all ${
              isDarkMode 
                ? 'bg-slate-900/60 border-slate-800' 
                : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="max-w-3xl space-y-2.5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Kampus Konnect Platform</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
                  {t.tagline}
                </h1>
                <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Marketplace kolaborasi tugas besar dan jasa mahasiswa terpercaya dengan sistem Rekber Escrow terintegrasi.
                </p>
                
                {/* Scenario Quick Jump */}
                <div className="pt-2 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Demox:</span>
                  <button 
                    onClick={() => {
                      const projA = projects.find(p => p.id === 'proj-scenario-a');
                      setReviewModalProject(projA);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 text-indigo-300 text-xs font-medium transition-all flex items-center gap-1.5"
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>Scenario A: Review Si B (Tugas Besar)</span>
                  </button>
                  <button 
                    onClick={() => {
                      setActiveWorkspaceProjectId('proj-scenario-b');
                      setActiveTab('workspace');
                    }}
                    className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 text-xs font-medium transition-all flex items-center gap-1.5"
                  >
                    <DollarSign className="w-3.5 h-3.5" />
                    <span>Scenario B: Chat Micro-Task Si C</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Filter Controls */}
            <div className="space-y-3">
              <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
                
                {/* Type Filter */}
                <div className={`p-1 rounded-xl border flex items-center gap-1 ${
                  isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  {[
                    { id: 'all', label: t.filterAll },
                    { id: 'team', label: t.filterTeam },
                    { id: 'gig', label: t.filterGigs }
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setProjectFilterType(f.id)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        projectFilterType === f.id
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                {/* Search & Tech Filter */}
                <div className="flex flex-1 max-w-md items-center gap-2">
                  <div className={`flex-1 relative flex items-center rounded-xl border px-3 py-1.5 ${
                    isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
                  }`}>
                    <Search className="w-3.5 h-3.5 text-slate-400 mr-2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t.searchPlaceholder}
                      className="w-full bg-transparent text-xs focus:outline-none placeholder-slate-500"
                    />
                    {searchQuery && (
                      <X className="w-3.5 h-3.5 text-slate-400 cursor-pointer" onClick={() => setSearchQuery('')} />
                    )}
                  </div>

                  <select
                    value={selectedTechFilter}
                    onChange={(e) => setSelectedTechFilter(e.target.value)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-medium focus:outline-none ${
                      isDarkMode 
                        ? 'bg-slate-900/80 border-slate-800 text-slate-300' 
                        : 'bg-white border-slate-200 text-slate-700'
                    }`}
                  >
                    <option value="all">Tech Stack</option>
                    <option value="Next.js">Next.js</option>
                    <option value="Laravel">Laravel</option>
                    <option value="Tailwind CSS">Tailwind CSS</option>
                    <option value="MySQL">MySQL</option>
                    <option value="Figma">Figma</option>
                    <option value="CapCut">CapCut</option>
                    <option value="SPSS">SPSS</option>
                  </select>
                </div>
              </div>

              {/* Sub-Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {["Semua", "Pemrograman", "Desain", "Akademik", "Operasional"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all border ${
                      selectedCategory === cat
                        ? 'bg-indigo-600/10 border-indigo-500/30 text-indigo-400 font-semibold'
                        : isDarkMode
                          ? 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200'
                          : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Clean Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProjects.map((project) => (
                <div 
                  key={project.id}
                  className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between hover:border-slate-700 ${
                    isDarkMode 
                      ? 'bg-slate-900/40 border-slate-800/80' 
                      : 'bg-white border-slate-200/90 shadow-sm'
                  }`}
                >
                  <div className="space-y-3.5">
                    
                    {/* Card Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          project.type === 'team'
                            ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        }`}>
                          {project.type === 'team' ? 'Tugas Besar' : 'Micro-Gig'}
                        </span>
                        {project.category && (
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px] font-medium border border-slate-700/50">
                            {project.category}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1 text-[10px] text-slate-400">
                        <Clock className="w-3 h-3" />
                        <span>{project.deadline}</span>
                      </div>
                    </div>

                    {/* Title & Info */}
                    <div>
                      <h3 className="text-sm font-bold leading-snug">
                        {project.title}
                      </h3>
                      <p className="text-[11px] text-indigo-400 font-medium mt-0.5">
                        {project.course}
                      </p>
                      <p className={`text-xs mt-1.5 line-clamp-2 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1">
                      {project.techStack.map((tech, i) => (
                        <span 
                          key={i} 
                          className={`px-2 py-0.5 rounded text-[10px] font-medium border ${
                            isDarkMode 
                              ? 'bg-slate-800/80 border-slate-700/60 text-slate-300' 
                              : 'bg-slate-100 border-slate-200 text-slate-700'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Compensation Box */}
                    <div className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${
                      isDarkMode ? 'bg-slate-950/40 border-slate-800/80' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="flex items-center gap-1.5">
                        {project.budgetType === 'cash' ? (
                          <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <RefreshCw className="w-3.5 h-3.5 text-indigo-400" />
                        )}
                        <span className="font-semibold text-[11px]">{project.budgetValue}</span>
                      </div>
                    </div>

                    {/* Poster Profile */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/30 text-xs">
                      <div className="flex items-center gap-2">
                        <img 
                          src={project.posterAvatar} 
                          alt={project.posterName} 
                          className="w-6 h-6 rounded-full object-cover border border-slate-700"
                        />
                        <div>
                          <p className="font-semibold text-[11px]">{project.posterName}</p>
                          <p className="text-[9px] text-slate-400">{project.posterMajor}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5 text-amber-400 font-bold text-[11px]">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>{project.posterRep}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 flex items-center gap-2">
                    <button
                      onClick={() => setApplyModalProject(project)}
                      className="flex-1 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all flex items-center justify-center gap-1"
                    >
                      <span>{project.type === 'team' ? 'Apply to Team' : 'Submit Bid'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    {project.applicants.length > 0 && (
                      <button
                        onClick={() => setReviewModalProject(project)}
                        className={`py-2 px-2.5 rounded-xl border text-xs font-semibold relative flex items-center justify-center ${
                          isDarkMode 
                            ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700' 
                            : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200'
                        }`}
                        title="Review Applicants"
                      >
                        <Users className="w-3.5 h-3.5" />
                        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-indigo-500 text-white text-[8px] flex items-center justify-center font-bold">
                          {project.applicants.length}
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: STUDENT NETWORK */}
        {activeTab === 'network' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">{t.navTalent}</h2>
                <p className="text-xs text-slate-400">Jelajahi dan terhubung dengan talenta mahasiswa terverifikasi lintas jurusan & kampus.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {students.map((student) => (
                <div 
                  key={student.id}
                  className={`p-6 rounded-3xl border backdrop-blur-xl transition-all duration-300 space-y-4 ${
                    isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white/70 border-purple-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={student.avatar} 
                      alt={student.name} 
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-500/30"
                    />
                    <div>
                      <h3 className="font-bold text-sm">{student.name}</h3>
                      <p className="text-xs text-purple-400 font-medium">{student.major} ({student.semester})</p>
                      <p className="text-[10px] text-slate-400">{student.campus}</p>
                    </div>
                  </div>

                  <p className={`text-xs ${isDarkMode ? 'text-slate-300' : 'text-slate-600'} line-clamp-2`}>
                    {student.bio}
                  </p>

                  {/* Verified Skills */}
                  <div className="space-y-2">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{t.skillsHeader}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {student.skills.map((skill, i) => (
                        <span 
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] font-medium flex items-center gap-1"
                        >
                          {skill.name}
                          {skill.verified && <Check className="w-3 h-3 text-emerald-400" />}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Social Portfolio Links */}
                  <div className="flex items-center gap-3 pt-3 border-t border-slate-800/20">
                    <a 
                      href={student.github} 
                      target="_blank" 
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-slate-800/50 hover:bg-slate-800 text-slate-300 transition-colors"
                      title="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a 
                      href={student.figma} 
                      target="_blank" 
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-slate-800/50 hover:bg-slate-800 text-slate-300 transition-colors"
                      title="Figma Portfolio"
                    >
                      <Figma className="w-4 h-4" />
                    </a>
                    <a 
                      href={student.portfolio} 
                      target="_blank" 
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-slate-800/50 hover:bg-slate-800 text-slate-300 transition-colors"
                      title="Personal Website"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <div className="ml-auto flex items-center gap-1 text-xs font-bold text-amber-400">
                      <Star className="w-4 h-4 fill-amber-400" />
                      <span>{student.repScore} / 5.0</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: WORKSPACE & CHAT (FASTWORK ESCROW + UPWORK WORKSPACE) */}
        {activeTab === 'workspace' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">{t.activeWorkspace}</h2>
                <p className="text-xs text-slate-400">Pantau progres pengerjaan, jaminan escrow, dan obrolan proyek secara langsung.</p>
              </div>

              {/* Project Workspace Switcher Dropdown */}
              <select
                value={activeWorkspaceProjectId}
                onChange={(e) => setActiveWorkspaceProjectId(e.target.value)}
                className={`px-3 py-2 rounded-xl border text-xs font-semibold backdrop-blur-md ${
                  isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-purple-200 text-slate-800'
                }`}
              >
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.title}</option>
                ))}
              </select>
            </div>

            {activeWorkspaceProject ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left 2 Columns: Task Progress & Interactive Chat */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* Status Tracker Bar */}
                  <div className={`p-6 rounded-3xl border backdrop-blur-xl ${
                    isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white/70 border-purple-100'
                  }`}>
                    <h3 className="text-sm font-bold mb-4">{t.taskProgress}</h3>
                    
                    {/* Stepper Progress */}
                    <div className="grid grid-cols-4 gap-2 text-center relative">
                      {[
                        { step: 'recruiting', label: t.stepRecruiting },
                        { step: 'in_progress', label: t.stepInProgress },
                        { step: 'review', label: t.stepReview },
                        { step: 'completed', label: t.stepCompleted }
                      ].map((st, idx) => {
                        const isCurrent = activeWorkspaceProject.status === st.step;
                        return (
                          <div key={st.step} className="space-y-2">
                            <div className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center font-bold text-xs transition-all ${
                              isCurrent
                                ? 'bg-purple-600 text-white ring-4 ring-purple-500/20 shadow-lg shadow-purple-600/40'
                                : isDarkMode ? 'bg-slate-800 text-slate-500' : 'bg-purple-100 text-purple-400'
                            }`}>
                              {idx + 1}
                            </div>
                            <p className={`text-[11px] font-semibold ${isCurrent ? 'text-purple-400' : 'text-slate-500'}`}>
                              {st.label}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Chat Room UI Mockup */}
                  <div className={`p-6 rounded-3xl border backdrop-blur-xl flex flex-col h-[500px] ${
                    isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white/70 border-purple-100'
                  }`}>
                    {/* Chat Header */}
                    <div className="pb-4 border-b border-slate-800/30 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center font-bold text-purple-400">
                          {activeWorkspaceProject.posterName.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm">{activeWorkspaceProject.posterName}</h4>
                          <p className="text-[10px] text-slate-400">{activeWorkspaceProject.course}</p>
                        </div>
                      </div>

                      {/* Escrow Status Badge */}
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                        <ShieldCheck className="w-4 h-4" />
                        <span>{activeWorkspaceProject.escrowStatus || t.fundsInEscrow}</span>
                      </div>
                    </div>

                    {/* Chat Message Scroll Box */}
                    <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-2">
                      {chatMessages.map((msg) => (
                        <div key={msg.id} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
                          <div className={`max-w-md p-3.5 rounded-2xl text-xs space-y-2 ${
                            msg.isMe
                              ? 'bg-purple-600 text-white rounded-br-none shadow-md shadow-purple-600/20'
                              : isDarkMode 
                                ? 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700/50' 
                                : 'bg-purple-100 text-purple-900 rounded-bl-none'
                          }`}>
                            <p className="font-bold text-[10px] opacity-80">{msg.sender}</p>
                            <p className="leading-relaxed">{msg.text}</p>
                            {msg.attachment && (
                              <a 
                                href={msg.attachment} 
                                target="_blank" 
                                rel="noreferrer"
                                className="mt-2 p-2 rounded-xl bg-black/20 hover:bg-black/30 flex items-center gap-2 text-[11px] underline"
                              >
                                <Paperclip className="w-3.5 h-3.5" />
                                <span>Attachment / Deliverables Link</span>
                              </a>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-500 mt-1">{msg.time}</span>
                        </div>
                      ))}
                    </div>

                    {/* Quick Reply Bar */}
                    <div className="pt-2 pb-3 border-t border-slate-800/20 flex flex-wrap gap-2">
                      <button 
                        onClick={() => handleQuickAction(t.quickSubmitWork)}
                        className="px-2.5 py-1 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 text-[10px] font-semibold border border-purple-500/20 transition-all"
                      >
                        + {t.quickSubmitWork}
                      </button>
                      <button 
                        onClick={() => handleQuickAction(t.quickRequestReview)}
                        className="px-2.5 py-1 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 text-[10px] font-semibold border border-purple-500/20 transition-all"
                      >
                        + {t.quickRequestReview}
                      </button>
                    </div>

                    {/* Chat Input Bar */}
                    <form onSubmit={handleSendChat} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={chatInputText}
                        onChange={(e) => setChatInputText(e.target.value)}
                        placeholder={t.chatPlaceholder}
                        className={`flex-1 px-4 py-2.5 rounded-2xl text-xs border backdrop-blur-md focus:outline-none ${
                          isDarkMode 
                            ? 'bg-slate-800/80 border-slate-700 text-slate-200' 
                            : 'bg-white border-purple-200 text-slate-800'
                        }`}
                      />
                      <button
                        type="submit"
                        className="p-2.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white transition-all shadow-lg shadow-purple-600/30"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                </div>

                {/* Right Column: Escrow Trust Details & Project Meta */}
                <div className="space-y-6">
                  
                  {/* Escrow Guarantee Box */}
                  <div className={`p-6 rounded-3xl border backdrop-blur-xl space-y-4 ${
                    isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white/70 border-purple-100'
                  }`}>
                    <div className="flex items-center gap-2 text-purple-400">
                      <ShieldCheck className="w-5 h-5" />
                      <h3 className="font-bold text-sm">Kampus Escrow Protection</h3>
                    </div>
                    <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} leading-relaxed`}>
                      Dana pembayaran atau kompensasi barter dijamin penuh oleh Kampus Konnect. Pembayaran baru dicairkan setelah kedua belah pihak menyetujui hasil revisi.
                    </p>
                    <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center justify-between">
                      <span>Verified Contract</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Active Task Contract Overview */}
                  <div className={`p-6 rounded-3xl border backdrop-blur-xl space-y-4 ${
                    isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white/70 border-purple-100'
                  }`}>
                    <h3 className="font-bold text-sm">Rincian Kontrak Active</h3>
                    <div className="space-y-3 text-xs">
                      <div className="flex justify-between py-1 border-b border-slate-800/20">
                        <span className="text-slate-400">Judul Proyek:</span>
                        <span className="font-semibold max-w-[160px] text-right truncate">{activeWorkspaceProject.title}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-800/20">
                        <span className="text-slate-400">Tipe Anggaran:</span>
                        <span className="font-semibold">{activeWorkspaceProject.budgetValue}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-800/20">
                        <span className="text-slate-400">Tenggat Waktu:</span>
                        <span className="font-semibold text-amber-400">{activeWorkspaceProject.deadline}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              <p className="text-sm text-slate-400">{t.noActiveTasks}</p>
            )}
          </div>
        )}

        {/* TAB 4: MY PROFILE (LINKEDIN & PORTFOLIO SHOWCASE) */}
        {activeTab === 'profile' && (
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Profile Cover & Header */}
            <div className={`rounded-3xl border overflow-hidden backdrop-blur-xl ${
              isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white/70 border-purple-100'
            }`}>
              {/* Cover Gradient */}
              <div className="h-36 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800 relative">
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/30 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>NIM Verified: 20210801042</span>
                </div>
              </div>

              {/* Avatar & Details */}
              <div className="px-6 pb-6 pt-0 relative">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-12 gap-4 mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" 
                    alt="Budi Santoso" 
                    className="w-24 h-24 rounded-3xl object-cover ring-4 ring-[#0B0F17] shadow-xl"
                  />
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-lg shadow-purple-600/30">
                      Edit Profile
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-extrabold">Si A (Budi Santoso)</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-bold">
                      Reputation 4.9 ★
                    </span>
                  </div>
                  <p className="text-xs text-purple-400 font-semibold">Teknik Informatika • Semester 6 • Universitas Darunnajah</p>
                  <p className={`text-xs ${isDarkMode ? 'text-slate-300' : 'text-slate-600'} max-w-2xl leading-relaxed`}>
                    Backend Architect & System Analyst enthusiast. Pengalaman menggarap Tugas Besar MPPL, REST API Laravel, dan Next.js Fullstack apps. Suka berkolaborasi dengan UI/UX Designers!
                  </p>
                </div>

                {/* Performance Stats Cards */}
                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-800/20">
                  <div className="text-center">
                    <p className="text-lg font-extrabold text-purple-400">12</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">{t.statsProjects}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-extrabold text-emerald-400">8</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">{t.statsGigs}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-extrabold text-indigo-400">Rp 3.450.000</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">{t.statsEarned}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Verified Skills Section */}
            <div className={`p-6 rounded-3xl border backdrop-blur-xl space-y-4 ${
              isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white/70 border-purple-100'
            }`}>
              <h3 className="font-bold text-sm">{t.skillsHeader}</h3>
              <div className="flex flex-wrap gap-2">
                {["Next.js", "Laravel API", "Tailwind CSS", "MySQL Indexing", "System Architecture"].map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>

          </div>
        )}

      </main>

      {/* ==========================================
          MODAL 1: SUBMIT PROPOSAL / BID MODAL
      ========================================== */}
      {applyModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
          <div className={`w-full max-w-lg p-6 sm:p-8 rounded-3xl border backdrop-blur-2xl shadow-2xl space-y-6 ${
            isDarkMode ? 'bg-[#0B0F17]/95 border-purple-500/30 text-white' : 'bg-white border-purple-200 text-slate-800'
          }`}>
            
            <div className="flex items-center justify-between border-b border-slate-800/20 pb-4">
              <div>
                <h3 className="text-lg font-bold">
                  {applyModalProject.type === 'team' ? t.applyModalTitle : t.bidModalTitle}
                </h3>
                <p className="text-xs text-purple-400 font-medium">{applyModalProject.title}</p>
              </div>
              <button 
                onClick={() => setApplyModalProject(null)}
                className="p-1.5 rounded-xl bg-slate-800/50 hover:bg-slate-800 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleApplySubmit} className="space-y-4 text-xs">
              
              {/* Pitch Input */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-300">{t.pitchLabel}</label>
                <textarea
                  required
                  rows={3}
                  value={applyForm.pitch}
                  onChange={(e) => setApplyForm({ ...applyForm, pitch: e.target.value })}
                  placeholder="Jelaskan keahlian & alasan Anda cocok mengambil peran ini..."
                  className={`w-full p-3 rounded-2xl border focus:outline-none ${
                    isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-purple-50 border-purple-200 text-slate-800'
                  }`}
                />
              </div>

              {/* Quick Template Attachments */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setApplyForm({ ...applyForm, portfolioUrl: 'https://figma.com/@sitirahma_design' })}
                  className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20 text-[10px]"
                >
                  + {t.quickApplyFigma}
                </button>
                <button
                  type="button"
                  onClick={() => setApplyForm({ ...applyForm, portfolioUrl: 'https://github.com/sitirahma' })}
                  className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20 text-[10px]"
                >
                  + {t.quickApplyGithub}
                </button>
              </div>

              {/* Portfolio Link Input */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-300">{t.portfolioLinkLabel}</label>
                <input
                  type="url"
                  required
                  value={applyForm.portfolioUrl}
                  onChange={(e) => setApplyForm({ ...applyForm, portfolioUrl: e.target.value })}
                  placeholder="https://figma.com/@username atau GitHub URL"
                  className={`w-full p-3 rounded-2xl border focus:outline-none ${
                    isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-purple-50 border-purple-200 text-slate-800'
                  }`}
                />
              </div>

              {/* Rate or Delivery Days */}
              {applyModalProject.type === 'gig' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300">{t.proposedPriceLabel}</label>
                    <input
                      type="text"
                      value={applyForm.proposedPrice}
                      onChange={(e) => setApplyForm({ ...applyForm, proposedPrice: e.target.value })}
                      placeholder="Contoh: Rp 150.000"
                      className={`w-full p-3 rounded-2xl border focus:outline-none ${
                        isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-purple-50 border-purple-200 text-slate-800'
                      }`}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300">{t.deliveryTimeLabel}</label>
                    <input
                      type="number"
                      value={applyForm.deliveryDays}
                      onChange={(e) => setApplyForm({ ...applyForm, deliveryDays: e.target.value })}
                      className={`w-full p-3 rounded-2xl border focus:outline-none ${
                        isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-purple-50 border-purple-200 text-slate-800'
                      }`}
                    />
                  </div>
                </div>
              )}

              {/* Form Buttons */}
              <div className="pt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setApplyModalProject(null)}
                  className="flex-1 py-3 rounded-2xl border border-slate-700 font-bold text-slate-400 hover:bg-slate-800"
                >
                  {t.cancelBtn}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 font-bold text-white shadow-lg shadow-purple-600/30"
                >
                  {t.submitBtn}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL 2: APPLICANT REVIEW DRAWER (SCENARIO A)
      ========================================== */}
      {reviewModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
          <div className={`w-full max-w-2xl p-6 sm:p-8 rounded-3xl border backdrop-blur-2xl shadow-2xl space-y-6 ${
            isDarkMode ? 'bg-[#0B0F17]/95 border-purple-500/30 text-white' : 'bg-white border-purple-200 text-slate-800'
          }`}>
            
            <div className="flex items-center justify-between border-b border-slate-800/20 pb-4">
              <div>
                <h3 className="text-lg font-bold">{t.reviewApplicants}</h3>
                <p className="text-xs text-purple-400 font-medium">{reviewModalProject.title}</p>
              </div>
              <button 
                onClick={() => setReviewModalProject(null)}
                className="p-1.5 rounded-xl bg-slate-800/50 hover:bg-slate-800 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Applicants List */}
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {reviewModalProject.applicants.map((applicant) => (
                <div 
                  key={applicant.id}
                  className={`p-5 rounded-2xl border backdrop-blur-md space-y-3 ${
                    isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-purple-50/60 border-purple-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <img 
                        src={applicant.applicantAvatar} 
                        alt={applicant.applicantName} 
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-500/40"
                      />
                      <div>
                        <h4 className="font-bold text-sm">{applicant.applicantName}</h4>
                        <p className="text-[10px] text-purple-400 font-medium">{applicant.applicantMajor}</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] font-bold">
                      Role: {applicant.appliedRole}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed italic">
                    "{applicant.pitch}"
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/20">
                    <a 
                      href={applicant.portfolioUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-xs text-purple-400 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Figma className="w-3.5 h-3.5" />
                      <span>View Figma Portfolio</span>
                    </a>

                    {/* Action Accept Button */}
                    <button
                      onClick={() => handleAcceptApplicant(reviewModalProject.id, applicant.id)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/30 flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      <span>{t.acceptBtn}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}