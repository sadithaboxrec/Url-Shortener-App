// import { useState } from "react";
// import { createShortUrl } from "../../api/urls";

// export default function ShortenForm() {
//     const [url, setUrl] = useState("");
//     const [result, setResult] = useState("");

//     const handleSubmit = async () => {
//         try {
//             const data = await createShortUrl(url);

//             setResult(data.short_url);
//         } catch (err) {
//             console.error(err);
//             alert("Failed");
//         }
//     };

//     return (
//         <>
//             <input
//                 value={url}
//                 onChange={(e) => setUrl(e.target.value)}
//                 placeholder="https://example.com"
//             />

//             <button onClick={handleSubmit}>
//                 Shorten
//             </button>

//             <p>{result}</p>
//         </>
//     );
// }




import { useState } from "react";
import { useCreateUrl } from "../../hooks/useCreateUrl";

export default function ShortenForm() {
    const [url, setUrl] = useState("");

    const createUrl = useCreateUrl();

    const handleSubmit = () => {
        createUrl.mutate({
            original_url: url,
        });
    };

    return (
        <div>
            <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
            />

            <button
                onClick={handleSubmit}
                disabled={createUrl.isPending}
            >
                {createUrl.isPending
                    ? "Creating..."
                    : "Shorten URL"}
            </button>

            {createUrl.isSuccess && (
                <div>
                    <h4>Success!</h4>

                    <p>
                        Code: {createUrl.data.short_code}
                    </p>

                    <p>
                        Original:
                        {" "}
                        {createUrl.data.original_url}
                    </p>
                </div>
            )}

            {createUrl.isError && (
                <p>Failed to create URL.</p>
            )}
        </div>
    );
}