import { z } from "zod";

export const agentSchema = z.object({
  fullName: z
    .string({ required_error: "Full name is required" })
    .min(3, "Full name must be at least 3 characters long")
    .max(50, "Full name must be less than 50 characters long")
    .regex(/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/, "Invalid name"),
  phoneNumber: z.string().regex(/^0[5-7]\d{8}$/, "Invalid phone number"),
});
export type AgentValues = z.infer<typeof agentSchema>;
export const DEFAULT_NEW_AGENT_VALUES = {
  fullName: "",
  phoneNumber: "",
};
