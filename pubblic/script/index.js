import dotenv from 'dotenv'

dotenv.config()

const api_key = process.env.API_KEY

const span = document.getElementById('delelte-search')

let example = ["HTML", "CSS", "Javascript",'React']; // Suggerimenti iniziali


const consigliati = document.querySelector('.consigliati');
const resultContainer = document.querySelector('.resultContainer');
const inputSearch = document.querySelector('#input-search')



const renderSpan = () =>{

    if(inputSearch.value.trim() ==''){
       span.style.display = 'none'
    }else{
           span.style.display = 'flex'
    }



}


inputSearch.addEventListener('input',renderSpan )
span.addEventListener('click',()=>{

    span.style.display ='none'
    inputSearch.value =''
    inputSearch.focus()

})

const buttonSearch = document.querySelector('#button-search')

buttonSearch.addEventListener('click',(e)=>{

const values = Array.from(document.querySelectorAll('.suggerito')).map(el => el.innerText.toLowerCase().trim())
const query = inputSearch.value.trim()
    if( query =='' ){
        return 
    }
    if(values.includes(query) ){
        alert('Gif gia presente o nei suggeriti')
        return 
    }

    inputSearch.value =''
    creaButtonIcon(query)
  updateRendering()
    fetchGif(query)
    

})



const creaButtonIcon = (val) =>{

  
        const button = document.createElement('button');
        button.className = 'suggerito';
        button.innerText = val;
        button.title = `${val}`
        
        const icon = document.createElement('i');
        icon.className = "bi bi-x-lg";
        icon.id = val;
        icon.title='elimina'

        // **Evento di click sul pulsante (Fetch)**
        button.addEventListener('click', (e) => {
            if (e.target.tagName !== "I") { // Evita che il click sull'icona attivi la fetch
                fetchGif(val);
                
            }
        });

        // **Evento di click sull'icona (Elimina pulsante e GIF)**
        icon.addEventListener('click', (e) => {
            e.stopPropagation(); // Blocca la propagazione del click
            example = example.filter(el => el !== val); // Rimuove dall'array
            button.remove(); // Rimuove il pulsante
            removeGif(val); // Rimuove le GIF collegate
            updateRendering(); // Aggiorna il DOM
        });

        button.appendChild(icon);
        consigliati.appendChild(button);
    

}
    
 
example.forEach(item=>creaButtonIcon(item))

// **Elemento per il messaggio**
const message = document.createElement("p");
message.innerText = "Nessun suggerimento disponibile";
message.style.display = "none"; // Nascondi inizialmente
message.classList.add("no-suggestions"); // Classe per styling
consigliati.appendChild(message);



// **Funzione per aggiornare il rendering**
const updateRendering = () => {
    if (document.querySelectorAll('.suggerito').length === 0) {
        message.style.display = "block"; // Mostra il messaggio
    } else {
        message.style.display = "none"; // Nasconde il messaggio
    }
};

// **Funzione per creare i pulsanti suggeriti**
const renderButtons = () => {
   
    consigliati.appendChild(message); // Mantieni il messaggio dentro

   

    updateRendering(); // Controlla se ci sono suggerimenti
};




// key beta
const key = 'ibWiB8jG18wlKupB1kU6iPxmh0ns4kFU'
// **Funzione per chiamare l'API e ottenere le GIF**

const fetchGif = async (query) => {
  
    try {
       
        // Pulisce i risultati precedenti
      
      
  
   
            const response = await axios.get("/.netlify/functions/fetchApi");
            const res = response.data;
            const gifs = res.data;
            
           // Nasconde il loader
    
         
            if (gifs.length === 0) {
               alert( `<p>Nessuna GIF trovata per "${query}".</p>`);
                return;
            }
          
            creaCard(gifs, query);
            shuffleDivs(resultContainer)
    // Ritardo di 1.5 secondi per mostrare il loading


    } catch (err) {
        console.error("Errore nella richiesta API:", err);
        loader.style.display = "none"; // Nasconde il loader in caso di errore
        resultContainer.innerHTML = "<p>Errore nel caricamento delle GIF.</p>";
    }
};

// **Funzione per rimuovere tutte le card legate alla query**
const removeGif = (query) => {
    document.querySelectorAll(`.card[data-query="${query}"]`).forEach(card => card.remove());
};

// **Funzione per creare le card delle GIF**
const creaCard = (arr, query) => {
    arr.forEach(item => {
        const div = document.createElement('div');
        div.className = 'card';
        div.style.width = "12rem";
        div.style.height = "12rem";
        div.dataset.query = query; // Aggiungiamo il dataset per identificare la card

        const img = document.createElement('img');
        img.src = item.images.original.url;
        img.classList.add("gif");

        div.appendChild(img);
        resultContainer.appendChild(div);
    });
};



const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elementi
    }
};


const shuffleDivs = (container) => {
    const elements = Array.from(container.children);
    shuffleArray(elements); // Applica lo shuffle all'array di elementi

    // Riordina gli elementi nel DOM
    elements.forEach(el => container.appendChild(el));
};


// **Chiama renderButtons per inizializzare i suggerimenti**
renderButtons();
