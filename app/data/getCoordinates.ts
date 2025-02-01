export async function getCoordinates(postalCode: string): Promise<[number, number] | null> {
  try {
    const formattedPostalCode = postalCode.replace(/\s/g, "")
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&country=Netherlands&postalcode=${formattedPostalCode}`,
    )
    const data = await response.json()

    if (data && data.length > 0) {
      const { lon, lat } = data[0]
      return [Number.parseFloat(lat), Number.parseFloat(lon)]
    } else {
      console.error("Postal code not found")
      return null
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error)
    return null
  }
}

