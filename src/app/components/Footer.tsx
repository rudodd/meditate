// import components
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Fab from '@mui/material/Fab';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import PauseIcon from '@mui/icons-material/Pause';

interface ComponentProps {
  isActive: boolean;
  isPaused: boolean;
  play: () => void;
  stop: () => void;
  pause: () => void;
}

export default function Footer(props: ComponentProps) {
  const { isActive, isPaused, play, stop, pause } = props;

  return (
    <AppBar 
      position="fixed" 
      color="primary" 
      sx={{ top: 'auto', bottom: 0 }} 
      className="footer-bar"
    >
    <Toolbar className="controller-contianer">
      {isActive ? (
          <>
            {isPaused ? (
              <Fab aria-label="play" className="state-button play">
                <PlayArrowIcon onClick={() => play()} />
              </Fab>
            ) : (
              <Fab aria-label="pause" className="state-button pause">
                <PauseIcon onClick={() => pause()} />
              </Fab>
            )}
            <Fab aria-label="stop" className="state-button stop">
              <StopIcon onClick={() => stop()} />
            </Fab>
          </>
        ) : (
          <Fab aria-label="play" className="state-button play">
            <PlayArrowIcon onClick={() => play()} />
          </Fab>
        )}
    </Toolbar>
  </AppBar>
  )
}