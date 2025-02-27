import { prevuser } from "./context/UserContext";

const Api_Url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBNHMtrulrcYj1MEuHrNDVKm1qgCWghw-o";



export async function generateResponse() {
    let RequestOption = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "contents": [{
                "parts": [
                    { "text": prevuser.prompt },
                    ...(prevuser.data ? [{
                        "inline_data": {
                            "mime_type": prevuser.mime_type,
                            "data": prevuser.data
                        }
                    }] : [])
                ]
            }]
        })
    };

    try {
        let response = await fetch(Api_Url, RequestOption);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error generating response:", error);
        return null; 
    }
}
