'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CopyButton } from './copy-button';
import type { SplitTest } from '@/types';
import { supabase } from '@/lib/supabase';

interface TestWithAnalytics extends SplitTest {
  total_clicks?: number;
}

export function TestsTable({ refreshTrigger }: { refreshTrigger?: number }) {
  const router = useRouter();
  const [tests, setTests] = useState<TestWithAnalytics[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTests();
  }, [refreshTrigger]);

  const fetchTests = async () => {
    try {
      const response = await fetch('/api/tests');
      const data = await response.json();

      // Fetch analytics for each test
      const testsWithAnalytics = await Promise.all(
        data.map(async (test: SplitTest) => {
          try {
            const analyticsRes = await fetch(`/api/tests/${test.id}/analytics`);
            if (analyticsRes.ok) {
              const analytics = await analyticsRes.json();
              return { ...test, total_clicks: analytics.total_clicks };
            }
          } catch (error) {
            console.error('Failed to fetch analytics for test:', test.id);
          }
          return { ...test, total_clicks: 0 };
        })
      );

      setTests(testsWithAnalytics);
    } catch (error) {
      console.error('Failed to fetch tests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this test?')) return;

    try {
      const response = await fetch(`/api/tests/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTests(tests.filter((test) => test.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete test:', error);
    }
  };

  const toggleStatus = async (test: SplitTest) => {
    const newStatus = test.status === 'live' ? 'stopped' : 'live';

    try {
      const response = await fetch(`/api/tests/${test.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setTests(
          tests.map((t) => (t.id === test.id ? { ...t, status: newStatus } : t))
        );
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  if (loading) {
    return (
      <div className="text-center text-muted-foreground py-12">Loading tests...</div>
    );
  }

  if (tests.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">No tests yet</p>
        <p className="text-sm text-muted-foreground">
          Click &ldquo;Create Test&rdquo; to get started
        </p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden bg-card">
      <table className="w-full">
        <thead className="bg-muted/50 border-b">
          <tr>
            <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">
              Test name
            </th>
            <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">
              Date created
            </th>
            <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">
              Variants
            </th>
            <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">
              Total clicks
            </th>
            <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">
              Status
            </th>
            <th className="w-24"></th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {tests.map((test) => (
            <tr
              key={test.id}
              onClick={() => router.push(`/tests/${test.id}`)}
              className="hover:bg-muted/30 transition-colors cursor-pointer"
            >
              <td className="px-6 py-4">
                <div className="font-medium">{test.name}</div>
              </td>
              <td className="px-6 py-4 text-sm text-muted-foreground">
                {formatDate(test.created_at)}
              </td>
              <td className="px-6 py-4 text-sm">{test.variants.length}</td>
              <td className="px-6 py-4 text-sm">
                {formatNumber(test.total_clicks || 0)}
              </td>
              <td className="px-6 py-4">
                <Badge
                  variant={test.status === 'live' ? 'default' : 'secondary'}
                  className={
                    test.status === 'live'
                      ? 'bg-green-500 hover:bg-green-600'
                      : 'bg-gray-500 hover:bg-gray-600'
                  }
                >
                  {test.status === 'live' ? 'Live' : 'Stopped'}
                </Badge>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      const url = `${window.location.origin}/r/${test.id}`;
                      navigator.clipboard.writeText(url);
                    }}
                    title="Copy redirect link"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <circle cx="12" cy="5" r="2" />
                          <circle cx="12" cy="12" r="2" />
                          <circle cx="12" cy="19" r="2" />
                        </svg>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStatus(test);
                        }}
                      >
                        {test.status === 'live' ? 'Stop test' : 'Resume test'}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(test.id);
                        }}
                        className="text-red-600"
                      >
                        Delete test
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
