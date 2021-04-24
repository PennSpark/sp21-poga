import React from "react";
import './Leaderboard.css';

const exampleData = [
  { id: 1, name: "jim", score: 50.00 },
  { id: 2, name: "charlie", score: 100 },
  { id: 3, name: "patrick", score: 25.00 }
]



function Leaderboard() {
  exampleData.sort((a, b) => b.score - a.score)

  return (
    <div id="container">
      <div id="board-title">
        <h1>Welcome, User</h1>
      </div>
      <div id="table">
        <table>
          <tr id="header-row">
            <th> Name </th>
            <th> Ranking</th>
            <th> Score </th>
          </tr>
          {exampleData.map((item, index) => (
              <tr className="data-row">
                <td className="user-name"> {item.name} </td>
                <td className="ranking"> {index} </td>
                <td className="score"> {item.score} </td>
              </tr>
            )
          )}
          <tr>
          </tr>

        </table>
      </div>
    </div>
  );
}


export default Leaderboard;