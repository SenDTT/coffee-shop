export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-latte-200/20 to-latte-300/30 mt-10">
            <div className="container mx-auto px-4 py-6 text-center text-sm text-cabin-800">
                &copy; {new Date("05/05/2025").getFullYear()} Coffee Shop. All rights reserved.
            </div>
        </footer>
    );
}
