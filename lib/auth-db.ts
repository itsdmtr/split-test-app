import { supabase } from './supabase';

export const authDbQueries = {
  // Create or update user
  upsertUser: async (userData: {
    id: string;
    email: string;
    name?: string | null;
    image?: string | null;
  }) => {
    const { data, error } = await supabase
      .from('users')
      .upsert(
        {
          id: userData.id,
          email: userData.email,
          name: userData.name,
          image: userData.image,
        },
        { onConflict: 'id' }
      )
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Get user by ID
  getUserById: async (id: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return data;
  },
};
