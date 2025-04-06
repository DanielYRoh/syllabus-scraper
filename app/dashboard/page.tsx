import { signOut } from "@/auth";
import { sendPDF } from "@/app/lib/actions"
export default function Dashboard() {
    return (
        <div>

            <h1> Hi guys</h1>
            <form action={async () => {
                "use server";
                await signOut({ redirectTo: "/" })
            }}>
                <button> Sign me out</button>
            </form>

            <h1> Now you also gotta do me like that </h1>
            <form action={sendPDF}>
                <label htmlFor="pdf-importer">
                    Import here with stuff
                    <input id="pdf-importer" name="pdf-importer" type="file" className="bg-black text-white-800" />
                </label>
                <button className="bg-blue text-white:600">
                    Send PDF
                </button>
            </form>
        </div>
    )
}