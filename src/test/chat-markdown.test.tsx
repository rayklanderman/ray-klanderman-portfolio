import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import ChatMarkdown from '../components/ChatMarkdown';

const html = (text: string) => render(<ChatMarkdown text={text} />).container.innerHTML;

describe('ChatMarkdown', () => {
  it('turns the model reply from the screenshot into a real list with bold labels', () => {
    const out = html(
      'My strongest skills are:\n\n- **Programming:** Python, TypeScript\n- **Data & AI:** LightGBM\n\nThese skills let me build.',
    );
    expect(out).not.toContain('**');
    expect(out).toContain('<p>My strongest skills are:</p>');
    expect(out).toContain('<ul><li><strong>Programming:</strong> Python, TypeScript</li>');
    expect(out).toContain('<li><strong>Data &amp; AI:</strong> LightGBM</li></ul>');
    expect(out).toContain('<p>These skills let me build.</p>');
  });

  it('renders numbered lists and headings', () => {
    const out = html('### Projects\n1. AI Health Chat\n2. EyeSense');
    expect(out).toContain('<p><strong>Projects</strong></p>');
    expect(out).toContain('<ol><li>AI Health Chat</li><li>EyeSense</li></ol>');
  });

  it('links only http(s) URLs and never injects HTML', () => {
    const out = html('See [site](https://www.sautimtaani.site/) or https://tutalearn.qzz.io/. [x](javascript:alert(1)) <img src=x onerror=alert(1)>');
    expect(out).toContain('<a href="https://www.sautimtaani.site/" target="_blank" rel="noopener noreferrer">site</a>');
    expect(out).toContain('<a href="https://tutalearn.qzz.io/" target="_blank" rel="noopener noreferrer">https://tutalearn.qzz.io/</a>.');
    expect(out).not.toContain('href="javascript');
    expect(out).not.toContain('<img');
    expect(out).toContain('&lt;img');
  });
});
