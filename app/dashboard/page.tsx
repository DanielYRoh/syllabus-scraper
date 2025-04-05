import { signOut } from "@/auth";
export default function Dashboard(){
    return (
        <div>

            <h1> Hi guys</h1>
            <form action={async () => {
                "use server";
                await signOut({ redirectTo: "/"})
            }}>
                <button> Sign me out</button>

            </form>
        </div>
    )
}