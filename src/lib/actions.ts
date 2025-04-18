'use server';

import { createDashboardSummary } from '@/mockData/dashboard';
import { DashboardSummary } from '@/types/schema';

export async function fetchDashboardSummary(): Promise<DashboardSummary> {
  // Simulate network delay for realistic behavior
  await new Promise((resolve) => setTimeout(resolve, 300));

  return createDashboardSummary();
}
