import { signOut } from "@/auth";
export default function Dashboard(){
    return (
        <div>

            <h1> Syllabus Scraper </h1>
            <form action={async () => {
                "use server";
                await signOut({ redirectTo: "/"})
            }}>
                <button> Sign out</button>

            </form>
            <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 ">PDF Only (MAX. 800x400px)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" />
                </label>
            </div>

            <div className="bg-gray-100 min-h-screen p-6">
                {/* Header */}
                <header className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">My Syllabi</h1>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
                    + New
                    </button>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {['CMPE-30', 'BIO-10', 'CALC-2'].map((file, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
                        <div className="flex items-center justify-center h-[120px] bg-gray-100 rounded-lg mb-4">
                        <span className={`text-${index === 2 ? 'green' : 'blue'}-400 text-xl`}>
                            {index === 2 ? '📊' : '📄'}
                        </span>
                        </div>
                        <h2 className="text-sm font-medium text-gray-700 truncate">{file}</h2>
                    </div>
                ))}
                </div>
            </div>
        </div> 

    )
}