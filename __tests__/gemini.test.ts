import { orchestrateWorkflow } from '../lib/gemini';

// Mock the environment to trigger fallback
const originalEnv = process.env;

beforeEach(() => {
  jest.resetModules();
  process.env = { ...originalEnv };
  delete process.env.NEXT_PUBLIC_GEMINI_API_KEY;
});

afterAll(() => {
  process.env = originalEnv;
});

describe('Gemini AI Orchestrator', () => {
  it('should fall back gracefully when API key is missing', async () => {
    // Silence the console.warn for the fallback mechanism during tests
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    
    const response = await orchestrateWorkflow('Generic event trigger');
    
    expect(response).toBeDefined();
    expect(response.Director).toBeDefined();
    expect(response.TicketPilot).toBeDefined();
    expect(response.Director.log).toContain('Simulated generic operational shift');
    
    consoleSpy.mockRestore();
  });

  it('should trigger specific TICKET_PURCHASE fallback data', async () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    
    const response = await orchestrateWorkflow('TICKET_PURCHASE completed');
    
    expect(response.TicketPilot.status).toBe('Secured');
    expect(response.OpsPilot.volunteersDeployed).toBe(3);
    
    consoleSpy.mockRestore();
  });
});
