import React from 'react';

const ProfileIcon = ({ displayName, photoURL }) => {
  const isInitialPlaceholder = photoURL && photoURL.startsWith('initial-');
  const initial = isInitialPlaceholder 
    ? photoURL.split('-')[1] 
    : displayName?.charAt(0).toUpperCase();

  return (
    <div className="flex items-center justify-center">
      {isInitialPlaceholder ? (
        <div
          className="flex items-center justify-center bg-primary text-white rounded-full w-10 h-10 text-lg font-bold"
          title={displayName}
        >
          {initial}
        </div>
      ) : (
        <img
          src={photoURL || `https://ui-avatars.com/api/?name=${displayName}&background=random&color=fff`}
          alt={displayName}
          className="rounded-full w-10 h-10 object-cover"
          title={displayName}
        />
      )}
    </div>
  );
};

export default ProfileIcon;