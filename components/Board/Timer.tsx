import * as React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <>
        <div className="pl-20 pr-20 text-white text-lg animate-pulse">
        {Math.round(
          props.value / 5,)}
        </div>
        <div className="w-full">
            <LinearProgress variant="determinate" {...props} />
        </div>
    </>
  );
}

export default function LinearWithValueLabel() {
  const [progress, setProgress] = React.useState(100);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress <= 0 ? 100 : prevProgress - 4));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
        <LinearProgressWithLabel value={progress} />
  );
}
