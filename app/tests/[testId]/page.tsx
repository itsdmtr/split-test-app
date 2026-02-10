'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CopyButton } from '@/components/copy-button';
import type { SplitTest } from '@/types';

interface Analytics {
  total_clicks: number;
  variant_clicks: { [key: number]: number };
}

export default function TestDetailPage({
  params,
}: {
  params: Promise<{ testId: string }>;
}) {
  const router = useRouter();
  const [testId, setTestId] = useState<string>('');
  const [test, setTest] = useState<SplitTest | null>(null);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    params.then((p) => {
      setTestId(p.testId);
      fetchTestDetails(p.testId);
    });
  }, [params]);

  const fetchTestDetails = async (id: string) => {
    try {
      // Fetch test details
      const testRes = await fetch(`/api/tests/${id}/details`);
      if (testRes.ok) {
        const testData = await testRes.json();
        setTest(testData);
      }

      // Fetch analytics
      const analyticsRes = await fetch(`/api/tests/${id}/analytics`);
      if (analyticsRes.ok) {
        const analyticsData = await analyticsRes.json();
        setAnalytics(analyticsData);
      }
    } catch (error) {
      console.error('Failed to fetch test details:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  };

  const getVariantClicks = (variantIndex: number) => {
    return analytics?.variant_clicks[variantIndex] || 0;
  };

  const getVariantPercentage = (variantIndex: number) => {
    if (!analytics || analytics.total_clicks === 0) return 0;
    const clicks = getVariantClicks(variantIndex);
    return ((clicks / analytics.total_clicks) * 100).toFixed(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-8">
          <p className="text-muted-foreground">Loading test details...</p>
        </div>
      </div>
    );
  }

  if (!test) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-8">
          <p className="text-muted-foreground">Test not found</p>
          <Button onClick={() => router.push('/')} className="mt-4">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const redirectUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/r/${test.id}`;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-6 py-4">
          <Button
            variant="ghost"
            onClick={() => router.push('/')}
            className="mb-2"
          >
            ← Back to Tests
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-5xl">
        {/* Test Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">{test.name}</h1>
              <p className="text-sm text-muted-foreground">
                Created {formatDate(test.created_at)}
              </p>
            </div>
            <Badge
              variant={test.status === 'live' ? 'default' : 'secondary'}
              className={
                test.status === 'live'
                  ? 'bg-green-500 hover:bg-green-600 text-lg px-4 py-2'
                  : 'bg-gray-500 hover:bg-gray-600 text-lg px-4 py-2'
              }
            >
              {test.status === 'live' ? 'Live' : 'Stopped'}
            </Badge>
          </div>

          {/* Redirect Link */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Redirect Link</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-muted px-4 py-3 rounded text-sm">
                  {redirectUrl}
                </code>
                <CopyButton text={redirectUrl} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Overview */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Analytics Overview</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Total Clicks</p>
                <p className="text-5xl font-bold">
                  {analytics?.total_clicks.toLocaleString() || 0}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Variants Performance */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Variants Performance</h2>
          <div className="space-y-4">
            {test.variants.map((variant, index) => {
              const clicks = getVariantClicks(index);
              const actualPercentage = parseFloat(getVariantPercentage(index));
              const targetPercentage = variant.weight;

              return (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          Variant {index + 1}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1 truncate max-w-md">
                          {variant.url}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-base px-3 py-1">
                        Target: {targetPercentage}%
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">
                            Total Redirects
                          </p>
                          <p className="text-3xl font-bold">
                            {clicks.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">
                            Actual Percentage
                          </p>
                          <p className="text-3xl font-bold">{actualPercentage}%</p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">
                            Distribution
                          </span>
                          <span className="text-sm font-medium">
                            {clicks} / {analytics?.total_clicks || 0} clicks
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                          <div
                            className="bg-primary h-full transition-all duration-300"
                            style={{ width: `${actualPercentage}%` }}
                          />
                        </div>
                      </div>

                      {/* Comparison */}
                      {analytics && analytics.total_clicks > 0 && (
                        <div className="text-sm">
                          {actualPercentage > targetPercentage ? (
                            <p className="text-green-600">
                              ↑ {(actualPercentage - targetPercentage).toFixed(1)}% above
                              target
                            </p>
                          ) : actualPercentage < targetPercentage ? (
                            <p className="text-orange-600">
                              ↓ {(targetPercentage - actualPercentage).toFixed(1)}% below
                              target
                            </p>
                          ) : (
                            <p className="text-muted-foreground">
                              ✓ Exactly on target
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {analytics && analytics.total_clicks === 0 && (
          <Card className="mt-8">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-2">No data yet</p>
              <p className="text-sm text-muted-foreground">
                Share the redirect link to start collecting data
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
