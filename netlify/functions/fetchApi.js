import axios from "axios";

exports.handler = async function(event,context){

const API_KEY = process.env.API_KEY

 // Recupera il parametro 'query' dalla richiesta
 const query = event.queryStringParameters.query || "random"; 
 // Default: 'random'

const API_URL =`https://api.giphy.com/v1/gifs/search?q=${encodeURIComponent(query)}&api_key=${API_KEY}&limit=5`


try{
const response = await axios.get(API_URL)
const data = response.data

return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" }, // Aggiunge header JSON per sicurezza
    body: JSON.stringify(data)
};

}catch(err){
    console.error(err,'errore nel recupero dati')

    return {
        statusCode: 500,
        body: JSON.stringify({ error: "Errore nel recupero dati" })
    };
}



    
    


}
    