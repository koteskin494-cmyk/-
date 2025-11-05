import React from 'react';
import './DripBadge.css';

const DripBadge = ({ category, size = 'medium' }) => {
  const getCategoryEmoji = (cat) => {
    const emojis = {
      streetwear: '👕',
      sneakers: '👟',
      luxury: '💎',
      watches: '⌚',
      accessories: '🕶️',
      grooming: '💈',
      fits: '🔥',
      hypebeast: '🐐'
    };
    return emojis[cat] || '👑';
  };

  return (
    <span className={`drip-badge drip-badge-${size} drip-badge-${category}`}>
      {getCategoryEmoji(category)} {category}
    </span>
  );
};

export default DripBadge;