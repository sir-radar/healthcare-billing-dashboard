'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ClipboardList, LineChart } from 'lucide-react';

import { cn } from '@/lib/utils';

export function Navigation() {
  const pathname = usePathname();

  const navItems = [
    {
      name: 'Dashboard',
      href: '/',
      icon: LayoutDashboard,
    },
    {
      name: 'Claims',
      href: '/claims',
      icon: ClipboardList,
    },
    {
      name: 'Forecasting',
      href: '/forecasting',
      icon: LineChart,
    },
  ];

  return (
    <nav className="flex md:flex-col gap-1 md:gap-2 px-2">
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors',
              isActive
                ? 'bg-primary/10 text-primary hover:bg-primary/10'
                : 'text-neutral-600 hover:text-primary hover:bg-primary/5'
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="hidden md:inline">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
