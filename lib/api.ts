const AIRTABLE_ACCESS_TOKEN = process.env.NEXT_PUBLIC_AIRTABLE_ACCESS_TOKEN;
const AIRTABLE_BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = 'Grants';

export async function getGrants(filters: {
  search?: string;
  category?: string;
  country?: string;
  funding?: string;
} = {}) {
  try {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.category) params.append('category', filters.category);
    if (filters.country) params.append('country', filters.country);
    if (filters.funding) params.append('funding', filters.funding);

    const response = await fetch(`/api/grants?${params.toString()}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch grants');
    }

    return data.grants;
  } catch (error) {
    console.error('Error in getGrants:', error);
    throw error;
  }
} 