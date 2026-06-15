import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload } from 'lucide-react';
import { dashboardService } from '../services/dashboardService';

function ProductUpload() {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      await dashboardService.uploadDocument(productId!, file);
      navigate(`/products/${productId}`);
    } catch (err: any) {
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-[#60758A] hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Product
      </button>
      <h1 className="mt-6 text-3xl font-semibold text-[#111315]">Upload Manual</h1>
      <p className="mt-2 text-[#60758A]">Select a PDF file to associate with this product.</p>
      <form className="mt-6" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full rounded-xl border border-[rgba(96,117,138,0.2)] p-3 text-[#60758A]"
          required
        />
        {error && <p className="mt-2 text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={uploading}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#111315] px-6 py-3 text-white font-medium transition hover:bg-black/80"
        >
          <Upload className="h-4 w-4" />
          {uploading ? 'Uploading...' : 'Upload PDF'}
        </button>
      </form>
    </div>
  );
}

export default ProductUpload;
