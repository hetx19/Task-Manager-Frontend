import React from "react";

const AvatarGroup = ({
  avatars = [],
  maxVisible = 3,
  size = 36,
  overlap = 12,
}) => {
  if (!avatars.length) return null;

  const visibleAvatars = avatars.slice(0, maxVisible);
  const remainingCount = avatars.length - maxVisible;

  return (
    <div className="flex items-center">
      {visibleAvatars.map((avatar, index) => (
        <img
          key={avatar}
          src={avatar}
          alt={`Avatar ${index + 1}`}
          aria-label={`User avatar ${index + 1}`}
          style={{
            width: size,
            height: size,
            marginLeft: index === 0 ? 0 : -overlap,
            zIndex: visibleAvatars.length - index,
          }}
          className="rounded-full border-2 border-white object-cover"
        />
      ))}

      {remainingCount > 0 && (
        <div
          style={{
            width: size,
            height: size,
            marginLeft: -overlap,
            zIndex: 0,
          }}
          className="flex items-center justify-center rounded-full border-2 border-white bg-blue-50 text-sm font-medium text-blue-700"
          aria-label={`${remainingCount} more users`}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
