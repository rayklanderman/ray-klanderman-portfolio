import React from 'react';
import Skeleton from './Skeleton';
import './SectionSkeleton.scss';

const SectionSkeleton: React.FC = () => {
  return (
    <div className="section-skeleton">
      <Skeleton width="200px" height="2rem" className="title-skeleton" />
      <div className="cards-skeleton">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="card-skeleton">
            <Skeleton width="80%" height="1.5rem" />
            <Skeleton width="60%" height="1rem" />
            <Skeleton width="100%" height="1rem" />
            <Skeleton width="100%" height="1rem" />
            <div className="skills-skeleton">
              <Skeleton width="60px" height="1rem" />
              <Skeleton width="70px" height="1rem" />
              <Skeleton width="50px" height="1rem" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionSkeleton;