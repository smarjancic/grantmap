import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SearchInput from "./SearchInput";

export default function Header() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const { search: searchQuery } = router.query;
    if (searchQuery && !isSubmitting) {
      setSearch(searchQuery as string);
    }
  }, [router.query, isSubmitting]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      setIsSubmitting(true);
      router
        .push(`/?search=${encodeURIComponent(search.trim())}`)
        .finally(() => setIsSubmitting(false));
      setSearch('');
    } else {
      router.push('/').finally(() => setIsSubmitting(false));
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
            GrantMap
          </Link>
          <nav className="hidden md:flex items-center space-x-8 text-sm">
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</Link>
            <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">About</Link>
            <form onSubmit={handleSearch} className="relative">
              <SearchInput
                value={search}
                onChange={setSearch}
                onClear={() => setSearch('')}
                className="w-64"
              />
            </form>
          </nav>
        </div>
      </div>
    </header>
  );
}
