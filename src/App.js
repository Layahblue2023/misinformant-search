import "./App.css";
import misinformantLogo from "./assets/Misinformant.svg";
import addBtn from "./assets/add-30.png";
import msgIcon from "./assets/message.svg";
import home from "./assets/home.svg";
import saved from "./assets/bookmark.svg";
import rocket from "./assets/rocket.svg";
import sendBtn from "./assets/send.svg";
import userIcon from "./assets/user-icon.png";
import shield from "./assets/logoShield.png";

function App() {
  return (
    <div className="App">
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop">
            <img src={misinformantLogo} alt="Logo" className="logo" />
            <button className="midBtn">
              <img src={addBtn} alt="" className="addBtn" /> Create Claim
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
      <div className="main">
        {/* Main content goes here */}
        <div className="chats"></div>
        <div className="chat">
          <img className="chatImg" src={userIcon} alt="" />
          <p className="txt">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At laborum
            id fugiat quibusdam culpa repudiandae numquam, corrupti odio!
            Delectus sapiente nostrum reiciendis quibusdam, impedit provident
            nesciunt, beatae labore nulla doloribus optio incidunt accusamus
            odit nobis eius nam blanditiis modi nihil illum quos. A obcaecati
            accusamus tempore aliquid officia praesentium optio numquam, maxime
            error. Consequuntur sunt porro voluptatem assumenda?
          </p>
        </div>
        <div className="chat bot">
          <img className="chatImg" src={shield} alt="" />
          <p className="txt">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
            voluptatibus delectus eos, ab consequuntur asperiores. Inventore
            quibusdam aliquam eaque quam libero, ad voluptatem saepe nam
            accusamus nobis perspiciatis quidem molestiae ea consequatur illum
            doloremque, vel fugiat id expedita. Quae enim repellat nemo, sequi
            nihil dignissimos eos laudantium reiciendis. Vel modi molestias
            impedit nesciunt laborum deserunt eaque corrupti sed voluptate,
            labore optio! Fugit incidunt nobis modi ipsa dolorem temporibus
            ipsam a rerum ut esse accusamus explicabo iste quae ullam inventore
            provident harum at similique eligendi labore, eum ipsum est numquam!
            At eum quis possimus error, obcaecati eveniet magnam atque
            explicabo, soluta debitis amet, iusto aliquam perferendis laborum?
            Provident, laborum et unde temporibus magnam eveniet at accusantium
            eius quaerat assumenda cumque pariatur dolores minima reiciendis
            praesentium quo ullam id possimus soluta. Aperiam provident sapiente
            ex! Perspiciatis eveniet culpa non placeat! Natus nobis asperiores
            consequatur earum similique mollitia deleniti maxime nemo,
            consectetur expedita?
          </p>
        </div>
        <div className="chatFooter">
          <div className="inp">
            <input type="text" placeholder="Send Message" />{" "}
            <button className="send">
              <img src={sendBtn} alt="" />
            </button>
          </div>
        </div>
        <p>MisInformant may produce incorrect information</p>
      </div>
    </div>
  );
}

export default App;
