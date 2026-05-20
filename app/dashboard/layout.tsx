import { Suspense } from "react"; 

import { Sidebar } from "@/components";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="bg-slate-100 overflow-y-scroll w-screen h-screen antialiased text-slate-300 selection:bg-blue-600 selection:text-white">

            <div className="flex flex-row min-h-screen">

                <Sidebar />

                <div className="p-4 flex-1 bg-slate-100 text-slate-900 overflow-y-auto">
                    <Suspense>{children}</Suspense>
                </div>

            </div>
        </div>
    );
}