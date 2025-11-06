import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import BattlePage from "./pages/BattlePage/BattlePage.jsx";
import {StatsPage} from "./pages/StatsPage/StatsPage.jsx";
import Navigation from "./components/Navigation/Navigation.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<BattlePage />} />
            <Route path="/stats" element={<StatsPage />} />
          </Routes>
      </BrowserRouter>
  </React.StrictMode>,
)

