import React from 'react'

export const FinancialInformation = ({financialInformation}) => {
    const accountName=financialInformation?.accountName || 'Aún no registra datos'
    const bank=financialInformation?.bank?.name || 'Aún no registra datos'
    const clabe=financialInformation?.clabe || 'Aún no registra datos'
    const curp=financialInformation?.curp || 'Aún no registra datos'
    const rfc=financialInformation?.rfc || 'Aún no registra datos'
    const phone=financialInformation?.phone || 'Aún no registra datos'

    return (
        <div className="bg-[#86A8A8] shadow overflow-hidden sm:rounded-lg mb-2">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Información del usuario</h3>
                <p className="mt-1 max-w-2xl text-sm text-white">Detalles de información financiera.</p>
            </div>
            <div className="border-t border-gray-200">
                <dl>
                    <Information_w title='Nombre completo' value={accountName} />
                    <Information_b title='Ranking' value={''} />
                    <Information_w title='Banco' value={bank} />
                    <Information_b title='Clabe' value={clabe} />
                    <Information_w title='RFC' value={rfc} />
                    <Information_b title='Curp' value={curp} />
                    <Information_w title='Telefono' value={phone} />


             
                </dl>
                
            </div>
        </div>
    )
}


const Information_w = ({ title, value }) => {
    return (
        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-700">{title}</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{value}</dd>
        </div>
    )
}

const Information_b = ({ title, value }) => {
    return (
        <div className="bg-[#86A8A8] px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-white">{title}</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{value}</dd>
        </div>
    )
}