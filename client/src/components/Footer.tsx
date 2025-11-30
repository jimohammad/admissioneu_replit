import { GraduationCap } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-400">
            <GraduationCap className="w-5 h-5 text-amber-400" />
            <span className="font-semibold text-white">AdmissionEU</span>
          </div>
          
          <div className="text-center text-sm text-slate-500">
            Developed by <span className="text-slate-300 font-medium">Iqbal Sons</span>
          </div>
          
          <div className="text-xs text-slate-600">
            © {new Date().getFullYear()} All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
}
