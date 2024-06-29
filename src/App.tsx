import React, { useEffect, useState } from 'react'
import { MantineProvider } from '@mantine/core'
import AggregatedTable from './components/AggregatedTable'
import { fetchData, CropData } from './utils/dataProcessor'

// Define the App component as a functional component
const App: React.FC = () => {
  // State hook to store fetched data
  const [data, setData] = useState<CropData[]>([])

  // Effect hook to fetch data when the component mounts
  useEffect(() => {
    // Async function to fetch data and update state
    const getData = async () => {
      const data = await fetchData() // Call fetchData function to get data
      setData(data) // Update state with fetched data
    }

    getData() // Invoke getData function to fetch data when component mounts
  }, []) // Empty dependency array ensures useEffect runs only once on mount

  return (
    <MantineProvider>
      <div className="App">
        <h1 style={{ textAlign: 'center', margin: '6rem' }}>
          INDIAN AGRICULTURE DATA ANALYSIS
        </h1>
        {/* Conditional rendering based on data length */}
        {data.length > 0 ? (
          <AggregatedTable data={data} /> // Render AggregatedTable with fetched data
        ) : (
          <p style={{ textAlign: 'center', margin: '6rem' }}>Loading data...</p> // Display loading message while data is fetching
        )}
      </div>
    </MantineProvider>
  )
}

export default App
