import React from 'react';
import { useParams } from 'react-router-dom';
import { articles } from '../data/articles';

export default function ArticlePage() {
  const { id } = useParams();
  const article = articles.find((a) => a.id === id);

  if (!article) {
    return <div className="max-w-4xl mx-auto py-10 px-4 text-center text-gray-600">Article not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-sm text-gray-500 mb-6">By {article.author} – {article.date}</p>
      <article className="prose prose-lg">
        {article.content.split('\n\n').map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </article>
    </div>
  );
}
