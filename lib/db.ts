import { supabase } from './supabase';
import { nanoid } from 'nanoid';
import type { SplitTest, Variant } from '@/types';

export const dbQueries = {
  createTest: async (name: string, variants: Variant[]): Promise<SplitTest> => {
    const id = nanoid(10);
    const { data, error } = await supabase
      .from('split_tests')
      .insert({ id, name, variants })
      .select()
      .single();

    if (error) throw error;
    return data as SplitTest;
  },

  getAllTests: async (): Promise<SplitTest[]> => {
    const { data, error } = await supabase
      .from('split_tests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data as SplitTest[]) || [];
  },

  getTestById: async (id: string): Promise<SplitTest | null> => {
    const { data, error } = await supabase
      .from('split_tests')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return data as SplitTest;
  },

  deleteTest: async (id: string): Promise<boolean> => {
    const { error } = await supabase
      .from('split_tests')
      .delete()
      .eq('id', id);

    return !error;
  },
};
