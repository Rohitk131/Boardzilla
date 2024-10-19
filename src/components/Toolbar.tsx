import { useRef, useState } from "react";
import rough from "roughjs/bin/rough"; 
import { Pencil, Square, Circle, Undo, Redo, MousePointer2, Type, StickyNote } from "lucide-react";
import SparklesText from "@/components/ui/sparkles-text";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [shapes, setShapes] = useState([]); // Store drawn shapes
  const [rectMode, setRectMode] = useState(false);
  const [circleMode, setCircleMode] = useState(false);

  // Handle mouse down event
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if ((rectMode || circleMode) && canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setStartPos({ x, y });
      setIsDrawing(true);
    }
  };

  // Handle mouse move event
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (isDrawing && (rectMode || circleMode) && canvas) {
      const rect = canvas.getBoundingClientRect();
      const rc = rough.canvas(canvas);
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Clear only the current drawing area, not the whole canvas
      const context = canvas.getContext("2d");
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Re-draw previous shapes
        shapes.forEach(shape => {
          if (shape.type === "rectangle") {
            rc.rectangle(shape.x, shape.y, shape.width, shape.height);
          } else if (shape.type === "circle") {
            rc.circle(shape.x, shape.y, shape.radius * 2);
          }
        });

        
        if (rectMode) {
          rc.rectangle(startPos.x, startPos.y, x - startPos.x, y - startPos.y);
        } else if (circleMode) {
          const radius = Math.sqrt(Math.pow(x - startPos.x, 2) + Math.pow(y - startPos.y, 2));
          rc.circle(startPos.x, startPos.y, radius * 2);
        }
      }
    }
  };


  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDrawing && (rectMode || circleMode) && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Save the drawn shape to the state
      if (rectMode) {
        setShapes([...shapes, { type: "rectangle", x: startPos.x, y: startPos.y, width: x - startPos.x, height: y - startPos.y }]);
      } else if (circleMode) {
        const radius = Math.sqrt(Math.pow(x - startPos.x, 2) + Math.pow(y - startPos.y, 2));
        setShapes([...shapes, { type: "circle", x: startPos.x, y: startPos.y, radius }]);
      }
      setIsDrawing(false);
    }
  };

  return (
    <div className="flex items-center justify-between w-3/5 bg-gray-800 h-14 rounded-full shadow-lg text-white border-2 border-gray-700 px-8">
      <div className="flex flex-row ">
        <img src="favicon.ico" width={30} height={30} />
        <SparklesText text="BoardZilla" className="text-center" />
      </div>

      <div className="flex items-center pr-12 gap-6">
        <MousePointer2 className="w-6 h-6 cursor-pointer hover:text-blue-600 transition duration-200 active:bg-blue-600 active:scale-110 active:rounded-md active:p-[2px]" />
        <Pencil className="w-6 h-6 cursor-pointer hover:text-blue-600 transition duration-200 active:bg-blue-600 active:scale-110 active:rounded-md active:p-[2px]" />
        
 
        <Square
          className={`w-6 h-6 cursor-pointer transition duration-200 active:scale-110 active:rounded-md active:p-[2px] ${
            rectMode ? "bg-blue-600 text-white" : "hover:text-blue-600"
          }`}
          onClick={() => {
            setRectMode(true);
            setCircleMode(false); 
          }}
        />
        
        
        <Circle
          className={`w-6 h-6 cursor-pointer transition duration-200 active:scale-110 active:rounded-md active:p-[2px] ${
            circleMode ? "bg-blue-600 text-white" : "hover:text-blue-600"
          }`}
          onClick={() => {
            setCircleMode(true);
            setRectMode(false); 
          }}
        />
        <Type className="w-6 h-6 cursor-pointer hover:text-blue-600 transition duration-200 active:bg-blue-600 active:scale-110 active:rounded-md active:p-[2px]" />
        <StickyNote className="w-6 h-6 cursor-pointer hover:text-blue-600 transition duration-200 active:bg-blue-600 active:scale-110 active:rounded-md active:p-[2px]" />
      </div>

      <div className="flex items-center gap-4 bg-gray-700 p-2 rounded-full shadow-md">
        <Undo className="w-6 h-6 cursor-pointer hover:text-blue-600 transition duration-200 active:scale-70 active:rounded-md" />
        <Redo className="w-6 h-6 cursor-pointer hover:text-blue-600 transition duration-200 active:scale-70 active:rounded-md" />
      </div>

      <canvas
  ref={canvasRef}
  id="canvas"
  width={window.innerWidth}
  height={window.innerHeight}
  className="bg-white"
  onMouseDown={handleMouseDown}
  onMouseMove={handleMouseMove}
  onMouseUp={handleMouseUp}
  style={{
    position: "absolute",
    top: 0,
    left: 0,
    width: "100vw", // Full width
    height: "100vh", // Full height
    zIndex: -1, // Behind other elements
  }}
></canvas>

    </div>
  );
}
