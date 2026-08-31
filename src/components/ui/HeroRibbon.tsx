"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

const IMAGE_SOURCES = [
  "/static/components/0.jpeg",
  "/static/components/1.jpeg",
  "/static/components/2.jpeg",
  "/static/components/3.jpeg",
  "/static/components/4.jpeg",
];

const TOTAL_LEVELS = 12;
const RADIUS = 4;
const RIBBON_HEIGHT = 2;
const LEVEL_GAP = 3.5;
const CARD_WIDTH = 624;
const CARD_HEIGHT = 580;
const AUTO_ROTATE_SPEED = 0.12;
const DRAG_VELOCITY_SCALE = 35;
const INERTIA_DECAY = 0.95;

type HeroRibbonProps = {
  className?: string;
};

export default function HeroRibbon({ className }: HeroRibbonProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let disposed = false;
    let animationFrameId = 0;
    let highResTexture: THREE.CanvasTexture | null = null;

    container.innerHTML = "";

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

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
    renderer.domElement.style.touchAction = "none";
    container.appendChild(renderer.domElement);

    const towerGroup = new THREE.Group();
    towerGroup.rotation.set(-0.2, 0.5, 0.2);
    scene.add(towerGroup);

    const numImages = IMAGE_SOURCES.length;
    const cardAspect = CARD_WIDTH / CARD_HEIGHT;
    const circumference = 2 * Math.PI * RADIUS;
    const cardWidthIn3D = RIBBON_HEIGHT * cardAspect;
    const cardsPerCircumference = circumference / cardWidthIn3D;
    const repeatX = cardsPerCircumference / numImages;

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

    const placeholderCanvas = document.createElement("canvas");
    placeholderCanvas.width = CARD_WIDTH * numImages;
    placeholderCanvas.height = CARD_HEIGHT;
    const placeholderCtx = placeholderCanvas.getContext("2d");

    if (placeholderCtx) {
      for (let index = 0; index < numImages; index++) {
        const x = index * CARD_WIDTH;
        placeholderCtx.fillStyle = index % 2 === 0 ? "#0c192c" : "#081220";
        placeholderCtx.fillRect(x, 0, CARD_WIDTH, CARD_HEIGHT);
        placeholderCtx.strokeStyle = "#1e3a5f";
        placeholderCtx.lineWidth = 4;
        placeholderCtx.strokeRect(x + 10, 20, CARD_WIDTH - 20, CARD_HEIGHT - 40);
        placeholderCtx.fillStyle = "#2563eb";
        placeholderCtx.fillRect(x + 30, 50, CARD_WIDTH - 60, 24);
        placeholderCtx.fillStyle = "#1e293b";
        placeholderCtx.fillRect(x + 30, 95, CARD_WIDTH - 140, 16);
        placeholderCtx.fillRect(x + 30, 125, CARD_WIDTH - 100, 16);
      }
    }

    const initialTexture = new THREE.CanvasTexture(placeholderCanvas);
    initialTexture.wrapS = THREE.RepeatWrapping;
    initialTexture.wrapT = THREE.ClampToEdgeWrapping;
    initialTexture.minFilter = THREE.LinearFilter;
    initialTexture.magFilter = THREE.LinearFilter;

    const uniforms = {
      map: { value: initialTexture },
      uvRepeat: { value: new THREE.Vector2(repeatX, 1) },
    };

    const towerMaterial = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
      transparent: true,
    });

    const geometry = new THREE.CylinderGeometry(
      RADIUS,
      RADIUS,
      RIBBON_HEIGHT,
      80,
      1,
      true,
    );

    const ringMeshes: THREE.Mesh[] = [];

    for (let index = 0; index < TOTAL_LEVELS; index++) {
      const pivot = new THREE.Group();
      pivot.position.set(0, (index - 5) * LEVEL_GAP, 0);
      pivot.rotation.set(0, index * Math.PI * 0.5, 0.25);

      const mesh = new THREE.Mesh(geometry, towerMaterial);
      pivot.add(mesh);
      towerGroup.add(pivot);
      ringMeshes.push(mesh);
    }

    function updateCameraAndGroup() {
      if (!container || disposed) return;

      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      const aspect = w / h;

      camera.aspect = aspect;
      camera.fov = aspect < 1 ? 7 / aspect : 7;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);

      if (aspect >= 1.4) {
        towerGroup.position.set(5.2, 0, 0);
      } else if (aspect >= 1.1) {
        towerGroup.position.set(4, 0, 0);
      } else if (aspect >= 0.8) {
        towerGroup.position.set(2.4, 0, 0);
      } else {
        towerGroup.position.set(1.2, 0, 0);
      }
    }

    updateCameraAndGroup();

    function applyLoadedTexture(loadedImages: HTMLImageElement[]) {
      if (disposed) return;

      const collageCanvas = document.createElement("canvas");
      collageCanvas.width = CARD_WIDTH * IMAGE_SOURCES.length;
      collageCanvas.height = CARD_HEIGHT;
      const ctx = collageCanvas.getContext("2d");

      if (ctx) {
        IMAGE_SOURCES.forEach((_, index) => {
          const image = loadedImages[index];
          if (image?.naturalWidth) {
            ctx.drawImage(image, index * CARD_WIDTH, 0, CARD_WIDTH, CARD_HEIGHT);
          }
        });
      }

      highResTexture = new THREE.CanvasTexture(collageCanvas);
      highResTexture.wrapS = THREE.RepeatWrapping;
      highResTexture.wrapT = THREE.ClampToEdgeWrapping;
      highResTexture.minFilter = THREE.LinearFilter;
      highResTexture.magFilter = THREE.LinearFilter;
      highResTexture.needsUpdate = true;

      towerMaterial.uniforms.map.value = highResTexture;
      towerMaterial.uniforms.uvRepeat.value.set(repeatX, 1);
      towerMaterial.needsUpdate = true;
    }

    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    IMAGE_SOURCES.forEach((src, index) => {
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.src = src;
      image.onload = () => {
        if (disposed) return;
        loadedImages[index] = image;
        loadedCount += 1;
        if (loadedCount === IMAGE_SOURCES.length) {
          applyLoadedTexture(loadedImages);
        }
      };
      image.onerror = () => {
        if (disposed) return;
        loadedCount += 1;
        if (loadedCount === IMAGE_SOURCES.length) {
          applyLoadedTexture(loadedImages);
        }
      };
    });

    let isDragging = false;
    let prevX = 0;
    let dragRotationY = 0;
    let dragVelocity = 0;
    let ringSpinY = 0;
    const canvas = renderer.domElement;
    const towerTilt = { x: -0.2, y: 0.5, z: 0.2 };

    const getDragWidth = () => canvas.clientWidth || window.innerWidth || 1000;

    const onPointerDown = (event: PointerEvent) => {
      if (reduceMotion) return;

      isDragging = true;
      prevX = event.clientX;
      dragVelocity = 0;
      container.style.cursor = "grabbing";
      canvas.setPointerCapture(event.pointerId);
      event.preventDefault();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!isDragging || reduceMotion) return;

      const deltaX =
        ((event.clientX - prevX) / getDragWidth()) * Math.PI * 2;
      dragRotationY += deltaX;
      dragVelocity = deltaX * DRAG_VELOCITY_SCALE;
      prevX = event.clientX;
      event.preventDefault();
    };

    const endDrag = (event: PointerEvent) => {
      if (!isDragging) return;

      isDragging = false;
      container.style.cursor = "grab";

      if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId);
      }
    };

    if (!reduceMotion) {
      container.style.cursor = "grab";
      canvas.addEventListener("pointerdown", onPointerDown);
      canvas.addEventListener("pointermove", onPointerMove);
      canvas.addEventListener("pointerup", endDrag);
      canvas.addEventListener("pointercancel", endDrag);
      canvas.addEventListener("lostpointercapture", () => {
        isDragging = false;
        container.style.cursor = "grab";
      });
    }

    window.addEventListener("resize", updateCameraAndGroup);

    const clock = new THREE.Clock();

    function renderLoop() {
      if (disposed) return;

      animationFrameId = window.requestAnimationFrame(renderLoop);
      const delta = Math.min(clock.getDelta(), 0.1);

      if (!reduceMotion) {
        if (!isDragging && dragVelocity !== 0) {
          dragRotationY += dragVelocity * delta;
          dragVelocity *= INERTIA_DECAY;

          if (Math.abs(dragVelocity) < 0.0001) {
            dragVelocity = 0;
          }
        }

        ringSpinY += AUTO_ROTATE_SPEED * delta;
      }

      towerGroup.rotation.set(
        towerTilt.x,
        towerTilt.y + dragRotationY,
        towerTilt.z,
      );

      ringMeshes.forEach((mesh) => {
        mesh.rotation.y = ringSpinY;
      });

      renderer.render(scene, camera);
    }

    renderLoop();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", updateCameraAndGroup);

      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", endDrag);
      canvas.removeEventListener("pointercancel", endDrag);

      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
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
      className={cn(
        "absolute inset-0 h-full w-full overflow-hidden select-none",
        className,
      )}
      aria-hidden
    />
  );
}
