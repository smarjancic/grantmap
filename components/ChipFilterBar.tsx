interface ChipFilterBarProps {
	filters: string[];
	selected: string;
	onSelect: (filter: string) => void;
}

export default function ChipFilterBar({ filters, selected, onSelect }: ChipFilterBarProps) {
	return (
		<div className="flex flex-wrap gap-2 mb-6">
			{filters.map((f) => (
				<button
					key={f}
					onClick={() => onSelect(f)}
					className={`px-4 py-1 rounded-full border text-sm ${
						selected === f
							? 'bg-blue-600 text-white border-blue-600'
							: 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
					}`}
				>
					{f}
				</button>
			))}
		</div>
	);
}
