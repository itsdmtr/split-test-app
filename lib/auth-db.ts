import { supabase } from './supabase';

export const authDbQueries = {
  // Create or update user
  upsertUser: async (userData: {
    id: string;
    email: string;
    name?: string | null;
    image?: string | null;
  }) => {
    // First, try to find existing user by email
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', userData.email)
      .single();

    if (existingUser) {
      // Update existing user
      const { data, error } = await supabase
        .from('users')
        .update({
          name: userData.name,
          image: userData.image,
        })
        .eq('email', userData.email)
        .select()
        .single();

      if (error) throw error;
      return data;
    } else {
      // Insert new user
      const { data, error } = await supabase
        .from('users')
        .insert({
          id: userData.id,
          email: userData.email,
          name: userData.name,
          image: userData.image,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    }
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
