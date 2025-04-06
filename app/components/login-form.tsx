"use client";

import { useActionState } from 'react';
import { authenticate } from '@/lib/actions';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function () {

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined,
    );
    return (
        <div style={{ background: 'linear-gradient(to bottom, #fcb827, #FFFFFF)' }} className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="flex justify-center items-center h-screen">
                <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-3xl/9 font-bold tracking-tight text-[#075ab1]"> Sign in</h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm text-gray-100">
                        <form action={formAction} className="space-y-6">
                            <div>
                                <label htmlFor="username" className="block text-sm/6 font-medium text-gray-500">Student ID</label>
                                <div className="mt-2">
                                    <input type="text" name="username" id="studentid" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6" />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-500">Password</label>
                                    <div className="text-sm">
                                        <a href="#" className="font-semibold text-[#047ac0] hover:text-blue-600">Forgot password?</a>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input type="password" name="password" id="password" autoComplete="current-password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                </div>
                            </div>

                            <div>
                                <input type="hidden" name="redirectTo" value={callbackUrl} />
                                <button type="submit" aria-disabled={isPending} className="flex w-full justify-center rounded-md bg-[#047ac0] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
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
                                <Link className="font-semibold text-indigo-600 hover:text-[#047ac0] ml-1" href="/login/create-account">
                                    Click Here to make an account.
                                </Link>
                            </p>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}