export type UserFilterDoneType = 'active' | 'inactive' | 'all';

export type UserType = {
  id: number;
  username: string;
  password: string;
  status: string;
};
