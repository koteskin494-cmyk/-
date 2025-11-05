import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import './Post.css';

const Post = ({ post }) => {
  const renderDripRating = (rating) => {
    return '💧'.repeat(rating) + '○'.repeat(10 - rating);
  };

  return (
    <article className="drip-post drip-card">
      {post.featuredImage && (
        <div className="post-image-container">
          <img 
            src={`http://localhost:5000${post.featuredImage}`} 
            alt={post.title}
            className="post-image"
          />
          <div className="drip-badge">{post.category}</div>
          <div className="drip-rating">
            {renderDripRating(post.dripRating)}
          </div>
        </div>
      )}
      
      <div className="post-content">
        <h2 className="post-title">
          <Link to={`/post/${post._id}`}>{post.title}</Link>
        </h2>
        
        <div className="post-meta">
          <span className="post-author">
            👤 {post.author?.username || 'Anonymous'}
          </span>
          <span className="post-date">
            🕒 {formatDistanceToNow(new Date(post.createdAt))} ago
          </span>
        </div>
        
        <p className="post-excerpt">
          {post.excerpt || post.content.substring(0, 200) + '...'}
        </p>
        
        <div className="post-footer">
          <div className="post-tags">
            {post.brands?.map(brand => (
              <span key={brand} className="brand-tag">🏷️ {brand}</span>
            ))}
            <span className="price-level">{post.priceLevel}</span>
          </div>
          
          <div className="post-stats">
            <span>🔥 {post.likeCount || 0}</span>
            <span>💬 {post.commentCount || 0}</span>
            <span>👁️ {post.viewCount || 0}</span>
          </div>
        </div>

        {post.items && post.items.length > 0 && (
          <div className="fit-breakdown">
            <h4>Fit Breakdown:</h4>
            <div className="items-grid">
              {post.items.slice(0, 3).map((item, index) => (
                <div key={index} className="item-card">
                  <span className="item-name">{item.name}</span>
                  <span className="item-brand">{item.brand}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default Post;