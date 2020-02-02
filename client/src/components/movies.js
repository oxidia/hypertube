import React from "react"
import { Popover } from 'antd';
import "./movies.css"

// const play = () => <></>



export default (props) => {

  const click = e => {
    const parent = e.currentTarget;
    const image = parent.querySelector(".thumbnail").style;
    const info = parent.querySelector(".info").style;
    const parentStyle = parent.style;

    if (parentStyle.transform === "scaleX(1.1) scaleY(1.6)") {
      parentStyle.zIndex = "0";
      parentStyle.transform = "scale(1)";
      parentStyle.transition = "none";
      image.top = "0";
      image.transform = "scale(1)";
      info.transform = "scale(1)";
      info.transform = "scale(1)";
    } else {
      parentStyle.zIndex = "1337";
      parentStyle.transform = "scaleX(1.1) scaleY(1.6)";
      parentStyle.transition = "transform .1s";
      image.top = "0";
      image.transform = "scaleY(.6875) translateY(-25%)";
      info.transform = "scaleX(0.91) scaleY(.625)";
    }
  };
  const mouseLeave = e => {
    const parent = e.currentTarget;
    const image = parent.querySelector(".thumbnail").style;
    const info = parent.querySelector(".info").style;
    const parentStyle = parent.style;

    parentStyle.zIndex = "0";
    parentStyle.transform = "scale(1)";
    parentStyle.transition = "none";
    image.top = "0";
    image.transform = "scale(1)";
    info.transform = "scale(1)";
    info.transform = "scale(1)";
  };
  const mouseEnter = e => {
    const parent = e.currentTarget.style;

    parent.zIndex = "1337";
    parent.transform = "scale(1.1)";
    // parent.transformOrigin = "bottom";
  };

  return(
    <div class="movie-container">
      {props.list.map((movie, id) => (
          <div
            key={id}
            className="movie"
            onClick={click}
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}
          >
            <div className="info">
              <span class="movie-title">{movie.title}</span>
              <span class="movie-release">{movie.year}</span>
              <span class="movie-duration">{`${Math.floor(movie.runtime/60)}h ${movie.runtime%60}min`}</span>
              {movie.genres.map((genre, id) => id < 2 && (
                <span class="movie-genre">{genre}</span>
              ))}
            </div>
            <img
              className="thumbnail"
              src={movie.images.poster}
              alt={movie.title}
              onClick={() => {}}
            />
          </div>
      ))}
    </div>
  );
};