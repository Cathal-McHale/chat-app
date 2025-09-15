
import { Lock, Users, MessageSquare } from "lucide-react";

const AuthImagePattern = ({ title, subtitle }) => {
    return (
        <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-400 rounded-xl shadow-2xl m-8 p-0 border border-blue-200 min-h-[500px] w-full">
            <div className="flex flex-col items-center justify-center w-full h-full p-12">
                <div className="relative w-full flex flex-col items-center">
                    {/* Decorative pattern */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                        <div className="grid grid-cols-3 gap-4 w-full h-full">
                            {[...Array(9)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`aspect-square rounded-2xl bg-white/10 ${i % 2 === 0 ? "animate-pulse" : ""}`}
                                />
                            ))}
                        </div>
                    </div>
                    {/* Centered icons */}
                    <div className="relative z-10 flex flex-row items-center justify-center gap-6 mb-8">
                        <Users className="size-12 text-white drop-shadow-lg" />
                        <Lock className="size-12 text-white drop-shadow-lg" />
                        <MessageSquare className="size-12 text-white drop-shadow-lg" />
                    </div>
                    <h2 className="relative z-10 text-3xl font-extrabold text-white mb-2 drop-shadow-lg">{title}</h2>
                    <p className="relative z-10 text-white/80 text-lg font-medium drop-shadow-md">{subtitle}</p>
                </div>
            </div>
        </div>
    );
};

export default AuthImagePattern;