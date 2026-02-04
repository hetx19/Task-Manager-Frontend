import React from "react";
import CharAvatar from "./card/CharAvatar";

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
      {visibleAvatars.map((avatar, index) => {
        const isObject = typeof avatar === "object" && avatar !== null;
        const src = isObject ? avatar.profileImageUrl : avatar;
        const name = isObject ? avatar.name : "";
        const key = isObject ? avatar._id || index : avatar + index;

        return (
          <div
            key={key}
            className="rounded-full border-2 border-white relative bg-white"
            style={{
              width: size,
              height: size,
              marginLeft: index === 0 ? 0 : -overlap,
              zIndex: visibleAvatars.length - index,
            }}
          >
            {src ? (
              <img
                src={src}
                alt={name || `Avatar ${index + 1}`}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <CharAvatar
                name={name}
                width="w-full"
                height="h-full"
                style="text-[10px]"
              />
            )}
          </div>
        );
      })}

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
