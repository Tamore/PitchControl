import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MissionTimeline } from '../components/command/mission-timeline';

// Mock the StadiumProvider context for the command center tests
jest.mock('../components/providers/StadiumProvider', () => ({
  useStadium: () => ({
    missionTimeline: [
      { id: '1', agent: 'CrowdSense AI', message: 'Gate C congestion spike detected', timestamp: '14:32:00' }
    ]
  })
}));

describe('Command Center UI Components', () => {
  it('renders MissionTimeline correctly with mock data', () => {
    render(<MissionTimeline />);
    
    // Verify the component header exists
    expect(screen.getByText('Mission Timeline')).toBeInTheDocument();
    
    // Verify the mock data from the timeline is rendered
    expect(screen.getByText('CrowdSense AI Action')).toBeInTheDocument();
    expect(screen.getByText('Gate C congestion spike detected')).toBeInTheDocument();
  });
});
