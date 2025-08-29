import Header from '@/components/Header';
import JournalClient from '@/components/JournalClient';

export default function JournalPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <JournalClient />
      </main>
    </div>
  );
}
