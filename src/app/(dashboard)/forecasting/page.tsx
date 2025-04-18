import { SimulationResults } from '@/components/forecasting/simulation-results';
import { forecastRevenue } from '@/lib/actions';

export default async function Forecasting() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <div className="flex-1">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-neutral-800 mb-6">
              Revenue Forecasting
            </h2>

            <SimulationResults forecastRevenue={forecastRevenue} />
          </div>
        </div>
      </div>
    </div>
  );
}
