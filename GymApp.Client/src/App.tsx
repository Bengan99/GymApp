import { BrowserRouter, Routes, Route } from "react-router-dom";
import MembersPage from "./pages/MembersPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/members" element={<MembersPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;