import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Compass, Layers, Eye, Maximize2, Sparkles, Building2, Sun } from 'lucide-react';

interface ThreeModelViewerProps {
  onStatusChange?: (status: string) => void;
}

export const ThreeModelViewer: React.FC<ThreeModelViewerProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [rotationActive, setRotationActive] = useState<boolean>(true);
  const [activeFloor, setActiveFloor] = useState<'all' | 'ground' | 'first' | 'roof'>('all');
  const [sunlightMode, setSunlightMode] = useState<'day' | 'golden' | 'night'>('golden');
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // References to three objects for interaction
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const animFrameId = useRef<number | null>(null);
  const lightsRef = useRef<{ dir: THREE.DirectionalLight; ambient: THREE.AmbientLight; point: THREE.PointLight } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 480;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020617); // Slate 950
    scene.fog = new THREE.FogExp2(0x020617, 0.035);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(16, 12, 18);
    camera.lookAt(0, 2, 0);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfef08a, 2.2);
    dirLight.position.set(20, 30, 15);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 80;
    const d = 15;
    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;
    scene.add(dirLight);

    const cyanPoint = new THREE.PointLight(0x06b6d4, 4, 30);
    cyanPoint.position.set(-6, 8, 8);
    scene.add(cyanPoint);

    const warmAccent = new THREE.PointLight(0xf59e0b, 3, 25);
    warmAccent.position.set(6, 4, -6);
    scene.add(warmAccent);

    lightsRef.current = { dir: dirLight, ambient: ambientLight, point: cyanPoint };

    // 5. Digital Grid & Ground Plane
    const gridHelper = new THREE.GridHelper(32, 32, 0x06b6d4, 0x1e293b);
    gridHelper.position.y = -0.05;
    scene.add(gridHelper);

    // Subtle Ground Foundation Disk
    const groundGeo = new THREE.CylinderGeometry(14, 14.5, 0.4, 48);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x0b1120,
      roughness: 0.8,
      metalness: 0.2
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.position.y = -0.2;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    // 6. Architectural Building Group
    const buildingGroup = new THREE.Group();
    groupRef.current = buildingGroup;
    scene.add(buildingGroup);

    // Materials
    const concreteMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.45,
      metalness: 0.1
    });

    const darkAccentMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.3,
      metalness: 0.4
    });

    const woodLouversMat = new THREE.MeshStandardMaterial({
      color: 0xb45309,
      roughness: 0.6,
      metalness: 0.1
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      transmission: 0.85,
      opacity: 0.65,
      transparent: true,
      roughness: 0.1,
      ior: 1.5,
      reflectivity: 0.9
    });

    const cyanEmissiveMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.8,
      roughness: 0.2
    });

    // --- LEVEL 0: Ground Floor ---
    const gfGroup = new THREE.Group();
    gfGroup.name = 'ground';

    // Base slab
    const gfSlab = new THREE.Mesh(new THREE.BoxGeometry(10.5, 0.4, 8.5), concreteMat);
    gfSlab.position.y = 0.2;
    gfSlab.receiveShadow = true;
    gfSlab.castShadow = true;
    gfGroup.add(gfSlab);

    // Ground walls (L-shaped modern layout)
    const gfWallMain = new THREE.Mesh(new THREE.BoxGeometry(6.5, 3.2, 7.5), concreteMat);
    gfWallMain.position.set(-1.8, 1.8, 0);
    gfWallMain.castShadow = true;
    gfWallMain.receiveShadow = true;
    gfGroup.add(gfWallMain);

    // Double-height living wing with large glass façade
    const gfGlassWing = new THREE.Mesh(new THREE.BoxGeometry(3.6, 3.2, 6.5), glassMat);
    gfGlassWing.position.set(2.8, 1.8, 0.4);
    gfGroup.add(gfGlassWing);

    // Entrance cantilever portico
    const porticoRoof = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.3, 3.8), darkAccentMat);
    porticoRoof.position.set(2.5, 3.2, 4.4);
    porticoRoof.castShadow = true;
    gfGroup.add(porticoRoof);

    // Portico Pillar (Illuminated 3D Smart Pillar)
    const pillarGeo = new THREE.CylinderGeometry(0.18, 0.18, 3.2, 16);
    const pillarMesh = new THREE.Mesh(pillarGeo, cyanEmissiveMat);
    pillarMesh.position.set(4.5, 1.6, 5.8);
    gfGroup.add(pillarMesh);

    buildingGroup.add(gfGroup);

    // --- LEVEL 1: First Floor ---
    const ffGroup = new THREE.Group();
    ffGroup.name = 'first';

    // Mid-level slab cantilevered
    const ffSlab = new THREE.Mesh(new THREE.BoxGeometry(11.2, 0.4, 9.2), darkAccentMat);
    ffSlab.position.set(0.4, 3.6, 0.2);
    ffSlab.castShadow = true;
    ffSlab.receiveShadow = true;
    ffGroup.add(ffSlab);

    // Master Suite volume (cantilevered floating box)
    const ffMaster = new THREE.Mesh(new THREE.BoxGeometry(5.8, 3.0, 7.2), concreteMat);
    ffMaster.position.set(2.2, 5.1, 0.8);
    ffMaster.castShadow = true;
    ffMaster.receiveShadow = true;
    ffGroup.add(ffMaster);

    // Wooden decorative louvers on master facade
    for (let i = 0; i < 9; i++) {
      const louver = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.7, 0.25), woodLouversMat);
      louver.position.set(5.15, 5.1, -1.8 + i * 0.45);
      ffGroup.add(louver);
    }

    // Bedroom 2 / Lounge glass ribbon
    const ffGlass = new THREE.Mesh(new THREE.BoxGeometry(4.4, 2.8, 5.6), glassMat);
    ffGlass.position.set(-2.5, 5.0, 0);
    ffGroup.add(ffGlass);

    // Balcony with glass railing
    const balconyRail = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.9, 0.1), glassMat);
    balconyRail.position.set(2.2, 4.1, 4.45);
    ffGroup.add(balconyRail);

    buildingGroup.add(ffGroup);

    // --- LEVEL 2: Roof & Terrace Pergola ---
    const roofGroup = new THREE.Group();
    roofGroup.name = 'roof';

    const roofSlab = new THREE.Mesh(new THREE.BoxGeometry(10.0, 0.3, 8.0), darkAccentMat);
    roofSlab.position.set(0.6, 6.75, 0.4);
    roofSlab.castShadow = true;
    roofGroup.add(roofSlab);

    // Solar Pergola structure
    for (let j = 0; j < 5; j++) {
      const pergolaBeam = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.18, 4.5), darkAccentMat);
      pergolaBeam.position.set(1.5 + j * 0.7, 7.8, -0.5);
      roofGroup.add(pergolaBeam);
    }

    // Solar Panels
    const solarGlass = new THREE.Mesh(
      new THREE.BoxGeometry(3.6, 0.08, 4.2),
      new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.85, roughness: 0.2 })
    );
    solarGlass.position.set(2.9, 7.9, -0.5);
    roofGroup.add(solarGlass);

    // Rooftop Stairhead Cabin
    const stairCabin = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.2, 2.8), concreteMat);
    stairCabin.position.set(-2.2, 7.85, -0.8);
    stairCabin.castShadow = true;
    roofGroup.add(stairCabin);

    buildingGroup.add(roofGroup);

    // Interactive Drag Controls (Mouse / Touch)
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let autoRotationSpeed = 0.0035;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !buildingGroup) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      buildingGroup.rotation.y += deltaX * 0.008;
      camera.position.y = Math.max(3, Math.min(22, camera.position.y - deltaY * 0.04));
      camera.lookAt(0, 2, 0);
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomSpeed = 0.015;
      const newFov = Math.max(25, Math.min(75, camera.fov + e.deltaY * zoomSpeed));
      camera.fov = newFov;
      camera.updateProjectionMatrix();
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    dom.addEventListener('wheel', onWheel, { passive: false });

    // Touch support for mobile devices
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || !buildingGroup || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      const deltaY = e.touches[0].clientY - prevMouseY;
      buildingGroup.rotation.y += deltaX * 0.008;
      camera.position.y = Math.max(3, Math.min(22, camera.position.y - deltaY * 0.04));
      camera.lookAt(0, 2, 0);
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    dom.addEventListener('touchstart', onTouchStart);
    dom.addEventListener('touchmove', onTouchMove);
    dom.addEventListener('touchend', onTouchEnd);

    // Animation Loop
    const animate = () => {
      animFrameId.current = requestAnimationFrame(animate);

      if (rotationActive && !isDragging) {
        buildingGroup.rotation.y += autoRotationSpeed;
      }

      // Gentle floating light oscillation
      cyanPoint.position.y = 8 + Math.sin(Date.now() * 0.002) * 1.5;

      renderer.render(scene, camera);
    };

    animate();

    // Window Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight || 480;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('mousedown', onMouseDown);
      dom.removeEventListener('wheel', onWheel);
      dom.removeEventListener('touchstart', onTouchStart);
      dom.removeEventListener('touchmove', onTouchMove);
      dom.removeEventListener('touchend', onTouchEnd);

      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Effect to toggle wireframe
  useEffect(() => {
    if (!groupRef.current) return;
    groupRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => (m.wireframe = wireframe));
        } else if (child.material) {
          child.material.wireframe = wireframe;
        }
      }
    });
  }, [wireframe]);

  // Effect for Sunlight Mode
  useEffect(() => {
    if (!lightsRef.current || !sceneRef.current) return;
    const { dir, ambient, point } = lightsRef.current;

    if (sunlightMode === 'day') {
      dir.color.setHex(0xffffff);
      dir.intensity = 2.4;
      ambient.intensity = 0.9;
      point.intensity = 2.0;
    } else if (sunlightMode === 'golden') {
      dir.color.setHex(0xf59e0b);
      dir.intensity = 2.8;
      ambient.intensity = 0.65;
      point.intensity = 4.5;
    } else {
      // Night / Twilight
      dir.color.setHex(0x1e3a8a);
      dir.intensity = 0.8;
      ambient.intensity = 0.3;
      point.intensity = 7.0;
    }
  }, [sunlightMode]);

  // Effect for Floor Separation / Isolate
  useEffect(() => {
    if (!groupRef.current) return;
    const ground = groupRef.current.getObjectByName('ground');
    const first = groupRef.current.getObjectByName('first');
    const roof = groupRef.current.getObjectByName('roof');

    if (ground) ground.visible = activeFloor === 'all' || activeFloor === 'ground';
    if (first) first.visible = activeFloor === 'all' || activeFloor === 'first';
    if (roof) roof.visible = activeFloor === 'all' || activeFloor === 'roof';
  }, [activeFloor]);

  const resetCamera = () => {
    if (!cameraRef.current || !groupRef.current) return;
    cameraRef.current.position.set(16, 12, 18);
    cameraRef.current.fov = 45;
    cameraRef.current.updateProjectionMatrix();
    cameraRef.current.lookAt(0, 2, 0);
    groupRef.current.rotation.y = 0;
  };

  return (
    <div
      className="relative w-full h-[460px] md:h-[540px] rounded-2xl overflow-hidden glass-panel border border-cyan-500/30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Three.js Canvas Container */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Overlay Badges */}
      <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 pointer-events-none">
        <span className="badge-cyan backdrop-blur-md bg-slate-950/80">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          WebGL BIM Engine v3.4
        </span>
        <span className="badge-gold backdrop-blur-md bg-slate-950/80">
          <Building2 className="w-3.5 h-3.5 text-amber-400" />
          Patil Villa Structural Model
        </span>
      </div>

      {/* Live Orientation Compass Indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-2 bg-slate-900/85 backdrop-blur-md border border-slate-700/60 rounded-xl px-3 py-1.5 text-xs text-slate-300">
        <Compass className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '18s' }} />
        <span className="font-mono text-[11px] text-cyan-300">N 18°33' E 73°47'</span>
      </div>

      {/* Interactive Controls Bar */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 p-2 bg-slate-950/90 backdrop-blur-xl border border-slate-800 rounded-xl">
        {/* Floor Selection */}
        <div className="flex items-center gap-1">
          <span className="text-xs text-slate-400 font-medium px-2 hidden sm:inline flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-cyan-400" /> Layer:
          </span>
          {(['all', 'ground', 'first', 'roof'] as const).map((layer) => (
            <button
              key={layer}
              onClick={() => setActiveFloor(layer)}
              className={`text-xs px-2.5 py-1 rounded-md font-semibold capitalize transition-all ${
                activeFloor === layer
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {layer}
            </button>
          ))}
        </div>

        {/* Action Toggles */}
        <div className="flex items-center gap-1.5">
          {/* Wireframe toggle */}
          <button
            onClick={() => setWireframe(!wireframe)}
            title="Toggle Wireframe CAD Mode"
            className={`p-2 rounded-lg text-xs font-medium transition-all ${
              wireframe ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            <Eye className="w-4 h-4" />
          </button>

          {/* Sunlight mode */}
          <button
            onClick={() => {
              const modes: ('day' | 'golden' | 'night')[] = ['day', 'golden', 'night'];
              const nextIndex = (modes.indexOf(sunlightMode) + 1) % modes.length;
              setSunlightMode(modes[nextIndex]);
            }}
            title={`Sunlight Mode: ${sunlightMode.toUpperCase()}`}
            className="p-2 rounded-lg text-amber-400 hover:bg-slate-800 text-xs transition-all border border-amber-500/20"
          >
            <Sun className="w-4 h-4" />
          </button>

          {/* Auto-rotation Toggle */}
          <button
            onClick={() => setRotationActive(!rotationActive)}
            title={rotationActive ? 'Pause Orbit Rotation' : 'Resume Orbit Rotation'}
            className={`p-2 rounded-lg text-xs font-medium transition-all ${
              rotationActive ? 'text-cyan-400 bg-cyan-500/10' : 'text-slate-500 hover:bg-slate-800'
            }`}
          >
            <RotateCw className={`w-4 h-4 ${rotationActive ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
          </button>

          {/* Reset Camera View */}
          <button
            onClick={resetCamera}
            title="Reset Perspective Angle"
            className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 text-xs transition-all"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Subtle Hint */}
      {!isHovered && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center bg-slate-950/70 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-500/20 animate-pulse">
          <p className="text-xs text-cyan-300 font-medium">Click & Drag to Rotate • Scroll to Zoom</p>
        </div>
      )}
    </div>
  );
};
