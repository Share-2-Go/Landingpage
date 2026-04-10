import React, { useState } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { projectId, publicAnonKey } from '../utils/supabase/info';

// Legge il parametro ?ref= dall'URL corrente
function getReferral(): string {
  try {
    const params = new URLSearchParams(window.location.search);
    return params.get('ref') || '';
  } catch {
    return '';
  }
}

export function WaitlistForm({ onSuccess }: { onSuccess?: () => void }) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    city: '',
    invited_by: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Priorità: ?ref= nell'URL → campo "invited_by" → "organic"
    const urlRef = getReferral();
    const source = urlRef
      ? `ref:${urlRef}`
      : formData.invited_by.trim()
        ? `ref:${formData.invited_by.trim()}`
        : 'organic';

    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-3061b741/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          city: formData.city,
          phone: '',
          source,
        }),
      });

      if (response.ok) {
        setSuccess(true);
        if (onSuccess) onSuccess();
      } else {
        const data = await response.json().catch(() => ({}));
        setError(data.error || 'Si è verificato un errore. Riprova.');
      }
    } catch (err) {
      setError('Errore di connessione. Riprova.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-8 space-y-4 text-center animate-in fade-in zoom-in duration-300">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <div className="space-y-2">
          <p className="text-xl font-bold text-foreground">Richiesta inviata!</p>
          <p className="text-muted-foreground text-sm">Ti abbiamo aggiunto alla lista. A presto!</p>
        </div>
      </div>
    );
  }

  // Il campo "chi ti ha invitato" non compare se c'è già ?ref= nell'URL
  const hasUrlRef = Boolean(getReferral());

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 py-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="first_name" className="text-xs font-bold text-card-foreground mb-1 block">Nome</Label>
          <input
            id="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="Mario"
            required
            className="w-full h-11 bg-input-background border-transparent focus:bg-card focus:border-primary focus:ring-0 rounded-xl px-4 text-sm text-foreground placeholder:text-muted-foreground font-medium transition-all"
          />
        </div>
        <div>
          <Label htmlFor="last_name" className="text-xs font-bold text-card-foreground mb-1 block">Cognome</Label>
          <input
            id="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Rossi"
            required
            className="w-full h-11 bg-input-background border-transparent focus:bg-card focus:border-primary focus:ring-0 rounded-xl px-4 text-sm text-foreground placeholder:text-muted-foreground font-medium transition-all"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="email" className="text-xs font-bold text-card-foreground mb-1 block">Email</Label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="mario@esempio.com"
          required
          className="w-full h-11 bg-input-background border-transparent focus:bg-card focus:border-primary focus:ring-0 rounded-xl px-4 text-sm text-foreground placeholder:text-muted-foreground font-medium transition-all"
        />
      </div>

      <div>
        <Label htmlFor="city" className="text-xs font-bold text-card-foreground mb-1 block">Città</Label>
        <input
          id="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="Milano"
          required
          className="w-full h-11 bg-input-background border-transparent focus:bg-card focus:border-primary focus:ring-0 rounded-xl px-4 text-sm text-foreground placeholder:text-muted-foreground font-medium transition-all"
        />
      </div>

      {/* Mostrato solo se non c'è già ?ref= nell'URL */}
      {!hasUrlRef && (
        <div>
          <Label htmlFor="invited_by" className="text-xs font-bold text-card-foreground mb-1 block">
            Chi ti ha invitato?{' '}
            <span className="font-normal text-muted-foreground">(opzionale)</span>
          </Label>
          <input
            id="invited_by"
            value={formData.invited_by}
            onChange={handleChange}
            placeholder="Nome di chi ti ha mandato il link"
            className="w-full h-11 bg-input-background border-transparent focus:bg-card focus:border-primary focus:ring-0 rounded-xl px-4 text-sm text-foreground placeholder:text-muted-foreground font-medium transition-all"
          />
        </div>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="pt-2">
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-12 font-bold text-base cursor-pointer"
        >
          {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Iscriviti"}
        </Button>
      </div>

      <p className="text-[11px] text-muted-foreground text-center leading-snug">
        Zero spam, cancellazione in un click.
      </p>
    </form>
  );
}