"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

const IMAGE_SOURCES = [
  "/components/Ai-01.webp",
  "/components/Ai-02.webp",
  "/components/Ai-03.webp",
  "/components/Ai-04.webp",
  "/components/Ai-05.webp",
  "/components/Ai-06.webp",
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
    const cardTextures: THREE.Texture[] = [];

    container.innerHTML = "";

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(7, width / height, 0.01, 100000);
    camera.position.set(0, 0, 70);

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: pixelRatio < 1.5,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.domElement.style.touchAction = "none";
    container.appendChild(renderer.domElement);

    const towerGroup = new THREE.Group();
    towerGroup.rotation.set(-0.2, 0.5, 0.2);
    scene.add(towerGroup);

    const cardAspect = CARD_WIDTH / CARD_HEIGHT;
    const circumference = 2 * Math.PI * RADIUS;
    const cardWidthIn3D = RIBBON_HEIGHT * cardAspect;
    const cardsAround = circumference / cardWidthIn3D;

    const vertexShader = `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vViewPosition;

      void main() {
        vUv = uv;

        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

        vNormal = normalize(normalMatrix * normal);
        vViewPosition = -mvPosition.xyz;

        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragmentShader = `
      uniform sampler2D map0;
      uniform sampler2D map1;
      uniform sampler2D map2;
      uniform sampler2D map3;
      uniform sampler2D map4;
      uniform sampler2D map5;
      uniform float cardsAround;

      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vViewPosition;

      vec4 sampleCard(float slot, vec2 uv) {
        if (slot < 0.5) return texture2D(map0, uv);
        if (slot < 1.5) return texture2D(map1, uv);
        if (slot < 2.5) return texture2D(map2, uv);
        if (slot < 3.5) return texture2D(map3, uv);
        if (slot < 4.5) return texture2D(map4, uv);
        return texture2D(map5, uv);
      }

      void main() {
        float along = vUv.x * cardsAround;
        float localU = fract(along);
        if (!gl_FrontFacing) {
          localU = 1.0 - localU;
        }
        vec2 coords = vec2(localU, vUv.y);
        vec4 col = sampleCard(mod(floor(along), 6.0), coords);

        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(vViewPosition);

        // Flip the normal for the inside-facing surface.
        if (!gl_FrontFacing) {
          normal = -normal;
        }

        // Soft light coming from the front/top.
        vec3 lightDir = normalize(vec3(-0.25, 0.35, 1.0));

        float diffuse = max(dot(normal, lightDir), 0.0);

        // Soft ambient light so the inside isn't completely black.
        float ambient = 0.16;

        // Extra soft glow when looking at the inner surface.
        float innerGlow = 0.0;

        if (!gl_FrontFacing) {
          float facing = max(dot(normal, viewDir), 0.0);

          innerGlow = pow(facing, 1.8) * 0.30;

          // Cyan/blue light similar to the reference.
          vec3 glowColor = vec3(0.0, 0.55, 1.0);

          col.rgb += glowColor * innerGlow;
        }

        // Apply soft directional lighting.
        col.rgb *= ambient + diffuse * 0.75;

        // Keep the inside slightly darker than the front.
        if (!gl_FrontFacing) {
          col.rgb *= 0.30;
        }

        gl_FragColor = col;
      }
    `;

    const initialTexture = new THREE.DataTexture(
      new Uint8Array([8, 18, 36, 255]),
      1,
      1,
    );
    initialTexture.needsUpdate = true;
    initialTexture.wrapS = THREE.RepeatWrapping;
    initialTexture.wrapT = THREE.ClampToEdgeWrapping;
    initialTexture.minFilter = THREE.LinearFilter;
    initialTexture.magFilter = THREE.LinearFilter;

    const uniforms = {
      map0: { value: initialTexture },
      map1: { value: initialTexture },
      map2: { value: initialTexture },
      map3: { value: initialTexture },
      map4: { value: initialTexture },
      map5: { value: initialTexture },
      cardsAround: { value: cardsAround },
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
      64,
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

    IMAGE_SOURCES.forEach((src, index) => {
      const image = new Image();
      image.decoding = "async";
      image.src = src;
      image.onload = () => {
        if (disposed || !image.naturalWidth) return;

        const texture = new THREE.Texture(image);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;
        texture.needsUpdate = true;

        cardTextures[index]?.dispose();
        cardTextures[index] = texture;
        towerMaterial.uniforms[`map${index}`].value = texture;
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
      cardTextures.forEach((texture) => texture.dispose());
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
