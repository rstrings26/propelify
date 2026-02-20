"use client";

import { DashboardHeader, ContinueLearning } from "@/components/dashboard/HeaderAndContinue";
import ProgressSnapshot from "@/components/dashboard/ProgressSnapshot";
import ActionGrid from "@/components/dashboard/ActionGrid";

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-10 pb-20">
      <div className="max-w-6xl mx-auto">
        <DashboardHeader />

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-8">
            <ContinueLearning />

            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
              </div>
              <ActionGrid />
            </section>
          </div>

          <div className="w-full lg:w-80 xl:w-96 flex-shrink-0">
            <ProgressSnapshot />
          </div>
        </div>
      </div>
    </div>
  );
}
