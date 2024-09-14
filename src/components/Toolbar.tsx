import { useRef, useState } from "react";
import rough from "roughjs/bin/rough"; // Importing rough.js
import { Pencil, Square, Circle, Undo, Redo, MousePointer2, Type, StickyNote } from "lucide-react";
import SparklesText from "@/components/ui/sparkles-text";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [rectMode, setRectMode] = useState(false); // Track if rectangle mode is active
  const [circleMode, setCircleMode] = useState(false); // Track if circle mode is active

  // Handle mouse down event
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if ((rectMode || circleMode) && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setStartPos({ x, y });
      setIsDrawing(true);
    }
  };

  // Handle mouse move event
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDrawing && (rectMode || circleMode) && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const rc = rough.canvas(canvasRef.current);
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Clear the canvas before drawing a new shape
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }

      // Draw the rectangle
      if (rectMode) {
        rc.rectangle(startPos.x, startPos.y, x - startPos.x, y - startPos.y);
      }

      // Draw the circle (using the distance between start and current point as diameter)
      if (circleMode) {
        const radius = Math.sqrt(Math.pow(x - startPos.x, 2) + Math.pow(y - startPos.y, 2));
        rc.circle(startPos.x, startPos.y, radius * 2); // rough.js takes diameter
      }
    }
  };

  // Handle mouse up event
  const handleMouseUp = () => {
    setIsDrawing(false); // Stop drawing
  };

  return (
    <div className="flex items-center justify-between w-3/5 bg-gray-800 h-14 rounded-full shadow-lg text-white border-2 border-gray-700 px-8">
      <div className="flex flex-row">
        <img src="favicon.ico" width={30} height={30} />
        <SparklesText text="BoardZilla" className="text-center" />
      </div>

      <div className="flex items-center pr-12 gap-6">
        <MousePointer2 className="w-6 h-6 cursor-pointer hover:text-blue-600 transition duration-200 active:bg-blue-600 active:scale-110 active:rounded-md active:p-[2px]" />
        <Pencil className="w-6 h-6 cursor-pointer hover:text-blue-600 transition duration-200 active:bg-blue-600 active:scale-110 active:rounded-md active:p-[2px]" />
        
        {/* Toggle Rectangle Mode */}
        <Square
          className={`w-6 h-6 cursor-pointer transition duration-200 active:scale-110 active:rounded-md active:p-[2px] ${
            rectMode ? "bg-blue-600 text-white" : "hover:text-blue-600"
          }`}
          onClick={() => {
            setRectMode(true);
            setCircleMode(false); // Disable circle mode when rectangle mode is enabled
          }}
        />
        
        {/* Toggle Circle Mode */}
        <Circle
          className={`w-6 h-6 cursor-pointer transition duration-200 active:scale-110 active:rounded-md active:p-[2px] ${
            circleMode ? "bg-blue-600 text-white" : "hover:text-blue-600"
          }`}
          onClick={() => {
            setCircleMode(true);
            setRectMode(false); // Disable rectangle mode when circle mode is enabled
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
        width={1600}
        height={1600}
        className="bg-white border-2 border-gray-300"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ position: "absolute", zIndex: -10 }}
      ></canvas>
    </div>
  );
}
