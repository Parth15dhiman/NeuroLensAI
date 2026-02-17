chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "SEND_FRAME") {
        // DataURL (Base64) ko Blob mein badalna
        fetch(message.data)
            .then(res => res.blob())
            .then(blob => {
                const formData = new FormData();
                formData.append('file', blob, 'frame.jpg');

                return fetch('http://localhost:8080/api/frames/upload', {
                    method: 'POST',
                    body: formData,
                    mode: 'cors'
                });
            })
            .then(response => response.text())
            .then(result => console.log("🚀 Success from Java:", result))
            .catch(error => console.error("❌ Java Backend Error:", error));
        
        return true; // Asynchronous response ke liye zaroori hai
    }
});