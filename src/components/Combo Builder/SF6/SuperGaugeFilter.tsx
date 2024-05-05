import React, { useEffect, useState } from 'react';

interface SuperGaugeFilterProps {
    defaultSuperMax: number;
    onSuperChange: (newSuperMax: number) => void; 
}

const SuperGaugeFilter = ({defaultSuperMax, onSuperChange}: SuperGaugeFilterProps) => {
    const [maxSuper, setSuperMax] = useState(defaultSuperMax);

    useEffect(() => {
        onSuperChange(maxSuper); 
    }, [maxSuper]); 
  
    const handleClick = (index: number) => {
      // Toggle to 0 if the first button is clicked again when it's already active
      const newSuperMax = index === 0 && maxSuper === 1 ? 0 : index + 1;
      setSuperMax(newSuperMax);
    };

  return (
    <div style={{ 
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      alignContent: 'center',
      justifyContent: 'center',

    }}>
      <label className="mr-2.5 font-sans text-base font-semibold leading-relaxed text-black">Super:</label>
      <div style={{ display: 'flex' }}>
        {Array.from({ length: 3 }).map((_, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            style={{
              borderColor: index < maxSuper ? '#ffffffcc' : '#ffffff20',
              backgroundColor: index < maxSuper ? '#7d7ddd80' : '#0000ff00',
              borderWidth: '2px',
              margin: -1,
              transform: 'skewX(330deg)',
              padding: '20px 30px'
            }}
          />
        ))}
      </div>
      {/* <div style={{ marginLeft: '10px' }}>
        {superMax}
      </div> */}
    </div>
  );
};

export default SuperGaugeFilter;
