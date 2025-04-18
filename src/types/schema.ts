import { z } from 'zod';

export const ClaimStatus = {
  Pending: 'Pending',
  Approved: 'Approved',
  Denied: 'Denied',
} as const;

export const claimSchema = z.object({
  id: z.number(),
  patient_id: z.string(),
  patient_name: z.string(),
  billing_code: z.string(),
  amount: z.number(),
  insurance_provider: z.string(),
  payment_status: z.enum(['Pending', 'Approved', 'Denied']),
  claim_date: z.date(),
});

export type Claim = z.infer<typeof claimSchema>;

export type ClaimStatusType = (typeof ClaimStatus)[keyof typeof ClaimStatus];

export const dashboardSummarySchema = z.object({
  totalAmount: z.number(),
  totalClaims: z.number(),
  approvedAmount: z.number(),
  approvedClaims: z.number(),
  pendingAmount: z.number(),
  pendingClaims: z.number(),
  deniedAmount: z.number(),
  deniedClaims: z.number(),
  claimsDistribution: z.array(
    z.object({
      name: z.string(),
      value: z.number(),
    })
  ),
});

export type DashboardSummary = z.infer<typeof dashboardSummarySchema>;
