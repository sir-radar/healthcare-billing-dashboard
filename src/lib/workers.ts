import { SimulationParams, SimulationResult } from '@/types/schema';

export function forecastRevenueWorker(
  params: SimulationParams
): Promise<SimulationResult> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(
      new URL('../workers/forcastRevenue.worker.ts', import.meta.url)
    );

    worker.onmessage = (event) => {
      resolve(event.data);
      worker.terminate();
    };

    worker.onerror = (error) => {
      reject(error);
      worker.terminate();
    };

    worker.postMessage(params);
  });
}
