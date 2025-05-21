
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarToggleProps {
  setSidebarOpen: (open: boolean) => void;
}

export function SidebarToggle({ setSidebarOpen }: SidebarToggleProps) {
  return (
    <div className="p-4 md:hidden">
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu className="h-5 w-5 mr-2" />
        Show Course Content
      </Button>
    </div>
  );
}
