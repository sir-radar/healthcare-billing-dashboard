'use client';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ClaimStatus, ClaimStatusType } from '@/types/schema';
import { Search } from 'lucide-react';

interface SearchFilterProps {
  onSearchTermChange: (value: string) => void;
  onStatusFilterChange: (value: ClaimStatusType | 'all') => void;
  disabled?: boolean;
}

export function SearchFilter({
  onSearchTermChange,
  onStatusFilterChange,
  disabled = false,
}: SearchFilterProps) {
  return (
    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
      <div className="relative flex-1">
        <Input
          placeholder="Search claims..."
          onChange={(e) => onSearchTermChange(e.target.value)}
          className="pl-10"
          disabled={disabled}
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
      </div>

      <Select
        onValueChange={(value) =>
          onStatusFilterChange(value as ClaimStatusType | 'all')
        }
        defaultValue="all"
        disabled={disabled}
      >
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          {Object.values(ClaimStatus).map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select defaultValue="date-desc" disabled={disabled}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="date-desc">Date (Newest)</SelectItem>
          <SelectItem value="date-asc">Date (Oldest)</SelectItem>
          <SelectItem value="amount-desc">Amount (High to Low)</SelectItem>
          <SelectItem value="amount-asc">Amount (Low to High)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
