export default async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      }
    });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({"error":"Method not allowed"}), {
      status: 405,
      headers: {"Content-Type":"application/json","Access-Control-Allow-Origin":"*"}
    });
  }

  try {
    const body = await request.json();
    const zres = await fetch("https://hooks.zapier.com/hooks/catch/24157828/u6du0t3/", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(body)
    });

    if (!zres.ok) {
      const text = await zres.text();
      return new Response(JSON.stringify({"ok":false,"status":zres.status,"zapier":text.slice(0,400)}), {
        status: 502,
        headers: {"Content-Type":"application/json","Access-Control-Allow-Origin":"*"}
      });
    }
    return new Response(JSON.stringify({"ok":true}), {
      status: 200,
      headers: {"Content-Type":"application/json","Access-Control-Allow-Origin":"*"}
    });
  } catch (err) {
    return new Response(JSON.stringify({"ok":false,"error": String(err)}), {
      status: 500,
      headers: {"Content-Type":"application/json","Access-Control-Allow-Origin":"*"}
    });
  }
};
