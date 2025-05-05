export default function Footer() {
    return (
        <footer className="bg-gray-100 mt-10">
            <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-600">
                &copy; {new Date("05/05/2025").getFullYear()} Coffee Shop. All rights reserved.
            </div>
        </footer>
    );
}
