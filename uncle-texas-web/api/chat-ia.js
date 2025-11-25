// /api/chat-ia.js — Usa Gemini v1 y detecta el modelo disponible automáticamente

async function elegirModelo(apiKey) {
  // Pedimos la lista de modelos disponibles para TU clave
  const resp = await fetch(
    "https://generativelanguage.googleapis.com/v1/models?key=" + apiKey
  );

  const data = await resp.json();

  if (!resp.ok) {
    console.error("❌ Error al listar modelos:", JSON.stringify(data, null, 2));
    throw new Error("No se pudieron listar los modelos de Gemini");
  }

  const modelos = data.models || [];

  if (!modelos.length) {
    throw new Error("Tu API key no tiene modelos disponibles");
  }

  // 1) Preferimos alguno con 'flash'
  let elegido =
    modelos.find((m) => m.name.includes("flash")) ||
    // 2) si no hay, alguno con 'gemini'
    modelos.find((m) => m.name.includes("gemini")) ||
    // 3) si nada de lo anterior, el primero
    modelos[0];

  console.log("✅ Usando modelo:", elegido.name);
  return elegido.name; // ejemplo: "models/gemini-1.5-flash-latest"
}

export default async function handler(req, res) {
  // Solo aceptamos POST desde el frontend
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error("❌ Falta GEMINI_API_KEY en las variables de entorno");
    return res.status(500).json({
      error: "Falta GEMINI_API_KEY en el servidor",
    });
  }

  const { message } = req.body || {};
  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Mensaje inválido" });
  }

  try {
    // 1️⃣ Primero elegimos el modelo correcto para TU clave
    const modelName = await elegirModelo(apiKey);
    // modelName será algo como "models/gemini-1.5-flash-latest" o similar

    // 2️⃣ Luego llamamos a generateContent con ese modelo
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/${modelName}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text:
                    "Eres la IA del restaurante Uncle Texas. " +
                    "Responde como experto en BBQ, brisket, pulled pork y el menú del local. " +
                    "Sé amable, claro y breve.\n\n" +
                    "Pregunta del cliente: " +
                    message,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(
        "❌ Error al llamar a Gemini:",
        JSON.stringify(data, null, 2)
      );
      return res.status(500).json({
        error: "Error al llamar a Gemini",
        status: response.status,
        details: data,
      });
    }

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No pude generar una respuesta en este momento.";

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("❌ Error en /api/chat-ia:", error);
    return res.status(500).json({
      error: "Error interno del servidor",
      details: error.message,
    });
  }
}
