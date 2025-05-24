import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Grant } from '../types/grant';

interface FilterState {
  search: string;
  selectedCategory: string[];
  selectedCountry: string[];
  selectedFunding: string[];
}

export function useFilters(grants: Grant[]) {
  const router = useRouter();
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    selectedCategory: [],
    selectedCountry: [],
    selectedFunding: []
  });

  useEffect(() => {
    const { search, category, country, funding } = router.query;
    setFilters(prev => ({
      ...prev,
      search: search ? (search as string) : '',
      selectedCategory: category ? (category as string).split(',') : [],
      selectedCountry: country ? (country as string).split(',') : [],
      selectedFunding: funding ? (funding as string).split(',') : []
    }));
  }, [router.query]);

  const toggleFilter = (type: keyof Omit<FilterState, 'search'>, value: string) => {
    setFilters(prev => {
      const currentList = prev[type];
      const newList = currentList.includes(value)
        ? currentList.filter(v => v !== value)
        : [...currentList, value];
      return { ...prev, [type]: newList };
    });
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      selectedCategory: [],
      selectedCountry: [],
      selectedFunding: []
    });
  };

  const filteredGrants = grants.filter((grant) => {
    const matchesSearch = (grant.title + grant.description)
      .toLowerCase()
      .includes(filters.search.toLowerCase());
    const matchesCategory = filters.selectedCategory.length === 0 || filters.selectedCategory.includes(grant.category);
    const matchesCountry = filters.selectedCountry.length === 0 || filters.selectedCountry.includes(grant.country);
    const matchesFunding = filters.selectedFunding.length === 0 || filters.selectedFunding.includes(grant.funding_type);

    return matchesSearch && matchesCategory && matchesCountry && matchesFunding;
  });

  return {
    filters,
    setFilters,
    toggleFilter,
    clearFilters,
    filteredGrants
  };
} 