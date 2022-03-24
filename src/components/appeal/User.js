import { Ranking } from "../Ranking"

export const User = ({ photo, name, typeUser, reason }) => {
    return (
        <div className="max-w-sm w-60 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-blue-200 dark:border-gray-200">
            <div className="flex justify-end px-4 pt-4">

            </div>
            <div className="flex flex-col items-center pb-10">
                <img className="mb-3 w-24 h-24 rounded-full shadow-lg" src={photo} alt={`image ${name}`} loading='lazy' />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-gray">{name}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-700">{typeUser}</span>
                <span className="text-sm text-gray-500 dark:text-gray-700">{reason}</span>
                <Ranking
                    rating={3.0}
                />

                <div className="flex mt-4 space-x-3 lg:mt-6">
                    <button href="#" className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">decirle ok</button>
                </div>
            </div>
        </div>

    )
}