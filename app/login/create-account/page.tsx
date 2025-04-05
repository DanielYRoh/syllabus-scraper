import CreateAccount from "@/app/components/create-account"
import { Suspense } from "react"
export default function Login() {

    return (
      <div>
        <Suspense>
            <CreateAccount />
        </Suspense>
      </div>
    )

}