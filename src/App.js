import "./App.css";
import misinformantLogo from "./assets/Misinformant.svg";
import addBtn from "./assets/add-30.png";
import msgIcon from "./assets/message.svg";
import home from "./assets/home.svg";
import saved from "./assets/bookmark.svg";
import rocket from "./assets/rocket.svg";

function App() {
  return (
    <div className="App">
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop">
            <img src={misinformantLogo} alt="Logo" className="logo" />
            <button className="midBtn">
              <img src={addBtn} alt="" className="addBtn" />
            </button>
            <div className="upperSideBottom">
              <button className="query">
                <img src={msgIcon} alt="" />
                Does bleach kill COVID-19?
              </button>
              <button className="query">
                <img src={msgIcon} alt="" />
                Who owns Greenland?
              </button>
            </div>
          </div>
        </div>
        <div className="lowerSide">
          <div className="listItems">
            <img src={home} alt="" className="listitemImg" /> Home
          </div>
          <div className="listItems">
            <img src={saved} alt="" className="listitemImg" /> Saved
          </div>
          <div className="listItems">
            <img src={rocket} alt="" className="listitemImg" /> Upgrade to pro
          </div>
        </div>
      </div>
      <div className="main">{/* Main content goes here */}</div>
    </div>
  );
}

export default App;
