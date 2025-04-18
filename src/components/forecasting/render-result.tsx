import { formatCurrency } from '@/lib/utils';
import { SimulationResult } from '@/types/schema';
import { Card, CardContent } from '../ui/card';

export function RenderResults(results: SimulationResult) {
  return (
    <>
      <div className="flex items-center justify-center h-48">
        <div className="text-center">
          <p className="text-4xl font-bold text-neutral-900">
            {formatCurrency(results!.expectedRevenue)}
          </p>
          <p className="text-sm text-neutral-500 mt-2">
            Mean value from 3000+ iterations
          </p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <Card className="bg-neutral-50">
          <CardContent className="p-4">
            <p className="text-sm font-medium text-neutral-500">Minimum</p>
            <p className="text-xl font-semibold text-neutral-900">
              {formatCurrency(results!.minRevenue)}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-neutral-50">
          <CardContent className="p-4">
            <p className="text-sm font-medium text-neutral-500">Maximum</p>
            <p className="text-xl font-semibold text-neutral-900">
              {formatCurrency(results!.maxRevenue)}
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
