import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Compass, Layers, Eye, Maximize2, Sparkles, Building2, Sun, Sunrise, Sunset, Moon, CloudSun, Clock } from 'lucide-react';

interface ThreeModelViewerProps {
  onStatusChange?: (status: string) => void;
}

export const ThreeModelViewer: React.FC<ThreeModelViewerProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [rotationActive, setRotationActive] = useState<boolean>(true);
  const [activeFloor, setActiveFloor] = useState<'all' | 'ground' | 'first' | 'roof'>('all');
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'evening' | 'night' | 'golden'>('afternoon');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);

  // References to three objects for interaction
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const animFrameId = useRef<number | null>(null);
  const lightsRef = useRef<{ dir: THREE.DirectionalLight; ambient: THREE.AmbientLight; point: THREE.PointLight } | null>(null);
  const rotationActiveRef = useRef<boolean>(true);

  useEffect(() => {
    rotationActiveRef.current = rotationActive;
  }, [rotationActive]);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 420;
    const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

    // Test WebGL support
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch (e) {
      setWebglSupported(false);
      return;
    }

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

    // 3. Renderer - Safe Mobile Fallback & Initialization
    let renderer: THREE.WebGLRenderer;
    try {
      const isMobile = window.innerWidth < 768;
      renderer = new THREE.WebGLRenderer({
        antialias: !isMobile,
        alpha: true,
        powerPreference: 'default'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.shadowMap.enabled = !isMobile;
      if (!isMobile) {
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      }
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      
      // Ensure canvas doesn't steal entire page vertical scroll
      renderer.domElement.style.touchAction = 'pan-y';
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      
      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;
    } catch (err) {
      console.warn('WebGL Renderer Initialization Error on Mobile:', err);
      setWebglSupported(false);
      return;
    }

    // 4. Lights - Optimized intensities
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfef08a, 2.2);
    dirLight.position.set(20, 30, 15);
    if (!isMobile) {
      dirLight.castShadow = true;
      dirLight.shadow.mapSize.width = 512; // Optimized from 1024 to 512 for smooth 60fps
      dirLight.shadow.mapSize.height = 512;
      dirLight.shadow.camera.near = 0.5;
      dirLight.shadow.camera.far = 70;
      const d = 14;
      dirLight.shadow.camera.left = -d;
      dirLight.shadow.camera.right = d;
      dirLight.shadow.camera.top = d;
      dirLight.shadow.camera.bottom = -d;
    }
    scene.add(dirLight);

    const cyanPoint = new THREE.PointLight(0x06b6d4, 3, 25);
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

    // Natural Architectural & Landscape Materials
    // 1. Warm Italian Stucco / Plaster (Natural Ivory Cream, not plain grey)
    const wallCreamMat = new THREE.MeshStandardMaterial({
      color: 0xfdfaf5,
      roughness: 0.55,
      metalness: 0.05
    });

    // 2. Terracotta / Clay Brick Accent Wall
    const terracottaMat = new THREE.MeshStandardMaterial({
      color: 0xc25e3d,
      roughness: 0.75,
      metalness: 0.08
    });

    // 3. Natural Teakwood Louvers & Decking
    const teakWoodMat = new THREE.MeshStandardMaterial({
      color: 0x92512a,
      roughness: 0.45,
      metalness: 0.12
    });

    // 4. Sleek Charcoal Slate / Granite Beams & Fascia
    const darkSlateMat = new THREE.MeshStandardMaterial({
      color: 0x222a38,
      roughness: 0.35,
      metalness: 0.3
    });

    // 5. Crystal Reflective Architectural Glass (Emerald-Cyan tint like real solar glass)
    const architecturalGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      transmission: 0.78,
      opacity: 0.72,
      transparent: true,
      roughness: 0.08,
      ior: 1.52,
      reflectivity: 0.95
    });

    // 6. Warm Interior Glow (Lit Rooms)
    const interiorGlowMat = new THREE.MeshStandardMaterial({
      color: 0xffedd5,
      emissive: 0xfbbf24,
      emissiveIntensity: 0.6,
      roughness: 0.3
    });

    // 7. Manicured Natural Green Lawn & Garden Grass
    const lawnGrassMat = new THREE.MeshStandardMaterial({
      color: 0x2d6a4f,
      roughness: 0.85,
      metalness: 0.02
    });

    // 8. Stone Paver Driveway & Footpath
    const paverStoneMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.7,
      metalness: 0.1
    });

    // 9. Water Feature (Swimming Pool / Reflection Pond)
    const poolWaterMat = new THREE.MeshStandardMaterial({
      color: 0x0ea5e9,
      roughness: 0.1,
      metalness: 0.8,
      opacity: 0.85,
      transparent: true
    });

    // 10. Natural Foliage Green (Trees & Shrubs)
    const foliageMat = new THREE.MeshStandardMaterial({
      color: 0x1b4332,
      roughness: 0.6,
      metalness: 0.05
    });
    const trunkMat = new THREE.MeshStandardMaterial({
      color: 0x582f0e,
      roughness: 0.85
    });

    // --- ENVIRONMENT: Natural Landscaping (Grass Lawn, Driveway, Pool, Trees) ---
    // Manicured Grass Base
    const grassPlot = new THREE.Mesh(new THREE.BoxGeometry(22, 0.25, 20), lawnGrassMat);
    grassPlot.position.set(0, -0.05, 0);
    grassPlot.receiveShadow = true;
    scene.add(grassPlot);

    // Stone Entry Pathway / Driveway
    const driveway = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.28, 7.5), paverStoneMat);
    driveway.position.set(4.8, -0.02, 6.2);
    driveway.receiveShadow = true;
    scene.add(driveway);

    // Luxury Swimming Pool with water glow
    const poolBorder = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.35, 4.4), darkSlateMat);
    poolBorder.position.set(-6.5, 0.05, 4.5);
    scene.add(poolBorder);

    const poolWater = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.38, 3.8), poolWaterMat);
    poolWater.position.set(-6.5, 0.08, 4.5);
    scene.add(poolWater);

    // Natural Trees around the Villa
    const createTree = (x: number, z: number, scale = 1) => {
      const treeGroup = new THREE.Group();
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.18 * scale, 0.24 * scale, 2.2 * scale, 8), trunkMat);
      trunk.position.y = (1.1 * scale);
      trunk.castShadow = true;
      treeGroup.add(trunk);

      const crown1 = new THREE.Mesh(new THREE.ConeGeometry(1.4 * scale, 2.8 * scale, 8), foliageMat);
      crown1.position.y = (2.6 * scale);
      crown1.castShadow = true;
      treeGroup.add(crown1);

      const crown2 = new THREE.Mesh(new THREE.ConeGeometry(1.1 * scale, 2.2 * scale, 8), new THREE.MeshStandardMaterial({ color: 0x40916c, roughness: 0.6 }));
      crown2.position.y = (3.4 * scale);
      crown2.castShadow = true;
      treeGroup.add(crown2);

      treeGroup.position.set(x, 0, z);
      scene.add(treeGroup);
    };

    createTree(-8.5, -6.5, 1.2);
    createTree(-9.2, -2.5, 0.95);
    createTree(8.8, -6.0, 1.1);
    createTree(9.0, 1.5, 0.85);
    createTree(-7.5, 8.5, 0.9);

    // --- LEVEL 0: Ground Floor ---
    const gfGroup = new THREE.Group();
    gfGroup.name = 'ground';

    // Base Plinth Slab (Natural stone edge)
    const gfSlab = new THREE.Mesh(new THREE.BoxGeometry(10.8, 0.45, 8.8), darkSlateMat);
    gfSlab.position.y = 0.2;
    gfSlab.receiveShadow = true;
    gfSlab.castShadow = true;
    gfGroup.add(gfSlab);

    // Ground walls (L-shaped modern layout) - Warm Ivory Stucco & Terracotta Feature Wall
    const gfWallMain = new THREE.Mesh(new THREE.BoxGeometry(6.5, 3.2, 7.5), wallCreamMat);
    gfWallMain.position.set(-1.8, 1.8, 0);
    gfWallMain.castShadow = true;
    gfWallMain.receiveShadow = true;
    gfGroup.add(gfWallMain);

    // Terracotta Cladding Accent on Ground Wing
    const terracottaAccent = new THREE.Mesh(new THREE.BoxGeometry(0.15, 3.2, 3.5), terracottaMat);
    terracottaAccent.position.set(-5.1, 1.8, 1.8);
    terracottaAccent.castShadow = true;
    gfGroup.add(terracottaAccent);

    // Double-height living wing with large architectural glass façade & Warm Interior Lighting
    const gfGlassWing = new THREE.Mesh(new THREE.BoxGeometry(3.6, 3.2, 6.5), architecturalGlassMat);
    gfGlassWing.position.set(2.8, 1.8, 0.4);
    gfGroup.add(gfGlassWing);

    // Warm Interior Lit Core (Visible through glass windows)
    const gfInteriorCore = new THREE.Mesh(new THREE.BoxGeometry(2.8, 2.6, 5.0), interiorGlowMat);
    gfInteriorCore.position.set(2.7, 1.8, 0.4);
    gfGroup.add(gfInteriorCore);

    // Entrance cantilever portico with Teak Wood Under-ceiling
    const porticoRoof = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.35, 3.8), darkSlateMat);
    porticoRoof.position.set(2.5, 3.2, 4.4);
    porticoRoof.castShadow = true;
    gfGroup.add(porticoRoof);

    const porticoCeilingWood = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.08, 3.6), teakWoodMat);
    porticoCeilingWood.position.set(2.5, 3.0, 4.4);
    gfGroup.add(porticoCeilingWood);

    // Portico Pillar (Illuminated 3D Smart Pillar with Warm Amber Glow)
    const pillarGeo = new THREE.CylinderGeometry(0.2, 0.2, 3.2, 16);
    const pillarMesh = new THREE.Mesh(pillarGeo, new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xd97706,
      emissiveIntensity: 0.7,
      roughness: 0.2
    }));
    pillarMesh.position.set(4.5, 1.6, 5.8);
    gfGroup.add(pillarMesh);

    buildingGroup.add(gfGroup);

    // --- LEVEL 1: First Floor ---
    const ffGroup = new THREE.Group();
    ffGroup.name = 'first';

    // Mid-level slab cantilevered (Charcoal Granite with Teak Banding)
    const ffSlab = new THREE.Mesh(new THREE.BoxGeometry(11.2, 0.4, 9.2), darkSlateMat);
    ffSlab.position.set(0.4, 3.6, 0.2);
    ffSlab.castShadow = true;
    ffSlab.receiveShadow = true;
    ffGroup.add(ffSlab);

    // Master Suite volume (cantilevered floating box in Warm Ivory Plaster)
    const ffMaster = new THREE.Mesh(new THREE.BoxGeometry(5.8, 3.0, 7.2), wallCreamMat);
    ffMaster.position.set(2.2, 5.1, 0.8);
    ffMaster.castShadow = true;
    ffMaster.receiveShadow = true;
    ffGroup.add(ffMaster);

    // Wooden decorative louvers on master facade (Real Natural Teak Wood)
    for (let i = 0; i < 9; i++) {
      const louver = new THREE.Mesh(new THREE.BoxGeometry(0.1, 2.7, 0.28), teakWoodMat);
      louver.position.set(5.15, 5.1, -1.8 + i * 0.45);
      ffGroup.add(louver);
    }

    // Bedroom 2 / Lounge glass ribbon & interior warm ambiance
    const ffGlass = new THREE.Mesh(new THREE.BoxGeometry(4.4, 2.8, 5.6), architecturalGlassMat);
    ffGlass.position.set(-2.5, 5.0, 0);
    ffGroup.add(ffGlass);

    const ffInteriorLounge = new THREE.Mesh(new THREE.BoxGeometry(3.6, 2.3, 4.8), interiorGlowMat);
    ffInteriorLounge.position.set(-2.5, 5.0, 0);
    ffGroup.add(ffInteriorLounge);

    // Balcony with tinted safety glass railing
    const balconyRail = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.9, 0.1), architecturalGlassMat);
    balconyRail.position.set(2.2, 4.1, 4.45);
    ffGroup.add(balconyRail);

    buildingGroup.add(ffGroup);

    // --- LEVEL 2: Roof & Terrace Pergola ---
    const roofGroup = new THREE.Group();
    roofGroup.name = 'roof';

    const roofSlab = new THREE.Mesh(new THREE.BoxGeometry(10.0, 0.3, 8.0), darkSlateMat);
    roofSlab.position.set(0.6, 6.75, 0.4);
    roofSlab.castShadow = true;
    roofGroup.add(roofSlab);

    // Solar Pergola structure
    for (let j = 0; j < 5; j++) {
      const pergolaBeam = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.18, 4.5), darkSlateMat);
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
    const stairCabin = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.2, 2.8), wallCreamMat);
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

    // Animation Loop with Visibility & Viewport Observer to eliminate background CPU/GPU lag
    let isVisibleOnScreen = true;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleOnScreen = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const animate = () => {
      animFrameId.current = requestAnimationFrame(animate);

      // Only render when component is actually visible to the user (saves 90% GPU lag)
      if (!isVisibleOnScreen) return;

      if (rotationActiveRef.current && !isDragging) {
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

      observer.disconnect();
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

  // Effect for 24-Hour Realistic Natural Time-of-Day Modes
  useEffect(() => {
    if (!lightsRef.current || !sceneRef.current || !rendererRef.current) return;
    const { dir, ambient, point } = lightsRef.current;
    const scene = sceneRef.current;
    const renderer = rendererRef.current;

    switch (timeOfDay) {
      case 'morning': // 07:30 AM Sunrise - Crisp warm amber ray from east, soft blue ambient
        scene.background = new THREE.Color(0x0f172a); // Dawn blue-slate
        scene.fog = new THREE.FogExp2(0x0f172a, 0.025);
        dir.position.set(-25, 14, 18); // Low east sun
        dir.color.setHex(0xfde68a); // Pale warm amber
        dir.intensity = 2.6;
        ambient.color.setHex(0xdbeafe); // Soft morning blue
        ambient.intensity = 0.85;
        point.color.setHex(0xfbbf24);
        point.intensity = 2.0;
        renderer.toneMappingExposure = 1.15;
        break;

      case 'afternoon': // 01:30 PM Bright Natural Sunlight - Clear daylight, sharp contrast, neutral white
        scene.background = new THREE.Color(0x020617);
        scene.fog = new THREE.FogExp2(0x020617, 0.02);
        dir.position.set(12, 35, 12); // High noon sun
        dir.color.setHex(0xffffff); // Pure white sunlight
        dir.intensity = 3.2;
        ambient.color.setHex(0xf8fafc);
        ambient.intensity = 1.0;
        point.color.setHex(0x38bdf8);
        point.intensity = 1.5;
        renderer.toneMappingExposure = 1.25;
        break;

      case 'golden': // 05:45 PM Golden Hour - Deep honey gold, long dramatic shadows
        scene.background = new THREE.Color(0x1a0f0a); // Warm sunset dusk
        scene.fog = new THREE.FogExp2(0x1a0f0a, 0.028);
        dir.position.set(28, 9, -15); // Low west sun
        dir.color.setHex(0xf59e0b); // Rich warm amber gold
        dir.intensity = 3.5;
        ambient.color.setHex(0xfed7aa);
        ambient.intensity = 0.75;
        point.color.setHex(0xf97316);
        point.intensity = 3.5;
        renderer.toneMappingExposure = 1.2;
        break;

      case 'evening': // 07:15 PM Sunset / Blue Hour - Purple/deep blue sky, interior lights blazing
        scene.background = new THREE.Color(0x0b132b);
        scene.fog = new THREE.FogExp2(0x0b132b, 0.035);
        dir.position.set(20, 4, -20);
        dir.color.setHex(0xec4899); // Magenta-orange sunset fringe
        dir.intensity = 1.4;
        ambient.color.setHex(0x1e3a8a);
        ambient.intensity = 0.55;
        point.color.setHex(0xf59e0b); // Warm room chandeliers glowing
        point.intensity = 5.5;
        renderer.toneMappingExposure = 1.05;
        break;

      case 'night': // 10:30 PM Midnight Architecture - Moonlight with warm luxury architectural spot illumination
        scene.background = new THREE.Color(0x020617);
        scene.fog = new THREE.FogExp2(0x020617, 0.038);
        dir.position.set(-15, 22, -18);
        dir.color.setHex(0x38bdf8); // Cool moonlight
        dir.intensity = 0.9;
        ambient.color.setHex(0x0f172a);
        ambient.intensity = 0.35;
        point.color.setHex(0xfbbf24); // Warm indoor villas & pool illumination
        point.intensity = 7.5;
        renderer.toneMappingExposure = 0.95;
        break;
    }
  }, [timeOfDay]);

  // Effect for Floor Separation / Isolate
  useEffect(() => {
    if (!groupRef.current) return;
    const ground = groupRef.current.getObjectByName('ground');
    const first = groupRef.current.getObjectByName('first');
    const roof = groupRef.current.getObjectByName('roof');

    // Layer filter: 'all' shows complete villa, or isolates specific floor cleanly
    if (activeFloor === 'all') {
      if (ground) ground.visible = true;
      if (first) first.visible = true;
      if (roof) roof.visible = true;
    } else if (activeFloor === 'ground') {
      if (ground) ground.visible = true;
      if (first) first.visible = false;
      if (roof) roof.visible = false;
    } else if (activeFloor === 'first') {
      if (ground) ground.visible = true;
      if (first) first.visible = true;
      if (roof) roof.visible = false;
    } else if (activeFloor === 'roof') {
      if (ground) ground.visible = true;
      if (first) first.visible = true;
      if (roof) roof.visible = true;
    }
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
      className="relative w-full h-[440px] md:h-[540px] rounded-2xl overflow-hidden glass-panel border border-cyan-500/30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!webglSupported ? (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-slate-900 to-slate-950">
          <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 mb-4">
            <Building2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">3D Architectural Villa (Mobile Mode)</h3>
          <p className="text-xs text-slate-400 max-w-sm mb-4 leading-relaxed">
            तुमच्या मोबाईल ब्राऊझरसाठी हाय-डेफिनिशन 3D रेंडर्स, 2D फ्लोअर प्लॅन्स आणि वॉकथ्रू खालील सेक्शन्समध्ये उपलब्ध आहेत.
          </p>
          <a href="#gallery-section" className="btn-gold text-xs py-2 px-4">
            3D फोटो व वॉकथ्रू पहा
          </a>
        </div>
      ) : (
        /* Three.js Canvas Container */
        <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" style={{ touchAction: 'pan-y' }} />
      )}

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

      {/* 24-Hour Natural Time of Day Selector */}
      <div className="absolute top-16 left-4 z-20 flex flex-wrap items-center gap-1.5 p-1 bg-slate-950/85 backdrop-blur-xl border border-slate-800 rounded-xl shadow-xl">
        <span className="text-[10px] text-slate-400 font-mono px-2 hidden sm:flex items-center gap-1">
          <Clock className="w-3 h-3 text-amber-400" /> Time:
        </span>
        {[
          { key: 'morning', label: 'सकाळ (Morning)', icon: Sunrise, color: 'text-amber-300' },
          { key: 'afternoon', label: 'दुपार (Afternoon)', icon: Sun, color: 'text-yellow-400' },
          { key: 'golden', label: 'सोनेरी किरणे (Golden)', icon: CloudSun, color: 'text-orange-400' },
          { key: 'evening', label: 'संध्याकाळ (Evening)', icon: Sunset, color: 'text-pink-400' },
          { key: 'night', label: 'रात्र (Night)', icon: Moon, color: 'text-cyan-300' }
        ].map((mode) => {
          const IconComp = mode.icon;
          const isActive = timeOfDay === mode.key;
          return (
            <button
              key={mode.key}
              onClick={() => setTimeOfDay(mode.key as any)}
              className={`text-xs px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-semibold transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-bold shadow-md shadow-orange-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
              title={`Switch Lighting to ${mode.label}`}
            >
              <IconComp className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : mode.color}`} />
              <span className="text-[11px]">{mode.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Interactive Controls Bar */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 p-2 bg-slate-950/90 backdrop-blur-xl border border-slate-800 rounded-xl z-20">
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
