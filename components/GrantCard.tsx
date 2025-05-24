import { Grant } from '../types/grant';

interface GrantCardProps {
	grant: Grant;
}

export default function GrantCard({ grant }: GrantCardProps) {
	const {
		title,
		description,
		category,
		country,
		funding_type,
		amount,
		deadline,
		url,
		agency,
		region,
		year,
	} = grant;

	const isSoon = (dateStr: string) => {
		const now = new Date();
		const deadline = new Date(dateStr);
		const diff = (deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
		return diff <= 30 && diff >= 0;
	};

	const deadlineClass = isSoon(deadline)
		? 'text-red-600 bg-red-50'
		: 'text-gray-600 bg-gray-50';

	// Format date in a consistent way
	const formattedDate = new Date(deadline).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	// Format amount in a consistent way
	const formattedAmount = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		maximumFractionDigits: 0,
	}).format(amount);

	return (
		<a
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			className="block bg-white rounded-lg border border-blue-100 shadow-sm hover:shadow-md transition-shadow"
		>
			<div className="p-4">
				<div className="flex items-start justify-between mb-2">
					<div className="flex-1">
						<h3 className="text-lg font-semibold text-indigo-900 mb-1 line-clamp-2">
							{title}
						</h3>
						<p className="text-sm text-indigo-700 mb-2">{agency}</p>
					</div>
					<div className="ml-2 flex-shrink-0">
						<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
							{category}
						</span>
					</div>
				</div>

				<p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p>

				<div className="flex flex-wrap gap-2 text-xs">
					<span className="px-2 py-1 bg-blue-50 text-blue-700 rounded">
						{year}
					</span>
					<span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded">
						{country}
					</span>
					<span className="px-2 py-1 bg-purple-50 text-purple-700 rounded">
						{region}
					</span>
					<span className="px-2 py-1 bg-pink-50 text-pink-700 rounded">
						{funding_type}
					</span>
					<span className="px-2 py-1 bg-green-50 text-green-700 rounded">
						{formattedAmount}
					</span>
					<span className={`px-2 py-1 rounded ${deadlineClass}`}>
						{formattedDate}
					</span>
				</div>
			</div>
		</a>
	);
}
