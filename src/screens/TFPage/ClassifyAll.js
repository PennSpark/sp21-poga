import { useEffect, useState } from 'react';
import Clock from './Clock';
import { Button } from '../../components/Button';
import TF from './TF';
import './ClassifyAll.css';

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
        <div>
          <span className='text-xl text-primary font-bold text-jost'>
            Starting in
          </span>
          <Clock total={5} pause={() => false} onComplete={IntialCompleted} />
        </div>
      );
    } else if (starting && classifying && !completed) {
      return (
				<div className="clockStuff">
          {/* <img
            src="mountainpose.png"
            alt="Mountain"
                /> */}
                    <Clock total={10} pause={pause} onComplete={Finished} />
					<span className="clockEncouragement">
						{doingright ? "Doing Great" : "Oh No! You're making your plant buddy sad!"}
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
			className="flex flex-col w-full h-full bg-primary-light overflow-hidden overflow-y-hidden"
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
				<div className="w-full  h-full lg:w-1/2 ">
					<TF
						Setmodelloading={Setmodelloading}
						Setdoingright={Modelcheck}
						Classifying={Classifying}
                        whatdoing={whatdoing}
                        asana={levels[0]}
					/>
				</div>
				<div className="w-full lg:w-1/2 h-full relative  ">
					<div className="instructionClock">
						Perform {levels[0]}!
					</div>
					<div className="  flex justify-center items-center ">
						<a
							className="text-2xl font-jost text-secondary-dark font-bold uppercase mt-1 flex"
							href={youtubeUrl[levelis - 1]}
							target="_blank"
							rel="noreferrer"
						>
							{/* <img
								src="mountainpose.png"
								alt="Mountain"
							/> */}
							{levels[levelis - 1]}
						</a>
					</div>
					<div className="  flex justify-center items-center ">
            
					</div>

					{starting && !completed}
					<div className="flex justify-center w-full">
						<Startbutton />
					</div>
				</div>
			</div>
		</div>
	);
}

export default ClassifyAll;