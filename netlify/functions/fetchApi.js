exports.handler = async function(event,context){

const API_KEY = process.env.API_KEY

const reponse  = await fetch(`https://gifs-search-site.netlify.app/.netlify/functions/fetchApi`)

const data  = await reponse.json()

return {
    statusCode:200,
    body:JSON.stringify(data)
}
}
    
