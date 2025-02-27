'use client';

import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export const ModelViewer: React.FC = () => {
    return (
        <Canvas style={{ height: '80vh', width: '100%' }}>
            <EthereumModel />
        </Canvas>
    );
};

export const EthereumModel: React.FC = () => {
    const myModel = useLoader(GLTFLoader, '/two_happy_capybaras.glb');
    const modelRef = useRef<Mesh>(null);

    useFrame((_state, delta) => {
        if (modelRef.current) {
            modelRef.current.rotation.y += delta / 2;
        }
    });

    return (
        <>
            {/* Balanced Lighting */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1.5} color="white" />
            <pointLight position={[-10, -10, -10]} color="white" intensity={700} />
            <pointLight position={[10, 10, 10]} color="#36e2e2" intensity={700} />

            {/* Render the Model - Lowered Even More */}
            <primitive object={myModel.scene} ref={modelRef} scale={[3, 3, 3]} position={[0, -2.5, 0]} />
        </>
    );
};
