
import React, { useState, useRef, useEffect } from 'react';
import { 
  Plus, Save, Trash2, Eraser, Pen, Square, Circle, 
  Minus, Palette, Maximize2, Minimize2, 
  ChevronLeft, ChevronRight, Image as ImageIcon, MousePointer2, Layers, Type as TypeIcon, Grid, X
} from 'lucide-react';
import { DrawingBoard } from '../types';

interface BoardPageProps {
  boards: DrawingBoard[];
  setBoards: React.Dispatch<React.SetStateAction<DrawingBoard[]>>;
}

const COLORS = [
  '#1e293b', // Slate
  '#ef4444', // Red
  '#10b981', // Emerald
  '#3b82f6', // Blue
  '#f59e0b', // Amber
  '#8b5cf6', // Violet
  '#ffffff', // White
];

type Tool = 'select' | 'pen' | 'marker' | 'eraser' | 'rect' | 'circle' | 'line' | 'text';

interface ActiveImage {
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  aspectRatio: number;
}

interface ActiveText {
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
  color: string;
  fontSize: number;
}

const BoardPage: React.FC<BoardPageProps> = ({ boards, setBoards }) => {
  const [activeBoardId, setActiveBoardId] = useState<string | null>(boards[0]?.id || null);
  const [isCreating, setIsCreating] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isZenMode, setIsZenMode] = useState(false);
  
  const [tool, setTool] = useState<Tool>('pen');
  const [color, setColor] = useState(COLORS[0]);
  const [lineWidth, setLineWidth] = useState(4);
  const [hasGrid, setHasGrid] = useState(true);

  // --- Image & Text Manipulation State ---
  const [activeImage, setActiveImage] = useState<ActiveImage | null>(null);
  const [activeText, setActiveText] = useState<ActiveText | null>(null);
  
  // Refs for drag/resize logic
  const isDraggingImage = useRef(false);
  const isDraggingText = useRef(false);
  
  const isResizingImage = useRef(false);
  const isResizingText = useRef(false);
  const resizeHandle = useRef<string | null>(null);
  
  const lastMousePos = useRef({ x: 0, y: 0 });
  const initialImageState = useRef<ActiveImage | null>(null);
  const initialTextState = useRef<ActiveText | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isDrawing = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });

  const activeBoard = boards.find(b => b.id === activeBoardId);

  useEffect(() => {
    if (activeBoard && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (activeBoard.data) {
          const img = new Image();
          img.onload = () => {
            ctx.drawImage(img, 0, 0);
          };
          img.src = activeBoard.data;
        }
      }
    }
  }, [activeBoardId]);

  // Coordinate system conversion (Screen <-> Canvas 1920x1080)
  const getCorrectedPos = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    if (!canvasRef.current) return { x: 0, y: 0, scale: 1 };
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    let clientX, clientY;
    if ('touches' in e && (e as TouchEvent).touches && (e as TouchEvent).touches.length > 0) {
      clientX = (e as TouchEvent).touches[0].clientX;
      clientY = (e as TouchEvent).touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = (e as MouseEvent).clientX;
      clientY = (e as MouseEvent).clientY;
    } else {
        return { x: 0, y: 0, scale: 1 };
    }
    
    const xRel = clientX - rect.left;
    const yRel = clientY - rect.top;

    const canvasW = 1920;
    const canvasH = 1080;
    const canvasRatio = canvasW / canvasH;
    const rectRatio = rect.width / rect.height;

    let scale = 1;
    let offsetX = 0;
    let offsetY = 0;

    if (rectRatio > canvasRatio) {
      scale = rect.height / canvasH;
      const actualWidth = canvasW * scale;
      offsetX = (rect.width - actualWidth) / 2;
    } else {
      scale = rect.width / canvasW;
      const actualHeight = canvasH * scale;
      offsetY = (rect.height - actualHeight) / 2;
    }

    return {
      x: (xRel - offsetX) / scale,
      y: (yRel - offsetY) / scale,
      scale
    };
  };

  // --- DRAWING LOGIC ---

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const pos = getCorrectedPos(e);
    
    if (tool === 'text') {
        if (activeText) {
            applyTextToCanvas();
        }
        const defaultHeight = 60;
        setActiveText({
            x: pos.x,
            y: pos.y,
            width: 300,
            height: defaultHeight,
            text: '',
            color: color,
            fontSize: defaultHeight * 0.8
        });
        setTool('select');
        return;
    }

    if (tool === 'select') return;
    if (isDraggingImage.current || isResizingImage.current || isDraggingText.current || isResizingText.current) return;

    if (!activeBoardId || !canvasRef.current) return;
    
    isDrawing.current = true;
    startPos.current = pos;

    const ctx = canvasRef.current.getContext('2d');
    if (ctx && (tool === 'pen' || tool === 'marker' || tool === 'eraser')) {
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color;
      ctx.lineWidth = tool === 'marker' ? lineWidth * 3 : lineWidth;
      ctx.globalAlpha = tool === 'marker' ? 0.35 : 1.0;
      ctx.globalCompositeOperation = 'source-over';
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if ((activeImage || activeText) && tool === 'select') {
      handleInteractionMove(e);
      return;
    }
    
    if (!isDrawing.current || !activeBoardId || !canvasRef.current) return;
    const pos = getCorrectedPos(e);

    if (tool === 'pen' || tool === 'marker' || tool === 'eraser') {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
      }
    } else {
      const overlayCtx = overlayCanvasRef.current?.getContext('2d');
      if (overlayCtx && overlayCanvasRef.current) {
        overlayCtx.clearRect(0, 0, overlayCanvasRef.current.width, overlayCanvasRef.current.height);
        overlayCtx.beginPath();
        overlayCtx.strokeStyle = color;
        overlayCtx.lineWidth = lineWidth;
        overlayCtx.globalAlpha = 1.0;
        
        if (tool === 'rect') {
          overlayCtx.strokeRect(startPos.current.x, startPos.current.y, pos.x - startPos.current.x, pos.y - startPos.current.y);
        } else if (tool === 'circle') {
          const radius = Math.sqrt(Math.pow(pos.x - startPos.current.x, 2) + Math.pow(pos.y - startPos.current.y, 2));
          overlayCtx.arc(startPos.current.x, startPos.current.y, radius, 0, 2 * Math.PI);
          overlayCtx.stroke();
        } else if (tool === 'line') {
          overlayCtx.moveTo(startPos.current.x, startPos.current.y);
          overlayCtx.lineTo(pos.x, pos.y);
          overlayCtx.stroke();
        }
      }
    }
  };

  const stopDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if (isDraggingImage.current || isResizingImage.current || isDraggingText.current || isResizingText.current) {
      handleInteractionEnd();
      return;
    }

    if (!isDrawing.current || !activeBoardId || !canvasRef.current) return;
    isDrawing.current = false;

    if (tool !== 'pen' && tool !== 'marker' && tool !== 'eraser') {
      const pos = getCorrectedPos(e);
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.globalAlpha = 1.0;
        if (tool === 'rect') {
          ctx.strokeRect(startPos.current.x, startPos.current.y, pos.x - startPos.current.x, pos.y - startPos.current.y);
        } else if (tool === 'circle') {
          const radius = Math.sqrt(Math.pow(pos.x - startPos.current.x, 2) + Math.pow(pos.y - startPos.current.y, 2));
          ctx.arc(startPos.current.x, startPos.current.y, radius, 0, 2 * Math.PI);
          ctx.stroke();
        } else if (tool === 'line') {
          ctx.moveTo(startPos.current.x, startPos.current.y);
          ctx.lineTo(pos.x, pos.y);
          ctx.stroke();
        }
      }
      overlayCanvasRef.current?.getContext('2d')?.clearRect(0, 0, overlayCanvasRef.current!.width, overlayCanvasRef.current!.height);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (activeImage) applyImageToCanvas();
    if (activeText) applyTextToCanvas();

    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const initialH = 400;
        const ratio = img.width / img.height;
        const initialW = initialH * ratio;
        
        setActiveImage({
          src: event.target?.result as string,
          x: (1920 - initialW) / 2,
          y: (1080 - initialH) / 2,
          width: initialW,
          height: initialH,
          aspectRatio: ratio
        });
        setTool('select'); 
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const applyImageToCanvas = () => {
    if (!activeImage || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (ctx) {
      const img = new Image();
      img.onload = () => {
        ctx.globalAlpha = 1.0;
        ctx.globalCompositeOperation = 'destination-over';
        ctx.drawImage(img, activeImage.x, activeImage.y, activeImage.width, activeImage.height);
        ctx.globalCompositeOperation = 'source-over';
        setActiveImage(null);
      };
      img.src = activeImage.src;
    }
  };

  const applyTextToCanvas = () => {
    if (!activeText || !activeText.text.trim() || !canvasRef.current) {
        setActiveText(null);
        return;
    }
    const ctx = canvasRef.current.getContext('2d');
    if (ctx) {
        ctx.globalAlpha = 1.0;
        ctx.fillStyle = activeText.color;
        ctx.font = `bold ${activeText.fontSize}px sans-serif`;
        ctx.textBaseline = 'top';
        ctx.fillText(activeText.text, activeText.x, activeText.y, activeText.width);
        setActiveText(null);
    }
  };

  const handleMouseDown = (e: React.MouseEvent, type: 'image' | 'text') => {
    if (tool !== 'select') return;
    e.stopPropagation();
    e.preventDefault(); 

    const pos = getCorrectedPos(e);
    lastMousePos.current = { x: pos.x, y: pos.y };

    if (type === 'image' && activeImage) {
        isDraggingImage.current = true;
    } else if (type === 'text' && activeText) {
        isDraggingText.current = true;
    }
  };

  const handleHandleMouseDown = (e: React.MouseEvent, handle: string, type: 'image' | 'text') => {
    if (tool !== 'select') return;
    e.stopPropagation();
    e.preventDefault();
    
    if (type === 'image' && activeImage) {
        isResizingImage.current = true;
        resizeHandle.current = handle;
        initialImageState.current = { ...activeImage };
    } else if (type === 'text' && activeText) {
        isResizingText.current = true;
        resizeHandle.current = handle;
        initialTextState.current = { ...activeText };
    }

    const pos = getCorrectedPos(e);
    lastMousePos.current = { x: pos.x, y: pos.y };
  };

  const handleInteractionMove = (e: React.MouseEvent | React.TouchEvent) => {
    const pos = getCorrectedPos(e);
    const dx = pos.x - lastMousePos.current.x;
    const dy = pos.y - lastMousePos.current.y;
    
    if (isDraggingImage.current && activeImage) {
      setActiveImage(prev => prev ? ({ ...prev, x: prev.x + dx, y: prev.y + dy }) : null);
      lastMousePos.current = { x: pos.x, y: pos.y };
    } 
    else if (isDraggingText.current && activeText) {
      setActiveText(prev => prev ? ({ ...prev, x: prev.x + dx, y: prev.y + dy }) : null);
      lastMousePos.current = { x: pos.x, y: pos.y };
    }
    else if (isResizingImage.current && initialImageState.current && activeImage) {
      const current = { ...activeImage };
      const ratio = current.aspectRatio;
      let newW = Math.max(50, current.width + dx);
      let newH = newW / ratio;
      setActiveImage({ ...current, width: newW, height: newH });
      lastMousePos.current = { x: pos.x, y: pos.y };
    }
    else if (isResizingText.current && initialTextState.current && activeText) {
      const current = { ...activeText };
      let newW = Math.max(50, current.width + dx);
      let newH = Math.max(20, current.height + dy);
      const newFontSize = newH * 0.8;
      setActiveText({ ...current, width: newW, height: newH, fontSize: newFontSize });
      lastMousePos.current = { x: pos.x, y: pos.y };
    }
  };

  const handleInteractionEnd = () => {
    isDraggingImage.current = false;
    isDraggingText.current = false;
    isResizingImage.current = false;
    isResizingText.current = false;
    resizeHandle.current = null;
    initialImageState.current = null;
    initialTextState.current = null;
  };

  const handleCreateBoard = () => {
    if (!newBoardName.trim()) return;
    const newBoard: DrawingBoard = {
      id: Math.random().toString(36).substr(2, 9),
      name: newBoardName,
      data: '',
      createdAt: new Date().toISOString()
    };
    setBoards(prev => [newBoard, ...prev]);
    setActiveBoardId(newBoard.id);
    setNewBoardName('');
    setIsCreating(false);
  };

  const handleSaveBoard = () => {
    if (!activeBoardId || !canvasRef.current) return;

    const performSave = () => {
        const dataUrl = canvasRef.current!.toDataURL();
        // FIX: Fixed state update logic to correctly find and update the active board by ID.
        setBoards(prev => prev.map(b => b.id === activeBoardId ? { ...b, data: dataUrl } : b));
        alert('Доска сохранена');
    };
    performSave();
  };

  const handleDeleteBoard = (id: string) => {
    if (confirm('Удалить эту доску?')) {
      setBoards(prev => prev.filter(b => b.id !== id));
      if (activeBoardId === id) setActiveBoardId(boards.find(b => b.id !== id)?.id || null);
    }
  };

  const handleApplyText = () => {
    applyTextToCanvas();
  };

  const handleCancelText = () => {
    setActiveText(null);
  };

  // FIX: Added return statement to satisfy React.FC requirements and completed the UI.
  return (
    <div className={`flex flex-col xl:flex-row h-full bg-slate-100 rounded-[2.5rem] overflow-hidden ${isZenMode ? 'fixed inset-0 z-[100] rounded-none' : 'relative'}`}>
      {!isZenMode && isSidebarOpen && (
        <div className="w-80 bg-white border-r border-slate-200 flex flex-col shrink-0">
          <div className="p-8 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-800">Доски</h2>
            <button onClick={() => setIsCreating(true)} className="p-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-all">
              <Plus size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {isCreating && (
              <div className="p-4 bg-indigo-50 rounded-2xl mb-4">
                <input 
                  autoFocus 
                  className="w-full bg-white px-4 py-2 rounded-xl mb-3 outline-none"
                  placeholder="Название..."
                  value={newBoardName}
                  onChange={e => setNewBoardName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleCreateBoard()}
                />
                <div className="flex gap-2">
                  <button onClick={handleCreateBoard} className="flex-1 py-2 bg-indigo-600 text-white rounded-xl text-xs font-black">Создать</button>
                  <button onClick={() => setIsCreating(false)} className="flex-1 py-2 bg-white text-slate-400 rounded-xl text-xs font-bold">Отмена</button>
                </div>
              </div>
            )}
            {boards.map(b => (
              <div 
                key={b.id}
                onClick={() => setActiveBoardId(b.id)}
                className={`p-4 rounded-2xl cursor-pointer flex items-center justify-between transition-all ${activeBoardId === b.id ? 'bg-indigo-600 text-white' : 'bg-white hover:bg-slate-50 border border-slate-100'}`}
              >
                <span className="font-bold truncate">{b.name}</span>
                <button onClick={e => { e.stopPropagation(); handleDeleteBoard(b.id); }} className="p-1 hover:bg-white/20 rounded">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <div className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-400">
              {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
            </button>
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl">
              <ToolBtn icon={<MousePointer2 size={18} />} active={tool === 'select'} onClick={() => setTool('select')} />
              <ToolBtn icon={<Pen size={18} />} active={tool === 'pen'} onClick={() => setTool('pen')} />
              <ToolBtn icon={<Palette size={18} />} active={tool === 'marker'} onClick={() => setTool('marker')} />
              <ToolBtn icon={<Eraser size={18} />} active={tool === 'eraser'} onClick={() => setTool('eraser')} />
              <div className="w-px h-6 bg-slate-300 mx-1" />
              <ToolBtn icon={<Square size={18} />} active={tool === 'rect'} onClick={() => setTool('rect')} />
              <ToolBtn icon={<Circle size={18} />} active={tool === 'circle'} onClick={() => setTool('circle')} />
              <ToolBtn icon={<TypeIcon size={18} />} active={tool === 'text'} onClick={() => setTool('text')} />
            </div>
            <div className="flex gap-2 ml-4">
              {COLORS.map(c => (
                <button 
                  key={c} 
                  onClick={() => setColor(c)} 
                  className={`w-6 h-6 rounded-full border-2 ${color === c ? 'border-indigo-600 scale-110' : 'border-transparent'}`} 
                  style={{ backgroundColor: c }} 
                />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
             <button onClick={() => setIsZenMode(!isZenMode)} className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition-all">
               {isZenMode ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
             </button>
            <button onClick={handleSaveBoard} className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black">
              <Save size={18} /> Сохранить
            </button>
          </div>
        </div>

        <div className={`flex-1 relative flex items-center justify-center p-8 transition-colors ${isZenMode ? 'bg-slate-900' : 'bg-slate-100'}`}>
          {!activeBoardId ? (
            <div className="text-slate-400 font-bold">Выберите доску для начала</div>
          ) : (
            <div className="relative bg-white shadow-2xl overflow-hidden" style={{ width: 'min(90vw, 1920px)', aspectRatio: '16/9' }}>
              <canvas 
                ref={canvasRef} 
                width={1920} 
                height={1080} 
                className="absolute inset-0 w-full h-full"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
              />
              <canvas ref={overlayCanvasRef} width={1920} height={1080} className="absolute inset-0 w-full h-full pointer-events-none" />
              
              {activeImage && (
                <div 
                  className="absolute border-4 border-indigo-500 cursor-move"
                  style={{ left: `${(activeImage.x/1920)*100}%`, top: `${(activeImage.y/1080)*100}%`, width: `${(activeImage.width/1920)*100}%`, height: `${(activeImage.height/1080)*100}%` }}
                  onMouseDown={e => handleMouseDown(e, 'image')}
                >
                  <img src={activeImage.src} className="w-full h-full pointer-events-none" />
                  <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-indigo-600 rounded-full cursor-se-resize" onMouseDown={e => handleHandleMouseDown(e, 'br', 'image')} />
                </div>
              )}

              {activeText && (
                <div 
                  className="absolute border-2 border-dashed border-indigo-400 p-2"
                  style={{ left: `${(activeText.x/1920)*100}%`, top: `${(activeText.y/1080)*100}%`, width: `${(activeText.width/1920)*100}%`, height: `${(activeText.height/1080)*100}%` }}
                  onMouseDown={e => handleMouseDown(e, 'text')}
                >
                  <textarea 
                    className="w-full h-full bg-transparent border-none outline-none font-bold"
                    style={{ color: activeText.color, fontSize: `${(activeText.fontSize/1080)*100}vh` }}
                    value={activeText.text}
                    onChange={e => setActiveText({...activeText, text: e.target.value})}
                  />
                  <div className="absolute -top-10 left-0 flex gap-2">
                    <button onClick={handleApplyText} className="bg-indigo-600 text-white px-2 py-1 rounded">Apply</button>
                    <button onClick={handleCancelText} className="bg-red-500 text-white px-2 py-1 rounded">Cancel</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ToolBtn = ({ icon, active, onClick }: { icon: React.ReactNode, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`p-2 rounded-xl ${active ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:bg-white hover:text-indigo-600'}`}
  >
    {icon}
  </button>
);

export default BoardPage;
