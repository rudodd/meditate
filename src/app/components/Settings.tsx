// import library functionality
import React, { useState, useEffect } from 'react';

import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { RoutineSettings } from '../types';

interface SettingsProps {
  open: boolean;
  settings: RoutineSettings | undefined;
  close: () => void;
  save: (settings: RoutineSettings) => void;
}

export default function Settings(props: SettingsProps) {
  const { open, settings, close, save } = props;
  const [settingsState, setSettingsState] = useState<any>(settings);

  const updateSettings = (name: string, value: null | number | string | boolean) => {
    const updatedSettings = {
      ...settingsState,
      [name]: value
    }
    setSettingsState(updatedSettings);
  }

  const saveSettings = () => {
    save(settingsState);
    close();
  }

  useEffect(() => {
    setSettingsState(settings);
  }, [settings]);

  useEffect(() => {
    setSettingsState(settings);
  }, []);

  useEffect(() => {
    if (JSON.stringify(settingsState) !== JSON.stringify(settings)) {
      save(settingsState);
    }
  }, [settingsState])

  return (
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={close}
        closeAfterTransition
      >
        <Fade in={open}>
          <Container className="settings-container" maxWidth="xs">
            <div className="settings-header">
              <h3>Settings</h3>
              <IconButton 
                  className="settings-close" 
                  size="large"
                  onClick={() => close()}
                >
                  <CloseIcon />
                </IconButton>
            </div>
            <div className="settings-form">
              <div className="settings-input-group">
                <h4>Audio</h4>
                <div className="settings-input">
                  <FormControlLabel 
                    label="White noise"
                    control={<Switch checked={settingsState?.whiteNoise?.length > 0} onChange={(e) => updateSettings('whiteNoise', e.target.checked ? 'white-noise' : null)} />} 
                  />
                </div>
                <div className="settings-input">
                  <FormControlLabel 
                    label="Secondary audio queues"
                    control={<Switch checked={settingsState?.secondaryQueue?.length > 0} onChange={(e) => updateSettings('secondaryQueue', e.target.checked ? 'singing-bowl' : null)} />} 
                  />
                </div>
                {settingsState?.secondaryQueue?.length && 
                  <div className="settings-input select">
                    <FormControl fullWidth>
                      <InputLabel>Secondary queue sound</InputLabel>
                      <Select
                        value={settingsState?.secondaryQueue}
                        label="Secondary queue sound"
                        onChange={(e) => updateSettings('secondaryQueue', e.target.value)}
                      >
                        <MenuItem value="singing-bowl">Singing-bowl</MenuItem>
                        <MenuItem value="music">Music</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                }
                <div className="settings-input">
                  <FormControlLabel 
                    label="Guided"
                    control={<Switch checked={settingsState?.guided?.length > 0} onChange={(e) => updateSettings('guided', e.target.checked ? 'full' : null)} />} 
                  />
                </div>
                {settingsState?.guided?.length && 
                  <div className="settings-input select">
                    <FormControl fullWidth>
                      <InputLabel>Guide type</InputLabel>
                      <Select
                        value={settingsState?.guided}
                        label="Guide type"
                        onChange={(e) => updateSettings('guided', e.target.value)}
                      >
                        <MenuItem value="full">Fully guided</MenuItem>
                        <MenuItem value="semi">Semi guided</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                }
              </div>
              <div className="settings-input-group">
                <h4>Routine</h4>
                <div className="settings-input">
                  <FormControlLabel 
                    label="Inlcude warmup"
                    control={<Switch checked={settingsState?.warmUp} onChange={() => updateSettings('warmUp', !settingsState.warmUp)} />} 
                  />
                </div>
                {settingsState?.warmUp && 
                  <div className="settings-input select">
                    <FormControl fullWidth>
                      <InputLabel>Warmup length</InputLabel>
                      <Select
                        value={settingsState?.warmUpLength}
                        label="Warmup length"
                        onChange={(e) => updateSettings('warmUpLength', e.target.value)}
                      >
                        <MenuItem value={0.5}>30 Seconds</MenuItem>
                        <MenuItem value={1}>1 Minute</MenuItem>
                        <MenuItem value={1.5}>1 1/2 Minutes</MenuItem>
                        <MenuItem value={2}>2 Minutes</MenuItem>
                        <MenuItem value={2.5}>2 1/2 Minutes</MenuItem>
                        <MenuItem value={3}>3 minutes</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                }
                <div className="settings-input select">
                  <FormControl fullWidth>
                    <InputLabel>Mindfulness length</InputLabel>
                    <Select
                      value={settingsState?.length}
                      label="Warmup length"
                      onChange={(e) => updateSettings('length', e.target.value)}
                    >
                      <MenuItem value={5}>5 Minute</MenuItem>
                      <MenuItem value={7}>7 Minutes</MenuItem>
                      <MenuItem value={10}>10 Minutes</MenuItem>
                      <MenuItem value={15}>15 Minutes</MenuItem>
                      <MenuItem value={30}>30 minutes</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="settings-input">
                  <FormControlLabel 
                    label="Inlcude visualization"
                    control={<Switch checked={settingsState?.visualization?.length > 0} onChange={(e) => updateSettings('visualization', e.target.checked ? 'stillness' : null)} />} 
                  />
                </div>
                {settingsState?.visualization?.length && 
                  <div className="settings-input select">
                    <FormControl fullWidth>
                      <InputLabel>Visualization</InputLabel>
                      <Select
                        value={settingsState?.visualization}
                        label="Warmup length"
                        onChange={(e) => updateSettings('visualization', e.target.value)}
                      >
                        <MenuItem value="stillness">Stillness</MenuItem>
                        <MenuItem value="loving-kindness">Loving Kindness</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                }
              </div>
            </div>
          </Container>
        </Fade>
      </Modal>
  )
}