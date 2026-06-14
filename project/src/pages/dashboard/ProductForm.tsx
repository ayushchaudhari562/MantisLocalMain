// Reusable product form for create and edit modes
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import  productService from '../../services/productService';
import { Skeleton } from '../../components/ui/Skeleton';
import type { Product } from '../../types';

function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  // Form state with defaults
  const [form, setForm] = useState({
    name: '',
    category: '',
    description: '',
    image: '',
    status: 'draft' as Product['status'],
  });
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  // Load product data in edit mode
  useEffect(() => {
    if (!id) return;
    productService.getById(id).then((product) => {
      if (product) {
        setForm({
          name: product.name || '',
          category: product.category || '',
          description: product.description || '',
          image: product.image || '',
          status: product.status || 'draft',
        });
      }
      setLoading(false);
    });
  }, [id]);

  // Update form field
  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Submit create or update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSaving(true);

    try {
      if (isEdit && id) {
        await productService.update(id, form);
      } else {
        await productService.create(form);
      }
      navigate('/dashboard/products');
    } catch {
      alert('Failed to save product. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // Loading skeleton for edit mode
  if (loading) {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-[400px] rounded-3xl" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Page header */}
      <div className="mb-10 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-[#60758A] transition hover:bg-white"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-[#111315]">
            {isEdit ? 'Edit Product' : 'New Product'}
          </h1>
          <p className="mt-1 text-[15px] text-[#60758A]">
            {isEdit
              ? 'Update product information and settings.'
              : 'Add a new product to your catalog.'}
          </p>
        </div>
      </div>

      {/* Product form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-3xl border border-[rgba(96,117,138,0.1)] bg-white p-8 shadow-soft-sm"
      >
        {/* Name field */}
        <div>
          <label className="block text-[13px] font-medium text-[#60758A]">
            Product Name
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Enter product name"
            required
            className="mt-2 h-12 w-full rounded-xl border border-[rgba(96,117,138,0.2)] bg-[#F3F5F7] px-4 text-[14px] text-[#111315] outline-none transition placeholder:text-[#9BA6B2] focus:border-[#111315]/30 focus:bg-white"
          />
        </div>

        {/* Category field */}
        <div>
          <label className="block text-[13px] font-medium text-[#60758A]">
            Category
          </label>
          <input
            type="text"
            value={form.category}
            onChange={(e) => handleChange('category', e.target.value)}
            placeholder="e.g. Scooter, Air Conditioner"
            className="mt-2 h-12 w-full rounded-xl border border-[rgba(96,117,138,0.2)] bg-[#F3F5F7] px-4 text-[14px] text-[#111315] outline-none transition placeholder:text-[#9BA6B2] focus:border-[#111315]/30 focus:bg-white"
          />
        </div>

        {/* Description field */}
        <div>
          <label className="block text-[13px] font-medium text-[#60758A]">
            Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Product description..."
            rows={4}
            className="mt-2 w-full rounded-xl border border-[rgba(96,117,138,0.2)] bg-[#F3F5F7] px-4 py-3 text-[14px] text-[#111315] outline-none transition placeholder:text-[#9BA6B2] focus:border-[#111315]/30 focus:bg-white"
          />
        </div>

        {/* Image URL field */}
        <div>
          <label className="block text-[13px] font-medium text-[#60758A]">
            Image URL
          </label>
          <input
            type="url"
            value={form.image}
            onChange={(e) => handleChange('image', e.target.value)}
            placeholder="https://..."
            className="mt-2 h-12 w-full rounded-xl border border-[rgba(96,117,138,0.2)] bg-[#F3F5F7] px-4 text-[14px] text-[#111315] outline-none transition placeholder:text-[#9BA6B2] focus:border-[#111315]/30 focus:bg-white"
          />
        </div>

        {/* Status select */}
        <div>
          <label className="block text-[13px] font-medium text-[#60758A]">
            Status
          </label>
          <select
            value={form.status}
            onChange={(e) => handleChange('status', e.target.value)}
            className="mt-2 h-12 w-full rounded-xl border border-[rgba(96,117,138,0.2)] bg-[#F3F5F7] px-4 text-[14px] text-[#111315] outline-none transition focus:border-[#111315]/30 focus:bg-white"
          >
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {/* Form actions */}
        <div className="flex items-center justify-end gap-4 border-t border-[rgba(96,117,138,0.1)] pt-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-xl border border-[rgba(96,117,138,0.15)] bg-white px-6 py-3 text-[14px] font-medium text-[#111315] transition hover:bg-[#F3F5F7]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-[#111315] px-6 py-3 text-[14px] font-medium text-white transition hover:bg-black/80 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {saving
              ? 'Saving...'
              : isEdit
                ? 'Save Changes'
                : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
