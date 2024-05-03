import React, { useState, useContext, useEffect } from 'react';

interface DriveGaugeFilterProps {
    defaultDriveMax: number;
    onDriveChange: (newDriveMax: number) => void; 
}

const DriveGaugeFilter = ({ defaultDriveMax, onDriveChange }: DriveGaugeFilterProps) => {
  const [maxDrive, setDriveMax] = useState(defaultDriveMax);

  useEffect(() => {
    console.log('maxDrive=', maxDrive); 
    onDriveChange(maxDrive); 
  }, [maxDrive]); 

  const handleClick = (index: number) => {
    // Toggle to 0 if the first button is clicked again when it's already active
    const newDriveMax = index === 0 && maxDrive === 1 ? 0 : index + 1;
    setDriveMax(newDriveMax);
  };

  return (
    <div style={{ 
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      alignContent: 'center',
      justifyContent: 'center',

    }}>
    <label>Drive:</label>
    <div style={{ display: 'flex', marginLeft: "20px" }}>
      {Array.from({ length: 6 }).map((_, index) => (
        <button
          key={index}
          onClick={() => handleClick(index)}
          style={{
            backgroundColor: index < maxDrive ? '#308332' : '#30833210',
            borderColor: index < maxDrive ? '#75af4c' : '#30833260',
            transform: 'skewX(330deg)',
            margin: 2,
            padding: '8px 20px'
          }}
        />
      ))}
    </div>
    </div>
  );
};

export default DriveGaugeFilter;
