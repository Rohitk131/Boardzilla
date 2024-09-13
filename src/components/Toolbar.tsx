import { Pencil, Square, Circle, Undo, Redo, MousePointer2, Type, StickyNote } from 'lucide-react';
import SparklesText from "@/components/ui/sparkles-text";

export default function Home() {
  return (
    <div className="flex items-center justify-between w-3/5 bg-gray-800 h-14 rounded-full shadow-lg text-white border-2 border-gray-700 px-8">
     
      <div className="">
        <SparklesText text="BoardZilla" className="text-center" />
      </div>
      

      <div className="flex items-center justify-center gap-6">
        <MousePointer2 className="w-6 h-6 cursor-pointer hover:text-blue-600 transition duration-200 active:bg-blue-600 active:scale-110 active:rounded-md active:p-[2px]" />
        <Pencil className="w-6 h-6 cursor-pointer hover:text-blue-600 transition duration-200 active:bg-blue-600 active:scale-110 active:rounded-md active:p-[2px]" />
        <Square className="w-6 h-6 cursor-pointer hover:text-blue-600 transition duration-200 active:bg-blue-600 active:scale-110 active:rounded-md active:p-[2px]" />
        <Circle className="w-6 h-6 cursor-pointer hover:text-blue-600 transition duration-200 active:bg-blue-600 active:scale-110 active:rounded-md active:p-[2px]" />
        <Type className="w-6 h-6 cursor-pointer hover:text-blue-600 transition duration-200 active:bg-blue-600 active:scale-110 active:rounded-md active:p-[2px]" />
        <StickyNote className="w-6 h-6 cursor-pointer hover:text-blue-600 transition duration-200 active:bg-blue-600 active:scale-110 active:rounded-md active:p-[2px]" />
      </div>

 
      <div className="flex items-center  gap-4 bg-gray-700 p-2 rounded-full shadow-md">
        <Undo className="w-6 h-6 cursor-pointer hover:text-blue-600 transition duration-200 active:scale-70 active:rounded-md" />
        <Redo className="w-6 h-6 cursor-pointer hover:text-blue-600 transition duration-200 active:scale-70 active:rounded-md" />
      </div>
    </div>
  );
}
