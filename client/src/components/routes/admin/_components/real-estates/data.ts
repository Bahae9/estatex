import { z } from "zod";

export const realEstateType = z.enum(
  [
    "POOL",
    "VILLA",
    "HOUSE",
    "APARTMENT",
    "DUPLEX",
    "TOWNHOUSE",
    "FARMHOUSE",
    "CABIN",
    "BUNGALOW",
    "MANSION",
    "MOBILE_HOME",
    "MANSIONETTE",
  ],
  {
    message: "Invalid Type",
  }
);
export const realEstateTransactionType = z.enum(["SALE", "RENT"], {
  message: "Invalid transaction type",
});

export type RealEstateTypeProps = z.infer<typeof realEstateType>;
export type realEstateTransactionTypeProps = z.infer<
  typeof realEstateTransactionType
>;
export const MIN_PRICE = 0;
export const MAX_PRICE = 99999;
export const MIN_SIZE = 0;
export const MAX_SIZE = 9999;

export const RealEstateSchema = z.object({
  userId: z.string().min(1, { message: "User Id is required" }),
  type: realEstateType,
  price: z
    .number()
    .min(MIN_PRICE, { message: `Price must be at least ${MIN_PRICE}` })
    .max(MAX_PRICE, { message: `Price cannot exceed ${MAX_PRICE}` }),
  transactionType: realEstateTransactionType,
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters" })
    .max(50, { message: "Title cannot exceed 50 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(250, { message: "Description cannot exceed 250 characters" }),
  size: z
    .number()
    .min(MIN_SIZE, { message: `Size must be at least ${MIN_SIZE}` })
    .max(MAX_SIZE, { message: `Size cannot exceed ${MAX_SIZE}` }),
  location: z
    .string()
    .min(3, { message: "Location must be at least 3 characters" }),
});

export type RealEstateFormProps = z.infer<typeof RealEstateSchema>;

export const DEFAULT_REAL_ESTATE_VALUES = {
  userId: "",
  type: "" as RealEstateTypeProps,
  price: MIN_PRICE,
  transactionType: "" as realEstateTransactionTypeProps,
  title: "",
  description: "",
  size: MIN_SIZE,
  location: "",
};
