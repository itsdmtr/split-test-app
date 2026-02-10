'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreateTestSchema, type CreateTestInput } from '@/lib/validations';
import { useToast } from '@/hooks/use-toast';
import { calculateEqualWeights } from '@/lib/split-logic';

export function TestForm({ onSuccess }: { onSuccess?: (testId: string) => void }) {
  const [variantCount, setVariantCount] = useState(2);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<CreateTestInput>({
    resolver: zodResolver(CreateTestSchema),
    defaultValues: {
      name: '',
      variants: [
        { url: '', weight: 50 },
        { url: '', weight: 50 },
      ],
    },
  });

  const variants = watch('variants');

  // Calculate total percentage
  const totalPercentage = variants?.reduce((sum, v) => sum + (v?.weight || 0), 0) || 0;
  const isValidPercentage = Math.abs(totalPercentage - 100) < 0.01;

  // Update weights when variant count changes
  useEffect(() => {
    const equalWeights = calculateEqualWeights(variantCount);
    for (let i = 0; i < variantCount; i++) {
      setValue(`variants.${i}.weight`, equalWeights[i]);
      if (!variants?.[i]?.url) {
        setValue(`variants.${i}.url`, '');
      }
    }
  }, [variantCount, setValue]);

  const onSubmit = async (data: CreateTestInput) => {
    try {
      const response = await fetch('/api/tests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create test');
      }

      const test = await response.json();

      toast({
        title: 'Test created!',
        description: `Your redirect link: ${window.location.origin}/r/${test.id}`,
      });

      reset({
        name: '',
        variants: [
          { url: '', weight: 50 },
          { url: '', weight: 50 },
        ],
      });
      setVariantCount(2);
      onSuccess?.(test.id);
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create test. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const addVariant = () => {
    if (variantCount < 5) {
      setVariantCount(variantCount + 1);
    }
  };

  const removeVariant = () => {
    if (variantCount > 2) {
      setVariantCount(variantCount - 1);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="name">Test Name</Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="e.g., Homepage Hero Test"
              className="mt-1"
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Variants ({variantCount})</Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Total: {totalPercentage.toFixed(0)}%
                  {!isValidPercentage && <span className="text-red-500 ml-2">Must equal 100%</span>}
                </p>
              </div>
              <div className="space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={removeVariant}
                  disabled={variantCount <= 2}
                >
                  Remove
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addVariant}
                  disabled={variantCount >= 5}
                >
                  Add
                </Button>
              </div>
            </div>

            {Array.from({ length: variantCount }).map((_, i) => (
              <div key={i} className="space-y-2 p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-base font-semibold">Variant {i + 1}</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      {...register(`variants.${i}.weight`, { valueAsNumber: true })}
                      className="w-20 text-right"
                      min="0"
                      max="100"
                      step="1"
                    />
                    <span className="text-sm font-medium">%</span>
                  </div>
                </div>

                <div>
                  <Label htmlFor={`variant-${i}`} className="text-sm text-muted-foreground">
                    URL
                  </Label>
                  <Input
                    id={`variant-${i}`}
                    {...register(`variants.${i}.url`)}
                    placeholder="https://example.com/page-a"
                    className="mt-1"
                  />
                  {errors.variants?.[i]?.url && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.variants[i]?.url?.message}
                    </p>
                  )}
                  {errors.variants?.[i]?.weight && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.variants[i]?.weight?.message}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {errors.variants && typeof errors.variants.message === 'string' && (
              <p className="text-sm text-red-500">{errors.variants.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || !isValidPercentage}
          >
            {isSubmitting ? 'Creating...' : 'Create Test'}
          </Button>
        </form>
  );
}
