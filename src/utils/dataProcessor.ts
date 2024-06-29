// Interface for individual crop data
export interface CropData {
  year: number
  crop: string
  production: number
  area: number
  yield: number
}

// Interface for crop averages
export interface CropAverage {
  crop: string
  averageYield: number
  averageArea: number
}

// Function to fetch data from 'data.json' asynchronously
export const fetchData = async (): Promise<CropData[]> => {
  // Fetch data from 'data.json' using fetch API
  const response = await fetch('data.json')

  // Parse JSON response
  const jsonData = await response.json()

  // Map JSON data to CropData objects
  const data: CropData[] = jsonData.map((row: any) => ({
    // Extract and parse year from 'Year' field
    year: parseInt(row['Year'].split(', ')[1], 10),
    // Extract crop name from 'Crop Name' field
    crop: row['Crop Name'],
    // Parse crop production, defaulting to 0 if undefined
    production: row['Crop Production (UOM:t(Tonnes))']
      ? parseFloat(row['Crop Production (UOM:t(Tonnes))'])
      : 0,
    // Parse area under cultivation, defaulting to 0 if undefined
    area: row['Area Under Cultivation (UOM:Ha(Hectares))']
      ? parseFloat(row['Area Under Cultivation (UOM:Ha(Hectares))'])
      : 0,
    // Parse yield of crops, defaulting to 0 if undefined
    yield: row['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))']
      ? parseFloat(row['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))'])
      : 0,
  }))

  // Return the array of CropData objects
  return data
}
