import { useEffect, useRef, useState, useCallback } from 'react';
import VapiModule from '@vapi-ai/web';

// Handle both ESM default and CJS interop
const Vapi = (VapiModule as unknown as { default: typeof VapiModule }).default ?? VapiModule;

const VAPI_PUBLIC_KEY = import.meta.env.VITE_VAPI_PUBLIC_KEY;
const ASSISTANT_ID_0 = import.meta.env.VITE_VAPI_ASSISTANT_ID_0;
const ASSISTANT_ID_1 = import.meta.env.VITE_VAPI_ASSISTANT_ID_1;

export type VapiStatus = 'idle' | 'connecting' | 'active' | 'ending';

export const useVapi = (forAgent?: string) => {
  const ASSISTANT_ID = forAgent === 'demo' ? ASSISTANT_ID_0 : ASSISTANT_ID_1;
  const vapiRef = useRef<InstanceType<typeof Vapi> | null>(null);
  const [status, setStatus] = useState<VapiStatus>('idle');
  const [isMuted, setIsMuted] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);

  useEffect(() => {
    const vapi = new Vapi(VAPI_PUBLIC_KEY);
    vapiRef.current = vapi;

    vapi.on('call-start', () => setStatus('active'));
    vapi.on('call-end', () => {
      setStatus('idle');
      setIsMuted(false);
      setVolumeLevel(0);
    });
    vapi.on('volume-level', (level: number) => setVolumeLevel(level));
    vapi.on('error', () => setStatus('idle'));

    return () => {
      vapi.stop();
      vapiRef.current = null;
    };
  }, []);

  const startCall = useCallback(async () => {
    if (!vapiRef.current || status !== 'idle') return;
    setStatus('connecting');
    try {
      await vapiRef.current.start(ASSISTANT_ID);
    } catch {
      setStatus('idle');
    }
  }, [status]);

  const endCall = useCallback(() => {
    if (!vapiRef.current) return;
    setStatus('ending');
    vapiRef.current.stop();
  }, []);

  const toggleMute = useCallback(() => {
    if (!vapiRef.current) return;
    const newMuted = !isMuted;
    vapiRef.current.setMuted(newMuted);
    setIsMuted(newMuted);
  }, [isMuted]);

  return { status, isMuted, volumeLevel, startCall, endCall, toggleMute };
};
