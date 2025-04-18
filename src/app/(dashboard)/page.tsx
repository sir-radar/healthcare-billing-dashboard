import OverviewCards from '@/components/dashboard/overview-cards';
import ClaimsDistribution from '@/components/dashboard/claims-distribution';
import { fetchDashboardSummary } from '@/lib/actions';

export default async function Dashboard() {
  const summary = await fetchDashboardSummary();

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <div className="flex-1">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-neutral-800 mb-6">
              Overview
            </h2>

            <OverviewCards summary={summary} />

            <div className="mt-8">
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] w-full">
                <ClaimsDistribution data={summary.claimsDistribution} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
