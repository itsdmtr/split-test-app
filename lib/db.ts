import { supabase } from './supabase';
import { nanoid } from 'nanoid';
import type { SplitTest, Variant } from '@/types';

export const dbQueries = {
  createTest: async (name: string, variants: Variant[], userId: string): Promise<SplitTest> => {
    const id = nanoid(10);
    const { data, error } = await supabase
      .from('split_tests')
      .insert({ id, name, variants, user_id: userId })
      .select()
      .single();

    if (error) throw error;
    return data as SplitTest;
  },

  getAllTests: async (userId: string): Promise<SplitTest[]> => {
    const { data, error } = await supabase
      .from('split_tests')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data as SplitTest[]) || [];
  },

  getTestById: async (id: string, userId?: string): Promise<SplitTest | null> => {
    let query = supabase
      .from('split_tests')
      .select('*')
      .eq('id', id);

    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query.single();

    if (error) return null;
    return data as SplitTest;
  },

  deleteTest: async (id: string, userId: string): Promise<boolean> => {
    const { error } = await supabase
      .from('split_tests')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    return !error;
  },
};
