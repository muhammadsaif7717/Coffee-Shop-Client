import { useLoaderData } from 'react-router-dom'
import CoffeeCard from './CoffeeCard'
import { useState } from 'react'

function App() {
  const loadedCoffees = useLoaderData()
  const [coffees, setCoffees] = useState(loadedCoffees)


  return (
    <>
    
      <h1 className='text-6xl text-purple-500 text-center'>All Coffees: {coffees.length}</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        {
          coffees.map(coffee => <CoffeeCard
            key={coffee._id}
            coffee={coffee}
            coffees={coffees}
            setCoffees={setCoffees}
          >

          </CoffeeCard>)
        }
      </div>
    </>
  )
}

export default App
