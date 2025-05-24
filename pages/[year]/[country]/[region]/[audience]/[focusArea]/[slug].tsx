import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { Grant, FocusArea } from '@/types/grant';
import { FOCUS_EMOJIS } from '@/constants/grants';
import grants from '@/data/sample-grants.json';

export default function GrantDetail() {
	const router = useRouter();
	const { year, country, region, audience, focusArea, slug } = router.query;

	if (!year || !country || !region || !audience || !focusArea || !slug) {
		return null;
	}

	const grant = grants.find(
		(g) =>
			g.year === Number(year) &&
			String(g.year) === year &&
			g.country.toLowerCase() === (country as string).toLowerCase() &&
			g.region === region &&
			g.audience === audience &&
			g.focusArea === focusArea &&
			g.slug === slug
	);

	useEffect(() => {
		if (!router.isFallback && !grant) {
			router.replace('/404');
		}
	}, [grant, router]);

	if (!grant) return null;

	const segments = [year, country, region, audience, focusArea].filter((s): s is string => typeof s === 'string');

	// Get the emoji for the focus area
	const normalizedFocus = grant.focusArea.charAt(0).toUpperCase() + grant.focusArea.slice(1).toLowerCase();
	const emoji = FOCUS_EMOJIS[normalizedFocus as FocusArea] || '📄';

	// Format date in a consistent way
	const formattedDate = new Date(grant.deadline).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});

	// Format amount in a consistent way
	const formattedAmount = new Intl.NumberFormat('en-US', {
		style: 'decimal',
		maximumFractionDigits: 0
	}).format(grant.amount);

	return (
		<Layout title={`${grant.title} - GrantMap`}>
			<div className="max-w-4xl mx-auto">
				<div className="mb-8">
					<Link
						href={`/${year}/${country}/${region}/${audience}/${focusArea}`}
						className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
					>
						← Back to grants
					</Link>
					<h1 className="text-3xl font-bold text-indigo-900 mb-2">
						{grant.title}
					</h1>
					<p className="text-xl text-indigo-700 mb-4">{grant.agency}</p>
				</div>

				<div className="bg-white rounded-lg shadow-sm border border-blue-100 p-6 mb-8">
					<div className="prose max-w-none">
						<p className="text-gray-700 mb-6">{grant.description}</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
						<div>
							<h2 className="text-lg font-semibold text-indigo-900 mb-4">Grant Details</h2>
							<dl className="space-y-3">
								<div>
									<dt className="text-sm font-medium text-gray-500">Focus Area</dt>
									<dd className="mt-1 text-sm text-indigo-700">
										{emoji} {grant.focusArea.charAt(0).toUpperCase() + grant.focusArea.slice(1).toLowerCase()}
									</dd>
								</div>
								<div>
									<dt className="text-sm font-medium text-gray-500">Amount</dt>
									<dd className="mt-1 text-sm text-indigo-700">
										{formattedAmount} {grant.currency}
									</dd>
								</div>
								<div>
									<dt className="text-sm font-medium text-gray-500">Deadline</dt>
									<dd className="mt-1 text-sm text-indigo-700">{formattedDate}</dd>
								</div>
								<div>
									<dt className="text-sm font-medium text-gray-500">Year</dt>
									<dd className="mt-1 text-sm text-indigo-700">{grant.year}</dd>
								</div>
								<div>
									<dt className="text-sm font-medium text-gray-500">Country</dt>
									<dd className="mt-1 text-sm text-indigo-700">{grant.country.toUpperCase()}</dd>
								</div>
								<div>
									<dt className="text-sm font-medium text-gray-500">Region</dt>
									<dd className="mt-1 text-sm text-indigo-700">{grant.region}</dd>
								</div>
								<div>
									<dt className="text-sm font-medium text-gray-500">Audience</dt>
									<dd className="mt-1 text-sm text-indigo-700">{grant.audience}</dd>
								</div>
							</dl>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
