import { mockClaims } from '@/mockData/claims';
import { ClaimStatus, SimulationParams } from '@/types/schema';

self.onmessage = (event) => {
  const params: SimulationParams = event.data;

  // Simulate a Monte Carlo simulation for revenue forecasting
  const iterations = 3200;
  const pendingProbability = params.pendingProbability / 100;
  const approvedProbability = params.approvedProbability / 100;
  const deniedProbability = params.deniedProbability / 100;

  const results: number[] = [];

  for (let i = 0; i < iterations; i++) {
    let iterationRevenue = 0;

    mockClaims.forEach((claim) => {
      const amount = parseFloat(String(claim.amount));
      let probability = 0;

      switch (claim.payment_status) {
        case ClaimStatus.Pending:
          probability = pendingProbability;
          break;
        case ClaimStatus.Approved:
          probability = approvedProbability;
          break;
        case ClaimStatus.Denied:
          probability = deniedProbability;
          break;
      }

      const isPaid = Math.random() < probability;
      if (isPaid) iterationRevenue += amount;
    });

    results.push(iterationRevenue);
  }

  const expectedRevenue =
    results.reduce((sum, rev) => sum + rev, 0) / iterations;
  const minRevenue = Math.min(...results);
  const maxRevenue = Math.max(...results);

  const ranges = [
    { min: 1, max: 4000 },
    { min: 4000, max: 8000 },
    { min: 8000, max: 12000 },
    { min: 12000, max: 16000 },
    { min: 16000, max: 20000 },
  ];

  const distribution = ranges.map((range) => {
    const count = results.filter(
      (rev) => rev >= range.min && rev < range.max
    ).length;
    return {
      range: `$${range.min / 1000}k-$${range.max / 1000}k`,
      count,
    };
  });

  const projectedRevenue = Array.from({ length: 6 }, (_, i) => {
    const month = `${i + 1} Month${i > 0 ? 's' : ''}`;
    const expected = expectedRevenue * (i + 1);
    const upper = expected * 1.2;
    const lower = expected * 0.8;

    return { month, expected, upper, lower };
  });

  // Send the result back to the main thread
  self.postMessage({
    expectedRevenue,
    minRevenue,
    maxRevenue,
    distribution,
    projectedRevenue,
  });
};
