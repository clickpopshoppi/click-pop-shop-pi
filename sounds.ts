// Sound effect utilities for touch interactions
export const playSound = (soundType: 'Ting_HiFi' | 'Click' | 'Whoosh') => {
  if (typeof window === 'undefined') return;
  
  // Create audio context for web audio
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  
  // Generate different tones for different sound types
  const frequencies: Record<typeof soundType, number> = {
    'Ting_HiFi': 800,
    'Click': 400,
    'Whoosh': 200,
  };
  
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = frequencies[soundType];
  oscillator.type = 'sine';
  
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.3);
};
