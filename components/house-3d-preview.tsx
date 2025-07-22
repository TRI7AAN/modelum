"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei"
import { Suspense, useMemo } from "react"

interface House3DProps {
  floors: number
  rooms: number
  sqft: number
  isVisible: boolean
}

function HouseStructure({ floors, rooms, sqft }: { floors: number; rooms: number; sqft: number }) {
  const houseGeometry = useMemo(() => {
    // Calculate dimensions based on square footage
    const baseWidth = Math.sqrt(sqft / floors) * 0.1
    const baseDepth = baseWidth * 0.8
    const floorHeight = 3

    return {
      width: baseWidth,
      depth: baseDepth,
      height: floors * floorHeight,
      floorHeight,
    }
  }, [floors, rooms, sqft])

  const roomDivisions = useMemo(() => {
    const divisions = []
    const roomsPerFloor = Math.ceil(rooms / floors)
    const roomWidth = houseGeometry.width / Math.ceil(Math.sqrt(roomsPerFloor))
    const roomDepth = houseGeometry.depth / Math.ceil(roomsPerFloor / Math.ceil(Math.sqrt(roomsPerFloor)))

    for (let floor = 0; floor < floors; floor++) {
      for (let i = 0; i < roomsPerFloor && divisions.length < rooms; i++) {
        const x = (i % Math.ceil(Math.sqrt(roomsPerFloor))) * roomWidth - houseGeometry.width / 2 + roomWidth / 2
        const z =
          Math.floor(i / Math.ceil(Math.sqrt(roomsPerFloor))) * roomDepth - houseGeometry.depth / 2 + roomDepth / 2
        const y = floor * houseGeometry.floorHeight + houseGeometry.floorHeight / 2

        divisions.push({
          position: [x, y, z] as [number, number, number],
          size: [roomWidth * 0.9, houseGeometry.floorHeight * 0.8, roomDepth * 0.9] as [number, number, number],
        })
      }
    }

    return divisions
  }, [floors, rooms, houseGeometry])

  return (
    <group>
      {/* Main house structure */}
      <mesh position={[0, houseGeometry.height / 2, 0]}>
        <boxGeometry args={[houseGeometry.width, houseGeometry.height, houseGeometry.depth]} />
        <meshStandardMaterial color="#1a365d" transparent opacity={0.3} wireframe={false} />
      </mesh>

      {/* Floor separators */}
      {Array.from({ length: floors - 1 }, (_, i) => (
        <mesh key={i} position={[0, (i + 1) * houseGeometry.floorHeight, 0]}>
          <boxGeometry args={[houseGeometry.width, 0.1, houseGeometry.depth]} />
          <meshStandardMaterial color="#0cf2f2" />
        </mesh>
      ))}

      {/* Room divisions */}
      {roomDivisions.map((room, index) => (
        <group key={index}>
          {/* Room outline */}
          <mesh position={room.position}>
            <boxGeometry args={room.size} />
            <meshStandardMaterial color="#2d5a87" transparent opacity={0.1} wireframe={true} />
          </mesh>

          {/* Room floor */}
          <mesh position={[room.position[0], room.position[1] - room.size[1] / 2, room.position[2]]}>
            <boxGeometry args={[room.size[0], 0.05, room.size[2]]} />
            <meshStandardMaterial color="#4a90a4" />
          </mesh>
        </group>
      ))}

      {/* Foundation */}
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[houseGeometry.width + 1, 1, houseGeometry.depth + 1]} />
        <meshStandardMaterial color="#2d3748" />
      </mesh>

      {/* Roof */}
      <mesh position={[0, houseGeometry.height + 1, 0]}>
        <coneGeometry args={[houseGeometry.width * 0.7, 2, 4]} />
        <meshStandardMaterial color="#1a202c" />
      </mesh>

      {/* Windows */}
      {Array.from({ length: floors }, (_, floor) => (
        <group key={floor}>
          {/* Front windows */}
          {Array.from({ length: Math.min(3, rooms) }, (_, i) => (
            <mesh
              key={`front-${i}`}
              position={[
                (i - 1) * (houseGeometry.width / 4),
                floor * houseGeometry.floorHeight + houseGeometry.floorHeight / 2,
                houseGeometry.depth / 2 + 0.01,
              ]}
            >
              <boxGeometry args={[0.8, 1.2, 0.1]} />
              <meshStandardMaterial color="#87ceeb" transparent opacity={0.7} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Door */}
      <mesh position={[0, 1, houseGeometry.depth / 2 + 0.01]}>
        <boxGeometry args={[1, 2, 0.1]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
    </group>
  )
}

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0cf2f2]"></div>
    </div>
  )
}

export default function House3DPreview({ floors, rooms, sqft, isVisible }: House3DProps) {
  if (!isVisible) return null

  return (
    <div className="w-full h-[400px] bg-gradient-to-b from-[#102323] to-[#1a365d] rounded-lg overflow-hidden border border-[#224949]">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas>
          <PerspectiveCamera makeDefault position={[15, 10, 15]} />
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            maxPolarAngle={Math.PI / 2}
            minDistance={5}
            maxDistance={50}
          />

          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[-10, 10, -10]} intensity={0.5} color="#0cf2f2" />

          {/* Environment */}
          <Environment preset="city" />

          {/* Ground */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial color="#2d5a87" transparent opacity={0.3} />
          </mesh>

          {/* House */}
          <HouseStructure floors={floors} rooms={rooms} sqft={sqft} />
        </Canvas>
      </Suspense>

      {/* 3D Controls Info */}
      <div className="absolute bottom-2 left-2 text-[#90cbcb] text-xs">
        🖱️ Drag to rotate • 🔍 Scroll to zoom • ⌨️ Right-click to pan
      </div>
    </div>
  )
}
