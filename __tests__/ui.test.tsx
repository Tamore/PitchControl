import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BroadcastStrip } from '../components/ui/broadcast-strip';

describe('BroadcastStrip UI Component', () => {
  it('renders the FIFA WORLD CUP 26 branding', () => {
    render(<BroadcastStrip />);
    expect(screen.getByText('FIFA26')).toBeInTheDocument();
  });

  it('renders the live match score', () => {
    render(<BroadcastStrip />);
    expect(screen.getByText('ARG')).toBeInTheDocument();
    expect(screen.getByText('BRA')).toBeInTheDocument();
  });

  it('renders telemetry data', () => {
    render(<BroadcastStrip />);
    expect(screen.getByText('114 dB')).toBeInTheDocument();
    expect(screen.getByText('82,517')).toBeInTheDocument();
  });
});
