import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { TestList } from '@/components/test-list';

export default function TestsPage() {
  return (
    <div className="container mx-auto py-10 px-4 max-w-6xl">
      <header className="mb-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">All Tests</h1>
            <p className="text-muted-foreground">Manage all your split tests</p>
          </div>
          <Button asChild>
            <Link href="/">Create New Test</Link>
          </Button>
        </div>
      </header>

      <TestList />
    </div>
  );
}
