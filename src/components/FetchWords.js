//fetch the hidden word 

async function randomWord (){
    const res = await fetch("https://random-word-api.herokuapp.com/word");
    const json = await res.json();
    return json;
}

// fetch the dictionary array from API address
async function dictionary(){
    const res = await fetch("https://random-word-api.herokuapp.com/all");
    const dictionary= await res.json();
    return dictionary;
}

export {randomWord, dictionary};
//export function components