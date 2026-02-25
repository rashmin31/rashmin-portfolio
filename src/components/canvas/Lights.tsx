export function Lights() {
  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.5}
        color="#6366f1"
      />
      <pointLight
        position={[-10, -10, -10]}
        intensity={0.3}
        color="#f59e0b"
      />
    </>
  )
}
