import type { NextApiRequest, NextApiResponse } from 'next';

const AIRTABLE_ACCESS_TOKEN = process.env.AIRTABLE_ACCESS_TOKEN;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check if environment variables are set
  if (!AIRTABLE_ACCESS_TOKEN || !AIRTABLE_BASE_ID) {
    console.error('Missing Airtable credentials');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const { search, category, country, funding } = req.query;

  let formula = '';
  const conditions = [];

  if (search) {
    conditions.push(`OR(SEARCH("${search}", {Title}), SEARCH("${search}", {Description}))`);
  }
  if (category) {
    conditions.push(`{Category} = "${category}"`);
  }
  if (country) {
    conditions.push(`{Country} = "${country}"`);
  }
  if (funding) {
    conditions.push(`{Funding Type} = "${funding}"`);
  }

  if (conditions.length > 0) {
    formula = `AND(${conditions.join(', ')})`;
  }

  try {
    console.log('Fetching from Airtable...');
    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}?filterByFormula=${encodeURIComponent(formula)}`,
      {
        headers: {
          'Authorization': `Bearer ${AIRTABLE_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Airtable API error:', errorData);
      throw new Error(`Airtable API error: ${response.status}`);
    }

    const data = await response.json();
    console.log(`Found ${data.records.length} records`);

    const grants = data.records.map((record: any) => ({
      id: record.id,
      title: record.fields.Title || '',
      description: record.fields.Description || '',
      category: record.fields.Category || '',
      country: record.fields.Country || '',
      funding_type: record.fields['Funding Type'] || '',
      amount: record.fields.Amount || 0,
      deadline: record.fields.Deadline || '',
      url: record.fields.URL || '',
      agency: record.fields.Agency || '',
      region: record.fields.Region || '',
      year: record.fields.Year || new Date().getFullYear(),
    }));

    res.status(200).json({ grants });
  } catch (error) {
    console.error('Error fetching grants:', error);
    res.status(500).json({ 
      error: 'Failed to fetch grants',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 