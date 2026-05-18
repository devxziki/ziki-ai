import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <Zap className="h-16 w-16 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
        <p className="text-gray-400 mb-4">This conversation doesn&apos;t exist</p>
        <Link href="/">
          <Button>Start a new chat</Button>
        </Link>
      </div>
    </div>
  );
}