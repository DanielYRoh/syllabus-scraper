"use client";

import { useActionState } from 'react';
import { authenticate } from '@/lib/actions';
import { useSearchParams } from 'next/navigation';

export default function LoginForm() {

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined,
    );
    return (
        <form action={formAction}>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 ">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-blue-900"> Sign in</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm text-gray-100">
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium">Username</label>
                            <div className="mt-2">
                                <input type="email" name="email" id="username" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium">Password</label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input type="password" name="password" id="password" autoComplete="current-password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                            </div>
                        </div>

                        <div>
                            <input type="hidden" name="redirectTo" value={callbackUrl} />
                            <button type="submit" aria-disabled={isPending} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                        </div>

                        <div
                            className="flex h-8 items-end space-x-1"
                            aria-live="polite"
                            aria-atomic="true"
                        >
                            {errorMessage && (
                                <>
                                    <p className="text-sm text-red-500">{errorMessage}</p>
                                </>
                            )}
                        </div>

                        <p className="mt-10 text-center text-sm/6 text-gray-500">
                            Not a member?
                            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500"> Click Here to make an account.</a>
                        </p>

                    </form>
                </div>
            </div>
        </form>
    )
}