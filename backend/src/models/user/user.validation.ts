import { z } from "zod";

export const createUserValidation = z.object({
  fullName: z.string(),
  nationality: z.string(),
  residentialAddress: z.string(),
  email: z.string().email(),
  identificationType: z.string(),
  identificationNumber: z.string(),
  // issueDate: z.string(),
  // expirationDate: z.string(),
  sourceOfFunds: z.string(),
  purposeOfAccount: z.string(),
});
