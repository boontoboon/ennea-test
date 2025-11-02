import OpenAI from "openai";

export async function POST(req) {
  try {
    const body = await req.json(); // 클라이언트에서 보낸 요청(JSON)

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const resp = await client.responses.create(body);
    const text = resp.output_text ?? "";
    const result = JSON.parse(text);

    return new Response(JSON.stringify({ result }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    console.error("API Error:", e);
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
