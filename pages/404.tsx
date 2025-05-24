// pages/404.tsx
export default function Custom404() {
	return (
		<div className="min-h-screen flex flex-col justify-center items-center text-center px-4">
			<h1 className="text-5xl font-bold mb-4 text-gray-800">
				404 – Page Not Found
			</h1>
			<p className="text-gray-600 mb-6">
				Sorry, we couldn’t find that grant or page.
			</p>
			<a
				href="/"
				className="text-blue-600 underline text-sm hover:text-blue-800"
			>
				← Go back to homepage
			</a>
		</div>
	);
}
