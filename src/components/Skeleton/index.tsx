import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton: React.FC = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={480}
    viewBox="0 0 280 480"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="139" cy="135" r="125" />
    <rect x="0" y="287" rx="0" ry="0" width="280" height="27" />
    <rect x="0" y="337" rx="0" ry="0" width="280" height="88" />
    <rect x="0" y="434" rx="4" ry="4" width="90" height="27" />
    <rect x="128" y="430" rx="14" ry="14" width="152" height="45" />
  </ContentLoader>
);

export default Skeleton;
