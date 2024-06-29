import React from 'react'
import { Table } from '@mantine/core'
import { getYearlyAggregation, getCropAverage } from '../utils/aggregations'
import { CropData, CropAverage } from '../utils/dataProcessor'
import './AggregatedTable.css'

// Define props interface for AggregatedTable component
interface AggregatedTableProps {
  data: CropData[] // Data prop containing CropData array
}

// Functional component for displaying aggregated data in tables
const AggregatedTable: React.FC<AggregatedTableProps> = ({ data }) => {
  // Calculate yearly aggregation using getYearlyAggregation function
  const yearlyData = getYearlyAggregation(data)

  // Calculate crop averages using getCropAverage function
  const cropAverages: CropAverage[] = getCropAverage(data)

  return (
    <div className="table-wrapper">
      {/* Yearly Aggregation Table */}
      <h1>Yearly Aggregation</h1>
      <Table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Crop with Maximum Production in that year</th>
            <th>Crop with Minimum Production in that Year</th>
          </tr>
        </thead>
        <tbody>
          {/* Render rows for each year in yearlyData */}
          {Object.entries(yearlyData).map(([year, { maxCrop, minCrop }]) => (
            <tr key={year}>
              <td>{year}</td>
              <td>{maxCrop}</td>
              <td>{minCrop}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Crop Averages Table */}
      <h1>Crop Averages (1950-2020)</h1>
      <Table>
        <thead>
          <tr>
            <th>Crop</th>
            <th>Average Yield of the Crop between 1950-2020</th>
            <th>Average Cultivation Area of the Crop between 1950-2020</th>
          </tr>
        </thead>
        <tbody>
          {/* Render rows for each crop average in cropAverages */}
          {cropAverages.map(({ crop, averageYield, averageArea }) => (
            <tr key={crop}>
              <td>{crop}</td>
              <td>{averageYield}</td>
              <td>{averageArea}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default AggregatedTable
