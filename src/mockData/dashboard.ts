import { DashboardSummary, ClaimStatus } from '@/types/schema';
import { mockClaims } from './claims';

// Create dashboard summary with mock data
export const createDashboardSummary = (): DashboardSummary => {
  const totalAmount = mockClaims.reduce((sum, { amount }) => sum + amount, 0);
  const totalClaims = mockClaims.length;

  const approved = mockClaims.filter(
    ({ payment_status }) => payment_status === ClaimStatus.Approved
  );
  const approvedAmount = approved.reduce((sum, { amount }) => sum + amount, 0);

  const pending = mockClaims.filter(
    ({ payment_status }) => payment_status === ClaimStatus.Pending
  );
  const pendingAmount = pending.reduce((sum, { amount }) => sum + amount, 0);

  const denied = mockClaims.filter(
    ({ payment_status }) => payment_status === ClaimStatus.Denied
  );
  const deniedAmount = denied.reduce((sum, { amount }) => sum + amount, 0);

  const claimsDistribution = [
    {
      name: ClaimStatus.Approved,
      value: approved.length,
      total: approvedAmount,
    },
    { name: ClaimStatus.Pending, value: pending.length, total: pendingAmount },
    { name: ClaimStatus.Denied, value: denied.length, total: deniedAmount },
  ];

  return {
    totalAmount,
    totalClaims,
    approvedAmount,
    approvedClaims: approved.length,
    pendingAmount,
    pendingClaims: pending.length,
    deniedAmount,
    deniedClaims: denied.length,
    claimsDistribution,
  };
};
