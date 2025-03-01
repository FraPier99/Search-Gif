import axios from "axios";
import dotenv from "dotenv";

// ✅ Carica variabili d'ambiente in locale
dotenv.config();

export default async function handler(event, context) {
    console.log("✅ Funzione Netlify avviata!");
    console.log("🔍 event.rawUrl:", event.url); 
    console.log("🔍 API_KEY presente?", process.env.API_KEY ? "✅ OK" : "❌ MANCANTE");

    const API_KEY = process.env.API_KEY;
    

  // ✅ Estrarre i parametri manualmente dall'URL
  const url = new URL(event.url); // Converte la stringa in un oggetto URL
  const query = url.searchParams.get("query") || "random"; // Recupera il valore di 'query'

    const API_URL = `https://api.giphy.com/v1/gifs/search?q=${encodeURIComponent(query)}&api_key=${API_KEY}&limit=5`;

    console.log("🚀 URL della richiesta:", API_URL);
    console.log(query)

    try {
        const response = await axios.get(API_URL);
        console.log("✅ Risposta API ricevuta:", response.data);

        // ✅ Assicuriamoci di restituire una risposta accettata da Netlify
        return new Response(JSON.stringify(response.data), {
            headers: { "Content-Type": "application/json" },
            status: 200
        });

    } catch (err) {
        console.error("❌ ERRORE nella richiesta API:", err.message);

        return new Response(JSON.stringify({ error: "Errore nel recupero dati", details: err.message }), {
            headers: { "Content-Type": "application/json" },
            status: 500
        });
    }
}
