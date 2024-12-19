document.addEventListener("DOMContentLoaded", () => {
    const quoteElement = document.getElementById("quote");
    const newQuoteButton = document.getElementById("new-quote");

    // Fetch a random quote from ZenQuotes API
    const fetchQuote = async () => {
        try {
            const response = await fetch('https://zenquotes.io/api/random');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            // Set the quote text
            quoteElement.textContent = `"${data[0].q}" - ${data[0].a}`;
        } catch (error) {
            console.error('Error fetching the quote:', error);
            quoteElement.textContent = "Sorry, we couldn't fetch a quote at this time.";
        }
    };

    // Event listener for button click
    newQuoteButton.addEventListener("click", fetchQuote);

    // Fetch a quote when the page loads
    fetchQuote();
});
