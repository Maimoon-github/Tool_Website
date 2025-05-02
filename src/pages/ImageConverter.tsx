import React, { useState } from 'react';
import { Image as ImageIcon, UploadCloud, DownloadCloud } from 'lucide-react';

const ImageConverter: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState<string>('png');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setPreviewUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormat(e.target.value);
  };

  const convertImage = async () => {
    if (!file) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const convertedUrl = canvas.toDataURL(`image/${format}`);
        const a = document.createElement('a');
        a.href = convertedUrl;
        a.download = `converted-image.${format}`;
        a.click();
      }
    };
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-5xl mx-auto opacity-0 animate-fadeInUp">

        {/* Heading Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-800 mb-4">
            <ImageIcon className="text-blue-600 dark:text-white" size={32} />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Image Converter</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Quickly convert your images to different formats like PNG, WebP, BMP, and GIF. Fast, secure, and all in your browser!
          </p>
        </div>

        {/* Upload + Format Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 flex flex-col lg:flex-row gap-8 items-center">
          <div className="flex flex-col items-center w-full lg:w-1/2">
            <label className="text-gray-700 dark:text-gray-300 font-medium mb-2">
              Upload your image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-700 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
          </div>
          <div className="flex flex-col items-center w-full lg:w-1/2">
            <label className="text-gray-700 dark:text-gray-300 font-medium mb-2">
              Convert to
            </label>
            <select
              value={format}
              onChange={handleFormatChange}
              className="w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
            >
              <option value="png">PNG</option>
              <option value="webp">WebP</option>
              <option value="bmp">BMP</option>
              <option value="gif">GIF</option>
            </select>
          </div>
        </div>

        {/* Preview + Convert Button */}
        <div className="mt-10 flex flex-col items-center">
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="max-w-xs rounded-lg shadow-md mb-6 opacity-0 animate-fadeIn"
            />
          )}
          <button
            onClick={convertImage}
            className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-300"
          >
            <DownloadCloud size={20} className="mr-2" />
            Convert and Download
          </button>
        </div>

        {/* Feature Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <UploadCloud size={40} />,
              title: 'High-Quality Output',
              desc: 'Convert images while maintaining the highest resolution and clarity.',
              delay: '0ms',
            },
            {
              icon: <ImageIcon size={40} />,
              title: 'Secure & Private',
              desc: 'All conversions happen inside your browser. No server involved.',
              delay: '100ms',
            },
            {
              icon: <DownloadCloud size={40} />,
              title: 'Multiple Formats',
              desc: 'PNG, WebP, GIF, BMP — everything supported!',
              delay: '200ms',
            },
            {
              icon: <UploadCloud size={40} />,
              title: 'Lightning Fast',
              desc: 'Instant processing with no loading screens. Convert images in seconds!',
              delay: '300ms',
            },
            {
              icon: <ImageIcon size={40} />,
              title: 'User Friendly',
              desc: 'A clean and simple design to make your experience smooth and intuitive.',
              delay: '400ms',
            },
            {
              icon: <DownloadCloud size={40} />,
              title: 'Offline Ready',
              desc: 'Works even without an internet connection after the page loads once!',
              delay: '500ms',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition text-center opacity-0 animate-fadeInUp"
              style={{ animationDelay: item.delay }}
            >
              <div className="text-blue-600 dark:text-blue-400 mb-4 mx-auto">{item.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ImageConverter;
