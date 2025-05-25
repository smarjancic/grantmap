'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FilterSidebar from '@/components/FilterSidebar';
import GrantCard from '@/components/GrantCard';
import { Grant } from '@/types/grant';
import { getGrants } from '@/lib/api';

export default function SegmentsPage({
  params,
}: {
  params: { segments: string[] };
}) {
  const router = useRouter();
  const [grants, setGrants] = useState<Grant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string[]>([]);
  const [selectedFunding, setSelectedFunding] = useState<string[]>([]);

  useEffect(() => {
    const loadGrants = async () => {
      try {
        setLoading(true);
        const data = await getGrants();
        setGrants(data);
        setError(null);
      } catch (err) {
        setError('Failed to load grants. Please try again later.');
        console.error('Error loading grants:', err);
      } finally {
        setLoading(false);
      }
    };
    loadGrants();
  }, []);

  const toggle = (value: string, list: string[], setList: (value: string[]) => void) => {
    setList(
      list.includes(value)
        ? list.filter((v) => v !== value)
        : [...list, value]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategory([]);
    setSelectedCountry([]);
    setSelectedFunding([]);
  };

  const filteredGrants = (grants || []).filter((grant) => {
    const matchesSearch = searchQuery
      ? grant.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        grant.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesCategory = selectedCategory.length
      ? selectedCategory.includes(grant.category)
      : true;
    const matchesCountry = selectedCountry.length
      ? selectedCountry.includes(grant.country)
      : true;
    const matchesFundingType = selectedFunding.length
      ? selectedFunding.includes(grant.funding_type)
      : true;
    return matchesSearch && matchesCategory && matchesCountry && matchesFundingType;
  });

  const categories = [...new Set((grants || []).map((grant) => grant.category))].sort();
  const countries = [...new Set((grants || []).map((grant) => grant.country))].sort();
  const fundingTypes = [...new Set((grants || []).map((grant) => grant.funding_type))].sort();

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <div className="w-full lg:w-72 flex-shrink-0">
            <div className="sticky top-8">
              <FilterSidebar
                categories={categories}
                countries={countries}
                fundingTypes={fundingTypes}
                selectedCategory={selectedCategory}
                selectedCountry={selectedCountry}
                selectedFunding={selectedFunding}
                onToggleCategory={(value) => toggle(value, selectedCategory, setSelectedCategory)}
                onToggleCountry={(value) => toggle(value, selectedCountry, setSelectedCountry)}
                onToggleFunding={(value) => toggle(value, selectedFunding, setSelectedFunding)}
                onClearAll={clearAllFilters}
              />
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Matching Grants
                </h2>
                {filteredGrants.length > 0 && (
                  <span className="text-sm text-gray-500">
                    {filteredGrants.length} {filteredGrants.length === 1 ? 'grant' : 'grants'} found
                  </span>
                )}
              </div>
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading grants...</p>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-red-600">{error}</p>
                </div>
              ) : filteredGrants.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                  <div className="text-4xl mb-4">🔍</div>
                  <p className="text-xl font-medium text-gray-900 mb-2">No grants found</p>
                  <p className="text-gray-600">
                    {searchQuery ? (
                      <>No results for "{searchQuery}". Try adjusting your search or filters.</>
                    ) : (
                      <>Try adjusting your filters to find what you're looking for.</>
                    )}
                  </p>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredGrants.map((grant) => (
                    <GrantCard key={grant.id} grant={grant} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 