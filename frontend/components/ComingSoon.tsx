import { Clock } from "lucide-react";

export default function ComingSoon() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[40vh] rounded-lg p-8">
            <Clock className="w-12 h-12 text-latte-600 mb-4" />
            <h2 className="text-3xl font-bold text-latte-900 mb-2">Coming Soon</h2>
            <p className="text-latte-700 text-center max-w-md">
                We are working hard to bring you this feature. Stay tuned for updates!
            </p>
        </div>
    );
}
