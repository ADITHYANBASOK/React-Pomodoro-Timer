class NotificationService {
  private static instance: NotificationService;
  private hasPermission: boolean = false;
  private audio: HTMLAudioElement;

  private constructor() {
    this.requestPermission();
    this.audio = new Audio('/notification.mp3');
    this.audio.volume = 0.5;
  }

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  async requestPermission(): Promise<void> {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      this.hasPermission = permission === 'granted';
    }
  }

  playSound(): void {
    this.audio.currentTime = 0;
    this.audio.play().catch(error => console.warn('Audio playback failed:', error));
  }

  notify(title: string, options?: NotificationOptions): void {
    this.playSound();
    
    if (this.hasPermission) {
      new Notification(title, options);
    }
  }
}

export const notificationService = NotificationService.getInstance();