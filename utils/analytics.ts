import { Platform } from 'react-native';

interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp: number;
}

interface UserProperties {
  deviceId: string;
  platform: string;
  appVersion: string;
  timezone: string;
}

class AnalyticsService {
  private static instance: AnalyticsService;
  private events: AnalyticsEvent[] = [];
  private userProperties: UserProperties;

  private constructor() {
    this.userProperties = {
      deviceId: 'unique-device-id', // Replace with actual device ID
      platform: Platform.OS,
      appVersion: '1.0.0', // Replace with actual version
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
  }

  static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  trackScreenView(screenName: string) {
    this.trackEvent('screen_view', { screen: screenName });
  }

  trackPrayerTime(prayerName: string) {
    this.trackEvent('prayer_time_viewed', { prayer: prayerName });
  }

  trackFeatureUsage(featureName: string) {
    this.trackEvent('feature_used', { feature: featureName });
  }

  trackError(error: Error) {
    this.trackEvent('error', {
      message: error.message,
      stack: error.stack
    });
  }

  private trackEvent(name: string, properties?: Record<string, any>) {
    const event: AnalyticsEvent = {
      name,
      properties,
      timestamp: Date.now()
    };
    this.events.push(event);
    this.sendEvents(); // In reality, you'd batch these and send periodically
  }

  private async sendEvents() {
    // Here you would implement the actual sending of events to your backend
    // For now, we'll just console.log them
    console.log('Sending analytics events:', this.events);
    this.events = [];
  }
}

export default AnalyticsService.getInstance();