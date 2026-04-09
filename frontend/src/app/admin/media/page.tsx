'use client';

import { useEffect, useRef, useState } from 'react';
import { Upload, Trash2, Image as ImageIcon, FileText, Loader2, Copy, Check } from 'lucide-react';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { mediaApi } from '@/lib/adminApi';

type Media = {
  _id: string;
  filename: string;
  url: string;
  type: 'image' | 'document' | 'video';
  size: number;
  createdAt: string;
};

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function AdminMediaPage() {
  const [items, setItems] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    setLoading(true);
    try { setItems(await mediaApi.list()); } catch (e: any) { setError(e.message); }
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError('');
    try {
      for (let i = 0; i < files.length; i++) {
        await mediaApi.upload(files[i]);
      }
      await load();
    } catch (e: any) { setError(e.message); }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleUpload(e.dataTransfer.files);
  };

  const handleDelete = async () => {
    if (!confirmId) return;
    setDeleting(true);
    try { await mediaApi.remove(confirmId); setConfirmId(null); await load(); }
    catch (e: any) { setError(e.message); }
    setDeleting(false);
  };

  const copyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Media Library</h1>
        <button onClick={() => fileInputRef.current?.click()} disabled={uploading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-60">
          {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
        <input ref={fileInputRef} type="file" multiple accept="image/*"
          className="hidden" onChange={e => handleUpload(e.target.files)} />
      </div>

      {error && <div className="p-3 mb-4 rounded-lg bg-red-50 text-red-700 text-xs">{error}</div>}

      <div
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-slate-200 rounded-2xl p-10 text-center mb-8 hover:border-blue-300 transition-colors cursor-pointer">
        <Upload size={32} className="text-slate-300 mx-auto mb-3" />
        <p className="text-sm text-slate-500">Drag and drop images here, or click to browse</p>
        <p className="text-xs text-slate-400 mt-1">PNG, JPG, WebP up to 10MB</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="animate-spin text-blue-600" size={24} /></div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-100 p-16 text-center text-sm text-slate-400">No media uploaded yet.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {items.map(f => (
            <div key={f._id} className="bg-white rounded-xl border border-slate-100 overflow-hidden group">
              <div className="h-28 bg-slate-50 flex items-center justify-center relative">
                {f.type === 'image' ? (
                  <img src={f.url} alt={f.filename} className="w-full h-full object-cover" />
                ) : f.type === 'document' ? (
                  <FileText size={28} className="text-slate-300" />
                ) : (
                  <ImageIcon size={28} className="text-slate-300" />
                )}
              </div>
              <div className="p-3">
                <p className="text-xs font-medium text-slate-900 truncate" title={f.filename}>{f.filename}</p>
                <p className="text-xs text-slate-400">{formatSize(f.size)}</p>
                <div className="mt-2 flex gap-1">
                  <button onClick={() => copyUrl(f._id, f.url)}
                    className="p-1 text-slate-400 hover:text-blue-600 transition-colors"
                    title="Copy URL">
                    {copiedId === f._id ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                  </button>
                  <button onClick={() => setConfirmId(f._id)}
                    className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                    title="Delete">
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!confirmId}
        message="This file will be permanently deleted from storage."
        onConfirm={handleDelete}
        onCancel={() => setConfirmId(null)}
        loading={deleting}
      />
    </div>
  );
}
