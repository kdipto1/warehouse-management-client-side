import React from 'react';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const Loading = () => {
  return (
    <div className="text-center">
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <p>
          <Skeleton count={10} />
        </p>
      </SkeletonTheme>
    </div>
  );
};

export default Loading;