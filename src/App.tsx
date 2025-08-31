import "./App.css";
import Game from "./components/Game";
import {Routes , Route , BrowserRouter} from "react-router-dom"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/onBoardGame" element={<Game />}/>
          <Route path="/onBoardTime" element={<OnBoardChooseTime />}/>
        </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;
