'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CopyButton } from './copy-button';
import type { SplitTest } from '@/types';

interface Analytics {
  total_clicks: number;
  variant_clicks: { [key: number]: number };
}

export function TestCard({
  test,
  onDelete,
}: {
  test: SplitTest;
  onDelete: (id: string) => void;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(true);
  const redirectUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/r/${test.id}`;

  useEffect(() => {
    fetchAnalytics();
  }, [test.id]);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`/api/tests/${test.id}/analytics`);
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoadingAnalytics(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this test?')) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/tests/${test.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onDelete(test.id);
      }
    } catch (error) {
      console.error('Failed to delete test:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const getClickPercentage = (variantIndex: number) => {
    if (!analytics || analytics.total_clicks === 0) return 0;
    const clicks = analytics.variant_clicks[variantIndex] || 0;
    return ((clicks / analytics.total_clicks) * 100).toFixed(1);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{test.name}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Created {new Date(test.created_at).toLocaleDateString()}
            </p>
          </div>
          <Badge>{test.variants.length} variants</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Analytics Section */}
        <div className="bg-muted/50 p-3 rounded-lg">
          <p className="text-sm font-medium mb-2">📊 Analytics</p>
          {loadingAnalytics ? (
            <p className="text-xs text-muted-foreground">Loading stats...</p>
          ) : (
            <div className="space-y-1">
              <p className="text-sm">
                <span className="font-semibold">{analytics?.total_clicks || 0}</span> total clicks
              </p>
              {analytics && analytics.total_clicks > 0 && (
                <div className="text-xs text-muted-foreground space-y-0.5 mt-2">
                  {test.variants.map((_, i) => {
                    const clicks = analytics.variant_clicks[i] || 0;
                    return (
                      <div key={i} className="flex justify-between">
                        <span>Variant {i + 1}:</span>
                        <span className="font-medium">
                          {clicks} ({getClickPercentage(i)}%)
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        <Separator />

        {/* Variants Section */}
        <div>
          <p className="text-sm font-medium mb-2">Variants:</p>
          <ul className="space-y-2">
            {test.variants.map((variant, i) => (
              <li key={i} className="text-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">Variant {i + 1}</span>
                  <Badge variant="outline">{variant.weight}%</Badge>
                </div>
                <p className="text-muted-foreground truncate text-xs">{variant.url}</p>
              </li>
            ))}
          </ul>
        </div>

        <Separator />

        {/* Redirect Link Section */}
        <div>
          <p className="text-sm font-medium mb-2">Redirect Link:</p>
          <div className="flex items-center gap-2">
            <code className="flex-1 bg-muted px-3 py-2 rounded text-sm truncate">
              {redirectUrl}
            </code>
            <CopyButton text={redirectUrl} />
          </div>
        </div>

        <Button
          variant="destructive"
          size="sm"
          onClick={handleDelete}
          disabled={isDeleting}
          className="w-full"
        >
          {isDeleting ? 'Deleting...' : 'Delete Test'}
        </Button>
      </CardContent>
    </Card>
  );
}
