import React from 'react';
import remarkGemoji from 'remark-gemoji';
import ReactMarkdown from 'react-markdown';
import thisTest from 'markdown/test.md';
import remarkGfm from 'remark-gfm';

const MarkdownTest: React.FC = () => {
  return (
    <div>
      <ReactMarkdown
        children={thisTest}
        remarkPlugins={[remarkGfm, remarkGemoji]}
      />
    </div>
  );
};

export default MarkdownTest;
