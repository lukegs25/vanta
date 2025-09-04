// Simple Three.js Globe Implementation
function createGlobe() {
    const globeContainer = document.getElementById('globe-canvas');
    if (!globeContainer) {
        console.error('Globe container not found');
        return;
    }

    if (typeof THREE === 'undefined') {
        console.error('THREE.js not loaded');
        return;
    }

    try {
        // Clear any existing content
        globeContainer.innerHTML = '';
        
        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, 600/500, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(600, 500);
        renderer.setClearColor(0x000000, 0);
        globeContainer.appendChild(renderer.domElement);
        
        // Create main globe
        const geometry = new THREE.SphereGeometry(1, 64, 64);
        const material = new THREE.MeshLambertMaterial({
            color: 0x0a1929,
            transparent: false,
            opacity: 1.0
        });
        
        const globe = new THREE.Mesh(geometry, material);
        scene.add(globe);
        
        // Add wireframe overlay
        const wireframeGeometry = new THREE.SphereGeometry(1.002, 20, 20);
        const wireframeMaterial = new THREE.MeshBasicMaterial({
            color: 0x4a90e2,
            wireframe: true,
            transparent: true,
            opacity: 0.6
        });
        const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
        scene.add(wireframe);
        
        // Lighting setup
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0x4a90e2, 1.0);
        directionalLight.position.set(5, 3, 5);
        scene.add(directionalLight);
        
        // Position camera
        camera.position.set(0, 0, 2.5);
        
        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            globe.rotation.y += 0.005;
            wireframe.rotation.y += 0.005;
            renderer.render(scene, camera);
        }
        
        animate();
        
        console.log('Globe created successfully');
        return true;
        
    } catch (error) {
        console.error('Error creating globe:', error);
        return false;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        console.log('Attempting to create globe...');
        createGlobe();
    }, 500);
});

// Export for manual triggering
window.forceCreateGlobe = createGlobe;