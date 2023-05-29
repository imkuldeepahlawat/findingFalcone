import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import NotFound from "./components/pagenotfound/PageNotFound";
import Home from "./components/Home/Home";
import Problem from "./components/problem/Problem";
import KudosOnFind from "./components/kudos/KudosOnFind";
import SearchFailed from "./components/searchfailed/SearchFailed";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route  path="/problem" element={<Problem />} />
        <Route  path="/kudos" element={<KudosOnFind />} />
        <Route  path="/pagenotfound" element={<NotFound />} />
        <Route  path="/failed" element={<SearchFailed />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
