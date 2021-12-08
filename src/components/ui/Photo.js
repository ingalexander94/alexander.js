import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useInterval } from "../../hooks/useInterval";

export const Photo = () => {
  // Hooks
  const { skills } = useSelector((state) => state.about);
  const [index, setIndex] = useState(0);
  const [src, setSrc] = useState(
    "https://res.cloudinary.com/dnydtcolh/image/upload/v1610916589/icon/l2736cjfirzqifym3msd.svg"
  );

  useInterval(() => {
    setIndex((index) => (index < skills.length - 1 ? index + 1 : 0));
  }, 4000);

  useEffect(() => {
    skills.length && setSrc(skills[index].photo);
  }, [index, skills]);

  return (
    <div className="user-photo">
      <figure className="animate__animated animate__bounceIn">
        <img src={src} alt="Foto de alexander" />
      </figure>
      <div className="social">
        <a
          className="button"
          href="https://codepen.io/ing_alexander94"
          rel="noreferrer"
          target="_blank"
        >
          <i className="fab fa-codepen"></i>
        </a>
        <a
          className="button"
          href="https://github.com/ingalexander94?tab=repositories"
          rel="noreferrer"
          target="_blank"
        >
          <i className="fab fa-github"></i>
        </a>
        <a
          className="button"
          href="https://linkedin.com/in/alexander-peñaloza-2944a012a"
          rel="noreferrer"
          target="_blank"
        >
          <i className="fab fa-linkedin"></i>
        </a>
      </div>
    </div>
  );
};
