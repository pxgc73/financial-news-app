import React from 'react';
import { Link } from 'react-router-dom';
import { articles } from '../data/articles';

export default function Articles() {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">📝 Featured Articles</h1>
      {articles.map((article) => (
        <div key={article.id} className="mb-6 border-b pb-4">
          <h2 className="text-xl font-semibold text-teal-700">{article.title}</h2>
          <p className="text-sm text-gray-500">By {article.author} – {article.date}</p>
          <p className="mt-2 text-gray-700 line-clamp-3">{article.content.slice(0, 160)}...</p>
          <Link
            to={`/articles/${article.id}`}
            className="text-teal-600 mt-2 inline-block hover:underline"
          >
            Read More →
          </Link>
        </div>
      ))}
    </div>
  );
}
