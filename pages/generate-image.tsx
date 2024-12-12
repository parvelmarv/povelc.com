import React from 'react';

const GenerateImage: React.FC = () => {
  return (
    <div className="w-[800px] h-[450px] bg-[#1a1e1f] relative flex items-center justify-center">
      <div className="w-72 h-72 rounded-full overflow-hidden bg-gradient-to-br from-orange-100 via-orange-200 to-orange-300">
        <img
          src="/images/profile.jpg"
          alt="Profile"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
    </div>
  );
};

export default GenerateImage; 