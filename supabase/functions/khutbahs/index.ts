import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(supabaseUrl, supabaseKey);

Deno.serve(async () => {
  try {
    const { data, error } = await supabase
      .from("khutbahs")
      .select("*")
      .order("publish_date", { ascending: false });

    if (error) {
      return new Response(JSON.stringify(error), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });

  } catch (err) {
    return new Response(JSON.stringify(err), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
});
