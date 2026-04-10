import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { WaitlistForm } from './WaitlistForm';
import { Gift } from 'lucide-react';

export function JoinWaitlistModal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      setOpen(false);
      setSuccess(false);
    }, 3000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-card overflow-y-auto max-h-[90vh] border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-card-foreground">Unisciti alla rivoluzione</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Iscriviti alla lista d'attesa. Ti avviseremo non appena saremo attivi nella tua zona.
          </DialogDescription>
        </DialogHeader>

        {/* Voucher Banner */}
        {!success && (
          <div className="bg-gradient-to-r from-secondary to-secondary/80 p-4 rounded-xl flex items-center gap-3 text-white shadow-md">
            <div className="bg-white/20 p-2 rounded-lg">
              <Gift className="w-6 h-6 text-yellow-300" />
            </div>
            <div>
              <p className="font-bold text-sm">Bonus esclusivo</p>
              <p className="text-xs text-white/90">Iscriviti ora e ricevi un buono di 20€</p>
            </div>
          </div>
        )}
        
        <WaitlistForm onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
}
