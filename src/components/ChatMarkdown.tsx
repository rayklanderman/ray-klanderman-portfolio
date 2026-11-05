import { Fragment, ReactNode } from 'react';

/**
 * Renders the small Markdown subset the chat model uses (paragraphs, bullet and numbered
 * lists, headings, **bold**, links) as React elements. No HTML from the model is ever
 * injected, and only http(s) links are created.
 */

type Block =
  | { type: 'p'; lines: string[] }
  | { type: 'ul' | 'ol'; items: string[] };

const BULLET = /^\s*[-*•]\s+(.*)$/;
const NUMBERED = /^\s*\d+[.)]\s+(.*)$/;
const HEADING = /^\s*#{1,6}\s+(.*)$/;
const INLINE =
  /\*\*([^*\n]+?)\*\*|\[([^\]\n]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s<>()]*[^\s<>().,;:!?'"])/g;

function parseBlocks(text: string): Block[] {
  const blocks: Block[] = [];
  let current = null as Block | null;

  for (const raw of text.replace(/\r\n?/g, '\n').split('\n')) {
    if (!raw.trim()) {
      current = null;
      continue;
    }
    const bullet = raw.match(BULLET);
    const numbered = bullet ? null : raw.match(NUMBERED);
    const listType = bullet ? 'ul' : numbered ? 'ol' : null;

    if (listType) {
      const item = (bullet ?? numbered)![1];
      if (current?.type === listType) {
        current.items.push(item);
      } else {
        current = { type: listType, items: [item] };
        blocks.push(current);
      }
      continue;
    }

    const heading = raw.match(HEADING);
    const line = heading ? `**${heading[1].replace(/\*\*/g, '')}**` : raw.trim();

    if (current && current.type !== 'p' && /^\s/.test(raw)) {
      // Indented continuation of the previous list item.
      current.items[current.items.length - 1] += ` ${line}`;
    } else if (current?.type === 'p' && !heading) {
      current.lines.push(line);
    } else {
      current = { type: 'p', lines: [line] };
      blocks.push(current);
      if (heading) current = null;
    }
  }
  return blocks;
}

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let n = 0;
  for (const m of text.matchAll(INLINE)) {
    const start = m.index ?? 0;
    if (start > last) out.push(text.slice(last, start));
    const key = `${keyPrefix}-${n++}`;
    if (m[1]) {
      out.push(<strong key={key}>{m[1]}</strong>);
    } else {
      const href = m[3] ?? m[4];
      out.push(
        <a key={key} href={href} target="_blank" rel="noopener noreferrer">
          {m[2] ?? m[4]}
        </a>,
      );
    }
    last = start + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

const ChatMarkdown = ({ text }: { text: string }) => (
  <div className="chat-markdown">
    {parseBlocks(text).map((block, i) => {
      if (block.type === 'p') {
        return (
          <p key={i}>
            {block.lines.map((line, j) => (
              <Fragment key={j}>
                {j > 0 && <br />}
                {renderInline(line, `${i}-${j}`)}
              </Fragment>
            ))}
          </p>
        );
      }
      const List = block.type;
      return (
        <List key={i}>
          {block.items.map((item, j) => (
            <li key={j}>{renderInline(item, `${i}-${j}`)}</li>
          ))}
        </List>
      );
    })}
  </div>
);

export default ChatMarkdown;
