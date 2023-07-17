const button = document.getElementById("button");
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const query = document.getElementById("query");
const result = document.getElementById("result");
const option = document.getElementById("myOptions");
let arr = [];

button.onclick = () => {
    if (!query.value) {
        result.innerHTML = `
        <div class="no_input">
        Please enter a word
        </div>
        `;
        setTimeout(() => {
            result.innerHTML = '';
        }, 2000);
        return;
    }

    arr = [query.value];

    localStorage.setItem(`${query.value}`, `${query.value}`)

    option.innerHTML += `
    <option value="${arr[0]}">
    `;
    fetch(`${url}${query.value}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            result.innerHTML = `
            <div class="word">
            <h3>${query.value}</h3>
        </div>  
        <div class="details">
            <p class="speech" >${data[0].meanings[0].partOfSpeech || ""}</p>
            <p class="phonetic">${data[0].phonetic || ""}</p>
        </div>
        <p class="word-meaning">
        ${data[0].meanings[0].definitions[0].definition || ""}
        </p>
        <p class="word-example">
        ${data[0].meanings[0].definitions[0].example || ""}
        </p>                  
        `;

        })
        .catch(() => {
            result.innerText = `
            No Definitions Found          
            `;
            setTimeout(() => {
            result.innerText = '';    
            }, 2000);
            
        })

};