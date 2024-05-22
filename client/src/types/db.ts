import {
  RealEstateTypeProps,
  realEstateTransactionTypeProps,
} from "@/components/routes/admin/_components/real-estates/data";

export type RealEstateProps = {
  id: number;
  userId: number;
  type: RealEstateTypeProps;
  imageUrls: string;
  updatedAt: string;
  createdAt: string;
  price: number;
  transactionType: realEstateTransactionTypeProps;
  title: string;
  description: string;
  size: number;
  location: string;
};
export type UserDataProps = {
  id: number;
  fullName: string;
  email: string;
};
export type UserFullDataProps = UserDataProps & {
  phoneNumber?: string;
  createdAt: string;
  updatedAt: string;
  auth: "ADMIN" | "USER";
};
export type FeedbackProps = {
  id: number;
  rate: number;
  feedback: string;
  createdAt: string;
  updatedAt: string;
};
export type AddedFeedbackProps = { userId: number } & FeedbackProps;
export interface TransactionProps {
  id: number;
  realEstateId: number;
  agentId: number;
  sellerId: number;
  buyerId: number;
  contractId: number;
  createdAt: string;
}
export interface ContractProps {
  id: number;
  content: string;
}
export type AgentProps = {
  id: number;
  fullName: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
};
