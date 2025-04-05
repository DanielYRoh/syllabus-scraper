'use client';
import Link from 'next/link';

export default function HomePage() {
  return (
      <div className="bg-white min-h-screen">
        <main className="p-10 bg-yellow-300">
          <h1 className="text-4xl font-bold text-center mt-20 text-blue-600">
               Welcome to Syllabus Scraper
          </h1>
          
          <button 
          className="bg-yellow-300 text-blue-600 text-center font-bold px-4 py-2 mt-10 mx-auto block rounded hover:bg-blue-600 transition border-2 border-blue-600"
          /*onClick={}*/>
            Start Scraping
          </button>
        </main>
      </div>
  )
}

