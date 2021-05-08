
import '../../style/Leaderboard.css';
import defaultProfile from '../../images/default-profile.png';
import firebase from "firebase/app";
import "firebase/auth";
import config from '../SignUpPage/config';
import { IfFirebaseAuthed, IfFirebaseUnAuthed, FirebaseAuthProvider } from "@react-firebase/auth";
import React,{useState,useEffect} from 'react';

const exampleData = [
  { id: 1, picture: defaultProfile, name: "jim", score: 50.00 },
  { id: 2, picture: defaultProfile, name: "charlie", score: 100 },
  { id: 3, picture: defaultProfile, name: "patrick", score: 25.00 }
]


function Leaderboard() {
  var realData = [];
  var db = firebase.firestore();
  exampleData.sort((a, b) => b.score - a.score);
  const [user,setUser]=useState([])
  const fetchUser=async()=>{
    const response=db.collection('user');
    const data=await response.get();
    data.docs.forEach(item=>{
     setUser(user => [...user, {name: item.data().name, score: item.data().score, picture: defaultProfile}]);
     console.log(item.data().score);

     
    })
  }
  useEffect(() => {
    fetchUser();
  }, [])
  user.sort((a, b) => b.score - a.score);
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
            
            {user.map((item, index) => (
              <tr className="data-row">
                <td className="ranking"> {index + 1} <img src={item.picture} alt="defaultPicture"
                  width="22" height="22" /> </td>
                <td className="user-name"> {item.name.split(" ")[0]}</td>
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