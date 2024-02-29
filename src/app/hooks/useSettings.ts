import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { RoutineSettings } from '../types';
import { GoogleUser } from '../types';

export default function useSettings(data: GoogleUser | null, status: string) {
  const [id, setId] = useState<string | null>(null);
  const [settings, setSettings] = useState<RoutineSettings>();

  const fetchSettings = () => {
    if (status === 'authenticated' && data?.user?.email) {
      console.log('get settings');
      axios.post('/api/user', {email: data?.user?.email})
        .then((res: AxiosResponse) => {
          setSettings(res?.data?.user?.settings);
          setId(res?.data?.user?._id);
        })
    }
  }

  useEffect(() => {
    fetchSettings();
  }, [data, status])

  const userInfo = {id, settings, fetchSettings};
  return userInfo;
}