import { Header } from '@/components/layout/header';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1 flex-col md:flex-row">
        <aside className="border-r bg-white md:w-64">
          <div className="flex h-16 items-center border-b px-4 md:h-[65px]">
            <h2 className="font-semibold">Navigation</h2>
          </div>
          <Navigation />
        </aside>
        <main className="flex-1 bg-neutral-50">
          <div className="container mx-auto p-4 md:p-6">{children}</div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
