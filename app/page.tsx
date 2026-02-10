'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { TestsTable } from '@/components/tests-table';
import { CreateTestDialog } from '@/components/create-test-dialog';

export default function Home() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleTestCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onCreateTest={() => setIsCreateDialogOpen(true)} />

      <main className="container mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">Home</p>
        </div>

        {/* Page Title */}
        <h1 className="text-3xl font-bold mb-8">Your Tests</h1>

        {/* Tests Table */}
        <TestsTable refreshTrigger={refreshTrigger} />
      </main>

      {/* Create Test Dialog */}
      <CreateTestDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSuccess={handleTestCreated}
      />
    </div>
  );
}
