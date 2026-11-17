import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import projectsSeed from "./data/projects.json";
import studentsSeed from "./data/students.json";
import messagesSeed from "./data/messages.json";
import { CreateProposalDto } from "./projects/dto/create-proposal.dto";
import { CreateMessageDto } from "./workspace/dto/create-message.dto";

type ProjectStatus = "recruiting" | "in_progress" | "review" | "completed";
type ProjectRecord = any;
type MessageRecord = { id: string; projectId: string; sender: string; senderAvatar: string; text: string; time: string; isMe: boolean; attachment?: string };

@Injectable()
export class AppService {
  private projects: ProjectRecord[] = structuredClone(projectsSeed) as ProjectRecord[];
  private students = structuredClone(studentsSeed);
  private messages: MessageRecord[] = structuredClone(messagesSeed) as MessageRecord[];

  health() { return { status: "ok", service: "kampus-konnect-api", timestamp: new Date().toISOString() }; }
  getProjects() { return this.projects; }
  getStudents() { return this.students; }

  createProposal(projectId: string, dto: CreateProposalDto) {
    const project = this.findProject(projectId);
    if (project.status !== "recruiting") throw new BadRequestException("Project is not accepting proposals");
    const applicant = {
      id: `app-${Date.now()}`,
      ...dto,
      status: "pending" as const,
    };
    project.applicants = [applicant, ...project.applicants];
    return project;
  }

  acceptProposal(projectId: string, proposalId: string) {
    const project = this.findProject(projectId);
    const applicant = project.applicants.find((item: any) => item.id === proposalId);
    if (!applicant) throw new NotFoundException("Proposal not found");
    if (applicant.status !== "pending") throw new BadRequestException("Proposal has already been reviewed");
    project.applicants = project.applicants.map((item: any) => ({ ...item, status: item.id === proposalId ? "accepted" : item.status }));
    project.status = "in_progress";
    project.escrowStatus = "Simulasi kontrak aktif — tidak ada dana yang diproses";
    return project;
  }

  getMessages(projectId: string) {
    this.findProject(projectId);
    return this.messages.filter(message => message.projectId === projectId);
  }

  createMessage(projectId: string, dto: CreateMessageDto) {
    this.findProject(projectId);
    const message: MessageRecord = {
      id: `msg-${Date.now()}`, projectId, sender: dto.sender,
      senderAvatar: dto.senderAvatar || "", text: dto.text,
      time: new Intl.DateTimeFormat("id-ID", { hour: "2-digit", minute: "2-digit" }).format(new Date()),
      isMe: true, ...(dto.attachment ? { attachment: dto.attachment } : {}),
    };
    this.messages.push(message);
    return message;
  }

  updateStatus(projectId: string, status: ProjectStatus) {
    const project = this.findProject(projectId);
    project.status = status;
    return project;
  }

  private findProject(projectId: string) {
    const project = this.projects.find(item => item.id === projectId);
    if (!project) throw new NotFoundException("Project not found");
    return project;
  }
}
