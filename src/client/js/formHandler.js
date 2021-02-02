// function handleSubmit(event) {
//     event.preventDefault()

//     // check what text was put into the form field
//     let formText = document.getElementById('name').value
//     Client.checkForName(formText)

//     console.log("::: Form Submitted :::")
//     fetch('http://localhost:8081/test')
//     .then(res => res.json())
//     .then(function(res) {
//         document.getElementById('results').innerHTML = res.message
//     })


const handleSubmit = async (event) => {
    event.preventDefault()
    let formText = document.getElementById('name').value

    const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?key='
 
    const textURI = '&lang=en&of=json&txt=' + encodeURI(formText)

    const apiKey = await Client.getKey()
    
    const resObj = await Client.getCloud(baseURL, apiKey, textURI)

    console.log(resObj);
   const polarity = await Client.polarityGet(resObj.score_tag)
   
   Client.updateUI(polarity, resObj.agreement, resObj.subjectivity, resObj.confidence, resObj.irony)
}

export { handleSubmit }


const getCloud = async (baseURL, key, text) => {
    const response = await fetch(baseURL + key + text);
    try {
        const allData = await response.json()
        return allData;
        console.log(allData);
    } catch (error) {
        console.log("ERROR in API call: ", error)
    }
}

export { getCloud }

const getKey = async () => {
    const response = await fetch('http://localhost:8081/key');
    try {
        const key = await response.text()
        console.log('Key from keyGetter: ' + key);
        return key
    } catch (error) {
        console.log("ERROR in GET: ", error)
    }
}

export { getKey }

const polarityGet = async (polarity) => {
    let text = ''
    switch (polarity) {
        case 'P+':
            text = 'Strongly Positive'
            break;
        case 'P':
            text = 'Fairly Positive'
            break;
        case 'NEU':
            text = 'Neutral'
            break;
        case 'N':
            text = 'Negative'
            break;
        case 'N+':
            text = 'Strongly Negative'
            break;
        case 'NONE':
            text = 'Without Sentiment'
            break;
        default:
            text = "No sentiment found..."
    }
    return text;
}

export { polarityGet }

function updateUI(score_tag, agreement, subjectivity, confidence, irony) {
    //Clear UI
    const results = document.getElementById("results");
    results.innerHTML = "";
    results.style.display = "block";
  
    let resultsHTML;
    if (results) {
      resultsHTML = `
                  <div>
                  <h1>MeaningCloud analysis show that:</h1>
                  <p><span>Polarity: ${score_tag.toLowerCase()}</span></p>
                  <p><span>Confidence: ${confidence.toLowerCase()}%</span></p>
                  <p><span>Agree or Disagree: ${agreement.toLowerCase()}</span></p>
                  <p><span>Subjectivity: ${subjectivity.toLowerCase()}</span></p>
                  <p><span>Irony: ${irony.toLowerCase()}</span></p>
                  </div>`
    }
  
    //add resultsHTML to DOM
    results.insertAdjacentHTML("beforeend", resultsHTML);
  }
  
  export { updateUI };