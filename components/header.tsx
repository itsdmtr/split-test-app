'use client';

import { Button } from '@/components/ui/button';

export function Header({ onCreateTest }: { onCreateTest: () => void }) {
  return (
    <header className="border-b">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-foreground"
          >
            <path
              d="M12 2L12 12M12 12L12 22M12 12L22 12M12 12L2 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="12" cy="2" r="2" fill="currentColor" />
            <circle cx="12" cy="22" r="2" fill="currentColor" />
            <circle cx="2" cy="12" r="2" fill="currentColor" />
            <circle cx="22" cy="12" r="2" fill="currentColor" />
          </svg>
          <span className="text-xl font-semibold">Split</span>
        </div>
        <Button onClick={onCreateTest} size="sm">
          <span className="mr-1">+</span> Create Test
        </Button>
      </div>
    </header>
  );
}
