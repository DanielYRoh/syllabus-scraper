import CreateAccount from "@/app/components/create-account"
import { Suspense } from "react"
export default function Login() {

    return (
        <Suspense>
            <div>
            <CreateAccount />
            </div>
        </Suspense>
    )

}