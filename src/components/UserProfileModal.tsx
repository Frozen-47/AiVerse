import React from "react";
import { UserProfileView, type UserProfileViewProps } from "./UserProfileView";

export { UserProfileView, type UserProfileViewProps };

export interface UserProfileModalProps {
  username: string;
  onClose: () => void;
  onViewEntry?: (entry: any) => void;
  onExploreCatalog?: () => void;
}

/**
 * Backward-compatible wrapper that renders the modern in-page UserProfileView.
 */
export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  username,
  onClose,
  onViewEntry,
  onExploreCatalog,
}) => {
  return (
    <UserProfileView
      username={username}
      onBackToHome={onClose}
      onViewEntry={onViewEntry}
      onExploreCatalog={onExploreCatalog}
    />
  );
};
