import { useContext } from "react";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const Player = () => {
  const {
    seekBar,
    seekBg,
    play,
    pause,
    playerStatus,
    time,
    track,
    next,
    prev,
    seekSong
  } = useContext(PlayerContext);

  return (
    <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
      <div className="hidden lg:flex items-center gap-4">
        <img className="w-12" src={track.image} />
        <div>
          <p>{track.name}</p>
          <p>{track.desc.slice(0, 12)}</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1 m-auto">
        <div className="flex gap-4">
          <img className="w-5 cursor-pointer" src={assets.shuffle_icon} />
          <img
            className="w-5 cursor-pointer"
            src={assets.prev_icon}
            onClick={prev}
          />
          <img
            className="w-5 cursor-pointer"
            src={playerStatus ? assets.pause_icon : assets.play_icon}
            onClick={playerStatus ? pause : play}
          />
          <img
            className="w-5 cursor-pointer"
            src={assets.next_icon}
            onClick={next}
          />
          <img className="w-5 cursor-pointer" src={assets.loop_icon} />
        </div>
        <div className="flex items-center gap-5 mt-3">
          <p>
            {String(time.currentTime.minute).padStart(2, "0")}:
            {String(time.currentTime.second).padStart(2, "0")}
          </p>
          <div
            ref={seekBg}
            className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer"
            onClick={(e) => seekSong(e)}
          >
            <hr
              ref={seekBar}
              className="h-1 border-none w-[0%] bg-green-500 rounded-full"
            />
          </div>
          <p>
            {String(time.totalTime.minute).padStart(2, "0")}:
            {String(time.totalTime.second).padStart(2, "0")}
          </p>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-2 opacity-75">
        <img className="w-4" src={assets.plays_icon} />
        <img className="w-4" src={assets.mic_icon} />
        <img className="w-4" src={assets.queue_icon} />
        <img className="w-4" src={assets.speaker_icon} />
        <img className="w-4" src={assets.volume_icon} />
        <div className="w-20 bg-slate-50 h-1 rounded" />
        <img className="w-4" src={assets.mini_player_icon} />
        <img className="w-4" src={assets.zoom_icon} />
      </div>
    </div>
  );
};

export default Player;
