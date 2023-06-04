import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

const App = () => {
  const sceneRef = useRef(null);

  useEffect(() => {
    // Three.js 초기화
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    sceneRef.current.appendChild(renderer.domElement);

    // 조명 추가
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // 3D 모델 로딩
    const loader = new THREE.OBJLoader();
    loader.load("path/to/pipe_rack.obj", (object) => {
      scene.add(object);
    });

    // 카메라 설정
    camera.position.z = 5;

    // 애니메이션 루프
    const animate = () => {
      requestAnimationFrame(animate);

      // 파이프 랙 애니메이션 또는 상태 업데이트

      renderer.render(scene, camera);
    };

    animate();

    // 컴포넌트 언마운트 시 Three.js 리소스 정리
    return () => {
      renderer.dispose();
    };
  }, []);

  return <div ref={sceneRef} />;
};

export default App;
