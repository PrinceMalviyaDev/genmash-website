'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  isVisible: boolean;
  onClose?: () => void;
}

export default function Toast({ message, type = 'success', isVisible, onClose }: ToastProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-6 right-6 z-[100] flex items-center gap-3 px-5 py-3 bg-white rounded-xl shadow-lg border border-slate-100 max-w-sm"
        >
          {type === 'success' ? (
            <CheckCircle size={20} className="text-emerald-500 shrink-0" />
          ) : (
            <XCircle size={20} className="text-red-500 shrink-0" />
          )}
          <p className="text-sm text-slate-700">{message}</p>
          {onClose && (
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 shrink-0">
              <X size={14} />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
