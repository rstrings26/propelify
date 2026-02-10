import React from "react";
import { Bell, Flame } from "lucide-react";

export function DashboardHeader() {
    const [name, setName] = React.useState("Student");

    React.useEffect(() => {
        const storedName = localStorage.getItem("studentName");
        if (storedName) setName(storedName);
    }, []);

    return (
        <header className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-3xl font-bold font-display text-gray-900">
                    Hello, {name} 👋
                </h1>
                <p className="text-gray-500">Let's make today productive.</p>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 bg-highlight/10 text-highlight-foreground px-3 py-1.5 rounded-full text-sm font-semibold">
                    <Flame size={16} className="text-highlight" />
                    <span>12 Day Streak</span>
                </div>
                <button className="p-2 text-gray-400 hover:text-primary transition-colors relative">
                    <Bell size={24} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white shadow-sm overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`} alt="Profile" />
                </div>
            </div>
        </header>
    );
}

import { ArrowRight, BookOpen, Clock } from "lucide-react";

export function ContinueLearning() {
    return (
        <section className="mb-10">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Continue Learning</h2>
            </div>
            <div className="bg-gradient-to-tr from-primary to-primary/80 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group cursor-pointer transition-transform hover:scale-[1.01]">
                <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full translate-x-10 -translate-y-10 blur-3xl"></div>

                <div className="relative z-10 flex flex-col md:flex-row justify-between md:items-end gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-medium mb-3">
                            <BookOpen size={14} />
                            <span>Mathematics 9709</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Integration Techniques</h3>
                        <p className="text-white/80 max-w-md text-sm">You were practicing past paper questions from Summer 2023. 5 questions remaining.</p>
                    </div>

                    <button className="bg-white text-primary px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-sm">
                        Resume Session <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </section>
    );
}
