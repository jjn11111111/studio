import Header from '@/components/Header';
import CommunityClient from '@/components/CommunityClient';

export default function CommunityPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <CommunityClient />
      </main>
    </div>
  );
}
