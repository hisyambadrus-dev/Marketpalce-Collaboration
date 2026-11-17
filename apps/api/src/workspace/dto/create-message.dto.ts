import { IsOptional, IsString, IsUrl } from "class-validator";

export class CreateMessageDto {
  @IsString() sender!: string;
  @IsOptional() @IsString() senderAvatar?: string;
  @IsString() text!: string;
  @IsOptional() @IsUrl({ require_protocol: true }) attachment?: string;
}
