"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

const IMAGE_PATHS = [
  "/ribbon/0.jpeg",
  "/ribbon/1.jpeg",
  "/ribbon/2.jpeg",
  "/ribbon/3.jpeg",
  "/ribbon/4.jpeg",
];

const COUNT = 12;
const GAP = 3.5;
const RADIUS = 4;
const HEIGHT = 2;

type HeroRibbonProps = {
  className?: string;
};

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(img);
    img.src = src;
  });
}

function setupCylinderTextureMapping(
  texture: THREE.Texture,
  dimensions: { aspectRatio: number },
  radius: number,
  height: number,
) {
  const cylinderCircumference = 2 * Math.PI * radius;
  const cylinderAspectRatio = cylinderCircumference / height;

  if (dimensions.aspectRatio > cylinderAspectRatio) {
    texture.repeat.x = cylinderAspectRatio / dimensions.aspectRatio;
    texture.repeat.y = 1;
    texture.offset.x = (1 - texture.repeat.x) / 2;
  } else {
    texture.repeat.x = 1;
    texture.repeat.y = dimensions.aspectRatio / cylinderAspectRatio;
    texture.offset.y = (1 - texture.repeat.y) / 2;
  }
}

async function createCollageTexture() {
  const repeated = [...IMAGE_PATHS, ...IMAGE_PATHS, ...IMAGE_PATHS, ...IMAGE_PATHS];
  const images = await Promise.all(repeated.map(loadImage));
  const canvasHeight = 580;

  let totalWidth = 0;
  const itemData = images.map((img) => {
    const aspect =
      img.naturalWidth && img.naturalHeight
        ? img.naturalWidth / img.naturalHeight
        : 624 / 580;
    const width = canvasHeight * aspect;
    totalWidth += width;
    return { img, width, height: canvasHeight };
  });

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(totalWidth * dpr);
  canvas.height = Math.round(canvasHeight * dpr);

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not create canvas context");

  ctx.scale(dpr, dpr);
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, totalWidth, canvasHeight);

  let curX = 0;
  itemData.forEach((item) => {
    if (item.img.complete && item.img.naturalWidth > 0) {
      ctx.drawImage(item.img, curX, 0, item.width, item.height);
    }
    curX += item.width;
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.generateMipmaps = false;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.colorSpace = THREE.SRGBColorSpace;

  setupCylinderTextureMapping(
    texture,
    { aspectRatio: totalWidth / canvasHeight },
    RADIUS,
    HEIGHT,
  );

  texture.needsUpdate = true;
  return texture;
}

export default function HeroRibbon({ className }: HeroRibbonProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let disposed = false;
    let frame = 0;
    let renderer: THREE.WebGLRenderer | null = null;
    let texture: THREE.CanvasTexture | null = null;
    let geometry: THREE.CylinderGeometry | null = null;
    let material: THREE.MeshBasicMaterial | null = null;

    const state = {
      isDragging: false,
      velocity: 0,
      lastX: 0,
      rotationY: 0.5,
      lastTime: performance.now(),
      group: null as THREE.Group | null,
      camera: null as THREE.PerspectiveCamera | null,
      scene: null as THREE.Scene | null,
    };

    const onPointerDown = (e: PointerEvent) => {
      state.isDragging = true;
      state.lastX = e.clientX;
      state.velocity = 0;
      container.style.cursor = "grabbing";
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!state.isDragging) return;
      const deltaX = e.clientX - state.lastX;
      const rotationDelta = (deltaX / window.innerWidth) * Math.PI * 2;
      state.rotationY += rotationDelta;
      state.velocity = rotationDelta * 60;
      state.lastX = e.clientX;
    };

    const onPointerUp = () => {
      if (!state.isDragging) return;
      state.isDragging = false;
      container.style.cursor = "grab";
    };

    const onResize = () => {
      if (!renderer || !state.camera || !state.group) return;
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;
      state.camera.aspect = width / height;
      state.camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      state.group.position.x = width < 768 ? 1.5 : 5.5;
    };

    async function init() {
      if (!container || disposed) return;

      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(7, width / height, 0.01, 100000);
      camera.position.set(0, 0, 70);

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.toneMapping = THREE.NoToneMapping;
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      texture = await createCollageTexture();
      if (disposed) {
        texture.dispose();
        return;
      }

      material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
        toneMapped: false,
      });

      material.onBeforeCompile = (shader) => {
        shader.fragmentShader = shader.fragmentShader.replace(
          "#include <color_fragment>",
          `#include <color_fragment>
           if (!gl_FrontFacing) {
             vec3 blackCol = vec3(0.0);
             diffuseColor.rgb = mix(diffuseColor.rgb, blackCol, 0.86);
           }`,
        );
      };

      const group = new THREE.Group();
      group.rotation.set(-0.2, 0.5, 0.2);
      group.position.set(width < 768 ? 1.5 : 5.5, 0, 0);
      scene.add(group);

      geometry = new THREE.CylinderGeometry(RADIUS, RADIUS, HEIGHT, 100, 1, true);

      for (let index = 0; index < COUNT; index++) {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.set(0, index * Math.PI * 0.5, 0.25);
        mesh.position.set(0, (index - (Math.ceil(COUNT / 2) - 1)) * GAP, 0);
        group.add(mesh);
      }

      state.group = group;
      state.camera = camera;
      state.scene = scene;

      if (!reduceMotion) {
        container.style.cursor = "grab";
        renderer.domElement.addEventListener("pointerdown", onPointerDown);
        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerup", onPointerUp);
      }

      window.addEventListener("resize", onResize);

      const animate = (now: number) => {
        if (
          disposed ||
          !renderer ||
          !state.group ||
          !state.camera ||
          !state.scene
        ) {
          return;
        }

        frame = window.requestAnimationFrame(animate);
        const delta = Math.min((now - state.lastTime) / 1000, 0.1);
        state.lastTime = now;

        if (!reduceMotion) {
          if (!state.isDragging) {
            state.rotationY += state.velocity * delta + delta * 0.06;
            state.velocity *= 0.95;
          }
          state.group.rotation.y = state.rotationY;

          if (texture) {
            texture.offset.x += delta * 0.0036;
          }
        }

        renderer.render(state.scene, state.camera);
      };

      frame = window.requestAnimationFrame(animate);
    }

    void init();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);

      if (renderer) {
        renderer.domElement.removeEventListener("pointerdown", onPointerDown);
        renderer.dispose();
        if (renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      }

      texture?.dispose();
      geometry?.dispose();
      material?.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 h-full w-full overflow-hidden", className)}
      aria-hidden
    />
  );
}
