"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

type HeroRibbonProps = {
  className?: string;
};

export default function HeroRibbon({ className }: HeroRibbonProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let animationFrameId = 0;

    // Clear container
    container.innerHTML = "";

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Camera (FOV 7, position [0, 0, 70])
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(7, width / height, 0.01, 100000);
    camera.position.set(0, 0, 70);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.NoToneMapping;
    container.appendChild(renderer.domElement);

    // Parent group with aesthetic tilt [-0.2, 0.5, 0.2]
    const towerGroup = new THREE.Group();
    towerGroup.position.set(5.2, 0, 0);
    towerGroup.rotation.set(-0.2, 0.5, 0.2);
    scene.add(towerGroup);

    function updateCameraAndGroup() {
      if (!container || disposed) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      const aspect = w / h;
      camera.aspect = aspect;
      // Adjust FOV for narrow / mobile viewports so the tower remains visible
      if (aspect < 1.0) {
        camera.fov = 7 / aspect;
      } else {
        camera.fov = 7;
      }
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);

      // Shift the 3D cylinder tower to the right side matching reference framing
      if (aspect >= 1.4) {
        towerGroup.position.set(5.2, 0, 0);
      } else if (aspect >= 1.1) {
        towerGroup.position.set(4.0, 0, 0);
      } else if (aspect >= 0.8) {
        towerGroup.position.set(2.4, 0, 0);
      } else {
        towerGroup.position.set(1.2, 0, 0);
      }
    }
    updateCameraAndGroup();

    const radius = 4;
    const ribbonHeight = 2;
    const geometry = new THREE.CylinderGeometry(radius, radius, ribbonHeight, 80, 1, true);

    // Native card dimensions: 624w x 580h
    const singleW = 624;
    const singleH = 580;
    const numImages = 6;
    const cardAspect = singleW / singleH; // 1.07586
    const circumference = 2 * Math.PI * radius; // 25.1327
    const cardWidthIn3D = ribbonHeight * cardAspect; // 2.1517
    const cardsPerCircumference = circumference / cardWidthIn3D; // 11.68
    const repeatX = cardsPerCircumference / numImages; // ~1.9466

    // Shader with explicit uvRepeat so cards maintain their exact native aspect ratio
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform sampler2D map;
      uniform vec2 uvRepeat;
      varying vec2 vUv;
      void main() {
        vec2 coords = fract(vUv * uvRepeat);
        vec4 col = texture2D(map, coords);
        if (!gl_FrontFacing) {
          col.rgb = mix(col.rgb, vec3(0.0), 0.86);
        }
        gl_FragColor = col;
      }
    `;

    // Immediate placeholder canvas texture
    const placeholderCanvas = document.createElement("canvas");
    placeholderCanvas.width = singleW * numImages;
    placeholderCanvas.height = singleH;
    const pctx = placeholderCanvas.getContext("2d");
    if (pctx) {
      for (let k = 0; k < numImages; k++) {
        const cx = k * singleW;
        pctx.fillStyle = k % 2 === 0 ? "#0c192c" : "#081220";
        pctx.fillRect(cx, 0, singleW, singleH);
        pctx.strokeStyle = "#1e3a5f";
        pctx.lineWidth = 4;
        pctx.strokeRect(cx + 10, 20, singleW - 20, singleH - 40);
        pctx.fillStyle = "#2563eb";
        pctx.fillRect(cx + 30, 50, singleW - 60, 24);
        pctx.fillStyle = "#1e293b";
        pctx.fillRect(cx + 30, 95, singleW - 140, 16);
        pctx.fillRect(cx + 30, 125, singleW - 100, 16);
      }
    }

    const initialTexture = new THREE.CanvasTexture(placeholderCanvas);
    initialTexture.wrapS = THREE.RepeatWrapping;
    initialTexture.wrapT = THREE.ClampToEdgeWrapping;
    initialTexture.minFilter = THREE.LinearFilter;
    initialTexture.magFilter = THREE.LinearFilter;

    const uniforms = {
      map: { value: initialTexture },
      uvRepeat: { value: new THREE.Vector2(repeatX, 1.0) },
    };

    const towerMaterial = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      side: THREE.DoubleSide,
      transparent: true,
    });

    // 12 Stacked levels in fixed pivot groups
    const totalLevels = 12;
    const ringMeshes: THREE.Mesh[] = [];

    for (let i = 0; i < totalLevels; i++) {
      // Pivot holds fixed 3D position and tilt
      const pivot = new THREE.Group();
      pivot.position.set(0, (i - 5) * 3.5, 0);
      pivot.rotation.set(0, i * Math.PI * 0.5, 0.25);

      // Cylinder mesh rotates cleanly around its own local Y-axis
      const mesh = new THREE.Mesh(geometry, towerMaterial);
      pivot.add(mesh);
      towerGroup.add(pivot);

      ringMeshes.push(mesh);
    }

    // Load actual component screenshots
    const imageSources = [
      "/components/0.png",
      "/components/1.png",
      "/components/2.png",
      "/components/3.png",
      "/components/4.png",
      "/components/5.png",
    ];

    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;
    let highResTexture: THREE.CanvasTexture | null = null;

    imageSources.forEach((src, idx) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = src;
      img.onload = () => {
        if (disposed) return;
        loadedImages[idx] = img;
        loadedCount++;
        if (loadedCount === imageSources.length) {
          applyLoadedTexture();
        }
      };
      img.onerror = () => {
        if (disposed) return;
        loadedCount++;
        if (loadedCount === imageSources.length) {
          applyLoadedTexture();
        }
      };
    });

    function applyLoadedTexture() {
      if (disposed) return;
      const compCanvas = document.createElement("canvas");
      compCanvas.width = singleW * imageSources.length;
      compCanvas.height = singleH;
      const ctx = compCanvas.getContext("2d");

      if (ctx) {
        imageSources.forEach((_, idx) => {
          if (loadedImages[idx]) {
            ctx.drawImage(loadedImages[idx], idx * singleW, 0, singleW, singleH);
          }
        });
      }

      highResTexture = new THREE.CanvasTexture(compCanvas);
      highResTexture.wrapS = THREE.RepeatWrapping;
      highResTexture.wrapT = THREE.ClampToEdgeWrapping;
      highResTexture.minFilter = THREE.LinearFilter;
      highResTexture.magFilter = THREE.LinearFilter;
      highResTexture.needsUpdate = true;

      towerMaterial.uniforms.map.value = highResTexture;
      towerMaterial.uniforms.uvRepeat.value.set(repeatX, 1.0);
      towerMaterial.needsUpdate = true;
    }

    // Pointer Drag Interaction
    let isDragging = false;
    let prevX = 0;
    let localRotationY = 0;
    let dragVelocity = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevX = e.clientX;
      dragVelocity = 0;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (isDragging) {
        const deltaX = ((e.clientX - prevX) / (window.innerWidth || 1000)) * Math.PI * 2;
        localRotationY += deltaX;
        dragVelocity = deltaX * 35;
        prevX = e.clientX;
      }
    };

    const onPointerUp = () => {
      if (isDragging) {
        isDragging = false;
      }
    };

    const onPointerCancel = () => {
      if (isDragging) {
        isDragging = false;
      }
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerCancel);
    window.addEventListener("resize", updateCameraAndGroup);

    // Animation Loop
    const clock = new THREE.Clock();

    function renderLoop() {
      if (disposed) return;
      animationFrameId = requestAnimationFrame(renderLoop);
      const delta = Math.min(clock.getDelta(), 0.1);

      // Apply drag momentum inertia
      if (!isDragging && dragVelocity !== 0) {
        localRotationY += dragVelocity * delta;
        dragVelocity *= 0.95;
        if (Math.abs(dragVelocity) < 0.0001) dragVelocity = 0;
      }

      // Continuous smooth in-place rotation (faster speed)
      localRotationY += 0.12 * delta;

      // Update all cylinder meshes in their fixed local pivot frames
      ringMeshes.forEach((mesh) => {
        mesh.rotation.y = localRotationY;
      });

      renderer.render(scene, camera);
    }

    renderLoop();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerCancel);
      window.removeEventListener("resize", updateCameraAndGroup);

      if (renderer) {
        renderer.dispose();
        if (renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      }

      geometry.dispose();
      towerMaterial.dispose();
      initialTexture.dispose();
      highResTexture?.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 h-full w-full overflow-hidden select-none", className)}
      aria-hidden
    />
  );
}


