import React from 'react';

type Block = { type: 'list'; items: string[] } | { type: 'paragraph'; text: string };

const BULLET = /^\s*(?:[-•*]|\d+[.)])\s+(.*)$/;

/** Lines of a reply as paragraphs and bullet lists ("- item", "• item", "1. item"). */
const toBlocks = (text: string): Block[] => {
  const blocks: Block[] = [];

  for (const line of text.split('\n')) {
    if (!line.trim()) continue;

    const bullet = BULLET.exec(line);
    const last = blocks.at(-1);

    if (bullet) {
      if (last?.type === 'list') last.items.push(bullet[1]);
      else blocks.push({ type: 'list', items: [bullet[1]] });
    } else if (last?.type === 'paragraph') {
      last.text += `\n${line.trim()}`;
    } else {
      blocks.push({ type: 'paragraph', text: line.trim() });
    }
  }

  return blocks;
};

/** The text of an answer: paragraphs and short lists, as plain text (no HTML from the backend). */
export const FormattedText = ({ text }: { text: string }) => (
  <>
    {toBlocks(text).map((block, index) =>
      block.type === 'list' ? (
        <ul className='my-1 list-disc space-y-0.5 pl-5 first:mt-0 last:mb-0' key={index}>
          {block.items.map((item, itemIndex) => (
            <li key={itemIndex}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className='whitespace-pre-line first:mt-0 last:mb-0 [&:not(:first-child)]:mt-2' key={index}>
          {block.text}
        </p>
      )
    )}
  </>
);
