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
      total: z.number(),
    })
  ),
});

export type DashboardSummary = z.infer<typeof dashboardSummarySchema>;

// Create simulation parameters schema
export const simulationParamsSchema = z.object({
  pendingProbability: z.number().min(0).max(100),
  approvedProbability: z.number().min(0).max(100),
  deniedProbability: z.number().min(0).max(100),
});

export type SimulationParams = z.infer<typeof simulationParamsSchema>;

// Create simulation result schema
export const simulationResultSchema = z.object({
  expectedRevenue: z.number(),
  minRevenue: z.number(),
  maxRevenue: z.number(),
  distribution: z.array(
    z.object({
      range: z.string(),
      count: z.number(),
    })
  ),
  projectedRevenue: z.array(
    z.object({
      month: z.string(),
      expected: z.number(),
      upper: z.number(),
      lower: z.number(),
    })
  ),
});

export type SimulationResult = z.infer<typeof simulationResultSchema>;
