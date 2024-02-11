import React from "react";
import ConfettiParticles from "react-confetti";

interface WindowSize {
  width: number;
  height: number;
}

interface ConfettiProps {
  timer?: number; // seconds
}

const Confetti: React.FC<ConfettiProps> = ({ timer = 3000 }: ConfettiProps) => {
  const [size, setSize] = React.useState<WindowSize | undefined>();
  const [recycle, setRecycle] = React.useState<boolean>(true);
  const [show, setShow] = React.useState<boolean>(true);

  React.useEffect(() => {
    const confettiTimerId: NodeJS.Timeout = setTimeout(() => {
      setRecycle(false);
    }, timer);
    const confettiContainerTimerId: NodeJS.Timeout = setTimeout(() => {
      setShow(false);
    }, timer + 1000);

    return () => {
      clearTimeout(confettiTimerId);
      clearTimeout(confettiContainerTimerId);
    };
  }, []);

  React.useEffect(() => {
    const handleResize = () => {
      setSize({ height: window.innerHeight, width: window.innerWidth });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    show && (
      <div className="fixed top-0 bottom-0 left-0 right-0">
        <ConfettiParticles className="fixed top-0 bottom-0 left-0 right-0" width={size?.width} height={size?.height} recycle={recycle} />
      </div>
    )
  );
};

export default Confetti;
