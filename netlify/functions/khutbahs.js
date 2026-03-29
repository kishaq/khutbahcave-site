exports.handler = async (event) => {
  const SUPABASE_URL = process.env.SUPABASE_URL
  const SUPABASE_KEY = process.env.SUPABASE_KEY

  const params = event.queryStringParameters || {}

  const page = parseInt(params.page || "1")
  const limit = parseInt(params.limit || "10")
  const search = params.search || ""
  const slug = params.slug || ""

  let url = `${SUPABASE_URL}/rest/v1/khutbahs?select=*`

  // pagination
  const start = (page - 1) * limit
  const end = start + limit - 1

  if (slug) {
    url += `&slug=eq.${slug}`
  }

  if (search) {
    url += `&title=ilike.*${search}*`
  }

  const response = await fetch(url, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      Range: `${start}-${end}`
    }
  })

  const data = await response.json()

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }
}