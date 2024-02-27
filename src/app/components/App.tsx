// import library functionality
import { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

// import custom functionality
import useTimer from '../hooks/timer';
import useMeditationRoutine from '../hooks/meditationRoutine';
import useSettings from '../hooks/useSettings';
import { Timer, SessionStatus } from '../types';

// import components
import Header from './Header';
import Footer from './Footer';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';

export default function App() {
  const { data, status } = useSession();
  const [loading, setLoading] = useState<boolean>(true);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timer: Timer = useTimer(isActive, isPaused);
  const settings = useSettings(data, status);
  const routine = useMeditationRoutine({settings, isActive, isPaused, timer});

  const playRoutine = () => {
    setIsActive(true);
  }

  const toggleRoutinePause = () => {
    setIsPaused(!isPaused)
  }

  const stopRoutine = () => {
    setIsActive(false);
    timer.reset();
  }

  useEffect(() => {
    let loadingTimeout: ReturnType<typeof setTimeout>;
    if (routine.loadingProgress === 100 && status !== SessionStatus.Loading) {
      loadingTimeout = setTimeout(() => {
        setLoading(false);
      }, 500)
    }
    if (routine.playProgress > 100) {
      stopRoutine();
    }

    return () => clearTimeout(loadingTimeout);
  }, [routine, status])

  return (
    <main>
      <Header user={data?.user} />
      {loading ? (
        <div className="loading-container blur">
          <LinearProgress variant="determinate" color="error" value={routine.loadingProgress} />
          <div className="circle-container">
            <CircularProgress className="circle" />
          </div>
          
        </div>
      ) : status === SessionStatus.LoggedOut ? (
        <Container className="content-container blur">
          <Button 
            variant="contained" 
            size="large"
            startIcon={<LoginIcon />}
            onClick={() => signIn('google')} 
          >
            Login with Google
          </Button>
        </Container>
      ) : (
        <>
          <Container className="content-container">
            <div className="content">
              <div className="timer">
                {~~(timer.time / 60) < 10 ? '0' + ~~(timer.time / 60) : ~~(timer.time / 60)}
                :
                {timer.time % 60 < 10 ? '0' + timer.time % 60 : timer.time % 60}
              </div>
              <div className="progress-bar">
                <LinearProgress variant="determinate" value={routine.playProgress} className="progress-visual" />
                <Typography variant="body2" color="text.secondary" className="progress-text">{`${Math.round(routine.playProgress)}%`}</Typography>
              </div>
              <div className="settings">
                <IconButton disabled={isActive} className="settings-button" size="large">
                  <TuneIcon />
                </IconButton>
              </div>
            </div>
          </Container>
          <Footer isActive={isActive} isPaused={isPaused} play={playRoutine} pause={toggleRoutinePause} />
        </>
      )}
    </main>
  )
}