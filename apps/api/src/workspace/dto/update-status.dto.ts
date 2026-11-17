import { IsIn } from "class-validator";

export class UpdateStatusDto {
  @IsIn(["recruiting", "in_progress", "review", "completed"])
  status!: "recruiting" | "in_progress" | "review" | "completed";
}
