// function App() {
//   return <h1>Shortly</h1>;
// }

// export default App;

import { RouterProvider } from "react-router-dom";
import router from "./routes/AppRouter";

export default function App() {
    return <RouterProvider router={router} />;
}