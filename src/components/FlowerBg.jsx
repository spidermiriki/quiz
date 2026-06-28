function Flower({ cx, cy, scale = 1, rot = 0, petal, center, opacity = 1, floatDur, floatDelay = 0, floatAmp = 8 }) {
  return (
    <g transform={`translate(${cx},${cy}) rotate(${rot}) scale(${scale})`} opacity={opacity}>
      {floatDur && (
        <animateTransform
          attributeName="transform"
          type="translate"
          values={`0,0; 0,-${floatAmp}; 0,0`}
          dur={`${floatDur}s`}
          begin={`${floatDelay}s`}
          repeatCount="indefinite"
          additive="sum"
        />
      )}
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx={0} cy={-22} rx={10} ry={18} fill={petal} transform={`rotate(${a})`} />
      ))}
      <circle cx={0} cy={0} r={10} fill={center} />
      <circle cx={0} cy={0} r={5} fill={petal} opacity={0.4} />
    </g>
  );
}

export default function FlowerBg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
      viewBox="0 0 390 844"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* ── Cluster haut droite ── */}
      <Flower cx={355} cy={48}  scale={1.3}  rot={15}  petal="#d8b4fe" center="#fce7f3" opacity={0.85} floatDur={5}   floatDelay={0}   floatAmp={9} />
      <Flower cx={385} cy={90}  scale={0.75} rot={40}  petal="#c084fc" center="#f5d0fe" opacity={0.7}  floatDur={4.2} floatDelay={1.1} floatAmp={6} />
      <Flower cx={318} cy={82}  scale={0.45} rot={-10} petal="#e9d5ff" center="#fff"    opacity={0.6}  floatDur={6}   floatDelay={0.5} floatAmp={5} />
      <Flower cx={372} cy={16}  scale={0.32} rot={25}  petal="#f0abfc" center="#fff"    opacity={0.5}  floatDur={3.8} floatDelay={2}   floatAmp={4} />
      <Flower cx={340} cy={115} scale={0.28} rot={50}  petal="#d8b4fe" center="#fce7f3" opacity={0.4}  floatDur={5.5} floatDelay={0.8} floatAmp={4} />

      {/* ── Cluster haut gauche ── */}
      <Flower cx={30}  cy={55}  scale={0.7}  rot={-20} petal="#e9d5ff" center="#fff"    opacity={0.65} floatDur={4.8} floatDelay={0.3} floatAmp={7} />
      <Flower cx={68}  cy={22}  scale={0.4}  rot={30}  petal="#d8b4fe" center="#fce7f3" opacity={0.55} floatDur={5.2} floatDelay={1.5} floatAmp={5} />
      <Flower cx={10}  cy={95}  scale={0.28} rot={10}  petal="#c084fc" center="#f5d0fe" opacity={0.4}  floatDur={3.5} floatDelay={0.7} floatAmp={4} />
      <Flower cx={55}  cy={5}   scale={0.22} rot={-35} petal="#e9d5ff" center="#fff"    opacity={0.3}  floatDur={6.5} floatDelay={2.2} floatAmp={3} />

      {/* ── Milieu gauche ── */}
      <Flower cx={12}  cy={260} scale={0.35} rot={0}   petal="#e9d5ff" center="#fff"    opacity={0.4}  floatDur={4.5} floatDelay={1.2} floatAmp={6} />
      <Flower cx={5}   cy={360} scale={0.28} rot={35}  petal="#d8b4fe" center="#fce7f3" opacity={0.35} floatDur={5.8} floatDelay={0.4} floatAmp={5} />
      <Flower cx={18}  cy={450} scale={0.22} rot={20}  petal="#c084fc" center="#f5d0fe" opacity={0.28} floatDur={4.1} floatDelay={1.8} floatAmp={4} />
      <Flower cx={8}   cy={540} scale={0.18} rot={-10} petal="#e9d5ff" center="#fff"    opacity={0.22} floatDur={6.2} floatDelay={0.9} floatAmp={3} />

      {/* ── Milieu droite ── */}
      <Flower cx={380} cy={280} scale={0.38} rot={15}  petal="#f0abfc" center="#fff"    opacity={0.4}  floatDur={5.1} floatDelay={0.6} floatAmp={6} />
      <Flower cx={385} cy={390} scale={0.3}  rot={0}   petal="#e9d5ff" center="#fff"    opacity={0.35} floatDur={4.3} floatDelay={1.4} floatAmp={5} />
      <Flower cx={375} cy={490} scale={0.25} rot={40}  petal="#d8b4fe" center="#fce7f3" opacity={0.3}  floatDur={5.6} floatDelay={0.2} floatAmp={4} />
      <Flower cx={388} cy={600} scale={0.2}  rot={-20} petal="#c084fc" center="#f5d0fe" opacity={0.22} floatDur={3.9} floatDelay={2.1} floatAmp={3} />

      {/* ── Milieu centre (dispersées) ── */}
      <Flower cx={160} cy={185} scale={0.2}  rot={22}  petal="#e9d5ff" center="#fff"    opacity={0.22} floatDur={5.4} floatDelay={1.6} floatAmp={5} />
      <Flower cx={240} cy={210} scale={0.18} rot={-15} petal="#d8b4fe" center="#fce7f3" opacity={0.2}  floatDur={6.8} floatDelay={0.5} floatAmp={4} />
      <Flower cx={100} cy={680} scale={0.2}  rot={10}  petal="#c084fc" center="#f5d0fe" opacity={0.25} floatDur={4.7} floatDelay={1.9} floatAmp={5} />
      <Flower cx={290} cy={700} scale={0.18} rot={-30} petal="#e9d5ff" center="#fff"    opacity={0.22} floatDur={5.3} floatDelay={0.7} floatAmp={4} />

      {/* ── Cluster bas gauche ── */}
      <Flower cx={38}  cy={790} scale={0.9}  rot={10}  petal="#c084fc" center="#f5d0fe" opacity={0.75} floatDur={4.6} floatDelay={0.3} floatAmp={8} />
      <Flower cx={78}  cy={826} scale={0.48} rot={40}  petal="#d8b4fe" center="#fce7f3" opacity={0.6}  floatDur={5.9} floatDelay={1.3} floatAmp={6} />
      <Flower cx={15}  cy={755} scale={0.33} rot={-15} petal="#e9d5ff" center="#fff"    opacity={0.5}  floatDur={4}   floatDelay={0.8} floatAmp={5} />
      <Flower cx={62}  cy={762} scale={0.25} rot={60}  petal="#f0abfc" center="#fff"    opacity={0.4}  floatDur={6.3} floatDelay={2}   floatAmp={4} />
      <Flower cx={110} cy={810} scale={0.2}  rot={-5}  petal="#d8b4fe" center="#fce7f3" opacity={0.3}  floatDur={5}   floatDelay={1.1} floatAmp={3} />

      {/* ── Cluster bas droite ── */}
      <Flower cx={362} cy={808} scale={1.1}  rot={-5}  petal="#d8b4fe" center="#fce7f3" opacity={0.8}  floatDur={5.2} floatDelay={0.4} floatAmp={9} />
      <Flower cx={332} cy={772} scale={0.42} rot={20}  petal="#e9d5ff" center="#fff"    opacity={0.55} floatDur={4.4} floatDelay={1.6} floatAmp={6} />
      <Flower cx={385} cy={762} scale={0.3}  rot={-30} petal="#c084fc" center="#f5d0fe" opacity={0.45} floatDur={6.1} floatDelay={0.9} floatAmp={5} />
      <Flower cx={350} cy={840} scale={0.26} rot={15}  petal="#d8b4fe" center="#fce7f3" opacity={0.4}  floatDur={3.7} floatDelay={2.3} floatAmp={4} />
      <Flower cx={285} cy={790} scale={0.2}  rot={35}  petal="#e9d5ff" center="#fff"    opacity={0.3}  floatDur={5.5} floatDelay={1}   floatAmp={3} />
    </svg>
  );
}
