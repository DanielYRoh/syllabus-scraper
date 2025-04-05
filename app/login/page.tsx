import LoginForm from "@/app/components/login-form"
import { Suspense } from "react"
export default function Login() {

    return (
        <Suspense>
            <div>
            <LoginForm />
            </div>
        </Suspense>
    )

}