import React from 'react'

export const Rewards = () => {
    return (
        <>
            <div className="md:grid md:grid-cols-2 md:gap-6 p-10 ">
                <div className="mt-5 md:mt-0 md:col-span-2 ">

                    <div className="mt-5 md:mt-0 md:col-span-2">

                        <div className="shadow overflow-hidden sm:rounded-md">
                            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">

                                <fieldset>
                                    <div>
                                        <legend className="text-base font-medium text-gray-900">Recopensas</legend>
                                    </div>
                                    <div className="mt-4 space-y-4">
                                        <div className="flex items-center">
                                            <input id="push-everything" name="push-notifications" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                                            <label className="ml-3 block text-sm font-medium text-gray-700"> Baja </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input id="push-email" name="push-notifications" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                                            <label className="ml-3 block text-sm font-medium text-gray-700"> Media </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input id="push-nothing" name="push-notifications" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                                            <label className="ml-3 block text-sm font-medium text-gray-700"> Alta</label>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden sm:block" aria-hidden="true">
                <div className="py-5">
                    <div className="border-t border-gray-200"></div>
                </div>
            </div>
        </>

    )
}
