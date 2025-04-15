// import library functionality
import { styled } from '@mui/material/styles';

// import components
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Fab from '@mui/material/Fab';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import PauseIcon from '@mui/icons-material/Pause';

interface FooterProps {
  isActive: boolean;
  isPaused: boolean;
  play: () => void;
  stop: () => void;
  pause: () => void;
}

export default function Footer(props: FooterProps) {
  const { isActive, isPaused, play, stop, pause } = props;

  return (
    <AppBar 
      position="fixed" 
      color="primary" 
      sx={{ top: 'auto', bottom: 0 }} 
      className="footer-bar"
    >
    <Toolbar>
      <div className="controller-contianer">
        {isActive ? (
            <>
              {isPaused ? (
                <Fab color="secondary" aria-label="add" className="state-button play">
                  <PlayArrowIcon onClick={() => play()} />
                </Fab>
              ) : (
                <Fab color="secondary" aria-label="add" className="state-button pause">
                  <PauseIcon onClick={() => pause()} />
                </Fab>
              )}
              <Fab color="secondary" aria-label="add" className="state-button stop">
                <StopIcon onClick={() => stop()} />
              </Fab>
            </>
          ) : (
            <Fab color="secondary" aria-label="add" className="state-button play">
              <PlayArrowIcon onClick={() => play()} />
            </Fab>
          )}
      </div>
    </Toolbar>
  </AppBar>
  )
}