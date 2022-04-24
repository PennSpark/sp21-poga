import { useEffect, useState } from 'react';
import Clock from './Clock';
import { Button } from '../../components/Button';
import TF from './TF';
import './ClassifyAll.css';
import React from 'react';

import Grid from '@material-ui/core/Grid';
import Lottie from 'lottie-react';
import Evolution1 from '../../images/animations/evolution1.json'
import Failure from '../../images/animations/failure.json'


const style = {
  height: 300,
  width: 360,
  margin:0
};

const plantAnimation = (success) => {
  if (success) {
      return <Lottie
          animationData={Evolution1}
          style={style}
      />
  } else {
      return <Lottie
          animationData={Failure}
          style={style}
      />
  }
};

function ClassifyAll({ type, level }) {
  const [starting, Setstarting] = useState(false);
  const [modelloading, Setmodelloading] = useState(false);
  const [doingright, Setdoingright] = useState(false);
  const [classifying, Setclassifying] = useState(false);
  const [completed, Setcompleted] = useState(false);
  const [next, Setnext] = useState(false);
  const levelis = type !=='practice'? level : 1;
  const levels = [
		"tadasana",
		"vrikshasana",
		"Kursiasana",
		"Virabhadrasana"
	];
  const youtubeUrl = [
		"https://youtu.be/2HTvZp5rPrg",
		"https://youtu.be/Dic293YNJI8",
		"https://youtu.be/4xyTmX_OMiM",
		"https://youtu.be/fiOXtyjQzY8",
	];
  const IntialCompleted = () => {
    Setclassifying(true);
  };
  const pause = () => {
    return !doingright;
  };
  const whatdoing = () => {
    return doingright;
  };

  const Finished = () => {
     if(type!=="practice")
    Setcompleted(true);
    Setclassifying(false);
  };

  const Startbutton = () => {
    if (!starting && !classifying && !completed) {
      return (
        <div className='startBtn'>
          <Button
          buttonStyle='btn--outline'
          onClick={() => Setstarting(true)}
          >
          START
          </Button>
        </div>
      );
    } else if (starting && !classifying && !completed) {
      return (
        <div class="clockStuff">
          <span>
            Starting in
          </span>
          <Clock total={5} pause={() => false} onComplete={IntialCompleted} />
        </div>
      );
    } else if (starting && classifying && !completed) {
      return (
				<div className="clockStuff">
          <Clock total={10} pause={pause} onComplete={Finished} />
					<span className="clockEncouragement">
						{doingright ? "Doing Great!" : <p>Oh No!<br/>You're making your plant buddy sad 😞</p>}
					</span>
				</div>
			);
    } else if (completed && !next) {
        return(
            <div>
                You did it!
            </div>
        )
    } else if (next) {
      return (
        <div>
        </div>
      );
    } else {
      return null;
    }
  };
  useEffect(() => {}, []);
  const Modelcheck = (val) => {
    Setdoingright(val);
  };
  const Classifying = () => {
    return classifying;
  };
  return (
		<div
			className="flex flex-col w-full h-full bg-primary-light overflow-hidden overflow-y-hidden classify"
			style={{ minHeight: "91vh" }}
		>
			{modelloading && (
				<div
					className="absolute w-full bg-primary-light z-50 overflow-hidden "
					style={{ height: "90vh" }}
				>
					<div className="flex flex-col justify-center items-center h-full">
						<span className="text-base font-jost ">
							If taking more time than might be you have blocked the camera
							access!
						</span>
					</div>
				</div>
			)}
			 <div className=" w-full h-full lg:flex">
        <Grid container spacing={10}>
          <Grid item xs={4}>
            <div class="instructionClock">
              Perform {levels[0]}!
            </div>
            <img
            src="tadasana.png"
            alt="Mountain"
            class="pose"
                />
          </Grid>
          <Grid item xs={4}>
            <TF
              Setmodelloading={Setmodelloading}
              Setdoingright={Modelcheck}
              Classifying={Classifying}
                          whatdoing={whatdoing}
                          asana={levels[0]}
            />
          </Grid>
          <Grid item xs={4}>
            <div className="instructionClock"/>
            {starting && !completed}
                <Startbutton />
            
            {doingright ? plantAnimation(true) : plantAnimation(false)}
          </Grid>

            

        </Grid>
				
			</div>
		</div>
	);
}

export default ClassifyAll;