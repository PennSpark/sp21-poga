import React, { useRef } from 'react';
import "./TF.css";
import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";
import Webcam from "react-webcam";
//import * as ml5 from 'ml5';
import {drawKeypoints, drawSkeleton} from "./utilities";

import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Grid from '@material-ui/core/Grid';


const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="timer">You did it!</div>;
    }

    //user can select session length and then there is countdown timer?
    return (
      <div className="timer"> 
        <div className="value">{Math.trunc(remainingTime / 60)}</div>
        <div className="text">minutes</div>
        <div className="value">{remainingTime % 60}</div>
        <div className="text">seconds</div>
      </div>
    );
  };
  

function TF() {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    const runPosenet = async () => {
        const net = await posenet.load({
            inputResolution:{width:640, height:480},
            scale:0.5
        });

        setInterval(() => {
            detect(net);
        }, 100);
    }

    const detect = async (net) => {
        if(typeof webcamRef.current !== "undefined" && webcamRef.current !== null && webcamRef.current.video.readyState===4) {
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;

            webcamRef.current.video.width = videoWidth; 
            webcamRef.current.video.height = videoHeight;

            const pose = await net.estimateSinglePose(video);
            console.log(pose);

            drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
        }
    };

    const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
        const ctx = canvas.current.getContext("2d");
        canvas.current.width = videoWidth;
        canvas.current.height = videoHeight;
      
        drawKeypoints(pose["keypoints"], 0.5, ctx);
        drawSkeleton(pose["keypoints"], 0.5, ctx);
      };

      runPosenet();

    return (
        <div className="TF">
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <div className="timer-wrapper">
                        <CountdownCircleTimer
                        isPlaying
                        duration={65}
                        isLinearGradient={true}
                        colors={[["#ca7df9", 0.4], ["#f896d8", 0.6]]}
                        onComplete={() => [true, 1000]}
                        >
                        {renderTime}
                        </CountdownCircleTimer>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Webcam 
                        ref={webcamRef}
                        style={{
                        position: "absolute", 
                        marginLeft:"auto", 
                        marginRight:"auto", 
                        left:0, 
                        right:0, 
                        textAlign:"center", 
                        zIndex:9, 
                        width:640, 
                        height:480}} 
                    />
                    <canvas 
                        ref={canvasRef}
                        style= {{
                        position: "absolute", 
                        marginLeft:"auto", 
                        marginRight:"auto", 
                        left:0, 
                        right:0, 
                        textAlign:"center", 
                        zIndex:9, 
                        width:640, 
                        height:480}} 
                    /> 
                </Grid>
            </Grid>
            
        </div>
    )
}

export default TF

