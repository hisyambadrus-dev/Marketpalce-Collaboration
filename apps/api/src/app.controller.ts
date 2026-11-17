import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { AppService } from "./app.service";
import { CreateProposalDto } from "./projects/dto/create-proposal.dto";
import { CreateMessageDto } from "./workspace/dto/create-message.dto";
import { UpdateStatusDto } from "./workspace/dto/update-status.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("health") health() { return this.appService.health(); }
  @Get("projects") getProjects() { return this.appService.getProjects(); }
  @Get("students") getStudents() { return this.appService.getStudents(); }

  @Post("projects/:projectId/proposals")
  createProposal(@Param("projectId") projectId: string, @Body() body: CreateProposalDto) {
    return this.appService.createProposal(projectId, body);
  }

  @Patch("projects/:projectId/proposals/:proposalId/accept")
  acceptProposal(@Param("projectId") projectId: string, @Param("proposalId") proposalId: string) {
    return this.appService.acceptProposal(projectId, proposalId);
  }

  @Get("workspace/:projectId/messages")
  getMessages(@Param("projectId") projectId: string) { return this.appService.getMessages(projectId); }

  @Post("workspace/:projectId/messages")
  createMessage(@Param("projectId") projectId: string, @Body() body: CreateMessageDto) {
    return this.appService.createMessage(projectId, body);
  }

  @Patch("workspace/:projectId/status")
  updateStatus(@Param("projectId") projectId: string, @Body() body: UpdateStatusDto) {
    return this.appService.updateStatus(projectId, body.status);
  }
}
