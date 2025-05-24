import { FocusArea, AmountTier } from '../types/grant';

export const FOCUS_COLOR_MAP: Record<FocusArea, string> = {
    Education: 'bg-yellow-50 text-yellow-700',
    Health: 'bg-green-50 text-green-700',
    Technology: 'bg-indigo-50 text-indigo-700',
    Arts: 'bg-pink-50 text-pink-700',
    Environment: 'bg-emerald-50 text-emerald-700',
    Other: 'bg-gray-50 text-gray-700',
};

export const FOCUS_EMOJIS: Record<FocusArea, string> = {
    Education: '🎓',
    Health: '🏥',
    Technology: '💻',
    Arts: '🎨',
    Environment: '🌱',
    Other: '📄',
};

export const AMOUNT_TIERS: AmountTier[] = [
    { label: 'Under $10k', range: [0, 10000] },
    { label: '$10k - $50k', range: [10000, 50000] },
    { label: '$50k - $100k', range: [50000, 100000] },
    { label: '$100k+', range: [100000, Infinity] },
]; 