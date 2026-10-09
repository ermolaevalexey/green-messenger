import type {FC, ReactNode} from 'react';
import {Anchor} from '@mantine/core';
import classes from './MessageText.module.css';

type MessageTextProps = {
  text: string;
};

const URL_REGEX = /https?:\/\/[^\s<]+|www\.[^\s<]+/gi;

export const MessageText: FC<MessageTextProps> = ({text}) => {
  const parts: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(URL_REGEX)) {
    const url = match[0];
    const index = match.index!;

    if (index > lastIndex) {
      parts.push(text.slice(lastIndex, index));
    }

    // Не включаем конечную пунктуацию в ссылку.
    const trailingPunctuation = url.match(/[.,!?;:)]+$/)?.[0] ?? '';
    const href = url.slice(0, url.length - trailingPunctuation.length);

    if (href) {
      parts.push(
        <Anchor
          key={`${index}-${href}`}
          href={href.startsWith('www.') ? `https://${href}` : href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
        >
          {href}
        </Anchor>,
      );
    }

    if (trailingPunctuation) {
      parts.push(trailingPunctuation);
    }

    lastIndex = index + url.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return <>{parts}</>;
};
