import LoginForm from "@/app/components/login-form"
import { Suspense } from "react"
export default function Login() {

    return (
        <div>
            <Suspense>
                <LoginForm />
            </Suspense>
                
        </div>
    )

}