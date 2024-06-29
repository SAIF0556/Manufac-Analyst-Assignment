// Importing types from dataProcessor.ts
import { CropData, CropAverage } from './dataProcessor'

// Interface for yearly aggregation results
interface YearlyAggregation {
  maxCrop: string
  minCrop: string
}

// Function to calculate yearly crop aggregation
export const getYearlyAggregation = (
  data: CropData[],
): Record<number, YearlyAggregation> => {
  // Initialize an empty object to store yearly aggregation results
  const yearlyAggregation: Record<number, YearlyAggregation> = {}

  // Extract unique years from the data
  const years = Array.from(new Set(data.map((item) => item.year)))

  // Iterate over each unique year to compute max and min crops
  years.forEach((year) => {
    // Filter data for the current year
    const cropsInYear = data.filter((item) => item.year === year)

    // Check if there are crops for the current year
    if (cropsInYear.length > 0) {
      // Calculate max crop based on production
      const maxCrop = cropsInYear.reduce((prev, curr) =>
        curr.production > prev.production ? curr : prev,
      ).crop

      // Calculate min crop based on production
      const minCrop = cropsInYear.reduce((prev, curr) =>
        curr.production < prev.production ? curr : prev,
      ).crop

      // Store max and min crops for the current year
      yearlyAggregation[year] = { maxCrop, minCrop }
    }
  })

  // Return the aggregated results
  return yearlyAggregation
}

// Function to calculate crop averages
export const getCropAverage = (data: CropData[]): CropAverage[] => {
  // Group data by crop type
  const cropGroups = data.reduce((acc, item) => {
    if (!acc[item.crop]) {
      acc[item.crop] = []
    }
    acc[item.crop].push(item)
    return acc
  }, {} as Record<string, CropData[]>)

  // Calculate averages for each crop group
  const cropAverages: CropAverage[] = Object.entries(cropGroups).map(
    ([crop, records]) => {
      // Calculate total yield and area for the crop
      const totalYield = records.reduce((sum, record) => sum + record.yield, 0)
      const totalArea = records.reduce((sum, record) => sum + record.area, 0)
      const count = records.length

      // Calculate average yield and area, rounding to 3 decimal places
      return {
        crop,
        averageYield: parseFloat((totalYield / count).toFixed(3)),
        averageArea: parseFloat((totalArea / count).toFixed(3)),
      }
    },
  )

  // Return the array of crop averages
  return cropAverages
}
