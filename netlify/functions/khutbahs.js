exports.handler = async (event) => {
  try {
    const url = `${process.env.SUPABASE_URL}/rest/v1/khutbahs?select=*`;

    const response = await fetch(url, {
      headers: {
        apikey: process.env.SUPABASE_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_KEY}`
      }
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message,
        supabaseUrl: process.env.SUPABASE_URL ? "loaded" : "missing"
      })
    };
  }
};