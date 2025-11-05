import React, { useState } from 'react';
import { useQuery } from 'react-query';
import PostList from '../../components/PostList/PostList';
import { postsAPI } from '../../services/api';
import './Home.css';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    category: '',
    style: '',
    priceLevel: ''
  });

  const { data, isLoading, error } = useQuery(
    ['posts', { search: searchTerm, page: currentPage, ...filters }],
    () => postsAPI.getPosts({ 
      search: searchTerm, 
      page: currentPage, 
      limit: 9,
      ...filters 
    })
  );

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      style: '',
      priceLevel: ''
    });
    setSearchTerm('');
    setCurrentPage(1);
  };

  if (error) {
    return (
      <div className="container">
        <div className="error drip-card">
          🚨 Error loading fits: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="drip-home">
      <div className="container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              WELCOME TO <span className="gradient-text">DRIP HUB</span>
            </h1>
            <p className="hero-subtitle">
              Where style meets substance. Discover the freshest fits, hottest sneakers, and ultimate drip.
            </p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">{data?.data.pagination.totalRecords || 0}+</span>
                <span className="stat-label">Fresh Fits</span>
              </div>
              <div className="stat">
                <span className="stat-number">{data?.data.filters?.categories?.length || 0}+</span>
                <span className="stat-label">Categories</span>
              </div>
              <div className="stat">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Drip Updates</span>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="filters-section">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-container">
              <input
                type="text"
                placeholder="🔍 Search for fits, brands, styles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </div>
          </form>

          <div className="filter-grid">
            <select 
              value={filters.category} 
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="filter-select"
            >
              <option value="">All Categories</option>
              <option value="streetwear">Streetwear</option>
              <option value="sneakers">Sneakers</option>
              <option value="luxury">Luxury</option>
              <option value="watches">Watches</option>
              <option value="accessories">Accessories</option>
              <option value="grooming">Grooming</option>
            </select>

            <select 
              value={filters.style} 
              onChange={(e) => handleFilterChange('style', e.target.value)}
              className="filter-select"
            >
              <option value="">All Styles</option>
              <option value="casual">Casual</option>
              <option value="smart-casual">Smart Casual</option>
              <option value="athleisure">Athleisure</option>
              <option value="techwear">Techwear</option>
              <option value="hype">Hype</option>
            </select>

            <select 
              value={filters.priceLevel} 
              onChange={(e) => handleFilterChange('priceLevel', e.target.value)}
              className="filter-select"
            >
              <option value="">Any Price</option>
              <option value="budget">Budget</option>
              <option value="mid-tier">Mid-Tier</option>
              <option value="luxury">Luxury</option>
              <option value="grail">Grail</option>
            </select>

            <button onClick={clearFilters} className="btn btn-secondary">
              Clear Filters
            </button>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="posts-section">
          <h2 className="section-title">
            🔥 TRENDING FITS
            <span className="section-subtitle">Fresh off the press</span>
          </h2>

          {isLoading ? (
            <div className="loading drip-card">
              <div className="loading-spinner"></div>
              <p>Loading fresh drip...</p>
            </div>
          ) : (
            <>
              <PostList posts={data?.data.posts || []} />
              
              {/* Pagination */}
              {data?.data.pagination && data.data.pagination.total > 1 && (
                <div className="pagination">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="btn btn-secondary"
                  >
                    ← Previous
                  </button>
                  
                  <span className="pagination-info">
                    Page {currentPage} of {data.data.pagination.total}
                  </span>
                  
                  <button
                    onClick={() => setCurrentPage(prev => 
                      Math.min(prev + 1, data.data.pagination.total)
                    )}
                    disabled={currentPage === data.data.pagination.total}
                    className="btn btn-secondary"
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;