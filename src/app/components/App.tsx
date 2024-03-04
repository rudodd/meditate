// import library functionality
import { useEffect, useState } from 'react';
import { signIn, getSession} from 'next-auth/react';
import axios, { AxiosResponse } from 'axios';

// import custom functionality
import useTimer from '../hooks/timer';
import useMeditationRoutine from '../hooks/meditationRoutine';
import useSettings from '../hooks/useSettings';
import { Timer, SessionStatus, RoutineSettings, GoogleUser } from '../types';

// import components
import Header from './Header';
import Footer from './Footer';
import Settings from './Settings';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';

export default function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const timer: Timer = useTimer(isActive, isPaused);
  const [user, setUser] = useState<GoogleUser | null>(null);
  const { id, settings, fetchSettings } = useSettings(user);
  const routine = useMeditationRoutine({settings, isActive, isPaused, timer});

  const playRoutine = () => {
    if (routine.loadingProgress === 100) {
      setIsActive(true);
    } else {
      setIsActive(true);
    }
  }

  const toggleRoutinePause = () => {
    setIsPaused(!isPaused)
  }

  const stopRoutine = () => {
    setIsActive(false);
    timer.reset();
    routine.stop();
  }

  const saveSettings = (newSettings: RoutineSettings) => {
    const userObj = {
      email: user?.user?.email,
      settings: newSettings
    }
    axios.put('/api/user', { id: id, user: userObj })
    .then((res: AxiosResponse) => {
      fetchSettings();
    })
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
  }, [routine]);

  useEffect(() => {
    if (user?.user?.email) {
      setLoggedIn(true);
    }
  }, [user])

  useEffect(() => {
    getSession().then((res) => setUser(res));
  }, [])

  return (
    <main>
      <Header user={user?.user} />
      {loading ? (
        <div className="loading-container blur">
          <LinearProgress variant="determinate" color="error" value={routine.loadingProgress} />
          <div className="circle-container">
            <CircularProgress className="circle" />
          </div>
        </div>
      ) : !loggedIn ? (
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
          <Container className="content-container" maxWidth="xs">
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
                <IconButton 
                  disabled={isActive} 
                  className="settings-button" 
                  size="large"
                  onClick={() => setSettingsOpen(true)}
                >
                  <TuneIcon />
                </IconButton>
              </div>
            </div>
          </Container>
          <Footer isActive={isActive} isPaused={isPaused} play={playRoutine} stop={stopRoutine} pause={toggleRoutinePause} />
          <Settings open={settingsOpen} settings={settings} close={() => setSettingsOpen(false)} save={saveSettings} />
        </>
      )}
    </main>
  )
}