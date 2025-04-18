'use client';

import { Card, CardContent } from '@/components/ui/card';
import { DashboardSummary } from '@/types/schema';
import { formatCurrency } from '@/lib/utils';

interface OverviewCardsProps {
  summary: DashboardSummary;
}

export default function OverviewCards({ summary }: OverviewCardsProps) {
  const {
    totalAmount,
    totalClaims,
    approvedAmount,
    approvedClaims,
    pendingAmount,
    pendingClaims,
    deniedAmount,
    deniedClaims,
  } = summary;

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <h3 className="font-medium text-neutral-500 mb-1">
            Total Billing Amount
          </h3>
          <p className="text-2xl font-bold text-neutral-900">
            {formatCurrency(totalAmount)}
          </p>
          <p className="text-sm text-neutral-500 mt-1">{totalClaims} claims</p>
        </CardContent>
      </Card>

      <Card className="hover:shadow-md transition-shadow border-l-4 border-green-500">
        <CardContent className="p-6">
          <h3 className="font-medium text-neutral-500 mb-1">Approved Amount</h3>
          <p className="text-2xl font-bold text-green-600">
            {formatCurrency(approvedAmount)}
          </p>
          <p className="text-sm text-neutral-500 mt-1">
            {approvedClaims} claims
          </p>
        </CardContent>
      </Card>

      <Card className="hover:shadow-md transition-shadow border-l-4 border-yellow-500">
        <CardContent className="p-6">
          <h3 className="font-medium text-neutral-500 mb-1">Pending Amount</h3>
          <p className="text-2xl font-bold text-yellow-600">
            {formatCurrency(pendingAmount)}
          </p>
          <p className="text-sm text-neutral-500 mt-1">
            {pendingClaims} claims
          </p>
        </CardContent>
      </Card>

      <Card className="hover:shadow-md transition-shadow border-l-4 border-red-500">
        <CardContent className="p-6">
          <h3 className="font-medium text-neutral-500 mb-1">Denied Amount</h3>
          <p className="text-2xl font-bold text-red-600">
            {formatCurrency(deniedAmount)}
          </p>
          <p className="text-sm text-neutral-500 mt-1">{deniedClaims} claims</p>
        </CardContent>
      </Card>
    </div>
  );
}
