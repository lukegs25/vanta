// Particle System Class
class ParticleSystem {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            particleCount: options.particleCount || 200,
            particleSpread: options.particleSpread || 10,
            speed: options.speed || 0.1,
            particleColors: options.particleColors || ["#ffffff", "#ffffff", "#ffffff"],
            moveParticlesOnHover: options.moveParticlesOnHover || false,
            particleHoverFactor: options.particleHoverFactor || 1,
            alphaParticles: options.alphaParticles || false,
            particleBaseSize: options.particleBaseSize || 100,
            sizeRandomness: options.sizeRandomness || 1,
            cameraDistance: options.cameraDistance || 20,
            disableRotation: options.disableRotation || false
        };
        
        this.mouse = { x: 0, y: 0 };
        this.particles = [];
        this.animationId = null;
        this.elapsed = 0;
        this.lastTime = performance.now();
        
        this.init();
    }
    
    init() {
        this.createCanvas();
        this.createParticles();
        this.setupEventListeners();
        this.animate();
    }
    
    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1';
        
        this.container.appendChild(this.canvas);
        this.resize();
    }
    
    createParticles() {
        this.particles = [];
        const palette = this.options.particleColors;
        
        for (let i = 0; i < this.options.particleCount; i++) {
            let x, y, z, len;
            do {
                x = Math.random() * 2 - 1;
                y = Math.random() * 2 - 1;
                z = Math.random() * 2 - 1;
                len = x * x + y * y + z * z;
            } while (len > 1 || len === 0);
            
            const r = Math.cbrt(Math.random());
            const particle = {
                x: x * r * this.options.particleSpread,
                y: y * r * this.options.particleSpread,
                z: z * r * this.options.particleSpread * 10,
                random: [
                    Math.random(),
                    Math.random(),
                    Math.random(),
                    Math.random()
                ],
                color: palette[Math.floor(Math.random() * palette.length)],
                size: this.options.particleBaseSize * (1 + this.options.sizeRandomness * (Math.random() - 0.5))
            };
            
            this.particles.push(particle);
        }
    }
    
    setupEventListeners() {
        window.addEventListener('resize', () => this.resize());
        
        if (this.options.moveParticlesOnHover) {
            this.container.addEventListener('mousemove', (e) => {
                const rect = this.container.getBoundingClientRect();
                this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
                this.mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
            });
        }
    }
    
    resize() {
        const rect = this.container.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        this.width = rect.width;
        this.height = rect.height;
    }
    
    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        
        const currentTime = performance.now();
        const delta = currentTime - this.lastTime;
        this.lastTime = currentTime;
        this.elapsed += delta * this.options.speed;
        
        this.update();
        this.render();
    }
    
    update() {
        const time = this.elapsed * 0.001;
        
        this.particles.forEach(particle => {
            // Add movement based on time and random values
            particle.x += Math.sin(time * particle.random[2] + 6.28 * particle.random[3]) * 0.1;
            particle.y += Math.sin(time * particle.random[1] + 6.28 * particle.random[0]) * 0.1;
            particle.z += Math.sin(time * particle.random[3] + 6.28 * particle.random[2]) * 0.1;
            
            // Reset particles that go too far
            if (Math.abs(particle.x) > this.options.particleSpread * 2) {
                particle.x = Math.sign(particle.x) * this.options.particleSpread;
            }
            if (Math.abs(particle.y) > this.options.particleSpread * 2) {
                particle.y = Math.sign(particle.y) * this.options.particleSpread;
            }
        });
    }
    
    render() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        
        // Sort particles by Z for depth
        const sortedParticles = [...this.particles].sort((a, b) => b.z - a.z);
        
        sortedParticles.forEach(particle => {
            // Calculate screen position
            const scale = this.options.cameraDistance / (this.options.cameraDistance + particle.z);
            let screenX = centerX + particle.x * scale * 50;
            let screenY = centerY + particle.y * scale * 50;
            
            // Apply hover effect
            if (this.options.moveParticlesOnHover) {
                const hoverX = -this.mouse.x * this.options.particleHoverFactor * scale;
                const hoverY = -this.mouse.y * this.options.particleHoverFactor * scale;
                screenX += hoverX;
                screenY += hoverY;
            }
            
            // Calculate particle size
            const size = particle.size * scale;
            
            if (size > 0.5 && screenX >= 0 && screenX < this.width && screenY >= 0 && screenY < this.height) {
                this.ctx.save();
                
                if (this.options.alphaParticles) {
                    const alpha = Math.max(0.1, scale * 0.8);
                    this.ctx.globalAlpha = alpha;
                }
                
                // Create gradient for particle
                const gradient = this.ctx.createRadialGradient(
                    screenX, screenY, 0,
                    screenX, screenY, size
                );
                
                const color = this.hexToRgb(particle.color);
                gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 1)`);
                gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
                
                this.ctx.fillStyle = gradient;
                this.ctx.beginPath();
                this.ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
                this.ctx.fill();
                
                this.ctx.restore();
            }
        });
    }
    
    hexToRgb(hex) {
        hex = hex.replace(/^#/, "");
        if (hex.length === 3) {
            hex = hex.split("").map(c => c + c).join("");
        }
        const int = parseInt(hex, 16);
        return {
            r: (int >> 16) & 255,
            g: (int >> 8) & 255,
            b: int & 255
        };
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

