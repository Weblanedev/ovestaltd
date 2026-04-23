export type UserProfile = {
  phone?: string;
  line1?: string;
  line2?: string;
  city?: string;
  region?: string;
  postal?: string;
  country?: string;
};

export type UserRecord = {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  profile: UserProfile;
  createdAt: string;
};

export type PublicUser = {
  id: string;
  email: string;
  name: string;
  profile: UserProfile;
};
