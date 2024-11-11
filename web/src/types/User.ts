export type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  preferred_time: 'morning' | 'afternoon' | 'evening';
  special_instructions: string | null;
  created_at: string;
  updated_at: string;
};
