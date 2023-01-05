import * as React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <div className="">
        <div className="grid justify-items-center">
            <Typography variant="body2" color="text.primary">{`${Math.round(
          props.value,
        )}`}</Typography>
        </div>
        <div className="ml-20 mr-20 justify-center">
            <LinearProgress variant="determinate" {...props} />
        </div>
    </div>
  );
}

export default function LinearWithValueLabel() {
  const [progress, setProgress] = React.useState(100);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress <= 0 ? 100 : prevProgress - 5));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (

    <Box sx={{ width: '100%' }}>

        <LinearProgressWithLabel value={progress} />

    </Box>

  );
}