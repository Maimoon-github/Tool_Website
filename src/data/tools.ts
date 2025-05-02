import { Tool } from '../types';

const tools: Tool[] = [
  // Text Tools
  {
    id: 'text-case-converter',
    name: 'Text Case Converter',
    description: 'Convert text between different cases: uppercase, lowercase, title case and more',
    category: 'text',
    icon: 'Type',
    path: '/tools/text-case-converter',
  },
  {
    id: 'character-counter',
    name: 'Character Counter',
    description: 'Count characters, words, sentences and paragraphs in your text',
    category: 'text',
    icon: 'Calculator',
    path: '/tools/character-counter',
  },
  {
    id: 'text-diff-checker',
    name: 'Text Diff Checker',
    description: 'Compare two texts and see the differences',
    category: 'text',
    icon: 'Split',
    path: '/tools/text-diff-checker',
  },
  
  // Conversion Tools
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    description: 'Convert between different units of measurement',
    category: 'conversion',
    icon: 'Ruler',
    path: '/tools/unit-converter',
  },
  {
    id: 'color-converter',
    name: 'Color Converter',
    description: 'Convert between HEX, RGB, HSL color formats',
    category: 'conversion',
    icon: 'Palette',
    path: '/tools/color-converter',
  },
  
  // Generator Tools
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Generate strong and secure passwords',
    category: 'generator',
    icon: 'KeyRound',
    path: '/tools/password-generator',
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    description: 'Generate random UUIDs/GUIDs',
    category: 'generator',
    icon: 'Key',
    path: '/tools/uuid-generator',
  },
  
  // Formatter Tools
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format and validate JSON data',
    category: 'formatters',
    icon: 'Braces',
    path: '/tools/json-formatter',
  },
  
  // Utilities
  {
    id: 'url-encoder',
    name: 'URL Encoder/Decoder',
    description: 'Encode or decode URLs',
    category: 'utilities',
    icon: 'Link',
    path: '/tools/url-encoder',
  },
  {
    id: 'base64-converter',
    name: 'Base64 Converter',
    description: 'Encode or decode Base64 data',
    category: 'utilities',
    icon: 'FileCode',
    path: '/tools/base64-converter',
  },
];

export default tools;