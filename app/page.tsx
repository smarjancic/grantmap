export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-600 mb-8">
          Welcome to GrantMap
        </h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card">
            <h2 className="text-2xl font-semibold mb-4">Find Grants</h2>
            <p className="text-gray-600 mb-4">
              Search through our database of available grants and funding opportunities.
            </p>
            <button className="btn btn-primary">
              Start Searching
            </button>
          </div>
          
          <div className="card">
            <h2 className="text-2xl font-semibold mb-4">Track Applications</h2>
            <p className="text-gray-600 mb-4">
              Keep track of your grant applications and deadlines in one place.
            </p>
            <button className="btn btn-secondary">
              View Dashboard
            </button>
          </div>
        </div>
      </div>
    </main>
  )
} 