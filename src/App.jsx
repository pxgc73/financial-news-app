import { Routes, Route } from 'react-router-dom';
import FinancialNews from './components/FinancialNews';
import Articles from './components/Articles';
import ArticlePage from './components/ArticlePage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<FinancialNews />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="/articles/:id" element={<ArticlePage />} />
    </Routes>
  );
}
