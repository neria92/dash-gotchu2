import { Ranking } from "../Ranking"

export const User = ({ photo, name, ranking, reason, type,button }) => {
    return (
        <div className="max-w-sm w-60  bg-white rounded-lg border border-gray-200 shadow-md dark:bg-blue-200 dark:border-gray-200">

            <div className="flex flex-col items-center pb-10 mt-20">
                <img className="mb-3 w-24 h-24 rounded-full shadow-lg" src={photo} alt={`image ${name}`} loading='lazy' />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-gray">{name}</h5>
                <Ranking rating={ranking} />
            </div>
            <div className=" flex flex-col">
                <Info title='Tipo de usuario' text={`usuario que ${type}`} />
                <Info title='Motivo' text={reason} />
            </div>

            <div className="flex flex-col items-center pb-10 ">


                <div className="flex mt-4 space-x-3 lg:mt-6 mb-0">
                    <button className={`inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white ${type==='rechaza'?'bg-red-400 hover:bg-red-800 ':'bg-green-900 hover:bg-green-800'} rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 `}>{button}</button>
                </div>
            </div>

        </div>

    )
}

const Info = ({ title, text }) => {
    return (
        <div>
            <h1 className="flex flex-start  text-gray-700 font-bold ml-2">
                {title}
            </h1>
            <h1 className=" ml-4 text-gray-500 font-semibold">
                <span>
                    {text}
                </span>
            </h1>

        </div>
    )
}