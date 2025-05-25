import React, { useEffect, useState } from 'react';

const regions = [
  { label: 'Global', query: 'markets' },
  { label: 'Middle East', query: 'middle east finance' },
  { label: 'US', query: 'us stock market' },
  { label: 'Europe', query: 'europe economy' },
  { label: 'Asia', query: 'asia financial markets' },
];

export default function FinancialNews() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState(regions[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchNews = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://newsdata.io/api/1/news?apikey=pub_53c6246525d14c249783abe5d2bdafdd&q=${encodeURIComponent(query)}&language=en`
      );
      const data = await response.json();
      const uniqueArticles = [];
      const seenTitles = new Set();
      for (const article of data.results) {
        if (!seenTitles.has(article.title)) {
          uniqueArticles.push(article);
          seenTitles.add(article.title);
        }
      }
      setArticles(uniqueArticles);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching news:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(selectedRegion.query);

    const interval = setInterval(() => {
      fetchNews(selectedRegion.query);
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [selectedRegion]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (article.description && article.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-300 text-gray-800">
      <header className="bg-teal-600 text-white shadow p-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-bold">🌍 Financial Market News</h1>
          <nav className="space-x-2">
            {regions.map((region) => (
              <button
                key={region.label}
                onClick={() => setSelectedRegion(region)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                  selectedRegion.label === region.label ? 'bg-white text-teal-600' : 'hover:bg-white/20'
                }`}
              >
                {region.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search headlines or content..."
            className="w-full sm:w-96 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading news...</p>
        ) : filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition border p-4 flex flex-col h-[320px]"
              >
                <h2 className="text-base font-semibold mb-2 line-clamp-2 min-h-[2.5rem]">{article.title}</h2>
                <p className="text-sm text-gray-600 mb-3 line-clamp-4 flex-grow">{article.description}</p>
                <div className="flex justify-between items-center text-xs text-gray-500 mt-auto">
                  <span className="truncate max-w-[50%]">{article.source_id}</span>
                  <span>{formatDate(article.pubDate)}</span>
                </div>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-teal-600 text-sm font-medium hover:underline"
                >
                  🔗 Read Full Article
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 mt-10">
            <p className="mb-4">No results found for "{searchTerm}".</p>
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-700 font-medium underline"
            >
              🔍 Search this topic on the web
            </a>
          </div>
        )}
      </main>

      <footer className="bg-teal-700 text-white text-center p-4 mt-10">
        &copy; {new Date().getFullYear()} MarketPulse. All rights reserved.
      </footer>
    </div>
  );
}
