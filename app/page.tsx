'use client';
import Link from 'next/link';

export default function HomePage() {
  return (
      <div className="bg-white min-h-screen">
        <main style={{ background: '#fcb827' }} className="p-10">
          <h1 className= "text-4xl font-bold text-center mt-20 text-blue-600">
               Welcome to Syllabus Scraper
          </h1>

          <p className= "text-black text-1g mt-12 max-w-md mx-auto text-center"> Automatically scrape all your classes’ syllabus information with the push of a button! Send an email to your professor, view their ratemyprofessor, turn your classes into calendar events, and much more!
          </p>
          
          <button 
          className="bg-yellow-300 text-blue-600 text-center font-bold px-4 py-2 mt-20 mx-auto block rounded hover:bg-blue-600 transition border-2 border-blue-600"
          /*onClick={}*/>
            Start Scraping
          </button>
        </main>

        <div className="flex justify-center mt-10">
        <img
          src="https://content.sportslogos.net/logos/34/828/full/san_jose_state_spartans_logo_mascot_20002877.png"
          alt="sjsu"
          className="w-auto h-auto"
        />
        </div>
      </div>

  )
}