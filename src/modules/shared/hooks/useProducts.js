// src/modules/shared/hooks/useProducts.js
import { useState, useMemo } from 'react';

export function useProducts(initialProducts) {
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [favorites, setFavorites] = useState(new Set());

  const categories = useMemo(() => 
    ['all', ...new Set(initialProducts.map(p => p.category || 'general'))],
    [initialProducts]
  );

  const filteredAndSortedProducts = useMemo(() => {
    return initialProducts
      .filter(product => filterCategory === 'all' || (product.category || 'general') === filterCategory)
      .sort((a, b) => {
        switch (sortBy) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'name':
            return a.name.localeCompare(b.name);
          default:
            return 0;
        }
      });
  }, [initialProducts, filterCategory, sortBy]);

  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  };

  return {
    categories,
    filterCategory,
    setFilterCategory,
    sortBy,
    setSortBy,
    favorites,
    toggleFavorite,
    filteredAndSortedProducts
  };
}
