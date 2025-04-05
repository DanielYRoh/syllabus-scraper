'use client';
import Link from 'next/link';

export default function HomePage() {
  return (
      <div className="bg-white min-h-screen">
        <main style={{ background: 'linear-gradient(to bottom, #fcb827, #FFFFFF)' }} className="p-10">
          <h1 style={{ color: '#047ac0' }} className= "text-6xl font-bold text-center mt-20">
               Welcome to Syllabus Scraper
          </h1>

          <p className="text-black text-2xl mt-12 max-w-2xl mx-auto text-center"> Automatically scrape all your classes’ syllabus information with the push of a button! Send an email to your professor, view their ratemyprofessor, turn your classes into calendar events, and much more!
          </p>
          
          
          <Link href="/login">
            <button 
            className="border-white bg-[#047ac0] text-white text-center font-bold px-4 py-2 mt-20 mx-auto block rounded hover:bg-blue-600 transition border-2">
              Start Scraping
            </button> 
          </Link>
        </main>

        <div className="flex justify-center mt-10">
        <img
          src="https://content.sportslogos.net/logos/34/828/full/san_jose_state_spartans_logo_mascot_20002877.png"
          alt="sjsu"
          className="w-64 h-140 object-cover mx-auto"
        />
        </div>
      </div>

  )
}
