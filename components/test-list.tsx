'use client';

import { useEffect, useState } from 'react';
import { TestCard } from './test-card';
import type { SplitTest } from '@/types';

export function TestList({ refreshTrigger }: { refreshTrigger?: number }) {
  const [tests, setTests] = useState<SplitTest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTests = async () => {
    try {
      const response = await fetch('/api/tests');
      const data = await response.json();
      setTests(data);
    } catch (error) {
      console.error('Failed to fetch tests:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTests();
  }, [refreshTrigger]);

  const handleDelete = (id: string) => {
    setTests(tests.filter((test) => test.id !== id));
  };

  if (loading) {
    return <p className="text-center text-muted-foreground">Loading tests...</p>;
  }

  if (tests.length === 0) {
    return (
      <p className="text-center text-muted-foreground">
        No tests yet. Create your first split test above!
      </p>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {tests.map((test) => (
        <TestCard key={test.id} test={test} onDelete={handleDelete} />
      ))}
    </div>
  );
}
