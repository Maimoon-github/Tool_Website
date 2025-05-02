import React, { useState } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { useDropzone } from 'react-dropzone';
import {
  UploadCloud,
  DownloadCloud,
  FileText,
  Layers,
  FileSearch,
  Loader,
  LockIcon,
  Trash2,
  Monitor,
  Wrench
} from 'lucide-react';

const PDFConvert: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [textContent, setTextContent] = useState('');
  const [pdfFiles, setPdfFiles] = useState<File[]>([]);
  const [extractedText, setExtractedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'application/pdf': [], 'image/*': [] },
    onDrop: (acceptedFiles) => {
      if (selectedTool === 'imageToPdf') {
        setImages(acceptedFiles);
      } else {
        setPdfFiles(acceptedFiles);
      }
      setPreviewUrl(null);
      setExtractedText('');
    },
  });

  const toolList = [
    {
      key: 'imageToPdf',
      title: 'Image to PDF',
      description: 'Convert your images into a single PDF file.',
      icon: UploadCloud,
    },
    {
      key: 'textToPdf',
      title: 'Text to PDF',
      description: 'Convert your typed or pasted text into a clean PDF.',
      icon: FileText,
    },
    {
      key: 'mergePdfs',
      title: 'Merge PDFs',
      description: 'Combine multiple PDF files into one.',
      icon: Layers,
    },
    {
      key: 'extractText',
      title: 'Extract Text',
      description: 'Extract raw text from a PDF file.',
      icon: FileSearch,
    }
  ];

  const downloadBlob = (bytes: Uint8Array, filename: string) => {
    const blob = new Blob([bytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    setPreviewUrl(url);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
  };

  const createPdfFromImages = async () => {
    setLoading(true);
    setError('');
    try {
      const pdfDoc = await PDFDocument.create();
      for (const imgFile of images) {
        const imgBytes = await imgFile.arrayBuffer();
        const image = imgFile.type === 'image/png'
          ? await pdfDoc.embedPng(imgBytes)
          : await pdfDoc.embedJpg(imgBytes);

        const { width, height } = image.scale(1);
        const page = pdfDoc.addPage([width, height]);
        page.drawImage(image, { x: 0, y: 0, width, height });
      }
      const pdfBytes = await pdfDoc.save();
      downloadBlob(pdfBytes, 'images-to-pdf.pdf');
    } catch (err) {
      setError('Failed to generate PDF from images.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createPdfFromText = async () => {
    setLoading(true);
    setError('');
    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();
      const { width, height } = page.getSize();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

      const lines = textContent.split('\n');
      const fontSize = 18;
      let y = height - 50;

      for (const line of lines) {
        page.drawText(line, {
          x: 50,
          y: y,
          size: fontSize,
          font,
          color: rgb(0, 0, 0),
        });
        y -= fontSize + 10;
        if (y < 50) {
          y = height - 50;
          pdfDoc.addPage();
        }
      }

      const pdfBytes = await pdfDoc.save();
      downloadBlob(pdfBytes, 'text-to-pdf.pdf');
    } catch (err) {
      setError('Failed to generate PDF from text.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const mergePdfs = async () => {
    setLoading(true);
    setError('');
    try {
      const mergedPdf = await PDFDocument.create();
      for (const file of pdfFiles) {
        const bytes = await file.arrayBuffer();
        const doc = await PDFDocument.load(bytes);
        const copiedPages = await mergedPdf.copyPages(doc, doc.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }
      const mergedBytes = await mergedPdf.save();
      downloadBlob(mergedBytes, 'merged.pdf');
    } catch (err) {
      setError('Failed to merge PDFs.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const extractTextFromPdf = async () => {
    setLoading(true);
    setError('');
    try {
      if (!pdfFiles[0]) return setError('No PDF selected.');
      const file = pdfFiles[0];
      const bytes = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(bytes);
      const pages = pdfDoc.getPages();
      const textArray = pages.map((p) => p.getTextContent?.()?.items?.map((i: any) => i.str).join(' ') ?? '');
      setExtractedText(textArray.join('\n\n'));
    } catch (err) {
      setError('Failed to extract text.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-5xl mx-auto animate-fadeInUp">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 dark:bg-pink-800 mb-4">
            <FileText className="text-pink-600 dark:text-white" size={32} />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">PDF Converter</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Choose a tool to convert, merge, or extract content from your PDF.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Tool Selector */}
        {!selectedTool && (
          <div className="grid md:grid-cols-2 gap-6">
            {toolList.map((tool) => (
              <div
                key={tool.key}
                onClick={() => setSelectedTool(tool.key)}
                className="cursor-pointer p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition"
              >
                <div className="flex items-center mb-4">
                  <tool.icon size={32} className="text-pink-600 mr-4" />
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{tool.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">{tool.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tool Interfaces */}
        {selectedTool && (
          <div className="mt-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <button onClick={() => setSelectedTool(null)} className="text-pink-600 underline mb-4">← Back</button>

            {selectedTool === 'imageToPdf' && (
              <>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Convert Images to PDF</h2>
                <div {...getRootProps()} className="border-2 border-dashed border-pink-400 rounded-lg p-8 cursor-pointer mb-4">
                  <input {...getInputProps()} />
                  <p className="text-gray-500 dark:text-gray-300">Drag & drop images here, or click to select files</p>
                </div>
                <button
                  onClick={createPdfFromImages}
                  disabled={images.length === 0 || loading}
                  className="mt-4 inline-flex items-center px-8 py-3 bg-pink-600 text-white font-semibold rounded-full hover:bg-pink-700 transition disabled:opacity-50"
                >
                  {loading ? <Loader className="animate-spin mr-2" size={20} /> : <DownloadCloud size={20} className="mr-2" />}
                  Create PDF from Images
                </button>
              </>
            )}

            {selectedTool === 'textToPdf' && (
              <>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Convert Text to PDF</h2>
                <textarea
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  placeholder="Type or paste your text here..."
                  className="w-full p-4 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white h-48 resize-none mb-4"
                />
                <button
                  onClick={createPdfFromText}
                  disabled={!textContent.trim() || loading}
                  className="inline-flex items-center px-8 py-3 bg-pink-600 text-white font-semibold rounded-full hover:bg-pink-700 transition disabled:opacity-50"
                >
                  {loading ? <Loader className="animate-spin mr-2" size={20} /> : <DownloadCloud size={20} className="mr-2" />}
                  Create PDF from Text
                </button>
              </>
            )}

            {selectedTool === 'mergePdfs' && (
              <>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Merge PDF Files</h2>
                <div {...getRootProps()} className="border-2 border-dashed border-pink-400 rounded-lg p-8 cursor-pointer mb-4">
                  <input {...getInputProps()} />
                  <p className="text-gray-500 dark:text-gray-300">Drag & drop PDFs here, or click to select files</p>
                </div>
                <button
                  onClick={mergePdfs}
                  disabled={pdfFiles.length < 2 || loading}
                  className="mt-4 inline-flex items-center px-8 py-3 bg-pink-600 text-white font-semibold rounded-full hover:bg-pink-700 transition disabled:opacity-50"
                >
                  {loading ? <Loader className="animate-spin mr-2" size={20} /> : <DownloadCloud size={20} className="mr-2" />}
                  Merge PDFs
                </button>
              </>
            )}

            {selectedTool === 'extractText' && (
              <>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Extract Text from PDF</h2>
                <div {...getRootProps()} className="border-2 border-dashed border-pink-400 rounded-lg p-8 cursor-pointer mb-4">
                  <input {...getInputProps()} />
                  <p className="text-gray-500 dark:text-gray-300">Drag & drop a PDF here, or click to select file</p>
                </div>
                <button
                  onClick={extractTextFromPdf}
                  disabled={pdfFiles.length === 0 || loading}
                  className="mt-4 inline-flex items-center px-8 py-3 bg-pink-600 text-white font-semibold rounded-full hover:bg-pink-700 transition disabled:opacity-50"
                >
                  {loading ? <Loader className="animate-spin mr-2" size={20} /> : <DownloadCloud size={20} className="mr-2" />}
                  Extract Text
                </button>
                {extractedText && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-white mb-2">Extracted Text:</h3>
                    <pre className="whitespace-pre-wrap bg-gray-200 dark:bg-gray-700 p-4 rounded text-sm text-gray-900 dark:text-white max-h-96 overflow-y-auto">
                      {extractedText}
                    </pre>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Enhanced How to Convert Files Section */}
        <div className="mt-16">
        <div className="bg-gray-50 dark:bg-gray-800 p-10 rounded-lg shadow-md text-center animate-fadeIn">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-10">How to Convert Files to and from PDF Free</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-pink-200 dark:bg-pink-700 flex items-center justify-center text-pink-600 mb-4 shadow-lg animate-bounce">
                <UploadCloud size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Select Your File</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Choose the Word, Excel, PowerPoint, PDF, or any other file you want to convert.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-pink-200 dark:bg-pink-700 flex items-center justify-center text-pink-600 mb-4 shadow-lg animate-bounce delay-200">
                <FileText size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Conversion Happens</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our free PDF converter instantly transforms your document to or from PDF format.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-pink-200 dark:bg-pink-700 flex items-center justify-center text-pink-600 mb-4 shadow-lg animate-bounce delay-400">
                <DownloadCloud size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Download Securely</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Download your new PDF immediately. Uploaded files are auto-deleted for safety.
              </p>
            </div>
          </div>
        </div>
        </div>

         {/* ✅ Feature Description Section */}
         <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
          {[
            { icon: UploadCloud, title: "The Best Free PDF Converter", desc: "No matter what types of files you need to convert, our online file converter is more than just a PDF file converter. It’s the go-to solution for all of your file conversion needs." },
            { icon: FileText, title: "Start a Free Trial", desc: "With a free trial of our online PDF converter, you can convert files to and from PDF for free, or sign up for one of our memberships for limitless access to our file converter’s full suite of tools." },
            { icon: LockIcon, title: "Encrypted Files", desc: "We care about the privacy of your data. 256-bit SSL Encryption of all your files means that your files, documents, and data are secure. We also won’t give or share any of your data with other parties." },
            { icon: Trash2, title: "Auto File Deletion", desc: "After you convert a document to PDF, you’ll be able to download and delete your files from our servers. If you happen to forget about deleting your files, they will be deleted from our server automatically after three hours to ensure your information is secure."},
            { icon: Monitor, title: "Universal Use", desc: "Our free file converter works on any OS, including Windows, Mac, and Linux. Because of this, you can convert files to PDF from any OS or device as long as you have an Internet connection." },
            { icon: Wrench, title: "Powerful PDF Tools", desc: "Our PDF file converter does more than convert files to PDF. From compression and rotation to merging two different PDFs and splitting one PDF into two, you can easily edit your PDF files with our suite of tools in the blink of an eye." },
          ].map(({ icon: Icon, title, desc }, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-xl hover:scale-[1.02] transition-all">
              <div className="text-pink-600 mb-4">
                <Icon size={32} className="mx-auto" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">{title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">{desc}</p>
            </div>
          ))}
        </div>

        {/* PDF Preview */}
        {previewUrl && (
          <div className="mt-12 text-center">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Preview PDF</h3>
            <iframe src={previewUrl} className="w-full h-96 border rounded-lg" title="PDF Preview"></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFConvert;
