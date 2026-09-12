const ORBS = [
  // Grands orbes de fond
  { id: 1,  size: 420, top: -8,  left: -6,  color: '#1AA36D', opacity: 0.20, blur: 90,  anim: 'aura-drift-1', dur: 22, delay: 0  },
  { id: 2,  size: 360, top: 55,  left: 60,  color: '#34d399', opacity: 0.15, blur: 75,  anim: 'aura-drift-2', dur: 27, delay: 4  },
  { id: 3,  size: 310, top: -6,  left: 65,  color: '#059669', opacity: 0.16, blur: 65,  anim: 'aura-drift-3', dur: 19, delay: 2  },
  { id: 4,  size: 390, top: 62,  left: -10, color: '#0d9488', opacity: 0.14, blur: 82,  anim: 'aura-drift-4', dur: 24, delay: 7  },
  // Orbes moyens
  { id: 5,  size: 230, top: 22,  left: 38,  color: '#1AA36D', opacity: 0.12, blur: 50,  anim: 'aura-drift-5', dur: 30, delay: 1  },
  { id: 6,  size: 270, top: 78,  left: 22,  color: '#34d399', opacity: 0.13, blur: 58,  anim: 'aura-drift-6', dur: 17, delay: 5  },
  { id: 7,  size: 200, top: 12,  left: 78,  color: '#10b981', opacity: 0.11, blur: 45,  anim: 'aura-drift-2', dur: 32, delay: 9  },
  // Petits orbes
  { id: 8,  size: 130, top: 42,  left: 52,  color: '#6ee7b7', opacity: 0.15, blur: 30,  anim: 'aura-drift-3', dur: 20, delay: 3  },
  { id: 9,  size: 110, top: 68,  left: 72,  color: '#1AA36D', opacity: 0.18, blur: 25,  anim: 'aura-drift-1', dur: 15, delay: 6  },
  { id: 10, size: 170, top: 85,  left: 42,  color: '#059669', opacity: 0.13, blur: 38,  anim: 'aura-drift-4', dur: 26, delay: 11 },
];

export default function FlowerBg() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
    }}>
      {ORBS.map((orb) => (
        <div
          key={orb.id}
          style={{
            position: 'absolute',
            width: orb.size,
            height: orb.size,
            top: `${orb.top}%`,
            left: `${orb.left}%`,
            borderRadius: '50%',
            background: orb.color,
            opacity: orb.opacity,
            filter: `blur(${orb.blur}px)`,
            animation: `${orb.anim} ${orb.dur}s ease-in-out ${orb.delay}s infinite`,
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  );
}
