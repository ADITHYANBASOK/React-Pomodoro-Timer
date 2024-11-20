import useSound from 'use-sound';
import notificationSound from '../assets/notification.mp3';

export const useNotificationSound = () => {
  const [play] = useSound(notificationSound, {
    volume: 0.5,
  });

  return play;
};