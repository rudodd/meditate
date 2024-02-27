import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { RoutineSettings } from '../types';
import { Session } from 'next-auth';

export default function useSettings(data: Session | null, status: string) {
  const [settings, setSettings] = useState<RoutineSettings>();

  useEffect(() => {
    if (status === 'authenticated') {
      axios.post('/api/user', {email: data?.user?.email})
        .then((res: AxiosResponse) => {
          setSettings(res?.data?.user?.settings);
        })
    }
  }, [data, status])

  return settings
}