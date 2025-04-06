
import { signOutHelper } from "@/lib/actions";
export default function Navbar() {
  return (
    <nav className="text-white" style={{ background: 'linear-gradient(to bottom, #fcb827, #FFFFFF)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-30">
          {/* Website Title */}
          <h1 className="text-[#047ac0] text-5xl font-bold">Syllabus Scraper</h1>

          {/* Button */}
          <form action={signOutHelper}>
          <button className="border-[#047ac0] bg-[#047ac0] text-white text-center font-bold px-4 py-2 mt-2 w-full mx-auto block rounded hover:bg-blue-600 transition border-2 ">Sign Out</button>

          </form>
        </div>
      </div>
    </nav>
  );
}
