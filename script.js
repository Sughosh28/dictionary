const form = document.getElementById("dictionary-form");
const result = document.getElementById("result")
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const userInputWord = document.getElementById("word").value

    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${userInputWord}`

    await fetch(url)
        .then(response => {
            if (!response.ok) {
                alert("Some error occurred")
            }
            return response.json();
        })
        .then(data => {
            result.innerHTML = '';
            const meanings = data[0].meanings

            meanings.forEach(meaning => {

                const partsOfSpeech = document.createElement('h3');
                partsOfSpeech.textContent = `Parts of Speech: ${meaning.partOfSpeech.toUpperCase()}`;
                partsOfSpeech.classList.add('parts-of-speech');
                result.appendChild(partsOfSpeech);

                const definitions = document.createElement('ul');
                definitions.classList.add('definitions-list');
                meaning.definitions.forEach(def => {
                    const definition = document.createElement('li');
                    definition.textContent = `Definition: ${def.definition}`;
                    definition.classList.add('definition-item');
                    definitions.appendChild(definition);
                });
                result.appendChild(definitions);

                if (meaning.synonyms.length > 0) {
                    const synonym = document.createElement('h3');
                    synonym.textContent = `Synonyms: ${meaning.synonyms.join(", ")} `;
                    synonym.classList.add('synonym-style');
                    result.appendChild(synonym);
                }

                if (meaning.antonyms.length > 0) {
                    const antonym = document.createElement('h3');
                    antonym.textContent = `Antonyms: ${meaning.antonyms.join(", ")} `;
                    antonym.classList.add('antonym-style');
                    result.appendChild(antonym);
                }

            });
            
            const phonetics = data[0].phonetics;

            phonetics.forEach((phonetic) => {
                if (phonetic.audio) {
                    const audioElement = document.createElement("audio");
                    audioElement.controls = true;
                    audioElement.src = phonetic.audio;

                    const audioText = document.createElement("p");
                    audioText.classList.add("audio-text")
                    audioText.textContent = "Pronunciation Audio:";
                    result.appendChild(audioText);
                    result.appendChild(audioElement);
                }

                if (phonetic.sourceUrl) {
                    const sourceLink = document.createElement("a");
                    sourceLink.href = phonetic.sourceUrl;
                    sourceLink.target = "_blank";
                    sourceLink.textContent = "Source URL";
                    sourceLink.classList.add("source-link");
                    result.appendChild(sourceLink);
                }
            });
        });
});


