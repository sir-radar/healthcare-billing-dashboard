import { Claim, ClaimStatus } from '@/types/schema';

// Mock claims data
export const mockClaims: Claim[] = [
  {
    id: 1,
    patient_id: 'P1',
    patient_name: 'John Smith',
    billing_code: 'B1001',
    amount: 1675.5,
    insurance_provider: 'Blue Shield',
    payment_status: ClaimStatus.Pending,
    claim_date: new Date('2025-03-25'),
  },
  {
    id: 2,
    patient_id: 'P2',
    patient_name: 'Sarah Johnson',
    billing_code: 'B2002',
    amount: 2310.09,
    insurance_provider: 'Medicare',
    payment_status: ClaimStatus.Approved,
    claim_date: new Date('2025-01-05'),
  },

  {
    id: 3,
    patient_id: 'P3',
    patient_name: 'Robert Chen',
    billing_code: 'B3003',
    amount: 4945.57,
    insurance_provider: 'Aetna',
    payment_status: ClaimStatus.Pending,
    claim_date: new Date('2025-03-04'),
  },
  {
    id: 4,
    patient_id: 'P4',
    patient_name: 'Lisa Williams',
    billing_code: 'B4004',
    amount: 8338.89,
    insurance_provider: 'UnitedHealth',
    payment_status: ClaimStatus.Denied,
    claim_date: new Date('2025-03-20'),
  },
  {
    id: 5,
    patient_id: 'P5',
    patient_name: 'Michael Garcia',
    billing_code: 'B5005',
    amount: 3220.05,
    insurance_provider: 'Cigna',
    payment_status: ClaimStatus.Denied,
    claim_date: new Date('2025-02-21'),
  },
];
