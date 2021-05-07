import React, { useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import * as ml5 from 'ml5';
//import { baseUrl } from '../shared/baseUrl';
import './TF.css';
import firebase from "firebase/app";
import "firebase/auth";
import config from '../SignUpPage/config';
import { IfFirebaseAuthed, IfFirebaseUnAuthed, FirebaseAuthProvider } from "@react-firebase/auth";

const db = firebase.database;

        // var user = firebase.auth().currentUser;
        // if (user != null) {
        //   var uid = user.uid;
        //   var db = firebase.firestore();
        //   db.collection("user").doc(uid).update({
        //     score: current score int value here
        // });
        // }
function TF({
	Setmodelloading,
	Setdoingright,
	Classifying,
	whatdoing,
    asana
}) {
	const webcamRef = useRef(null);
	const canvasRef = useRef(null);
	const poseNet = useRef(null);
	const brain = useRef(null);

	const options = {
		inputs: 34,
		outputs: ["label"],
		task: "classification",
		debug: true,
	};

	const modelInfo = {
		model: 'model.json',
		metadata: 'modelmeta.json',
		weights: 'modelweight.bin',
	};

	const detect = () => {
		poseNet.current = ml5.poseNet(webcamRef.current.video, () => {
			console.log("Model Loaded");
			brain.current.load(modelInfo, () => {
				console.log("pose classification ready!");
			});
            console.log(brain.current);

			const videoWidth = webcamRef.current.video.videoWidth;
			const videoHeight = webcamRef.current.video.videoHeight;

			// Set video width
			webcamRef.current.video.width = videoWidth;
			webcamRef.current.video.height = videoHeight;
			canvasRef.current.width = videoWidth;
			canvasRef.current.height = videoHeight;
			poseNet.current.on("pose", (poses) => {
				if (poses.length > 0) {
					if (Classifying()) classifyPose(poses[0].pose);
					if (canvasRef.current) {
						const ctx = canvasRef.current.getContext("2d");
						ctx.clearRect(
							0,
							0,
							canvasRef.current.width,
							canvasRef.current.height
						);
						requestAnimationFrame(() => {
							drawRect(poses, ctx);
						});
					}
				}
			});
		});
	};
    const classifyPose = (pose) => {
		let inputs = [];
		for (let i = 0; i < pose.keypoints.length; i++) {
			let x = pose.keypoints[i].position.x;
			let y = pose.keypoints[i].position.y;
			inputs.push(x);
			inputs.push(y);
		}
		brain.current.classify(inputs, (error, results) => {
			console.log(results[0].confidence)
            console.log(results[0].label)
			if (error) {
				console.log(error);
				if (whatdoing()) Setdoingright(false);
			} else if (results[0].label === asana && results[0].confidence > 0.8) {
				if (!whatdoing()) Setdoingright(true);
				
			} else {
				if (whatdoing) Setdoingright(false);
			}
		});
	};
		useEffect(() => {
			brain.current = ml5.neuralNetwork(options);
		// eslint-disable-next-line react-hooks/exhaustive-deps
		}, []);
	useEffect(() => {
		detect();
		return () => {
			poseNet.current.removeListener("pose", (err) => {
				console.log("Removed");
			});
		};
	
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [Classifying()]);
	return (
		<>
			<div className="">
				<div className="relative">
					<Webcam ref={webcamRef} muted={true} className="webcam" 
          style= {{
            position: "absolute", 
            marginLeft:"auto", 
            marginRight:"auto", 
            left:0, 
            right:0, 
            down: 300,
            textAlign:"center", 
            zIndex:9, 
            width:640, 
            height:480}} />
					<canvas ref={canvasRef} className="canvas" 
          style= {{
            position: "absolute", 
            marginLeft:"auto", 
            marginRight:"auto", 
            left:0, 
            right:0, 
            textAlign:"center", 
            zIndex:9, 
            width:640, 
            height:480}}/>
				</div>
			</div>
		</>
	);
}

const drawRect = (poses, ctx) => {
  // ctx.drawImage(webcamRef.current.video, 0, 0);
  const pose = poses[0].pose;
  const skeleton = poses[0].skeleton;
  for (let i = 0; i < pose.keypoints.length; i++) {
    let x = pose.keypoints[i].position.x;
    let y = pose.keypoints[i].position.y;
    ctx.fillStyle = '#ca7df9';
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = '#ca7df9';
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, 2 * Math.PI);
    ctx.fill();
  }
  for (let j = 0; j < poses[0].skeleton.length; j++) {
    let partA = skeleton[j][0];
    let partB = skeleton[j][1];
    ctx.beginPath();
    ctx.moveTo(partA.position.x, partA.position.y);
    ctx.lineTo(partB.position.x, partB.position.y);
    ctx.strokeStyle = '#ca7df9';

    ctx.stroke();
  }
  // ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
};

export default TF;