import { supabase } from './supabase';

export const authDbQueries = {
  // Create or update user - returns the user ID from database
  upsertUser: async (userData: {
    id: string;
    email: string;
    name?: string | null;
    image?: string | null;
  }): Promise<{ id: string; email: string; name: string | null; image: string | null }> => {
    // Check if user exists by email
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', userData.email)
      .single();

    if (existingUser) {
      // User exists - update their info but keep their original ID
      const { data, error } = await supabase
        .from('users')
        .update({
          name: userData.name,
          image: userData.image,
        })
        .eq('id', existingUser.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } else {
      // New user - insert with provided ID
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
