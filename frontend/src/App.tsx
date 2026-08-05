// function App() {
//   return <h1>Shortly</h1>;
// }

// export default App;

import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import PageLoader from "@/components/common/PageLoader";
import router from "./routes/AppRouter";

export default function App() {
    return <Suspense fallback={<PageLoader />}><RouterProvider router={router} /></Suspense>;
}
