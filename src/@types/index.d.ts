declare global {
  type IdentityUser = {
    id: string;
    username: string;
    displayName: string;
    email: string;
    emailConfirmed: boolean;
    firstName?: string;
    lastName?: string;
    permissions: string[];
    photoUrl?: string;
    coverUrl?: string;
  };
}

export {};
