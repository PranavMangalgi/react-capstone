import React, { useState, useMemo, useEffect } from "react";
import styles from "../dashboard.module.css";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import up from "../../../assets/up-vector.png";
import down from "../../../assets/down-vector.png";
import beep from "../../../assets/beep-02.mp3";
function Timer() {
  const [start, setStart] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const time = useMemo(() => {
    return hours * 3600 + minutes * 60 + seconds;
  }, [hours, minutes, seconds]);

  return (
    <div className={styles.timer}>
      <div>
        <CountdownCircleTimer
          key={time}
          className={styles.countdownTimer}
          isPlaying={start}
          isPlayingReverse={true}
          duration={start ? time : 0}
          colors={"#FF6A6A"}
          rotation="counterclockwise"
          trailColor="transparent"
          onComplete={() => {
            const beepsound = new Audio(beep);
            (() => {
              let count = 0;
              const intervalId = setInterval(() => {
                beepsound.play();
                count++;
                if (count > 2) {
                  setHours(0);
                  setMinutes(0);
                  setSeconds(0);
                  setStart(false);
                  clearInterval(intervalId);
                }
              }, 1000);
            })();
          }}
        >
          {({ remainingTime }) => {
            const hours = String(Math.floor(remainingTime / 3600)).padStart(
              2,
              "0"
            );
            const minutes = String(
              Math.floor((remainingTime % 3600) / 60)
            ).padStart(2, "0");
            const seconds = String(remainingTime % 60).padStart(2, "0");

            return `${hours}:${minutes}:${seconds}`;
          }}
        </CountdownCircleTimer>
      </div>
      <div>
        <div className={styles.setTimer}>
          <div className={styles.time}>
            <div>hours</div>
            <div onClick={() => setHours((prev) => prev + 1)}>
              <img src={up} alt="" />
            </div>
            <div>{String(hours).padStart(2, "0")}</div>
            <div
              onClick={() => {
                if (hours > 0) setHours((prev) => prev - 1);
              }}
            >
              <img src={down} alt="" />
            </div>
          </div>
          <div className={styles.time}>
            <div>minutes</div>
            <div onClick={() => setMinutes((prev) => prev + 1)}>
              <img src={up} alt="" />
            </div>
            <div>{String(minutes).padStart(2, "0")}</div>
            <div
              onClick={() => {
                if (minutes > 0) setMinutes((prev) => prev - 1);
              }}
            >
              <img src={down} alt="" />
            </div>
          </div>
          <div className={styles.time}>
            <div>seconds</div>
            <div onClick={() => setSeconds((prev) => prev + 1)}>
              <img src={up} alt="" />
            </div>
            <div>{String(seconds).padStart(2, "0")}</div>
            <div
              onClick={() => {
                if (seconds > 0) setSeconds((prev) => prev - 1);
              }}
            >
              <img src={down} alt="" />
            </div>
          </div>
        </div>
        <div>
          <button
            onClick={() => {
              if (start) {
                setHours(0);
                setMinutes(0);
                setSeconds(0);
              }
              setStart((prev) => !prev);
            }}
          >
            {start ? "Stop" : "Start"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Timer;
