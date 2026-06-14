// Drag-and-drop file upload zone with validation
import { useState, useRef, type DragEvent, type ChangeEvent } from 'react';
import { Upload, File, X } from 'lucide-react';

interface FileUploadProps {
  onUpload: (file: File) => void;
  accept?: string;
  maxSizeMB?: number;
}

function FileUpload({
  onUpload,
  accept = '.pdf,.doc,.docx',
  maxSizeMB = 10,
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Validate and set selected file
  const handleFile = (file: File) => {
    setError('');
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File exceeds ${maxSizeMB}MB limit`);
      return;
    }
    setSelectedFile(file);
  };

  // Drag event handlers
  const handleDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  // File input change handler
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFile(e.target.files[0]);
  };

  // Trigger upload callback
  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile);
      setSelectedFile(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed p-10 text-center transition ${
          dragActive
            ? 'border-[#111315] bg-[#F3F5F7]'
            : 'border-[rgba(96,117,138,0.2)] bg-white hover:border-[rgba(96,117,138,0.3)] hover:bg-[#F3F5F7]/50'
        }`}
      >
        <Upload className="h-8 w-8 text-[#60758A]" />
        <p className="mt-4 text-[14px] font-medium text-[#111315]">
          Drop files here or click to browse
        </p>
        <p className="mt-2 text-[13px] text-[#60758A]">
          Supports PDF, DOC up to {maxSizeMB}MB
        </p>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />
      </div>

      {/* Validation error */}
      {error && <p className="text-[13px] text-red-600">{error}</p>}

      {/* Selected file preview */}
      {selectedFile && (
        <div className="flex items-center justify-between rounded-2xl border border-[rgba(96,117,138,0.1)] bg-white p-4">
          <div className="flex items-center gap-3">
            <File className="h-5 w-5 text-[#60758A]" />
            <div>
              <p className="text-[14px] font-medium text-[#111315]">
                {selectedFile.name}
              </p>
              <p className="text-[12px] text-[#60758A]">
                {(selectedFile.size / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleUpload}
              className="rounded-xl bg-[#111315] px-4 py-2 text-[13px] font-medium text-white transition hover:bg-black/80"
            >
              Upload
            </button>
            <button
              onClick={() => setSelectedFile(null)}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-[#60758A] transition hover:bg-[#F3F5F7]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
