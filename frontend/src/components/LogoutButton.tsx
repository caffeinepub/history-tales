import React from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

interface LogoutButtonProps {
  variant?: 'default' | 'ghost' | 'outline';
  showLabel?: boolean;
}

export default function LogoutButton({ variant = 'ghost', showLabel = true }: LogoutButtonProps) {
  const { clear, loginStatus } = useInternetIdentity();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  const isLoading = loginStatus === 'logging-in';

  return (
    <Button
      variant={variant}
      size={showLabel ? 'default' : 'icon'}
      onClick={handleLogout}
      disabled={isLoading}
      className="gap-2"
    >
      <LogOut className="h-4 w-4" />
      {showLabel && <span>Sign Out</span>}
    </Button>
  );
}
