const memeTitle = document.querySelector('.meme-title');
const memeImage = document.getElementById('meme-image');
const memeAuthor = document.querySelector('.meme-author');
const url = "https://meme-api.com/gimme";
const websiteUrl = "https://example.com"; // Replace with your actual website URL

// Function to fetch and display a new meme
const getMeme = () => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            memeAuthor.textContent = data.author || "Unknown Author";
            memeImage.src = data.url || "https://via.placeholder.com/400x400?text=Image+Not+Available";
        })
        .catch(error => {
            memeAuthor.textContent = "Error loading author";
            memeImage.src = "https://via.placeholder.com/400x400?text=Error+Loading+Image";
            console.error("Error fetching meme:", error);
        });
};

// Function to share the meme with a pre-filled message
const shareMeme = () => {
    const author = memeAuthor.textContent;
    const imageUrl = memeImage.src;
    const shareText = `Check out this meme by ${author}. Get more memes like this at ${websiteUrl}`;
    
    if (navigator.share) {
        navigator.share({
            title: "Meme Generator",
            text: shareText,
            url: imageUrl
        }).catch((error) => console.error("Error sharing:", error));
    } else {
        // Fallback for unsupported browsers
        alert("Share feature not supported. Copy and share the link manually:\n" + shareText);
    }
};

// Initial meme load
getMeme();
