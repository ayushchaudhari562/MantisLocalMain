// Document management page for a specific product
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Trash2 } from 'lucide-react';
import { dashboardService } from '../../services/dashboardService';
import  productService  from '../../services/productService';
import FileUpload from '../../components/ui/FileUpload';
import { Skeleton } from '../../components/ui/Skeleton';
import ErrorState from '../../components/ui/ErrorState';
import type { Product, Resource } from '../../types';

function ProductDocs() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [documents, setDocuments] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch product info and documents
  const fetchData = () => {
    if (!id) return;
    setLoading(true);
    setError(false);
    Promise.all([
      productService.getById(id),
      dashboardService.getDocuments(id),
    ])
      .then(([prod, docs]) => {
        setProduct(prod);
        setDocuments(docs);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  // Handle file upload
  const handleUpload = async (file: File) => {
    if (!id) return;
    try {
      const newDoc = await dashboardService.uploadDocument(id, file);
      setDocuments((prev) => [...prev, newDoc]);
    } catch {
      alert('Upload failed. Please try again.');
    }
  };

  // Handle document deletion
  const handleDelete = async (docId: string) => {
    if (!confirm('Delete this document?')) return;
    try {
      await dashboardService.deleteDocument(docId);
      setDocuments((prev) => prev.filter((d) => d.id !== docId));
    } catch {
      alert('Failed to delete document.');
    }
  };

  // Resource type display label
  const typeLabel = (type: string) => {
    const labels: Record<string, string> = {
      manual: 'PDF Manual',
      diagram: 'Diagram',
      guide: 'Guide',
      datasheet: 'Datasheet',
      video: 'Video',
    };
    return labels[type] || 'Document';
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-[200px] rounded-3xl" />
        <Skeleton className="h-[300px] rounded-3xl" />
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return <ErrorState title="Product not found" onRetry={fetchData} />;
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Page header */}
      <div className="mb-10 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-[#60758A] transition hover:bg-white"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <p className="text-[13px] text-[#60758A]">{product.name}</p>
          <h1 className="text-3xl font-semibold tracking-tight text-[#111315]">
            Manage Documents
          </h1>
        </div>
      </div>

      {/* File upload zone */}
      <div className="mb-8">
        <FileUpload onUpload={handleUpload} />
      </div>

      {/* Documents list */}
      <div className="rounded-3xl border border-[rgba(96,117,138,0.1)] bg-white p-6 shadow-soft-sm">
        <h2 className="text-lg font-semibold text-[#111315]">
          Uploaded Documents
        </h2>

        {documents.length === 0 ? (
          <p className="mt-6 text-[14px] text-[#60758A]">
            No documents uploaded yet.
          </p>
        ) : (
          <div className="mt-6 space-y-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between rounded-2xl bg-[#F3F5F7] p-4 transition hover:bg-[#EEF2F5]"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-[#60758A]" />
                  <div>
                    <a 
                      href={(doc as any).file_url || doc.url || '#'} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[14px] font-medium text-[#111315] hover:underline"
                    >
                      {doc.title}
                    </a>
                    <p className="text-[12px] text-[#60758A]">
                      {typeLabel(doc.type)}
                      {doc.fileSize && ` · ${doc.fileSize}`}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(doc.id)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-[#60758A] transition hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDocs;
