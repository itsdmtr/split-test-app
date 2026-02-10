'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { TestForm } from './test-form';

export function CreateTestDialog({
  open,
  onOpenChange,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (testId: string) => void;
}) {
  const handleSuccess = (testId: string) => {
    onSuccess?.(testId);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Split Test</DialogTitle>
        </DialogHeader>
        <TestForm onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
}
