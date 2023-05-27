import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import NotFound from "./components/pagenotfound/PageNotFound";
import Home from "./components/Home/Home";
import Problem from "./components/problem/Problem";
import KudosOnFind from "./components/kudos/KudosOnFind";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route  path="/Problem" element={<Problem />} />
        <Route  path="/Kudos" element={<KudosOnFind />} />
        <Route  path="/PageNotFound" element={<NotFound />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
