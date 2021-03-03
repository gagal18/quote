//declaration
const quoteContainer = document.getElementById("quote-container")
const quoteText = document.getElementById("quote")
const quoteAuthor = document.getElementById("author")
const twitterBtn = document.getElementById("twitter")
const newQuoteBtn = document.getElementById("new-quote")
const loader = document.getElementById("loader")
// show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true
}
// hide loading
function complete(){
    if(!loader.hidden){
        quoteContainer.hidden = false
        loader.hidden = true
    }
}
// get quote from api
async function getQuote() {
    loading()
    const apiUrl = 'https:/type.fit/api/quotes'
    try {
        const response = await fetch(apiUrl)
        const data = await response.json();
        var x = Math.floor(Math.random() * 1644);
        const quote = data[x].text
        const author = data[x].author
        if (author === null) {
            quoteAuthor.innerText = "Unknown author"
        } else {
            quoteAuthor.innerText = author
        }
        if (quote.length > 50) {
            quoteText.classList.add("long-quote")
        } else {
            quoteText.classList.remove("long-quote")
        }
        quoteText.innerText = quote
        //stop loader => SHOW QUOTE
        complete()
    } catch (error) {
        getQuote()
    }
}
//Tweet quote
function tweetQuote() {
    const quote = quoteText.innerText
    const author = quoteAuthor.innerText
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`
    window.open(twitterUrl, '_blank');
}
//event listener
twitterBtn.addEventListener('click', tweetQuote)
newQuoteBtn.addEventListener('click', getQuote)
//on load
getQuote();
