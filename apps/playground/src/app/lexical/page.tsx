'use client';

import ExampleTheme from './themes/ExampleTheme';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { $createListNode, $createListItemNode } from '@lexical/list';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { TRANSFORMERS } from '@lexical/markdown';
import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin';
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin';
import AutoLinkPlugin from './plugins/AutoLinkPlugin';
import './styles.css';
import { AIAction, LexicalAIPlugin, ContentNodeParser } from '@palico-ai/lexical';
import { Container } from '@mui/material';
import HotKeyPlugin from './plugins/hotkey_plugin';
import { $createTextNode } from 'lexical';

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

const editorConfig = {
  namespace: '',
  // The editor theme
  theme: ExampleTheme,
  // Handling of errors during update
  onError(error: Error) {
    throw error;
  },
  // Any custom nodes go here
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
  ],
};

const aiActions: AIAction[] = [
  {
    name: 'CREATE_VIDEO_SUMMARY',
    label: 'Create video summary',
    options: [
      {
        label: 'Zoom Video 1',
        value: 'zoom-video-1',
      },
      {
        label: 'Zoom Video 2',
        value: 'zoom-video-2',
      },
    ],
  },
  {
    name: 'SUMMARIZE_TEXT',
    label: 'Summarize Section',
    requiresRangeSelection: true,
  },
  {
    name: 'TRANSLATE_TEXT',
    label: 'Translate Section',
    requiresRangeSelection: true,
    options: [
      {
        label: 'Spanish',
        value: 'spanish',
      },
      {
        label: 'French',
        value: 'french',
      },
      {
        label: 'German',
        value: 'german',
      },
      {
        label: 'Chinese',
        value: 'chinese',
      },
      {
        label: 'Japanese',
        value: 'japanese',
      },
    ],
  },
  {
    name: 'CREATE_PRICING_SUGGESTIONS',
    label: 'Create a pricing suggestion',
    options: [
      {
        label: 'Create a pricing suggestion',
        value: 'pricing-suggestion',
      },
    ],
  },
  {
    name: 'ASK_AI_TO_WRITE',
    label: 'Ask AI to write',
    promptForFreeText: true,
  },
];

interface ListContentNode {
  type: "bullet_list";
  value: string[];
}

export default function Editor() {
  const parseBulletListNode: ContentNodeParser = (entry) => {
    const list = $createListNode("bullet");
    const contentNode = entry as ListContentNode;
    contentNode.value.forEach((item) => {
      const listItem = $createListItemNode();
      listItem.append($createTextNode(item));
      list.append(listItem);
    });
    return [list];
  }

  return (
    <Container>
      <LexicalComposer initialConfig={editorConfig}>
        <div className="editor-container">
          <ToolbarPlugin />
          <div className="editor-inner">
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input" />}
              placeholder={<Placeholder />}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <LexicalAIPlugin options={aiActions} customParsers={{
              bullet_list: parseBulletListNode
            }} />
            <HotKeyPlugin />
            <HistoryPlugin />
            <AutoFocusPlugin />
            <CodeHighlightPlugin />
            <ListPlugin />
            <LinkPlugin />
            <AutoLinkPlugin />
            <ListMaxIndentLevelPlugin maxDepth={7} />
            <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          </div>
        </div>
      </LexicalComposer>
    </Container>
  );
}
