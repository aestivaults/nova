"use client";
import React, { useRef, useEffect } from "react";
import * as THREE from "three";

export default function Loader() {
  const mountRef = useRef<HTMLDivElement | null>(null); // Explicitly type as HTMLDivElement | null

  useEffect(() => {
    // Ensure mountRef.current is not null before proceeding
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement); // Safe to use now

    // Central Nova object: Icosahedron for star-like shape
    const geometry = new THREE.IcosahedronGeometry(1.5, 1);
    const material = new THREE.MeshPhongMaterial({
      color: 0xa855f7, // Purple for crypto vibe
      wireframe: true,
      shininess: 100,
    });
    const nova = new THREE.Mesh(geometry, material);
    scene.add(nova);

    // Lights
    const pointLight = new THREE.PointLight(0xffffff, 1.5, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x6366f1, 0.8); // Blue light
    directionalLight.position.set(-5, 5, 5);
    scene.add(directionalLight);

    camera.position.z = 5;

    // Particles for cosmic/crypto network effect
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCnt = 10000;
    const posArray = new Float32Array(particlesCnt * 3);
    for (let i = 0; i < particlesCnt * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 20;
    }
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: 0x818cf8,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });
    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Rotate and pulse the nova
      nova.rotation.x += 0.005;
      nova.rotation.y += 0.005;
      const scale = 1 + Math.sin(elapsedTime * 2) * 0.2;
      nova.scale.set(scale, scale, scale);

      // Rotate particles slowly
      particlesMesh.rotation.y += 0.0005;

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="loader-container">
      <div ref={mountRef} className="canvas-container" />
      <div className="overlay">
        <p className="nova-text">AureusNova</p>
        <div className="dots-container">
          <span className="dot animate-bounce1"></span>
          <span className="dot animate-bounce2"></span>
          <span className="dot animate-bounce3"></span>
        </div>
        <p className="subtext">Connecting to the decentralized future...</p>
      </div>
    </div>
  );
}
