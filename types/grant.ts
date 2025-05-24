export type FocusArea = 'Education' | 'Health' | 'Technology' | 'Arts' | 'Environment' | 'Other';

export interface Grant {
    id: string;
    title: string;
    description: string;
    category: string;
    country: string;
    funding_type: string;
    amount: number;
    deadline: string;
    url: string;
    agency: string;
    region: string;
    year: number;
}

export interface AmountTier {
    label: string;
    range: [number, number];
}

export interface FilterBlockProps {
    label: string;
    values: string[];
    selected: string[];
    toggle: (value: string) => void;
    format?: (value: string) => string;
} 