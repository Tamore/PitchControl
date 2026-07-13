import { FAN, STAFF, MATCH_HISTORY, NOTIFICATIONS, WALLET_TICKETS } from '../lib/fan-data';

describe('Fan Data Mock Models', () => {
  it('should have a valid FanProfile for Priya', () => {
    expect(FAN).toBeDefined();
    expect(FAN.name).toBe('Priya Sharma');
    expect(FAN.tier).toContain('Gold');
  });

  it('should have a valid StaffProfile for Sarah', () => {
    expect(STAFF).toBeDefined();
    expect(STAFF.name).toBe('Sarah Chen');
    expect(STAFF.role).toBeUndefined(); // Inherits FanProfile structure
  });

  it('should contain accurate match history', () => {
    expect(MATCH_HISTORY.length).toBeGreaterThan(0);
    expect(MATCH_HISTORY[0].fixture).toContain('vs');
  });

  it('should have properly structured notifications', () => {
    expect(NOTIFICATIONS.length).toBeGreaterThan(0);
    const alert = NOTIFICATIONS.find(n => n.kind === 'alert');
    expect(alert).toBeDefined();
  });

  it('should have active wallet tickets', () => {
    expect(WALLET_TICKETS.length).toBeGreaterThan(0);
    expect(WALLET_TICKETS[0].status).toBe('active');
  });
});
