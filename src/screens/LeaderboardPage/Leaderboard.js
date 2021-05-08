import React from "react";
import '../../style/Leaderboard.css';
import defaultProfile from '../../images/default-profile.png';

const exampleData = [
  { id: 1, picture: defaultProfile, name: "jim", score: 50.00 },
  { id: 2, picture: defaultProfile, name: "charlie", score: 100 },
  { id: 3, picture: defaultProfile, name: "patrick", score: 25.00 }
]



function Leaderboard() {
  exampleData.sort((a, b) => b.score - a.score)
  return (
    <>
      <div id="container">
        <div id="board-title">
          <h1 id="welcome-user">Welcome, User</h1>
        </div>
        <div id="table-container">
          <table id="table">
            <tr id="header-row">
              <th id="ranking-col"> Ranking</th>
              <th id="name-col"> Name </th>
              <th id="score-col"> Score </th>
            </tr>
            {exampleData.map((item, index) => (
              <tr className="data-row">
                <td className="ranking"> {index + 1}   <img src={item.picture} alt="defaultPicture"
                  width="22" height="22" /> </td>
                <td className="user-name"> {item.name} </td>
                <td className="score"> {item.score} </td>
              </tr>
            )
            )}
          </table>
        </div>
      </div>
    </>
  );
}


export default Leaderboard;