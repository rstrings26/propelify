"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        // Check if user is logged in and has teacher role
        const checkAuth = async () => {
            // For now, we'll use a simple localStorage check
            // In production, verify with backend
            const userRole = localStorage.getItem("userRole");

            if (userRole !== "teacher") {
                router.push("/login");
                return;
            }

            setIsAuthorized(true);
        };

        checkAuth();
    }, [router]);

    if (!isAuthorized) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-600">Verifying access...</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
