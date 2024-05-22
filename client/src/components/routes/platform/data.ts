import { z } from "zod";
import { GlobalReviewProps, RateProgressProps, ReviewProps } from "./feedback";

export const contactSchema = z.object({
  fullName: z
    .string({ required_error: "Full name is required" })
    .min(3, "Full name must be at least 3 characters")
    .max(30, "Full name must be less than 30 characters")
    .regex(/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/, "Invalid name"),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email" }),
  message: z
    .string({ required_error: "Message is required" })
    .min(10, { message: "Message must be at least 10 characters" })
    .max(300, "Message must be less than 250 characters"),
});

export type ContactValues = z.infer<typeof contactSchema>;
export const DEFAULT_CONTACT_VALUES = {
  fullName: "",
  email: "",
  message: "",
};

export const feedbackSchema = z.object({
  userId: z.string().min(1, "User Id is required"),
  rate: z
    .number({ required_error: "Rate is required" })
    .gte(1, "Rate must be greater than or equal to 1")
    .lte(5, "Rate must be less than or equal to 5"),
  feedback: z
    .string({ required_error: "Feedback is required" })
    .min(10, {
      message: "Feedback must be at least 10 characters long",
    })
    .max(350, "Feedback must be less than 350 characters long"),
});
export type FeedbackValues = z.infer<typeof feedbackSchema>;
export const DEFAULT_FEEDBACK_VALUES = {
  userId: "",
  feedback: "",
  rate: 0,
};

export const initialRateProgress: RateProgressProps = {
  5: 0,
  4: 0,
  3: 0,
  2: 0,
  1: 0,
};

export const profileSchema = z.object({
  fullName: z
    .string({ required_error: "Full name is required" })
    .min(3, "Full name must be at least 3 characters long")
    .max(50, "Full name must be less than 50 characters long")
    .regex(/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/, "Invalid name"),
  phoneNumber: z.union([
    z.literal(""),
    z
      .string()
      .regex(/^0[5-7]\d{8}$/, "Invalid phone number")
      .optional(),
  ]),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z.union([
    z.literal(""),
    z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(30, "Password must be less than 30 characters long")
      .optional(),
  ]),
});
export type ProfileValues = z.infer<typeof profileSchema>;

export const globalRandomReviews: GlobalReviewProps[] = [
  {
    id: 2342,
    fullName: "Claire Martin",
    feedback:
      "Je suis très satisfaite de mon expérience. L'équipe a été très professionnelle.",
    rate: 234243,
    date: "2024-04-29",
    email: "exemple@gmail.com",
  },
  {
    id: 234223,
    fullName: "Pierre Bernard",
    feedback:
      "Le service était plutôt moyen. Il y avait des points à améliorer.",
    rate: 2,
    date: "2024-04-29",
    email: "tester@gmail.com",
  },
  {
    id: 1232,
    fullName: "Sophie Gauthier",
    feedback:
      "Le service était exceptionnel ! Je recommanderais à d'autres sans hésiter.",
    rate: 5,
    date: "2024-04-29",
    email: "global@yahoo.fr",
  },
  {
    id: 88,
    fullName: "Sophie Gauthier",
    feedback:
      "Le service était exceptionnel ! Je recommanderais à d'autres sans hésiter.",
    rate: 5,
    date: "2024-04-29",
    email: "global@yahoo.fr",
  },
  {
    id: 14,
    fullName: "Sophie Gauthier",
    feedback:
      "Le service était exceptionnel ! Je recommanderais à d'autres sans hésiter.",
    rate: 5,
    date: "2024-04-29",
    email: "global@yahoo.fr",
  },
  {
    id: 15,
    fullName: "Sophie Gauthier",
    feedback:
      "Le service était exceptionnel ! Je recommanderais à d'autres sans hésiter.",
    rate: 5,
    date: "2024-04-29",
    email: "global@yahoo.fr",
  },
  {
    id: 888,
    fullName: "Sophie Gauthier",
    feedback:
      "Le service était exceptionnel ! Je recommanderais à d'autres sans hésiter.",
    rate: 5,
    date: "2024-04-29",
    email: "global@yahoo.fr",
  },
  {
    id: 184,
    fullName: "Sophie Gauthier",
    feedback:
      "Le service était exceptionnel ! Je recommanderais à d'autres sans hésiter.",
    rate: 5,
    date: "2024-04-29",
    email: "global@yahoo.fr",
  },
  {
    id: 185,
    fullName: "Sophie Gauthier",
    feedback:
      "Le service était exceptionnel ! Je recommanderais à d'autres sans hésiter.",
    rate: 5,
    date: "2024-04-29",
    email: "global@yahoo.fr",
  },
];

export const userRandomReviews: ReviewProps[] = [
  {
    id: 1024,
    feedback:
      "Le service était très efficace et rapide. J'ai été impressionnée par la qualité des réponses.",
    rate: 5,
    date: "2024-04-29",
  },
  {
    id: 2056,
    feedback:
      "L'expérience était correcte, mais il y a eu quelques retards dans la communication.",
    rate: 3,
    date: "2024-04-29",
  },
  {
    id: 3078,
    feedback:
      "Je suis très satisfaite de mon expérience. L'équipe a été très professionnelle.",
    rate: 4,
    date: "2024-04-29",
  },
  {
    id: 1,
    feedback:
      "Je suis très satisfaite de mon expérience. L'équipe a été très professionnelle.",
    rate: 4,
    date: "2024-04-29",
  },
  {
    id: 2,
    feedback:
      "Je suis très satisfaite de mon expérience. L'équipe a été très professionnelle.",
    rate: 5,
    date: "2024-04-29",
  },
];
