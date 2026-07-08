import React from 'react';

const StarRating = ({ rating, size = 16 }) => {
  // Ensure rating is between 0 and 5
  const validRating = Math.max(0, Math.min(5, Number(rating) || 0));

  const renderStar = (index) => {
    // Calculate how much this specific star should be filled (0 to 1)
    let fillPercentage = 0;
    if (validRating >= index + 1) {
      fillPercentage = 100;
    } else if (validRating > index) {
      fillPercentage = (validRating - index) * 100;
    }

    const isPartial = fillPercentage > 0 && fillPercentage < 100;
    const gradientId = `star-fill-${index}-${fillPercentage.toFixed(0)}`;

    return (
      <svg key={index} width={size} height={size} viewBox="0 0 24 24" fill={fillPercentage === 100 ? "#fbbf24" : (isPartial ? `url(#${gradientId})` : "transparent")} stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {isPartial && (
          <defs>
            <linearGradient id={gradientId}>
              <stop offset={`${fillPercentage}%`} stopColor="#fbbf24" />
              <stop offset={`${fillPercentage}%`} stopColor="transparent" />
            </linearGradient>
          </defs>
        )}
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
    );
  };

  return (
    <div className="d-flex align-items-center gap-1" style={{ color: '#fbbf24' }}>
      {[0, 1, 2, 3, 4].map((index) => renderStar(index))}
      <span className="ms-1 fw-bold text-dark" style={{ fontSize: `${size * 0.85}px` }}>
        {validRating.toFixed(1)}
      </span>
    </div>
  );
};

export default StarRating;
