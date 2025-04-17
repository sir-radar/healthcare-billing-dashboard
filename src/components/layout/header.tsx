'use client';

import Link from 'next/link';
import { Bell, User } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b bg-white">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-primary">
              Claimyx Health
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <button className="rounded-full p-2 hover:bg-neutral-100">
            <Bell className="h-5 w-5 text-neutral-600" />
            <span className="sr-only">Notifications</span>
          </button>
          <button className="flex items-center gap-2 rounded-full p-2 hover:bg-neutral-100">
            <User className="h-5 w-5 text-neutral-600" />
            <span className="sr-only">Profile</span>
          </button>
        </div>
      </div>
    </header>
  );
}
