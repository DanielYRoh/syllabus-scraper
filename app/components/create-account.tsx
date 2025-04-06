"use client";

import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import { newUser } from '@/app/lib/actions';

export default function () {

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
    const [errorMessage, formAction, isPending] = useActionState(
        newUser,
        undefined,
    );
    return (
        <div style={{ background: 'linear-gradient(to bottom, #fcb827, #FFFFFF)' }} className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="flex justify-center items-center h-screen">
                <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-3xl/9 font-bold tracking-tight text-[#075ab1]"> Create Account</h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm text-gray-100">
                        <form action={formAction} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm/6 font-medium text-gray-500">Name</label>
                                <div className="mt-2">
                                    <input type="text" name="name" id="name" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="username" className="block text-sm/6 font-medium text-gray-500">Username</label>
                                <div className="mt-2">
                                    <input type="text" name="username" id="username" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6" />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-500">

                                        Password <span className="italic text-xs text-gray-400"> (must be at least 6 characters) </span>
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input type="password" name="password" id="password" autoComplete="current-password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                </div>
                            </div>

                            <div>
                                <input type="hidden" name="redirectTo" value={callbackUrl} />
                                <button type="submit" aria-disabled={isPending} className="flex w-full justify-center rounded-md bg-[#047ac0] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create Account</button>
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

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}