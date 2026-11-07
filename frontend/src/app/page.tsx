'use client';

import dynamic from 'next/dynamic';

const VietnamTravelWizard = dynamic(
  () => import('@/components/wizard/VietnamTravelWizard'),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center bg-gray-50/50 dark:bg-gray-950">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Đang khởi động Trợ lý Lập kế hoạch Du lịch Việt Nam...
          </p>
        </div>
      </div>
    )
  }
);

export default function HomePage() {
  return <VietnamTravelWizard />;
}
