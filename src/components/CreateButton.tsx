import ShinyButton from "@/components/ui/shiny-button";
import Link from 'next/link'; // Correct import for Link

export default function ShinyButtonDemo() {
  return (
    <div className="pr-2 pb-2">
      
      <Link href="https://github.com/Rohitk131">
        
        <ShinyButton text="Created By @Rohitk131" />
      </Link>
    </div>
  );
}
