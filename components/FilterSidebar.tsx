import FilterBlock from './FilterBlock';
import { FOCUS_EMOJIS, AMOUNT_TIERS } from '../constants/grants';

interface FilterSidebarProps {
    categories: string[];
    countries: string[];
    fundingTypes: string[];
    selectedCategory: string[];
    selectedCountry: string[];
    selectedFunding: string[];
    onToggleCategory: (value: string) => void;
    onToggleCountry: (value: string) => void;
    onToggleFunding: (value: string) => void;
    onClearAll: () => void;
}

const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export default function FilterSidebar({
    categories,
    countries,
    fundingTypes,
    selectedCategory,
    selectedCountry,
    selectedFunding,
    onToggleCategory,
    onToggleCountry,
    onToggleFunding,
    onClearAll,
}: FilterSidebarProps) {
    return (
        <div className="w-full md:w-64 space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                <button
                    onClick={onClearAll}
                    className="text-sm text-blue-600 hover:text-blue-800"
                >
                    Clear all
                </button>
            </div>

            <div className="space-y-4">
                <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Category</h3>
                    <div className="space-y-2">
                        {categories.map((category) => (
                            <label key={category} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={selectedCategory.includes(category)}
                                    onChange={() => onToggleCategory(category)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <span className="ml-2 text-sm text-gray-700">{category}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Country</h3>
                    <div className="space-y-2">
                        {countries.map((country) => (
                            <label key={country} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={selectedCountry.includes(country)}
                                    onChange={() => onToggleCountry(country)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <span className="ml-2 text-sm text-gray-700">{country}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Funding Type</h3>
                    <div className="space-y-2">
                        {fundingTypes.map((type) => (
                            <label key={type} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={selectedFunding.includes(type)}
                                    onChange={() => onToggleFunding(type)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <span className="ml-2 text-sm text-gray-700">{type}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
} 