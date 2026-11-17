import { IsNumber, IsOptional, IsString, IsUrl, Min } from "class-validator";

export class CreateProposalDto {
  @IsString() applicantName!: string;
  @IsString() applicantAvatar!: string;
  @IsString() applicantMajor!: string;
  @IsNumber() applicantRep!: number;
  @IsString() appliedRole!: string;
  @IsString() pitch!: string;
  @IsUrl({ require_protocol: true }) portfolioUrl!: string;
  @IsOptional() @IsString() offeredRate?: string;
  @IsOptional() @IsNumber() @Min(1) deliveryDays?: number;
}
