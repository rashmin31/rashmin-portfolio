export function Lights() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.4}
        color="#ffffff"
      />
      <pointLight
        position={[0, 0, 8]}
        intensity={0.3}
        color="#2962ff"
      />
    </>
  )
}
