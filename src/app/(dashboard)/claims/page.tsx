import { ClaimsTable } from '@/components/claims/claims-table';
import { fetchClaims } from '@/lib/actions';

export default async function Claims() {
  const claims = await fetchClaims();

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <div className="flex-1">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-neutral-800 mb-6">
              Claims Table
            </h2>

            <ClaimsTable claims={claims || []} />
          </div>
        </div>
      </div>
    </div>
  );
}
