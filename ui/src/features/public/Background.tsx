import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

import './background.css';

export const Background = () => {
  const particlesInit = async (main: any) => {
    await loadFull(main);
  };

  return (
    <Particles
      className="particles-background"
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: {
            value: "rgb(18, 18, 18)",
          },
        },
        fullScreen: true,
        fpsLimit: 120,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "slow",
            },
            resize: true,
          },
          modes: {
            bounce: {
              distance: 100,
            },
          },
        },
        particles: {
          color: {
            value: "#eee",
          },
          links: {
            color: "#555",
            distance: 150,
            enable: true,
            opacity: 0.3,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.2,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
      }}
    />
  );
};
