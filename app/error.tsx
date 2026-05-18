'use client';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <Zap className="h-16 w-16 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
        <p className="text-gray-400 mb-4">Please try again</p>
        <Button onClick={reset}>Try again</Button>
      </div>
    </div>
  );
}