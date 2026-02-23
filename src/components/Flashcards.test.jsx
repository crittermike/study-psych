import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Flashcards from '../components/Flashcards';

const noopProgress = {};
const noopFns = {
  progress: noopProgress,
  srsRate: vi.fn(),
  isDue: () => true,
  previewInterval: () => 60000,
  onAchievement: vi.fn(),
};

beforeEach(() => {
  localStorage.clear();
  vi.clearAllMocks();
});

describe('Flashcards', () => {
  it('renders a flashcard with term visible', () => {
    render(<Flashcards {...noopFns} />);
    expect(screen.getByText('Term')).toBeInTheDocument();
    expect(screen.getByText('tap to flip · space')).toBeInTheDocument();
  });

  it('shows category dropdown', () => {
    render(<Flashcards {...noopFns} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('shows study mode toggle buttons', () => {
    render(<Flashcards {...noopFns} />);
    expect(screen.getByText('🗂️ Keep / Discard')).toBeInTheDocument();
    expect(screen.getByText('📅 Spaced Review')).toBeInTheDocument();
  });

  it('shows side toggle buttons', () => {
    render(<Flashcards {...noopFns} />);
    expect(screen.getByText('Term → Definition')).toBeInTheDocument();
    expect(screen.getByText('Definition → Term')).toBeInTheDocument();
  });

  it('flips card on click and shows session buttons by default', () => {
    render(<Flashcards {...noopFns} />);
    const card = screen.getByText('tap to flip · space').closest('.card-container');
    fireEvent.click(card);
    expect(screen.getByText('Hard')).toBeInTheDocument();
    expect(screen.getByText('Easy')).toBeInTheDocument();
  });

  it('persists start side preference', () => {
    render(<Flashcards {...noopFns} />);
    fireEvent.click(screen.getByText('Definition → Term'));
    expect(localStorage.getItem('fc_start_side')).toBe('def');
  });

  it('persists study mode preference', () => {
    render(<Flashcards {...noopFns} />);
    fireEvent.click(screen.getByText('📅 Spaced Review'));
    expect(localStorage.getItem('fc_study_mode')).toBe('srs');
  });

  it('shows SRS buttons when spaced review mode is selected', () => {
    localStorage.setItem('fc_study_mode', 'srs');
    render(<Flashcards {...noopFns} />);
    const card = screen.getByText('tap to flip · space').closest('.card-container');
    fireEvent.click(card);
    expect(screen.getByText('Again')).toBeInTheDocument();
    expect(screen.getByText('Good')).toBeInTheDocument();
  });

  it('session mode easy removes card and persists to localStorage', () => {
    render(<Flashcards {...noopFns} />);
    const card = screen.getByText('tap to flip · space').closest('.card-container');
    fireEvent.click(card);
    fireEvent.click(screen.getByText('Easy'));
    const discarded = JSON.parse(localStorage.getItem('fc_discarded'));
    expect(discarded.length).toBe(1);
  });

  it('shuffle & restart clears discarded terms', () => {
    localStorage.setItem('fc_discarded', JSON.stringify(['Perception']));
    render(<Flashcards {...noopFns} />);
    fireEvent.click(screen.getByText(/Shuffle/));
    const discarded = JSON.parse(localStorage.getItem('fc_discarded'));
    expect(discarded).toEqual([]);
  });

  it('shows Definition label on front when def side selected', () => {
    localStorage.setItem('fc_start_side', 'def');
    render(<Flashcards {...noopFns} />);
    expect(screen.getByText('Definition')).toBeInTheDocument();
  });
});
