exports.handler = async (event) => {
  try {
    const SUPABASE_URL = process.env.SUPABASE_URL
    const SUPABASE_KEY = process.env.SUPABASE_KEY

    const params = event.queryStringParameters || {}
    const page = parseInt(params.page || "1")
    const limit = parseInt(params.limit || "10")

    const start = (page - 1) * limit
    const end = start + limit - 1

    const url = `${SUPABASE_URL}/rest/v1/khutbahs?select=*`

    const response = await fetch(url, {
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Range": `${start}-${end}`
      }
    })

    const data = await response.json()

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message
      })
    }
  }
}