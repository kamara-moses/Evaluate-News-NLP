function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let formText = document.getElementById("url").value;

  if (Client.checkForURL(formText)) {
    console.log("::: Form Submitted :::");

    postData("http://localhost:8081/api", { url: formText }).then(function (
      res
    ) {
      //Clear UI
      const results = document.getElementById("results");
      results.innerHTML = "";
      results.style.display = "block";

      let resultsHTML;
      if (results) {
        resultsHTML = `
                  <div>
                  <h1>MeaningCloud analysis show that:</h1>
                  <p><span>Polarity: ${polarityGet(res.score_tag)}</span></p>
                  <p><span>Confidence: ${res.confidence}%</span></p>
                  <p><span>Agree or Disagree: ${res.agreement}</span></p>
                  <p><span>Subjectivity: ${res.subjectivity}</span></p>
                  <p><span>Irony: ${res.irony}</span></p>
                  </div>`;
      }
      //add resultsHTML to DOM
      results.insertAdjacentHTML("beforeend", resultsHTML);
    });
  } else {
    alert("Seems like an invalid URL, please try with a valid URL.");
  }
}

const postData = async (url = "", data = {}) => {
  console.log(data);
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    console.log("Data received:", newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

const polarityGet = (polarity) => {
  let text = "";
  switch (polarity) {
    case "P+":
      text = "Strongly Positive";
      break;
    case "P":
      text = "Fairly Positive";
      break;
    case "NEU":
      text = "Neutral";
      break;
    case "N":
      text = "Negative";
      break;
    case "N+":
      text = "Strongly Negative";
      break;
    case "NONE":
      text = "Without Sentiment";
      break;
    default:
      text = "No sentiment found...";
  }
  return text;
};

export { handleSubmit, polarityGet };
