import { z } from "zod";

export const createTeamSchema = z.object({
  name: z.string().min(3, "Team name must be at least 3 characters"),
  description: z.string().optional(),
  avatar: z.instanceof(File).optional(),
});

export const joinTeamSchema = z.object({
  inviteCode: z.string().min(8, "Invite code must be at least 8 characters"),
});

export type CreateTeamInput = z.infer<typeof createTeamSchema>;
export type JoinTeamInput = z.infer<typeof joinTeamSchema>;