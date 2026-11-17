"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import {
  ArrowDownUp, ArrowRight, ArrowUpRight, Award, Bell, BriefcaseBusiness, Check,
  CheckCircle2, ChevronDown, Clock3, Code2, Command, Compass, ExternalLink, Filter,
  Github, Globe2, GraduationCap, LayoutGrid, Link2, LockKeyhole, MessageCircle,
  MessageSquareText, Moon, MoreHorizontal, Plus, Search, Send, ShieldCheck, SlidersHorizontal,
  Sparkles, Star, Sun, Users, Wallet, X, Zap,
} from "lucide-react";
import projectsSeed from "@/src/data/projects.json";
import studentsSeed from "@/src/data/students.json";
import campuses from "@/src/data/campuses.json";
import messagesSeed from "@/src/data/messages.json";

type Applicant = {
  id: string; applicantName: string; applicantAvatar: string; applicantMajor: string;
  applicantRep: number; appliedRole: string; pitch: string; portfolioUrl: string;
  offeredRate?: string; status: "pending" | "accepted" | "declined";
};
type Project = {
  id: string; type: "team" | "gig"; category: string; title: string; campus: string;
  course: string; posterName: string; posterAvatar: string; posterMajor: string;
  posterRep: number; posterNim: string; openRoles: string[]; techStack: string[];
  budgetType: "cash" | "barter"; budgetValue: string; deadline: string;
  description: string; status: "recruiting" | "in_progress" | "review" | "completed";
  escrowStatus?: string; applicants: Applicant[];
};
type Student = {
  id: string; name: string; avatar: string; campus: string; major: string; semester: string;
  nim: string; repScore: number; bio: string; github: string; figma: string; portfolio: string;
  skills: { name: string; category: string; verified: boolean }[];
  stats: { completedProjects: number; gigsDone: number; totalEarned: string };
};
type ChatMessage = { id: string; projectId?: string; sender: string; senderAvatar: string; text: string; time: string; isMe: boolean; attachment?: string };
type Tab = "projects" | "network" | "workspace" | "profile";
type Locale = "id" | "en";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
const initialProjects = projectsSeed as Project[];
const initialStudents = studentsSeed as Student[];
const initialMessages = messagesSeed as ChatMessage[];

const copy = {
  id: {
    projects: "Proyek & Jasa", network: "Jaringan Mahasiswa", workspace: "Workspace", profile: "Profil Saya",
    headline: "Temukan rekan.\nBangun sesuatu yang berarti.",
    subhead: "Ruang kolaborasi dan marketplace talenta mahasiswa lintas kampus — dari tugas besar sampai pekerjaan profesional.",
    all: "Semua", team: "Kolaborasi Tim", gigs: "Micro-Gigs", search: "Cari proyek, skill, mata kuliah, atau nama mahasiswa...",
    category: "Kategori", tech: "Tech stack", apply: "Kirim proposal", bid: "Ajukan penawaran",
    applicants: "Pelamar", deadline: "Tenggat", budget: "Kompensasi", postedBy: "Diposting oleh",
    openRoles: "Posisi yang dibutuhkan", proposalTitle: "Kirim proposal", pitch: "Pesan pengantar",
    portfolio: "Link portofolio", price: "Penawaran harga / barter", days: "Estimasi pengerjaan (hari)",
    send: "Kirim proposal", cancel: "Batal", review: "Tinjau pelamar", accept: "Terima & lanjutkan",
    noProjects: "Tidak ada proyek yang cocok. Coba ubah kata kunci atau filter.",
    networkTitle: "Temukan talenta kampus", networkDesc: "Kenali mahasiswa dari berbagai kampus berdasarkan keahlian, reputasi, dan karya mereka.",
    verifiedSkills: "Keahlian terverifikasi", viewPortfolio: "Portofolio", connect: "Mulai kolaborasi",
    activeWorkspace: "Ruang kerja proyek", progress: "Progres pekerjaan", conversation: "Percakapan tim",
    projectInfo: "Ringkasan proyek", protection: "Kampus Escrow", demoNote: "Status simulasi — belum ada transaksi dana sungguhan.",
    typeMessage: "Tulis pesan untuk tim...", sendMessage: "Kirim", submitWork: "Kirim hasil kerja", requestReview: "Minta review",
    profileTitle: "Profil profesional", profileDesc: "Identitas akademik, reputasi, dan rekam jejak kolaborasi.",
    editProfile: "Edit profil", completed: "Proyek selesai", gigs: "Gig selesai", earned: "Est. pendapatan",
    skills: "Keahlian", work: "Karya pilihan", status: "Status", allCategories: "Semua kategori",
    recruiting: "Perekrutan", inProgress: "Dikerjakan", reviewStatus: "Review", completeStatus: "Selesai",
    loading: "Memuat data...", apiOffline: "Mode demo lokal · API belum tersambung", proposalSuccess: "Proposal berhasil dikirim.",
    acceptedSuccess: "Pelamar diterima. Workspace diperbarui.", emptyApplicants: "Belum ada pelamar untuk proyek ini.",
  },
  en: {
    projects: "Projects & Gigs", network: "Student Network", workspace: "Workspace", profile: "My Profile",
    headline: "Find your people.\nBuild something meaningful.",
    subhead: "A campus-wide collaboration and talent marketplace — from group assignments to professional micro-work.",
    all: "All", team: "Team projects", gigs: "Micro-gigs", search: "Search projects, skills, courses, or students...",
    category: "Category", tech: "Tech stack", apply: "Send proposal", bid: "Submit bid",
    applicants: "Applicants", deadline: "Deadline", budget: "Compensation", postedBy: "Posted by",
    openRoles: "Open roles", proposalTitle: "Submit proposal", pitch: "Introduction message",
    portfolio: "Portfolio link", price: "Proposed rate / barter", days: "Estimated delivery (days)",
    send: "Send proposal", cancel: "Cancel", review: "Review applicants", accept: "Accept & continue",
    noProjects: "No matching projects. Try adjusting your search or filters.",
    networkTitle: "Meet campus talent", networkDesc: "Discover students across campuses through their skills, reputation, and work.",
    verifiedSkills: "Verified skills", viewPortfolio: "Portfolio", connect: "Start collaborating",
    activeWorkspace: "Project workspace", progress: "Project progress", conversation: "Team conversation",
    projectInfo: "Project overview", protection: "Kampus Escrow", demoNote: "Demo status — no real funds are being held.",
    typeMessage: "Write a message to the team...", sendMessage: "Send", submitWork: "Submit work", requestReview: "Request review",
    profileTitle: "Professional profile", profileDesc: "Academic identity, reputation, and collaboration history.",
    editProfile: "Edit profile", completed: "Projects completed", gigs: "Gigs completed", earned: "Est. earnings",
    skills: "Skills", work: "Selected work", status: "Status", allCategories: "All categories",
    recruiting: "Recruiting", inProgress: "In progress", reviewStatus: "In review", completeStatus: "Completed",
    loading: "Loading data...", apiOffline: "Local demo mode · API not connected", proposalSuccess: "Proposal submitted successfully.",
    acceptedSuccess: "Applicant accepted. Workspace updated.", emptyApplicants: "No applicants for this project yet.",
  }
};
const categories = ["Semua", "Pemrograman", "Desain", "Akademik", "Operasional"];
const techOptions = ["all", "Next.js", "React.js", "Laravel", "Tailwind CSS", "MySQL", "Figma", "CapCut", "SPSS"];
const steps: Project["status"][] = ["recruiting", "in_progress", "review", "completed"];

function cx(...values: (string | false | undefined | null)[]) { return values.filter(Boolean).join(" "); }
function formatTime() { return new Intl.DateTimeFormat("id-ID", { hour: "2-digit", minute: "2-digit" }).format(new Date()); }
function initials(name: string) { return name.split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]).join("").toUpperCase(); }
function safeImage(url: string) { return url || "/profilemas.png"; }

export default function HomePage() {
  const [tab, setTab] = useState<Tab>("projects");
  const [locale, setLocale] = useState<Locale>("id");
  const [dark, setDark] = useState(true);
  const [selectedCampus, setSelectedCampus] = useState(campuses[0]);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [activeProjectId, setActiveProjectId] = useState("proj-scenario-b");
  const [projectType, setProjectType] = useState<"all" | "team" | "gig">("all");
  const [category, setCategory] = useState("Semua");
  const [tech, setTech] = useState("all");
  const [query, setQuery] = useState("");
  const [networkQuery, setNetworkQuery] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [proposalProject, setProposalProject] = useState<Project | null>(null);
  const [reviewProject, setReviewProject] = useState<Project | null>(null);
  const [toast, setToast] = useState("");
  const [apiOnline, setApiOnline] = useState(false);
  const [form, setForm] = useState({ pitch: "", portfolioUrl: "", proposedPrice: "", deliveryDays: "3" });
  const t = copy[locale];

  const notify = useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2800);
  }, []);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("kk-theme");
    const savedLocale = window.localStorage.getItem("kk-locale");
    if (savedTheme) setDark(savedTheme === "dark");
    if (savedLocale === "en" || savedLocale === "id") setLocale(savedLocale);
    const controller = new AbortController();
    Promise.all([
      fetch(`${API}/projects`, { signal: controller.signal }).then(r => { if (!r.ok) throw new Error("API projects unavailable"); return r.json(); }),
      fetch(`${API}/students`, { signal: controller.signal }).then(r => { if (!r.ok) throw new Error("API students unavailable"); return r.json(); }),
    ]).then(([projectData, studentData]) => {
      if (Array.isArray(projectData)) setProjects(projectData);
      if (Array.isArray(studentData)) setStudents(studentData);
      setApiOnline(true);
    }).catch(() => setApiOnline(false));
    return () => controller.abort();
  }, []);

  useEffect(() => { window.localStorage.setItem("kk-theme", dark ? "dark" : "light"); }, [dark]);
  useEffect(() => { window.localStorage.setItem("kk-locale", locale); }, [locale]);
  useEffect(() => {
    const controller = new AbortController();
    fetch(`${API}/workspace/${activeProjectId}/messages`, { signal: controller.signal })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => { if (Array.isArray(data)) setMessages(data); })
      .catch(() => undefined);
    return () => controller.abort();
  }, [activeProjectId]);

  const filteredProjects = useMemo(() => projects.filter(project => {
    const q = query.toLowerCase().trim();
    const inText = [project.title, project.course, project.description, project.posterName, ...project.techStack].join(" ").toLowerCase().includes(q);
    return (projectType === "all" || project.type === projectType)
      && (category === "Semua" || project.category === category)
      && (tech === "all" || project.techStack.includes(tech))
      && inText;
  }), [projects, projectType, category, tech, query]);

  const filteredStudents = useMemo(() => students.filter(student =>
    [student.name, student.major, student.campus, student.bio, ...student.skills.map(s => s.name)].join(" ").toLowerCase().includes(networkQuery.toLowerCase())
  ), [students, networkQuery]);
  const activeProject = projects.find(project => project.id === activeProjectId) || projects[0];
  const activeMessages = messages.filter(message => !message.projectId || message.projectId === activeProjectId);
  const openCount = projects.filter(project => project.status === "recruiting").length;
  const applicantCount = projects.reduce((sum, project) => sum + project.applicants.filter(applicant => applicant.status === "pending").length, 0);

  const submitProposal = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!proposalProject) return;
    const newApplicant: Applicant = {
      id: `app-${Date.now()}`,
      applicantName: "Ahmad Rizky",
      applicantAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
      applicantMajor: "Teknik Informatika · Semester 4",
      applicantRep: 4.8,
      appliedRole: proposalProject.openRoles[0] || "Contributor",
      pitch: form.pitch,
      portfolioUrl: form.portfolioUrl,
      offeredRate: form.proposedPrice || proposalProject.budgetValue,
      status: "pending",
    };
    try {
      const response = await fetch(`${API}/projects/${proposalProject.id}/proposals`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicantName: newApplicant.applicantName, applicantAvatar: newApplicant.applicantAvatar,
          applicantMajor: newApplicant.applicantMajor, applicantRep: newApplicant.applicantRep,
          appliedRole: newApplicant.appliedRole, pitch: newApplicant.pitch,
          portfolioUrl: newApplicant.portfolioUrl, offeredRate: newApplicant.offeredRate,
          deliveryDays: Math.max(1, Number(form.deliveryDays) || 1),
        }),
      });
      if (response.ok) {
        const updated = await response.json();
        setProjects(current => current.map(project => project.id === updated.id ? updated : project));
        setApiOnline(true);
      } else throw new Error("API rejected proposal");
    } catch {
      setProjects(current => current.map(project => project.id === proposalProject.id ? { ...project, applicants: [newApplicant, ...project.applicants] } : project));
    }
    setProposalProject(null);
    setForm({ pitch: "", portfolioUrl: "", proposedPrice: "", deliveryDays: "3" });
    notify(t.proposalSuccess);
  };

  const acceptApplicant = async (project: Project, applicant: Applicant) => {
    try {
      const response = await fetch(`${API}/projects/${project.id}/proposals/${applicant.id}/accept`, { method: "PATCH" });
      if (response.ok) {
        const updated = await response.json();
        setProjects(current => current.map(item => item.id === updated.id ? updated : item));
        setApiOnline(true);
      } else throw new Error("API unavailable");
    } catch {
      setProjects(current => current.map(item => item.id === project.id ? {
        ...item, status: "in_progress", escrowStatus: "Simulasi kontrak aktif",
        applicants: item.applicants.map(entry => entry.id === applicant.id ? { ...entry, status: "accepted" } : entry),
      } : item));
    }
    setActiveProjectId(project.id);
    setReviewProject(null);
    setTab("workspace");
    notify(t.acceptedSuccess);
  };

  const sendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!chatInput.trim() || !activeProject) return;
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`, projectId: activeProject.id, sender: "Ahmad Rizky (Anda)",
      senderAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      text: chatInput.trim(), time: formatTime(), isMe: true,
    };
    try {
      const response = await fetch(`${API}/workspace/${activeProject.id}/messages`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ sender: newMessage.sender, senderAvatar: newMessage.senderAvatar, text: newMessage.text }),
      });
      if (response.ok) {
        const saved = await response.json();
        setMessages(current => [...current, saved]);
        setApiOnline(true);
      } else throw new Error("API unavailable");
    } catch { setMessages(current => [...current, newMessage]); }
    setChatInput("");
  };

  const advanceStatus = async (next: Project["status"]) => {
    if (!activeProject) return;
    try {
      const response = await fetch(`${API}/workspace/${activeProject.id}/status`, {
        method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: next }),
      });
      if (response.ok) {
        const updated = await response.json();
        setProjects(current => current.map(item => item.id === updated.id ? updated : item));
        notify("Status proyek diperbarui.");
        return;
      }
    } catch { /* local demo fallback */ }
    setProjects(current => current.map(item => item.id === activeProject.id ? { ...item, status: next } : item));
    notify("Status demo diperbarui.");
  };

  const addQuickMessage = (text: string) => {
    const quick: ChatMessage = {
      id: `msg-${Date.now()}`, projectId: activeProjectId, sender: "Ahmad Rizky (Anda)",
      senderAvatar: "", text: `[Aksi workspace] ${text}`, time: formatTime(), isMe: true,
    };
    setMessages(current => [...current, quick]);
    notify(text);
  };

  const statusLabel = (status: Project["status"]) => ({
    recruiting: t.recruiting, in_progress: t.inProgress, review: t.reviewStatus, completed: t.completeStatus,
  }[status]);

  const theme = dark ? "dark" : "light";

  return (
    <div className="app-shell min-h-screen" data-theme={theme}>
      <div className="pointer-events-none fixed inset-0 -z-0 opacity-[.045]" style={{ backgroundImage: "radial-gradient(var(--muted) .7px, transparent .7px)", backgroundSize: "18px 18px" }} />
      <header className="sticky top-0 z-40 border-b backdrop-blur-xl" style={{ background: "color-mix(in srgb, var(--page) 90%, transparent)", borderColor: "var(--line)" }}>
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center gap-5 px-4 sm:px-6 xl:px-8">
          <button onClick={() => setTab("projects")} className="flex shrink-0 items-center gap-3 text-left" aria-label="Kampus Konnect home">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#7162ed] text-white shadow-[0_5px_18px_rgba(113,98,237,.3)]"><GraduationCap size={19}/></span>
            <span className="leading-tight"><span className="block text-[14px] font-bold tracking-tight">Kampus Konnect</span><span className="mt-0.5 block text-[9px] font-semibold tracking-[.16em] muted">CAMPUS HUB</span></span>
          </button>
          <div className="hidden min-w-0 items-center gap-2 rounded-xl px-3 py-2 text-xs lg:flex surface-soft">
            <GraduationCap size={14} className="shrink-0 text-violet-400"/>
            <select aria-label="Pilih kampus" value={selectedCampus} onChange={e => setSelectedCampus(e.target.value)} className="max-w-[210px] min-w-0 bg-transparent font-medium outline-none">
              {campuses.map(campus => <option key={campus} value={campus} className="bg-[#11131d] text-white">{campus}</option>)}
            </select><ChevronDown size={13} className="muted"/>
          </div>
          <nav className="ml-auto hidden items-center gap-1 rounded-xl p-1 md:flex surface-soft">
            {(["projects", "network", "workspace", "profile"] as Tab[]).map(item => {
              const Icon = item === "projects" ? BriefcaseBusiness : item === "network" ? Users : item === "workspace" ? MessageSquareText : Award;
              return <button key={item} onClick={() => setTab(item)} className={cx("flex items-center gap-2 rounded-lg px-3 py-2 text-[11px] font-semibold transition", tab === item ? "bg-[#7162ed] text-white shadow-sm" : "muted hover:text-[var(--text)]")}><Icon size={14}/><span>{t[item]}</span>{item === "workspace" && applicantCount > 0 && <span className="rounded-full bg-emerald-500 px-1.5 py-0.5 text-[9px] text-white">{applicantCount}</span>}</button>;
            })}
          </nav>
          <div className="ml-auto flex shrink-0 items-center gap-2 md:ml-0">
            <button onClick={() => setLocale(locale === "id" ? "en" : "id")} className="btn-secondary flex h-9 items-center gap-1.5 rounded-xl px-2.5 text-[11px] font-bold"><Globe2 size={14}/>{locale.toUpperCase()}</button>
            <button onClick={() => setDark(value => !value)} className="btn-secondary flex h-9 w-9 items-center justify-center rounded-xl" aria-label="Toggle theme">{dark ? <Sun size={15} className="text-amber-300"/> : <Moon size={15}/>}</button>
            <button onClick={() => notify("Tidak ada notifikasi baru.")} className="btn-secondary hidden h-9 w-9 items-center justify-center rounded-xl sm:flex" aria-label="Notifications"><Bell size={15}/></button>
            <span className="hidden h-9 w-9 items-center justify-center rounded-full border border-violet-400/30 bg-violet-500/15 text-[11px] font-bold text-violet-300 sm:flex">AR</span>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-[1440px] px-4 pb-28 pt-7 sm:px-6 lg:pt-9 xl:px-8">
        {tab === "projects" && <>
          <section className="surface relative overflow-hidden rounded-2xl p-6 sm:p-8">
            <div className="absolute right-0 top-0 h-full w-[38%] opacity-40" style={{ background: "radial-gradient(ellipse at 75% 45%, rgba(113,98,237,.22), transparent 68%)" }}/>
            <div className="relative flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
              <div className="max-w-[760px]">
                <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-violet-400/20 bg-violet-500/10 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-violet-300"><Sparkles size={12}/> CAMPUS COLLABORATION NETWORK</div>
                <h1 className="whitespace-pre-line text-[clamp(1.85rem,4vw,3.1rem)] font-semibold leading-[1.08] tracking-[-.045em]">{t.headline}</h1>
                <p className="mt-4 max-w-[650px] text-sm leading-6 muted">{t.subhead}</p>
                <div className="mt-6 flex flex-wrap items-center gap-2">
                  <span className="mr-1 text-[10px] font-bold uppercase tracking-[.13em] muted">Demo flow</span>
                  <button onClick={() => setReviewProject(projects.find(p => p.id === "proj-scenario-a") || null)} className="btn-secondary inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[10px] font-semibold"><Users size={13} className="text-violet-400"/> Review team proposal <ArrowUpRight size={12}/></button>
                  <button onClick={() => { setActiveProjectId("proj-scenario-b"); setTab("workspace"); }} className="btn-secondary inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[10px] font-semibold"><MessageCircle size={13} className="text-emerald-400"/> Open micro-gig workspace <ArrowUpRight size={12}/></button>
                </div>
              </div>
              <div className="grid min-w-[265px] grid-cols-2 gap-3 lg:max-w-[310px]">
                <div className="rounded-xl border p-3.5" style={{ borderColor: "var(--line)", background: "var(--panel-soft)" }}><p className="text-[10px] muted">Proyek tersedia</p><p className="mt-1 text-2xl font-semibold tracking-tight">{openCount.toString().padStart(2,"0")}</p><p className="mt-1 text-[10px] text-emerald-400">Open opportunities</p></div>
                <div className="rounded-xl border p-3.5" style={{ borderColor: "var(--line)", background: "var(--panel-soft)" }}><p className="text-[10px] muted">Menunggu review</p><p className="mt-1 text-2xl font-semibold tracking-tight">{applicantCount.toString().padStart(2,"0")}</p><p className="mt-1 text-[10px] text-violet-400">Pending applicants</p></div>
              </div>
            </div>
          </section>

          <section className="mt-6 space-y-4">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex w-fit max-w-full items-center gap-1 overflow-x-auto rounded-xl p-1 surface-soft no-scrollbar">
                {(["all", "team", "gig"] as const).map(value => <button key={value} onClick={() => setProjectType(value)} className={cx("whitespace-nowrap rounded-lg px-3.5 py-2 text-[11px] font-semibold transition", projectType === value ? "bg-[#7162ed] text-white shadow" : "muted hover:text-[var(--text)]")}>{value === "all" ? t.all : value === "team" ? t.team : t.gigs}</button>)}
              </div>
              <div className="flex flex-col gap-2 sm:flex-row xl:w-[550px]">
                <label className="relative flex min-w-0 flex-1 items-center">
                  <Search size={15} className="absolute left-3.5 muted"/>
                  <input className="field h-10 pl-10 pr-4 text-xs" placeholder={t.search} value={query} onChange={e => setQuery(e.target.value)}/>
                </label>
                <label className="relative flex sm:w-[170px]">
                  <SlidersHorizontal size={14} className="absolute left-3 top-[13px] muted"/>
                  <select className="field h-10 appearance-none pl-9 pr-8 text-xs" value={tech} onChange={e => setTech(e.target.value)} aria-label={t.tech}>{techOptions.map(value => <option key={value} value={value}>{value === "all" ? t.tech : value}</option>)}</select><ChevronDown size={13} className="pointer-events-none absolute right-3 top-[13px] muted"/>
                </label>
              </div>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              <span className="mr-1 text-[10px] font-semibold uppercase tracking-[.12em] muted">{t.category}</span>
              {categories.map(item => <button key={item} onClick={() => setCategory(item)} className={cx("whitespace-nowrap rounded-lg border px-3 py-1.5 text-[10px] font-medium transition", category === item ? "border-violet-400/50 bg-violet-500/10 text-violet-300" : "border-[var(--line)] muted hover:text-[var(--text)]")}>{item === "Semua" ? t.allCategories : item}</button>)}
            </div>
          </section>

          <section className="mt-4">
            <div className="mb-3 flex items-center justify-between"><p className="text-xs font-semibold">{filteredProjects.length} opportunities <span className="font-normal muted">· curated for campus talent</span></p><div className="flex items-center gap-1 text-[10px] muted"><ArrowDownUp size={12}/> Latest activity</div></div>
            {filteredProjects.length === 0 ? <div className="surface rounded-2xl px-6 py-16 text-center"><Search size={24} className="mx-auto muted"/><p className="mt-3 text-sm font-semibold">{t.noProjects}</p></div> :
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
                {filteredProjects.map(project => <article key={project.id} className="surface card-hover flex min-h-[310px] flex-col rounded-2xl p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-1.5"><span className={cx("rounded-md px-2 py-1 text-[9px] font-bold uppercase tracking-[.08em]", project.type === "team" ? "bg-violet-500/10 text-violet-300" : "bg-emerald-500/10 text-emerald-300")}>{project.type === "team" ? "TEAM PROJECT" : "MICRO-GIG"}</span><span className="rounded-md border px-2 py-1 text-[9px] font-medium muted" style={{ borderColor: "var(--line)" }}>{project.category}</span></div>
                    <span className="flex shrink-0 items-center gap-1 text-[10px] muted"><Clock3 size={12}/>{project.deadline}</span>
                  </div>
                  <div className="mt-4"><h2 className="text-[15px] font-semibold leading-[1.35] tracking-[-.02em]">{project.title}</h2><p className="mt-1.5 text-[10px] font-medium text-violet-400">{project.course}</p><p className="mt-2.5 line-clamp-3 text-xs leading-[1.65] muted">{project.description}</p></div>
                  <div className="mt-4 flex flex-wrap gap-1.5">{project.techStack.slice(0,5).map(item => <span key={item} className="rounded-md border px-2 py-1 text-[9px]" style={{ borderColor: "var(--line)", background: "var(--panel-soft)" }}>{item}</span>)}</div>
                  <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border px-3 py-2.5" style={{ borderColor: "var(--line)", background: "var(--panel-soft)" }}><div className="flex min-w-0 items-center gap-2">{project.budgetType === "cash" ? <Wallet size={14} className="shrink-0 text-emerald-400"/> : <ArrowDownUp size={14} className="shrink-0 text-violet-400"/>}<span className="truncate text-[11px] font-semibold">{project.budgetValue}</span></div><span className={cx("shrink-0 rounded-md px-2 py-1 text-[9px] font-semibold", project.status === "recruiting" ? "bg-emerald-500/10 text-emerald-300" : "bg-amber-500/10 text-amber-300")}>{statusLabel(project.status)}</span></div>
                  <div className="mt-auto flex items-center justify-between gap-3 border-t pt-4" style={{ borderColor: "var(--line)" }}>
                    <div className="flex min-w-0 items-center gap-2"><img src={safeImage(project.posterAvatar)} alt="" className="h-8 w-8 rounded-full object-cover"/><div className="min-w-0"><p className="truncate text-[10px] font-semibold">{project.posterName}</p><p className="truncate text-[9px] muted">{project.posterMajor}</p></div><span className="ml-1 flex items-center gap-1 text-[10px] font-semibold text-amber-400"><Star size={11} fill="currentColor"/>{project.posterRep}</span></div>
                    <div className="flex shrink-0 items-center gap-2"><button onClick={() => setProposalProject(project)} className="btn-primary inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[10px] font-semibold">{project.type === "team" ? t.apply : t.bid}<ArrowUpRight size={12}/></button>{project.applicants.length > 0 && <button onClick={() => setReviewProject(project)} className="btn-secondary relative flex h-9 w-9 items-center justify-center rounded-lg" title={t.review}><Users size={14}/><span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-violet-500 px-1 text-[8px] text-white">{project.applicants.length}</span></button>}</div>
                  </div>
                </article>)}
              </div>}
          </section>
        </>}

        {tab === "network" && <section className="animate-fade-up">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="mb-2 text-[10px] font-bold uppercase tracking-[.16em] text-violet-400">CAMPUS TALENT DIRECTORY</p><h1 className="text-3xl font-semibold tracking-[-.04em]">{t.networkTitle}</h1><p className="mt-2 max-w-2xl text-sm leading-6 muted">{t.networkDesc}</p></div><label className="relative flex w-full md:max-w-[310px]"><Search size={15} className="absolute left-3.5 top-3 muted"/><input className="field h-10 pl-10 pr-4 text-xs" placeholder="Cari nama, jurusan, atau keahlian..." value={networkQuery} onChange={e => setNetworkQuery(e.target.value)}/></label></div>
          <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">{filteredStudents.map(student => <article key={student.id} className="surface card-hover rounded-2xl p-5"><div className="flex items-start gap-3"><img src={safeImage(student.avatar)} alt="" className="h-12 w-12 rounded-xl object-cover"/><div className="min-w-0 flex-1"><div className="flex items-center gap-1.5"><h2 className="truncate text-sm font-semibold">{student.name}</h2><CheckCircle2 size={13} className="shrink-0 text-emerald-400"/></div><p className="mt-1 text-[10px] text-violet-400">{student.major} · {student.semester}</p><p className="mt-1 truncate text-[10px] muted">{student.campus}</p></div><span className="flex items-center gap-1 text-[10px] font-semibold text-amber-400"><Star size={11} fill="currentColor"/>{student.repScore}</span></div><p className="mt-4 min-h-[58px] text-xs leading-[1.7] muted">{student.bio}</p><div className="mt-4"><p className="mb-2 text-[9px] font-bold uppercase tracking-[.13em] muted">{t.verifiedSkills}</p><div className="flex flex-wrap gap-1.5">{student.skills.map(skill => <span key={skill.name} className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[9px]" style={{ borderColor: "var(--line)" }}>{skill.name}{skill.verified && <Check size={10} className="text-emerald-400"/>}</span>)}</div></div><div className="mt-5 flex items-center gap-2 border-t pt-4" style={{ borderColor: "var(--line)" }}><a className="btn-secondary flex h-8 w-8 items-center justify-center rounded-lg" href={student.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={14}/></a><a className="btn-secondary flex h-8 w-8 items-center justify-center rounded-lg" href={student.figma} target="_blank" rel="noreferrer" aria-label="Figma"><Command size={14}/></a><a className="btn-secondary flex h-8 w-8 items-center justify-center rounded-lg" href={student.portfolio} target="_blank" rel="noreferrer" aria-label="Portfolio"><ExternalLink size={14}/></a><span className="ml-auto text-[10px] muted">{student.stats.completedProjects} projects · {student.stats.gigsDone} gigs</span></div></article>)}</div>
        </section>}

        {tab === "workspace" && <section className="animate-fade-up">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="mb-2 text-[10px] font-bold uppercase tracking-[.16em] text-violet-400">COLLABORATION SPACE</p><h1 className="text-3xl font-semibold tracking-[-.04em]">{t.activeWorkspace}</h1><p className="mt-2 text-sm muted">Workspace proyek, progres kolaborasi, dan riwayat percakapan.</p></div><label className="relative w-full sm:max-w-[360px]"><select className="field h-10 appearance-none px-3 pr-9 text-xs" value={activeProjectId} onChange={e => setActiveProjectId(e.target.value)}>{projects.map(project => <option key={project.id} value={project.id}>{project.title}</option>)}</select><ChevronDown size={14} className="pointer-events-none absolute right-3 top-3 muted"/></label></div>
          {activeProject ? <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.8fr)_minmax(280px,.8fr)]">
            <div className="space-y-4">
              <div className="surface rounded-2xl p-5 sm:p-6"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-[10px] font-bold uppercase tracking-[.12em] muted">{t.progress}</p><h2 className="mt-1 text-sm font-semibold">{activeProject.title}</h2></div><span className="rounded-lg bg-violet-500/10 px-2.5 py-1.5 text-[10px] font-semibold text-violet-300">{statusLabel(activeProject.status)}</span></div><div className="mt-6 grid grid-cols-4 gap-2">{steps.map((step,index) => { const activeIndex = steps.indexOf(activeProject.status); const passed = index <= activeIndex; const label = step === "recruiting" ? t.recruiting : step === "in_progress" ? t.inProgress : step === "review" ? t.reviewStatus : t.completeStatus; return <div key={step}><div className={cx("mb-2 h-1.5 rounded-full", passed ? "bg-violet-500" : "bg-[var(--line)]")}/><p className={cx("text-[9px] font-semibold sm:text-[10px]", passed ? "text-violet-300" : "muted")}>{label}</p></div>; })}</div><div className="mt-5 flex flex-wrap gap-2"><button className="btn-secondary rounded-lg px-3 py-2 text-[10px] font-semibold" onClick={() => advanceStatus("review")}>Move to review</button><button className="btn-secondary rounded-lg px-3 py-2 text-[10px] font-semibold" onClick={() => advanceStatus("completed")}>Mark completed</button></div></div>
              <div className="surface flex min-h-[540px] flex-col rounded-2xl"><div className="flex items-center justify-between border-b px-5 py-4" style={{ borderColor: "var(--line)" }}><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/15 text-xs font-bold text-violet-300">{initials(activeProject.posterName)}</div><div><h2 className="text-xs font-semibold">{activeProject.posterName}</h2><p className="mt-0.5 text-[10px] muted">{t.conversation} · {activeProject.course}</p></div></div><div className="flex items-center gap-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1.5 text-[9px] font-semibold text-emerald-300"><ShieldCheck size={13}/> Contract demo</div></div>
                <div className="scrollbar-thin flex-1 space-y-4 overflow-y-auto p-5">{activeMessages.map(message => <div key={message.id} className={cx("flex", message.isMe ? "justify-end" : "justify-start")}><div className={cx("max-w-[85%] rounded-2xl px-3.5 py-3", message.isMe ? "rounded-br-sm bg-violet-600 text-white" : "rounded-bl-sm surface-soft")}><p className="mb-1 text-[9px] font-bold opacity-70">{message.sender}</p><p className="text-xs leading-[1.7]">{message.text}</p>{message.attachment && <a href={message.attachment} target="_blank" rel="noreferrer" className="mt-2 flex items-center gap-1.5 text-[10px] underline"><Link2 size={11}/> Attachment link</a>}<p className="mt-2 text-right text-[9px] opacity-60">{message.time}</p></div></div>)}</div>
                <div className="border-t p-4" style={{ borderColor: "var(--line)" }}><div className="mb-3 flex flex-wrap gap-2"><button onClick={() => addQuickMessage(t.submitWork)} className="btn-secondary rounded-lg px-2.5 py-1.5 text-[9px] font-semibold">+ {t.submitWork}</button><button onClick={() => addQuickMessage(t.requestReview)} className="btn-secondary rounded-lg px-2.5 py-1.5 text-[9px] font-semibold">+ {t.requestReview}</button></div><form onSubmit={sendMessage} className="flex gap-2"><input className="field h-10 px-3 text-xs" placeholder={t.typeMessage} value={chatInput} onChange={e => setChatInput(e.target.value)}/><button type="submit" className="btn-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" aria-label={t.sendMessage}><Send size={15}/></button></form></div>
              </div>
            </div>
            <aside className="space-y-4"><div className="surface rounded-2xl p-5"><div className="flex items-center gap-2"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400"><LockKeyhole size={17}/></div><div><h3 className="text-xs font-semibold">{t.protection}</h3><p className="text-[9px] text-emerald-400">Demo contract status</p></div></div><p className="mt-4 text-xs leading-[1.7] muted">Status kontrak dan kompensasi ditampilkan sebagai simulasi untuk alur demonstrasi produk.</p><div className="mt-4 flex items-start gap-2 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-[10px] leading-[1.6] text-amber-300"><ShieldCheck size={14} className="mt-0.5 shrink-0"/>{t.demoNote}</div></div><div className="surface rounded-2xl p-5"><h3 className="text-xs font-semibold">{t.projectInfo}</h3><dl className="mt-4 space-y-3 text-[10px]"><div className="flex justify-between gap-4"><dt className="muted">{t.postedBy}</dt><dd className="text-right font-medium">{activeProject.posterName}</dd></div><div className="flex justify-between gap-4"><dt className="muted">{t.budget}</dt><dd className="max-w-[180px] text-right font-semibold">{activeProject.budgetValue}</dd></div><div className="flex justify-between gap-4"><dt className="muted">{t.deadline}</dt><dd className="font-medium">{activeProject.deadline}</dd></div><div className="flex justify-between gap-4"><dt className="muted">{t.openRoles}</dt><dd className="max-w-[180px] text-right font-medium">{activeProject.openRoles.join(", ")}</dd></div></dl><div className="mt-4 border-t pt-4" style={{ borderColor: "var(--line)" }}><p className="mb-2 text-[9px] font-bold uppercase tracking-[.12em] muted">{t.status}</p><div className="flex flex-wrap gap-1.5">{activeProject.techStack.map(item => <span key={item} className="rounded-md border px-2 py-1 text-[9px]" style={{ borderColor: "var(--line)" }}>{item}</span>)}</div></div></div></aside>
          </div> : <div className="surface mt-6 rounded-2xl p-10 text-center text-sm muted">Belum ada workspace.</div>}
        </section>}

        {tab === "profile" && <section className="mx-auto max-w-5xl animate-fade-up">
          <div className="mb-6"><p className="mb-2 text-[10px] font-bold uppercase tracking-[.16em] text-violet-400">STUDENT IDENTITY</p><h1 className="text-3xl font-semibold tracking-[-.04em]">{t.profileTitle}</h1><p className="mt-2 text-sm muted">{t.profileDesc}</p></div>
          <div className="surface rounded-2xl"><div className="relative h-36 bg-[linear-gradient(110deg,#2d286b_0%,#5147b5_48%,#7f70ed_100%)]"><div className="absolute right-5 top-5 flex items-center gap-1.5 rounded-lg border border-white/15 bg-black/20 px-3 py-1.5 text-[10px] font-semibold text-white"><ShieldCheck size={13} className="text-emerald-300"/> NIM verified · 20210801042</div><div className="absolute bottom-0 left-0 h-16 w-full bg-gradient-to-t from-black/20 to-transparent"/></div><div className="px-5 pb-6 sm:px-7"><div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div className="relative z-20 -mt-12 flex items-end gap-4"><img src={safeImage(initialStudents[0].avatar)} alt="Profile" className="h-24 w-24 rounded-2xl border-4 object-cover" style={{ borderColor: "var(--panel)" }}/><div className="pb-1"><h2 className="text-lg font-semibold">Hisyam Badrus Syafiq</h2><p className="mt-1 text-[10px] text-violet-400">Rekayasa Perangkat Lunak · Semester 5</p></div></div><button onClick={() => notify("Pengaturan profil akan terhubung setelah modul autentikasi diaktifkan.")} className="btn-secondary rounded-lg px-3 py-2 text-[10px] font-semibold">{t.editProfile}</button></div><p className="mt-5 max-w-3xl text-xs leading-[1.8] muted">Backend Architect & System Analyst enthusiast. Pengalaman menggarap Tugas Besar MPPL, REST API Laravel, dan Next.js Fullstack apps. Suka berkolaborasi dengan UI/UX Designers!</p><div className="mt-6 grid grid-cols-3 gap-3 border-y py-5" style={{ borderColor: "var(--line)" }}><div><p className="text-xl font-semibold text-violet-400">12</p><p className="mt-1 text-[9px] muted">{t.completed}</p></div><div><p className="text-xl font-semibold text-emerald-400">8</p><p className="mt-1 text-[9px] muted">{t.gigs}</p></div><div><p className="text-xl font-semibold">Rp 3,45 jt</p><p className="mt-1 text-[9px] muted">{t.earned}</p></div></div><div className="mt-5"><h3 className="text-xs font-semibold">{t.skills}</h3><div className="mt-3 flex flex-wrap gap-2">{["Next.js", "Laravel API", "Tailwind CSS", "MySQL Indexing", "System Architecture"].map(skill => <span key={skill} className="flex items-center gap-1.5 rounded-lg border px-3 py-2 text-[10px]" style={{ borderColor: "var(--line)" }}><CheckCircle2 size={12} className="text-emerald-400"/>{skill}</span>)}</div></div><div className="mt-6"><h3 className="text-xs font-semibold">{t.work}</h3><div className="mt-3 grid gap-3 sm:grid-cols-2"><div className="surface-soft rounded-xl p-4"><div className="flex items-center gap-2 text-violet-400"><Code2 size={15}/><span className="text-[10px] font-semibold">Full-stack development</span></div><p className="mt-2 text-xs font-semibold">Campus collaboration platform</p><p className="mt-1 text-[10px] muted">REST API · Next.js · Laravel · MySQL</p></div><div className="surface-soft rounded-xl p-4"><div className="flex items-center gap-2 text-emerald-400"><LayoutGrid size={15}/><span className="text-[10px] font-semibold">System architecture</span></div><p className="mt-2 text-xs font-semibold">Project workspace & task flow</p><p className="mt-1 text-[10px] muted">Workflow · API design · Database</p></div></div></div></div></div>
        </section>}
      </main>

      <footer className="relative z-10 border-t px-4 py-5 text-center text-[9px] muted" style={{ borderColor: "var(--line)" }}>Kampus Konnect · Campus Hub <span className="mx-1.5">·</span> {apiOnline ? <span className="text-emerald-400">API connected</span> : t.apiOffline}</footer>

      <nav className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-4 border-t p-2 backdrop-blur-xl md:hidden" style={{ background: "color-mix(in srgb, var(--panel) 94%, transparent)", borderColor: "var(--line)" }}>{(["projects", "network", "workspace", "profile"] as Tab[]).map(item => { const Icon = item === "projects" ? BriefcaseBusiness : item === "network" ? Users : item === "workspace" ? MessageSquareText : Award; return <button key={item} onClick={() => setTab(item)} className={cx("flex flex-col items-center gap-1 rounded-lg py-2 text-[9px] font-semibold", tab === item ? "text-violet-400" : "muted")}><Icon size={18}/>{t[item]}</button>; })}</nav>

      {toast && <div className="fixed right-4 top-20 z-[80] flex max-w-[calc(100vw-2rem)] items-center gap-2 rounded-xl border border-emerald-500/20 bg-[#101a18] px-4 py-3 text-xs font-medium text-emerald-200 shadow-2xl"><CheckCircle2 size={15}/>{toast}</div>}

      {proposalProject && <div className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm" onMouseDown={event => { if (event.target === event.currentTarget) setProposalProject(null); }}><div className="surface my-auto w-full max-w-xl animate-fade-up rounded-2xl p-5 sm:p-7"><div className="flex items-start justify-between gap-3 border-b pb-4" style={{ borderColor: "var(--line)" }}><div><p className="text-[9px] font-bold uppercase tracking-[.14em] text-violet-400">{proposalProject.type === "team" ? "TEAM APPLICATION" : "MICRO-GIG BID"}</p><h2 className="mt-1 text-lg font-semibold">{t.proposalTitle}</h2><p className="mt-1 text-xs leading-5 muted">{proposalProject.title}</p></div><button onClick={() => setProposalProject(null)} className="btn-secondary flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" aria-label="Close"><X size={15}/></button></div><form onSubmit={submitProposal} className="mt-5 space-y-4"><label className="block"><span className="mb-1.5 block text-[10px] font-semibold">{t.pitch}</span><textarea required rows={4} className="field resize-none p-3 text-xs leading-5" placeholder="Ceritakan pengalaman, kontribusi, dan alasan Anda cocok untuk proyek ini..." value={form.pitch} onChange={e => setForm(current => ({ ...current, pitch: e.target.value }))}/></label><label className="block"><span className="mb-1.5 block text-[10px] font-semibold">{t.portfolio}</span><input required type="url" className="field h-10 px-3 text-xs" placeholder="https://github.com/username atau Figma" value={form.portfolioUrl} onChange={e => setForm(current => ({ ...current, portfolioUrl: e.target.value }))}/></label>{proposalProject.type === "gig" && <div className="grid gap-3 sm:grid-cols-2"><label><span className="mb-1.5 block text-[10px] font-semibold">{t.price}</span><input className="field h-10 px-3 text-xs" placeholder="Rp 150.000" value={form.proposedPrice} onChange={e => setForm(current => ({ ...current, proposedPrice: e.target.value }))}/></label><label><span className="mb-1.5 block text-[10px] font-semibold">{t.days}</span><input type="number" min="1" className="field h-10 px-3 text-xs" value={form.deliveryDays} onChange={e => setForm(current => ({ ...current, deliveryDays: e.target.value }))}/></label></div>}<div className="flex flex-col-reverse gap-2 border-t pt-4 sm:flex-row" style={{ borderColor: "var(--line)" }}><button type="button" onClick={() => setProposalProject(null)} className="btn-secondary h-10 flex-1 rounded-lg text-xs font-semibold">{t.cancel}</button><button type="submit" className="btn-primary h-10 flex-1 rounded-lg text-xs font-semibold">{t.send}<ArrowRight size={14} className="ml-1 inline"/></button></div></form></div></div>}

      {reviewProject && <div className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm" onMouseDown={event => { if (event.target === event.currentTarget) setReviewProject(null); }}><div className="surface my-auto w-full max-w-2xl rounded-2xl p-5 sm:p-7"><div className="flex items-start justify-between gap-3 border-b pb-4" style={{ borderColor: "var(--line)" }}><div><p className="text-[9px] font-bold uppercase tracking-[.14em] text-violet-400">APPLICATION REVIEW</p><h2 className="mt-1 text-lg font-semibold">{t.review}</h2><p className="mt-1 text-xs muted">{reviewProject.title}</p></div><button onClick={() => setReviewProject(null)} className="btn-secondary flex h-8 w-8 items-center justify-center rounded-lg" aria-label="Close"><X size={15}/></button></div><div className="mt-5 max-h-[60vh] space-y-3 overflow-y-auto">{reviewProject.applicants.length === 0 ? <p className="py-10 text-center text-xs muted">{t.emptyApplicants}</p> : reviewProject.applicants.map(applicant => <article key={applicant.id} className="surface-soft rounded-xl p-4"><div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start"><div className="flex items-center gap-3"><img src={safeImage(applicant.applicantAvatar)} alt="" className="h-10 w-10 rounded-full object-cover"/><div><h3 className="text-xs font-semibold">{applicant.applicantName}</h3><p className="mt-1 text-[10px] muted">{applicant.applicantMajor} · {applicant.appliedRole}</p></div></div><span className={cx("w-fit rounded-md px-2 py-1 text-[9px] font-semibold", applicant.status === "accepted" ? "bg-emerald-500/10 text-emerald-300" : applicant.status === "declined" ? "bg-rose-500/10 text-rose-300" : "bg-amber-500/10 text-amber-300")}>{applicant.status}</span></div><p className="mt-3 text-xs leading-5 muted">{applicant.pitch}</p><div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t pt-3" style={{ borderColor: "var(--line)" }}><a href={applicant.portfolioUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[10px] font-semibold text-violet-400 hover:underline"><ExternalLink size={11}/>{t.viewPortfolio}</a>{applicant.status === "pending" && <button onClick={() => acceptApplicant(reviewProject, applicant)} className="btn-primary rounded-lg px-3 py-2 text-[10px] font-semibold">{t.accept}<ArrowUpRight size={12} className="ml-1 inline"/></button>}</div></article>)}</div></div></div>}
    </div>
  );
}
