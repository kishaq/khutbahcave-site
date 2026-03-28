exports.handler = async () => {

const SUPABASE_URL =
"https://wrdrqtreaorjohfsbvda.supabase.co/rest/v1/khutbahs";

const API_KEY = process.env.SUPABASE_KEY;

const response = await fetch(SUPABASE_URL, {
headers: {
apikey: API_KEY,
Authorization: `Bearer ${API_KEY}`
}
});

const data = await response.json();

return {
statusCode: 200,
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify(data)
};

};