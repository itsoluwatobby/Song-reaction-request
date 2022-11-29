import { useState } from 'react'
import { Card } from '../components/Request/Card'
import { Edit } from '../components/Request/Edit'
import { RequestForm } from '../components/Request/RequestForm'
import { UseDataContext } from '../context/UseDataContext'

export const Request = () => {
  const {email} = UseDataContext()
  const [editPage, setEditPage] = useState(false);

  return (
    <section className='p-2 flex flex-col w-full h-full overflow-y-scroll'>
      <marquee className='capitalize text-2xl p-2 w-full maxscreen:mb-12'>Welcome <span className='uppercase'>{email && email.split('@')[0]} </span> to my reaction fan page</marquee>
      <div className='flex midscreen:flex-col gap-2'>
        {editPage ? <Edit setEditPage={setEditPage}/> : <RequestForm /> }
        <Card setEditPage={setEditPage}/>
      </div>
    </section>
  )
}
