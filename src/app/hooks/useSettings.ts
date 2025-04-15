import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { RoutineSettings } from '../types';
import { GoogleUser } from '../types';

export default function useSettings(data: GoogleUser | null) {
  const [id, setId] = useState<string | null>(null);
  const [settings, setSettings] = useState<RoutineSettings>();

  const fetchSettings = () => {
    if (data?.user?.email) {
      axios.post('/api/user', {email: data?.user?.email})
        .then((res: AxiosResponse) => {
          setSettings(res?.data?.user?.settings);
          setId(res?.data?.user?._id);
        })
    }
  }

  useEffect(() => {
    fetchSettings();
  }, [data])

  const userInfo = {id, settings, fetchSettings};
  return userInfo;
}