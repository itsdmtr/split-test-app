import { z } from 'zod';

export const VariantSchema = z.object({
  url: z.string().url('Must be a valid URL'),
  weight: z.number().min(0, 'Weight must be at least 0').max(100, 'Weight cannot exceed 100'),
});

export const CreateTestSchema = z.object({
  name: z.string().min(1, 'Test name is required').max(100, 'Test name must be less than 100 characters'),
  variants: z.array(VariantSchema).min(2, 'Minimum 2 variants required').max(5, 'Maximum 5 variants allowed'),
}).refine(
  (data) => {
    const totalWeight = data.variants.reduce((sum, v) => sum + v.weight, 0);
    return Math.abs(totalWeight - 100) < 0.01; // Allow for floating point rounding
  },
  {
    message: 'Variant weights must add up to 100%',
    path: ['variants'],
  }
);

export type CreateTestInput = z.infer<typeof CreateTestSchema>;
