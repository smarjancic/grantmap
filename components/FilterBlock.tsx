import { FilterBlockProps } from '../types/grant';


export default function FilterBlock({
    label,
    values,
    selected,
    toggle,
    format = (v) => v,
}: FilterBlockProps) {
    return (
        <div>
            <h3 className="text-sm font-medium text-indigo-900 mb-2">{label}</h3>
            <div className="space-y-1">
                {values.map((value) => (
                    <label
                        key={value}
                        className="flex items-center text-sm cursor-pointer group"
                    >
                        <input
                            type="checkbox"
                            className="mr-2 accent-blue-600"
                            checked={selected.includes(value)}
                            onChange={() => toggle(value)}
                        />
                        <span className="text-indigo-700 group-hover:text-indigo-900 transition-colors">
                            {format(value)}
                        </span>
                    </label>
                ))}
            </div>
        </div>
    );
} 