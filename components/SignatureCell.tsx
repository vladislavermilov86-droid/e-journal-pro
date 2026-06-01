import React, { useRef, useState, useEffect } from 'react';
import { PenTool, X, Check, Eraser } from 'lucide-react';
import { GradeCell } from '../types.ts';

interface SignatureCellProps {
  grade?: GradeCell;
  onSave: (signature: string | null) => void;
}

const SignatureCell: React.FC<SignatureCellProps> = ({ grade, onSave }) => {
  const [open, setOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (open && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }
  }, [open]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const endDrawing = () => {
    setIsDrawing(false);
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) ctx.beginPath();
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  const handleSave = () => {
    if (canvasRef.current) {
      // Check if blank
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        const pixelBuffer = new Uint32Array(ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height).data.buffer);
        const hasContent = pixelBuffer.some(color => color !== 0);
        if (hasContent) {
          onSave(canvasRef.current.toDataURL());
        } else {
          onSave(null);
        }
      }
    }
    setOpen(false);
  };

  return (
    <>
      <button 
        onClick={() => setOpen(true)} 
        className="w-full h-full flex items-center justify-center hover:bg-slate-100 transition-colors rounded-lg overflow-hidden p-1"
      >
        {grade?.signature ? (
           <img src={grade.signature} alt="Sign" className="max-h-full max-w-full object-contain" />
        ) : (
           <PenTool size={16} className="text-slate-300 hover:text-indigo-500" />
        )}
      </button>

      {open && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-[2rem] shadow-2xl w-[340px] flex flex-col items-center animate-in zoom-in-95 duration-150">
               <div className="w-full flex justify-between items-center mb-4">
                 <h3 className="font-black text-slate-800 text-lg">Подпись преподавателя</h3>
                 <button onClick={clearCanvas} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors" title="Очистить">
                   <Eraser size={18} />
                 </button>
               </div>
               
               <div className="relative border-2 border-slate-200 rounded-2xl bg-slate-50 w-full overflow-hidden shadow-inner">
                 <div className="absolute inset-x-0 top-1/2 border-b-2 border-dashed border-slate-200 pointer-events-none"></div>
                 <canvas 
                   ref={canvasRef} 
                   width={292} 
                   height={140} 
                   className="w-full h-[140px] cursor-crosshair touch-none"
                   onMouseDown={startDrawing}
                   onMouseMove={draw}
                   onMouseUp={endDrawing}
                   onMouseLeave={endDrawing}
                   onTouchStart={startDrawing}
                   onTouchMove={draw}
                   onTouchEnd={endDrawing}
                 />
               </div>

               <div className="flex gap-3 w-full mt-6">
                 <button onClick={() => setOpen(false)} className="flex-[1] py-3 bg-slate-100 text-slate-600 font-bold text-xs rounded-xl hover:bg-slate-200 transition-colors">Отмена</button>
                 <button onClick={handleSave} className="flex-[2] py-3 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                   <Check size={16} /> Сохранить
                 </button>
               </div>
            </div>
         </div>
      )}
    </>
  )
}

export default SignatureCell;
