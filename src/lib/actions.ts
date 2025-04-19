'use server';

import { mockClaims } from '@/mockData/claims';
import { createDashboardSummary } from '@/mockData/dashboard';
import { DashboardSummary } from '@/types/schema';

export async function fetchDashboardSummary(): Promise<DashboardSummary> {
  // Simulate network delay for realistic behavior
  await new Promise((resolve) => setTimeout(resolve, 300));

  return createDashboardSummary();
}

export async function fetchClaims() {
  // Simulate network delay for realistic behavior
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockClaims;
}
