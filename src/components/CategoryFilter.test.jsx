import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CategoryFilter from '../components/CategoryFilter';

describe('CategoryFilter', () => {
  const categories = ['Perception', 'Gestalt', 'Attention'];
  let onSelect;

  beforeEach(() => {
    onSelect = vi.fn();
  });

  it('renders a dropdown with All option and categories', () => {
    render(<CategoryFilter categories={categories} selected={null} onSelect={onSelect} />);
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(select.options).toHaveLength(4); // All + 3 categories
    expect(select.options[0].text).toBe('All Categories');
  });

  it('shows selected category', () => {
    render(<CategoryFilter categories={categories} selected="Gestalt" onSelect={onSelect} />);
    expect(screen.getByRole('combobox').value).toBe('Gestalt');
  });

  it('calls onSelect with null when All is chosen', () => {
    render(<CategoryFilter categories={categories} selected="Gestalt" onSelect={onSelect} />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '' } });
    expect(onSelect).toHaveBeenCalledWith(null);
  });

  it('calls onSelect with category name', () => {
    render(<CategoryFilter categories={categories} selected={null} onSelect={onSelect} />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Attention' } });
    expect(onSelect).toHaveBeenCalledWith('Attention');
  });
});
