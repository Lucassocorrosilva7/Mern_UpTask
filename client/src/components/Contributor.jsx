import React from 'react'
import useProjects from '../hooks/useProjects'

const Contributor = ({contributor}) => {

    const { handleModalDeleteContributor } = useProjects();

    const { name, email} = contributor
  return (

    <div className="border-b p-5 flex justify-between items-center">
        <div>
            <p>{name}</p>
            <p className='text-sm text-gray-700'>{email}</p>
        </div>
        <div>
                <button onClick={() => handleModalDeleteContributor(contributor)} type='button' className='bg-red-500 hover:bg-red-600 transition-colors px-4 py-3 text-white uppercase font-bold text-sm rounded-lg'>
                    Excluir
                </button>
        </div>
    </div>
    
  )
}

export default Contributor