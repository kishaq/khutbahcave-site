exports.handler = async () => {
  try {

    const url = `${process.env.SUPABASE_URL}/rest/v1/khutbahs?select=*`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "apikey": process.env.SUPABASE_KEY,
        "Authorization": `Bearer ${process.env.SUPABASE_KEY}`,
        "Content-Type": "application/json"
      }
    });

    const text = await response.text();

    return {
      statusCode: response.status,
      body: text
    };

  } catch (err) {

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message,
        supabaseUrl: process.env.SUPABASE_URL,
        keyLoaded: process.env.SUPABASE_KEY ? true : false
      })
    };

  }
};