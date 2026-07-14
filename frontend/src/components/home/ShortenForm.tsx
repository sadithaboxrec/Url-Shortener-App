import { useState } from "react";
import { createShortUrl } from "../../api/urls";

export default function ShortenForm() {
    const [url, setUrl] = useState("");
    const [result, setResult] = useState("");

    const handleSubmit = async () => {
        try {
            const data = await createShortUrl(url);

            setResult(data.short_url);
        } catch (err) {
            console.error(err);
            alert("Failed");
        }
    };

    return (
        <>
            <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
            />

            <button onClick={handleSubmit}>
                Shorten
            </button>

            <p>{result}</p>
        </>
    );
}