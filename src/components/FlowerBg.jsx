function Flower({ cx, cy, scale = 1, rot = 0, petal, center, opacity = 1 }) {
  const angles = [0, 72, 144, 216, 288];
  return (
    <g
      transform={`translate(${cx},${cy}) rotate(${rot}) scale(${scale})`}
      opacity={opacity}
    >
      {angles.map((a) => (
        <ellipse
          key={a}
          cx={0}
          cy={-22}
          rx={10}
          ry={18}
          fill={petal}
          transform={`rotate(${a})`}
        />
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
      {/* Cluster haut droite */}
      <Flower cx={355} cy={48}  scale={1.3}  rot={15}  petal="#d8b4fe" center="#fce7f3" opacity={0.85} />
      <Flower cx={385} cy={90}  scale={0.75} rot={40}  petal="#c084fc" center="#f5d0fe" opacity={0.7}  />
      <Flower cx={318} cy={82}  scale={0.45} rot={-10} petal="#e9d5ff" center="#fff"    opacity={0.6}  />
      <Flower cx={372} cy={16}  scale={0.32} rot={25}  petal="#f0abfc" center="#fff"    opacity={0.5}  />
      <Flower cx={340} cy={110} scale={0.28} rot={50}  petal="#d8b4fe" center="#fce7f3" opacity={0.45} />

      {/* Cluster haut gauche */}
      <Flower cx={30}  cy={55}  scale={0.7}  rot={-20} petal="#e9d5ff" center="#fff"    opacity={0.65} />
      <Flower cx={68}  cy={22}  scale={0.4}  rot={30}  petal="#d8b4fe" center="#fce7f3" opacity={0.55} />
      <Flower cx={10}  cy={90}  scale={0.28} rot={10}  petal="#c084fc" center="#f5d0fe" opacity={0.4}  />

      {/* Accent milieu gauche */}
      <Flower cx={12}  cy={360} scale={0.28} rot={0}   petal="#e9d5ff" center="#fff"    opacity={0.35} />
      <Flower cx={5}   cy={420} scale={0.22} rot={35}  petal="#d8b4fe" center="#fce7f3" opacity={0.3}  />

      {/* Accent milieu droite */}
      <Flower cx={380} cy={490} scale={0.3}  rot={0}   petal="#e9d5ff" center="#fff"    opacity={0.35} />
      <Flower cx={385} cy={550} scale={0.22} rot={20}  petal="#c084fc" center="#f5d0fe" opacity={0.3}  />

      {/* Cluster bas gauche */}
      <Flower cx={38}  cy={790} scale={0.9}  rot={10}  petal="#c084fc" center="#f5d0fe" opacity={0.75} />
      <Flower cx={78}  cy={824} scale={0.48} rot={40}  petal="#d8b4fe" center="#fce7f3" opacity={0.6}  />
      <Flower cx={15}  cy={755} scale={0.33} rot={-15} petal="#e9d5ff" center="#fff"    opacity={0.5}  />
      <Flower cx={62}  cy={760} scale={0.25} rot={60}  petal="#f0abfc" center="#fff"    opacity={0.4}  />

      {/* Cluster bas droite */}
      <Flower cx={362} cy={808} scale={1.1}  rot={-5}  petal="#d8b4fe" center="#fce7f3" opacity={0.8}  />
      <Flower cx={332} cy={770} scale={0.42} rot={20}  petal="#e9d5ff" center="#fff"    opacity={0.55} />
      <Flower cx={385} cy={760} scale={0.3}  rot={-30} petal="#c084fc" center="#f5d0fe" opacity={0.45} />
      <Flower cx={350} cy={840} scale={0.26} rot={15}  petal="#d8b4fe" center="#fce7f3" opacity={0.4}  />
    </svg>
  );
}
