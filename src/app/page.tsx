import Toolbar from '@/components/Toolbar';
import CreateButton from '@/components/CreateButton';

export default function App() {
  return (
    <div className="h-screen w-full flex flex-col justify-start items-center bg-gray-100 relative">
      
      <div className="fixed top-0 w-full flex justify-center pt-4">
        <Toolbar />
      </div>
      <div className="fixed bottom-4 right-4">
        <CreateButton />
      </div>
    </div>
  );
}
