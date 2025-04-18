'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProbabilitySlider } from './probability-slider';
import { SimulationParams, SimulationResult } from '@/types/schema';
import { formatCurrency } from '@/lib/utils';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { debounce } from 'lodash';
import { RenderResults } from './render-result';

type Props = {
  forecastRevenue: (value: SimulationParams) => Promise<SimulationResult>;
};

export function SimulationResults({ forecastRevenue }: Props) {
  const [params, setParams] = useState<SimulationParams>({
    pendingProbability: 90,
    approvedProbability: 60,
    deniedProbability: 10,
  });

  const [results, setResults] = useState<SimulationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const runSimulation = useCallback(
    async (updatedParams: SimulationParams) => {
      setIsLoading(true);
      try {
        const data = await forecastRevenue(updatedParams);
        toast.success('Simulation Complete', {
          description: 'You can view your results below.',
          duration: 3000,
        });
        setResults(data);
      } catch (error) {
        toast.error('Simulation Failed', {
          description:
            error instanceof Error
              ? error.message
              : 'An unknown error occurred',
          duration: 3000,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [forecastRevenue]
  );

  // Debounced version of runSimulation
  const debouncedRunSimulation = useMemo(
    () =>
      debounce((updatedParams: SimulationParams) => {
        runSimulation(updatedParams);
      }, 1000),
    [runSimulation]
  );

  const handleSliderChange = (key: keyof SimulationParams, value: number) => {
    const updatedParams = { ...params, [key]: value };
    setParams(updatedParams);
    debouncedRunSimulation(updatedParams);
  };

  // Run the simulation on first load
  useEffect(() => {
    runSimulation(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderLoadingState = () => (
    <div className="h-48 flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-12 w-48 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-64 bg-gray-100 rounded"></div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payment Probability Parameters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-neutral-500">
            Adjust the sliders to change the probability of payment for each
            claim status to run the Monte Carlo simulation.
          </p>

          <ProbabilitySlider
            label="Pending Payment Probability"
            value={params.pendingProbability}
            onChange={(value) =>
              handleSliderChange('pendingProbability', value)
            }
            disabled={isLoading}
          />

          <ProbabilitySlider
            label="Approved Payment Probability"
            value={params.approvedProbability}
            onChange={(value) =>
              handleSliderChange('approvedProbability', value)
            }
            disabled={isLoading}
          />

          <ProbabilitySlider
            label="Denied Payment Probability"
            value={params.deniedProbability}
            onChange={(value) => handleSliderChange('deniedProbability', value)}
            disabled={isLoading}
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Expected Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              renderLoadingState()
            ) : results ? (
              <RenderResults {...results} />
            ) : (
              <div className="flex items-center justify-center h-48">
                <p className="text-neutral-500">
                  Run the simulation to see results
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            {isLoading ? (
              <div className="h-full flex items-center justify-center">
                <div className="animate-pulse w-full h-4/5 bg-gray-100 rounded"></div>
              </div>
            ) : results?.distribution ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={results.distribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis
                    label={{
                      value: 'Iteration Count',
                      angle: -90,
                      position: 'insideLeft',
                    }}
                  />
                  <Tooltip formatter={(value) => [value, 'Iterations']} />
                  <Bar dataKey="count" fill="#0070f3" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-neutral-500">
                  Run the simulation to see distribution
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Projected Revenue Range</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          {isLoading ? (
            <div className="h-full flex items-center justify-center">
              <div className="animate-pulse w-full h-4/5 bg-gray-100 rounded"></div>
            </div>
          ) : results?.projectedRevenue ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={results.projectedRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                <Tooltip
                  formatter={(value) => [
                    formatCurrency(value as number),
                    'Revenue',
                  ]}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="expected"
                  name="Expected"
                  stroke="#0070f3"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="upper"
                  name="Upper Range"
                  stroke="#0070f3"
                  strokeWidth={1}
                  strokeDasharray="5 5"
                  strokeOpacity={0.6}
                />
                <Line
                  type="monotone"
                  dataKey="lower"
                  name="Lower Range"
                  stroke="#0070f3"
                  strokeWidth={1}
                  strokeDasharray="5 5"
                  strokeOpacity={0.6}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-neutral-500">
                Run the simulation to see projections
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
