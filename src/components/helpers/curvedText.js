import React, { useState, useEffect } from 'react';

const CurvedText = ({ content, initialHeight }) => {
  const [height, setHeight] = useState(initialHeight);
  const [path, setPath] = useState('');

  useEffect(() => {
    // Function to adjust the path coordinates proportionally
    const adjustPath = (newHeight) => {
      const originalHeight = 300; // Original height
      const scaleFactor = newHeight / originalHeight;
      const newPath = `M 50,${150 * scaleFactor} Q 250,${-50 * scaleFactor} 450,${150 * scaleFactor}`;
      return newPath;
    };

    setPath(adjustPath(height));
  }, [height]);

  return (
    <div>
      <svg width="500" height={height}>
        <path id="curve" d={path} fill="transparent" />
        <text width="500">
          <textPath href="#curve">
            {content.date}
          </textPath>
        </text>
      </svg>
      <div>
        <button onClick={() => setHeight(height + 50)}>Increase Height</button>
        <button onClick={() => setHeight(height - 50)}>Decrease Height</button>
      </div>
    </div>
  );
};

export default CurvedText;
