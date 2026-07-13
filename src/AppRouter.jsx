import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import LightPortfolio from "./components/light/LightPortfolio";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/pro/*" element={<LightPortfolio />} />
      <Route path="/*" element={<App />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
