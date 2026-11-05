import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, within, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '../i18n/config';
import ProjectPage from '../pages/ProjectPage';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import CVRequestModal from '../components/CVRequestModal';

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/projects/:slug" element={<ProjectPage />} />
      </Routes>
    </MemoryRouter>,
  );

describe('ProjectPage', () => {
  it('renders a case study with honest source labelling for a private repo', () => {
    renderAt('/projects/ai-health-chat');
    expect(screen.getByRole('heading', { level: 1, name: 'AI Health Chat' })).toBeInTheDocument();
    expect(screen.getAllByText('Source private').length).toBeGreaterThan(0);
    expect(screen.queryByRole('link', { name: /view source/i })).not.toBeInTheDocument();
    const live = screen.getByRole('link', { name: /live app/i });
    expect(live).toHaveAttribute('href', 'https://aihealthchat.qzz.io/');
    expect(live).toHaveAttribute('rel', expect.stringContaining('noopener'));
    expect(screen.getByRole('heading', { name: 'Limitations' })).toBeInTheDocument();
  });

  it('links public source code and shows the evidence for results', () => {
    renderAt('/projects/movie-recommendation');
    expect(screen.getByRole('link', { name: /view source/i })).toHaveAttribute(
      'href',
      'https://github.com/rayklanderman/mrp-2026',
    );
    const table = screen.getByRole('table');
    expect(within(table).getAllByText(/public leaderboard/i).length).toBeGreaterThan(0);
  });

  it('shows a not-found state for unknown projects', () => {
    renderAt('/projects/not-a-project');
    expect(screen.getByRole('heading', { level: 1, name: 'Project not found' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'AI Health Chat' })).toHaveAttribute('href', '/projects/ai-health-chat');
  });
});

describe('Projects filter', () => {
  it('filters featured and gallery projects by category', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Projects />
      </MemoryRouter>,
    );
    const all = screen.getByRole('button', { name: 'All' });
    expect(all).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('Showing 13 projects')).toBeInTheDocument();

    const ml = screen.getByRole('button', { name: 'Machine Learning & Data' });
    await user.click(ml);
    expect(ml).toHaveAttribute('aria-pressed', 'true');
    expect(all).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByText('Showing 1 project')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Movie Recommendation Project' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'AI Health Chat' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'More projects' })).not.toBeInTheDocument();
  });
});

describe('Contact form', () => {
  const fetchMock = vi.fn();
  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal('fetch', fetchMock);
  });
  afterEach(() => vi.unstubAllGlobals());

  const fill = async (user: ReturnType<typeof userEvent.setup>) => {
    await user.type(screen.getByLabelText('Name'), 'Ada');
    await user.type(screen.getByLabelText('Email'), 'ada@example.com');
    await user.type(screen.getByLabelText('Message'), 'Hello there');
  };

  it('has labelled fields and submits JSON to Formspree', async () => {
    fetchMock.mockResolvedValue(new Response('{}', { status: 200 }));
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>,
    );
    await fill(user);
    await user.click(screen.getByRole('button', { name: 'Send Message' }));

    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(/message was sent/i));
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://formspree.io/f/mnnpbdzv');
    expect(JSON.parse(init.body)).toMatchObject({ name: 'Ada', email: 'ada@example.com', message: 'Hello there' });
    expect(screen.getByLabelText('Name')).toHaveValue('');
  });

  it('reports missing fields without sending', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>,
    );
    await user.click(screen.getByRole('button', { name: 'Send Message' }));
    expect(screen.getByRole('status')).toHaveTextContent(/fill in your name/i);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('silently drops submissions that fill the honeypot', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>,
    );
    await fill(user);
    fireEvent.change(container.querySelector('input[name="_gotcha"]')!, { target: { value: 'bot' } });
    await user.click(screen.getByRole('button', { name: 'Send Message' }));
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(/message was sent/i));
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('shows an error when the service fails', async () => {
    fetchMock.mockResolvedValue(new Response('{}', { status: 500 }));
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>,
    );
    await fill(user);
    await user.click(screen.getByRole('button', { name: 'Send Message' }));
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(/failed to send/i));
  });
});

describe('CV request dialog', () => {
  it('is a labelled modal dialog that focuses the email field and closes on Escape', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<CVRequestModal onClose={onClose} />);
    const dialog = screen.getByRole('dialog', { name: 'Request my CV' });
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(screen.getByLabelText('Your email')).toHaveFocus();
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('keeps keyboard focus inside the dialog', async () => {
    const user = userEvent.setup();
    render(<CVRequestModal onClose={() => undefined} />);
    const close = screen.getByRole('button', { name: 'Close' });
    const cancel = screen.getByRole('button', { name: 'Cancel' });
    cancel.focus();
    await user.tab();
    expect(close).toHaveFocus();
  });
});
