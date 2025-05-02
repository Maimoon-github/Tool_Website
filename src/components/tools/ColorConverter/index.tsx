import React, { useState, useEffect } from 'react';
import { Copy, CheckCircle2, Palette, Eye } from 'lucide-react';

interface Color {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
}

const ColorConverter: React.FC = () => {
  const [color, setColor] = useState<Color>({
    hex: '#1e90ff',
    rgb: { r: 30, g: 144, b: 255 },
    hsl: { h: 210, s: 100, l: 56 }
  });
  const [copied, setCopied] = useState<string | null>(null);
  const [inputType, setInputType] = useState<'hex' | 'rgb' | 'hsl'>('hex');

  const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHex = ({ r, g, b }: { r: number; g: number; b: number }): string => {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  };

  const rgbToHsl = ({ r, g, b }: { r: number; g: number; b: number }): { h: number; s: number; l: number } => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }

      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const hslToRgb = ({ h, s, l }: { h: number; s: number; l: number }): { r: number; g: number; b: number } => {
    s /= 100;
    l /= 100;
    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

    return {
      r: Math.round(255 * f(0)),
      g: Math.round(255 * f(8)),
      b: Math.round(255 * f(4))
    };
  };

  const handleHexChange = (value: string) => {
    if (/^#?([a-f\d]{6})$/i.test(value)) {
      const hex = value.startsWith('#') ? value : `#${value}`;
      const rgb = hexToRgb(hex)!;
      const hsl = rgbToHsl(rgb);
      setColor({ hex, rgb, hsl });
    }
  };

  const handleRgbChange = (value: { r: number; g: number; b: number }) => {
    const hex = rgbToHex(value);
    const hsl = rgbToHsl(value);
    setColor({ hex, rgb: value, hsl });
  };

  const handleHslChange = (value: { h: number; s: number; l: number }) => {
    const rgb = hslToRgb(value);
    const hex = rgbToHex(rgb);
    setColor({ hex, rgb, hsl: value });
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Color Converter</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Convert colors between HEX, RGB, and HSL formats. Preview and copy color codes easily.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Color Preview */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div
            className="h-48 w-full transition-colors duration-200"
            style={{ backgroundColor: color.hex }}
          ></div>
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Color Preview</h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">HEX</span>
                <button
                  onClick={() => copyToClipboard(color.hex, 'hex')}
                  className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  {color.hex}
                  {copied === 'hex' ? (
                    <CheckCircle2 size={16} className="ml-2" />
                  ) : (
                    <Copy size={16} className="ml-2" />
                  )}
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">RGB</span>
                <button
                  onClick={() => copyToClipboard(`rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`, 'rgb')}
                  className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  {`rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`}
                  {copied === 'rgb' ? (
                    <CheckCircle2 size={16} className="ml-2" />
                  ) : (
                    <Copy size={16} className="ml-2" />
                  )}
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">HSL</span>
                <button
                  onClick={() => copyToClipboard(`hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`, 'hsl')}
                  className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  {`hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`}
                  {copied === 'hsl' ? (
                    <CheckCircle2 size={16} className="ml-2" />
                  ) : (
                    <Copy size={16} className="ml-2" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Color Input */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Color Input</h2>
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setInputType('hex')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium ${
                  inputType === 'hex'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                HEX
              </button>
              <button
                onClick={() => setInputType('rgb')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium ${
                  inputType === 'rgb'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                RGB
              </button>
              <button
                onClick={() => setInputType('hsl')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium ${
                  inputType === 'hsl'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                HSL
              </button>
            </div>

            {inputType === 'hex' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  HEX Color Code
                </label>
                <input
                  type="text"
                  value={color.hex}
                  onChange={(e) => handleHexChange(e.target.value)}
                  placeholder="#000000"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                />
              </div>
            )}

            {inputType === 'rgb' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Red (0-255)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="255"
                    value={color.rgb.r}
                    onChange={(e) => handleRgbChange({ ...color.rgb, r: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Green (0-255)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="255"
                    value={color.rgb.g}
                    onChange={(e) => handleRgbChange({ ...color.rgb, g: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Blue (0-255)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="255"
                    value={color.rgb.b}
                    onChange={(e) => handleRgbChange({ ...color.rgb, b: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>
            )}

            {inputType === 'hsl' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Hue (0-360)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="360"
                    value={color.hsl.h}
                    onChange={(e) => handleHslChange({ ...color.hsl, h: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Saturation (0-100)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={color.hsl.s}
                    onChange={(e) => handleHslChange({ ...color.hsl, s: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Lightness (0-100)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={color.hsl.l}
                    onChange={(e) => handleHslChange({ ...color.hsl, l: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Color Information */}
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-2">About Color Formats</h3>
        <ul className="space-y-2 text-blue-700 dark:text-blue-400">
          <li>
            <strong>HEX</strong>: A six-digit code representing RGB values in hexadecimal format (#RRGGBB)
          </li>
          <li>
            <strong>RGB</strong>: Color values specified by red, green, and blue components (0-255)
          </li>
          <li>
            <strong>HSL</strong>: Colors defined by hue (0-360), saturation (0-100%), and lightness (0-100%)
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ColorConverter;