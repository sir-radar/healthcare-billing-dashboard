'use client';

import { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/status-badge';
import { Claim, ClaimStatusType } from '@/types/schema';
import { SearchFilter } from './search-filter';
import { formatCurrency } from '@/lib/utils';
import { ArrowUpDown } from 'lucide-react';

interface ClaimsTableProps {
  claims: Claim[];
}

type SortField =
  | 'patient_name'
  | 'billing_code'
  | 'amount'
  | 'insurance_provider'
  | 'payment_status'
  | 'claim_date';
type SortDirection = 'asc' | 'desc';

export function ClaimsTable({ claims }: ClaimsTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ClaimStatusType | 'all'>(
    'all'
  );
  const [sortField, setSortField] = useState<SortField>('claim_date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedClaims = useMemo(() => {
    // First apply search filter
    let result = claims.filter((claim) => {
      if (searchTerm === '') return true;

      const searchLower = searchTerm.toLowerCase();
      return (
        claim.patient_name.toLowerCase().includes(searchLower) ||
        claim.patient_id.toLowerCase().includes(searchLower) ||
        claim.billing_code.toLowerCase().includes(searchLower) ||
        claim.insurance_provider.toLowerCase().includes(searchLower) ||
        claim.payment_status.toLowerCase().includes(searchLower)
      );
    });

    // Then apply status filter
    if (statusFilter !== 'all') {
      result = result.filter((claim) => claim.payment_status === statusFilter);
    }

    // Finally sort
    return result.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      // Special handling for date and amount
      if (sortField === 'claim_date') {
        const aDate = new Date(aValue as string);
        const bDate = new Date(bValue as string);
        return sortDirection === 'asc'
          ? aDate.getTime() - bDate.getTime()
          : bDate.getTime() - aDate.getTime();
      }

      if (sortField === 'amount') {
        const aAmount = parseFloat(aValue as string);
        const bAmount = parseFloat(bValue as string);
        return sortDirection === 'asc' ? aAmount - bAmount : bAmount - aAmount;
      }

      // Default string comparison
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return 0;
    });
  }, [claims, searchTerm, statusFilter, sortField, sortDirection]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredAndSortedClaims.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedClaims = filteredAndSortedClaims.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="space-y-4">
      <SearchFilter
        onSearchTermChange={setSearchTerm}
        onStatusFilterChange={setStatusFilter}
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">
                <Button
                  variant="ghost"
                  onClick={() => handleSort('patient_name')}
                  className="flex items-center gap-1 font-medium"
                >
                  Patient
                  <ArrowUpDown size={16} />
                </Button>
              </TableHead>
              <TableHead className="text-left">
                <Button
                  variant="ghost"
                  onClick={() => handleSort('billing_code')}
                  className="flex items-center gap-1 font-medium"
                >
                  Billing Code
                  <ArrowUpDown size={16} />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button
                  variant="ghost"
                  onClick={() => handleSort('amount')}
                  className="flex items-center gap-1 font-medium"
                >
                  Amount
                  <ArrowUpDown size={16} />
                </Button>
              </TableHead>
              <TableHead className="text-left">
                <Button
                  variant="ghost"
                  onClick={() => handleSort('insurance_provider')}
                  className="flex items-center gap-1 font-medium"
                >
                  Provider
                  <ArrowUpDown size={16} />
                </Button>
              </TableHead>
              <TableHead className="text-center">
                <Button
                  variant="ghost"
                  onClick={() => handleSort('payment_status')}
                  className="flex items-center gap-1 font-medium"
                >
                  Status
                  <ArrowUpDown size={16} />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button
                  variant="ghost"
                  onClick={() => handleSort('claim_date')}
                  className="flex items-center gap-1 font-medium"
                >
                  Date
                  <ArrowUpDown size={16} />
                </Button>
              </TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedClaims.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-10 text-neutral-500"
                >
                  No claims found with the current filters
                </TableCell>
              </TableRow>
            ) : (
              paginatedClaims.map((claim) => (
                <TableRow key={claim.id}>
                  <TableCell>
                    <div className="font-medium">{claim.patient_name}</div>
                    <div className="text-sm text-neutral-500">
                      {claim.patient_id}
                    </div>
                  </TableCell>
                  <TableCell className="pl-9 text-neutral-500">
                    {claim.billing_code}
                  </TableCell>
                  <TableCell className="pl-[17px] font-medium">
                    {formatCurrency(
                      parseFloat(claim.amount as unknown as string)
                    )}
                  </TableCell>
                  <TableCell className="pl-[26px] text-neutral-500">
                    {claim.insurance_provider}
                  </TableCell>
                  <TableCell>
                    <StatusBadge
                      status={claim.payment_status as ClaimStatusType}
                    />
                  </TableCell>
                  <TableCell className="text-neutral-500">
                    {new Date(claim.claim_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </TableCell>
                  <TableCell>
                    <Button variant="link" className="text-primary p-0">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className={
                  currentPage === 1 ? 'pointer-events-none opacity-50' : ''
                }
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => setCurrentPage(page)}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                className={
                  currentPage === totalPages
                    ? 'pointer-events-none opacity-50'
                    : ''
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
