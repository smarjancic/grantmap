import Head from "next/head";
import Link from "next/link";
import { ReactNode } from "react";
import { useRouter } from 'next/router';
import { useState } from 'react';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export default function Layout({ children, title = "GrantMap Dashboard" }: LayoutProps) {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push({
        pathname: '/',
        query: { search: search.trim() }
      });
    }
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Find and explore public grants" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <Link
                href="/"
                className="text-2xl font-bold text-white hover:text-blue-100 transition-colors"
              >
                📊 GrantMap
              </Link>
              <div className="flex items-center space-x-6">
                <nav className="flex items-center space-x-6">
                  <Link
                    href="/"
                    className="text-white hover:text-blue-100 transition-colors"
                  >
                    Home
                  </Link>
                  <Link
                    href="/about"
                    className="text-white hover:text-blue-100 transition-colors"
                  >
                    About
                  </Link>
                </nav>
                <form onSubmit={handleSearch} className="w-64">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search grants..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full px-3 py-1.5 pl-8 pr-8 text-sm border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                    />
                    <svg
                      className="absolute left-2 top-2 h-4 w-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    {search && (
                      <button
                        type="button"
                        onClick={() => setSearch('')}
                        className="absolute right-2 top-2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <footer className="bg-white border-t border-blue-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p className="text-center text-indigo-700">
              © {new Date().getFullYear()} GrantMap. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
