/*!
PortalShowcaseType3.js
Copyright (c) 2023 Wakana Y.K.
URL:https://codepen.io/wakana-k/pen/XWBambN
*/
!function() {
    "use strict";
    function e(e) {
        P.load(W[e], function(t) {
            t.encoding = THREE.sRGBEncoding, t.mapping = THREE.EquirectangularRefractionMapping, 
            C[e].getObjectByName("Skybox").material.map = t, C[e].getObjectByName("Skybox").material.needsUpdate = !0, 
            3 != e ? (r.getObjectByName("Object" + e).material.envMap = t, r.getObjectByName("Object" + e).material.needsUpdate = !0, 
            C[e].environment = t, t.dispose()) : t.dispose();
        });
    }
    function t(e) {
        0 == e ? m = A.clone() : 1 == e ? m = function() {
            m = A.clone();
            let e = P.load("https://happy358.github.io/Images/textures/camo4.png");
            return e.wrapS = THREE.RepeatWrapping, e.wrapT = THREE.RepeatWrapping, e.repeat.set(5, 1), 
            p = new THREE.MeshStandardMaterial({
                color: 16777215,
                side: THREE.FrontSide,
                metalness: 1,
                roughness: .5,
                map: e,
                envMapIntensity: 5
            }), m.material = p, e.dispose(), m;
        }() : 2 == e ? m = function() {
            T = .1;
            return (c = function(e, t, a) {
                let n = [];
                for (let o = 0; o < 2 * e; o++) {
                    let i, r;
                    n.push(0, 0, -a / 2), o % 2 == 0 ? (i = t, r = 1) : (i = 1, r = t);
                    let l = (o + 1) / e * Math.PI;
                    n.push(Math.cos(l) * i, Math.sin(l) * i, 0), l = o / e * Math.PI, n.push(Math.cos(l) * r, Math.sin(l) * r, 0);
                }
                return n = new Float32Array(n), (c = new THREE.BufferGeometry()).setAttribute("position", new THREE.BufferAttribute(n, 3)), 
                c.computeVertexNormals(), c;
            }(3, 1, .5)).scale(T, T, T), x = new THREE.Mesh(c, new THREE.MeshStandardMaterial({
                metalness: 1,
                roughness: 0,
                side: THREE.DoubleSide
            })), g = 1, function() {
                f = new THREE.InstancedMesh(x.geometry, x.material, 1e3);
                const e = new THREE.MeshSurfaceSampler(A).build();
                for (let t = 0; t < 1e3; t++) e.sample(y, M), M.add(y), b.position.copy(y), M.set(M.x * Math.random() * 2, M.y * Math.random() * 2, M.z * Math.random() * 2), 
                b.lookAt(M), b.updateMatrix(), u = new THREE.Color().setHSL(Math.random(), 1, .7), 
                f.setMatrixAt(t, b.matrix), f.setColorAt(t, u);
                return f;
            }();
        }() : 3 == e ? ((v = {
            fogDensity: {
                value: .001
            },
            fogColor: {
                value: new THREE.Vector3(0, 0, 0)
            },
            time: {
                value: 1
            },
            uvScale: {
                value: new THREE.Vector2(3, 1)
            },
            texture1: {
                value: P.load("https://threejs.org/examples/textures/lava/cloud.png")
            },
            texture2: {
                value: P.load("https://threejs.org/examples/textures/lava/lavatile.jpg")
            }
        }).texture1.value.wrapS = v.texture1.value.wrapT = THREE.RepeatWrapping, v.texture2.value.wrapS = v.texture2.value.wrapT = THREE.RepeatWrapping, 
        p = new THREE.ShaderMaterial({
            uniforms: v,
            vertexShader: document.getElementById("lave_vertexShader").textContent,
            fragmentShader: document.getElementById("lave_fragmentShader").textContent
        }), c = A.geometry.clone(), m = new THREE.Mesh(c, p)) : 4 == e && ((m = A.clone()).material = new THREE.MeshPhysicalMaterial({
            color: 16777215,
            metalness: .01,
            roughness: .01,
            transparent: 1,
            opacity: 1,
            transmission: 1,
            envMapIntensity: 2,
            ior: 1.5,
            reflectivity: .05,
            specularIntensity: 3.5,
            specularColor: 16777215,
            thickness: 7,
            clearcoat: 2,
            clearcoatRoughness: .01,
            side: THREE.FrontSide
        }), m = m), m.name = "Object" + e, C[e].add(m), m = m.clone(), r.add(m);
    }
    function a() {
        i.aspect = window.innerWidth / window.innerHeight, i.updateProjectionMatrix(), l.setSize(window.innerWidth, window.innerHeight);
    }
    function n() {
        document.getElementById("zoom").classList.toggle("active"), document.getElementById("close").classList.toggle("active");
        let e = 1;
        1 == j.value && (e = 0), new TWEEN.Tween(j).to({
            value: e
        }, 500).onUpdate(function() {
            for (let e = 0; e < k.length; e++) y.set(I[e][0], I[e][1], I[e][2]), y.multiplyScalar(j.value), 
            C[e].getObjectByName("Object" + e).position.set(y.x, y.y, y.z), r.getObjectByName("Object" + e).position.set(y.x, y.y, y.z);
        }).onComplete(function() {
            j.value = e;
        }).start();
    }
    function o() {
        requestAnimationFrame(o), s.update(), TWEEN.update(), function() {
            const e = 5 * d.getDelta();
            v.time.value += .8 * e;
            for (let e = 0; e < k.length; e++) (S = C[e].getObjectByName("Camera")).position.set(i.position.x, i.position.y, i.position.z), 
            O.set(-w / 2 + H, -w / 2 + H, 0), _.set(w / 2 + H, -w / 2 + H, 0), z.set(-w / 2 + H, w / 2 + H, 0), 
            k[e].localToWorld(O), k[e].localToWorld(_), k[e].localToWorld(z), THREE.CameraUtils.frameCorners(S, O, _, z, !1), 
            l.setRenderTarget(B[e]), l.render(C[e], S), l.setRenderTarget(null);
            l.render(r, i);
        }();
    }
    let i, r, l, s, d, c, p, E, m, u, g, h, R, w = 5, T = 1.5, H = 0, y = new THREE.Vector3(), M = new THREE.Vector3();
    new THREE.Raycaster(), new THREE.Vector2();
    let x, v, f;
    const b = new THREE.Object3D();
    let S, j = {
        value: 0
    }, I = [ [ 0, 0, h = 5 ], [ 0, 0, -h ], [ h, 0, 0 ], [ -h, 0, 0 ], [ 0, h, 0 ] ], k = [], B = [], C = [], P = new THREE.TextureLoader();
    const W = [ "https://happy358.github.io/Images/HDR/old_hall_2k.jpg", "https://happy358.github.io/Images/HDR/xanderklinge_1k.jpg", "https://happy358.github.io/Images/HDR/spiaggia_di_mondello_2k.jpg", "https://happy358.github.io/Images/HDR/hansaplatz_2k.jpg", "https://happy358.github.io/Images/HDR/kloofendal_48d_partly_cloudy_puresky_2k.jpg" ];
    let O = new THREE.Vector3(), _ = new THREE.Vector3(), z = new THREE.Vector3(), D = new THREE.Mesh(new THREE.SphereGeometry(3 * w, 15, 15), new THREE.MeshBasicMaterial({
        color: 16777215,
        side: THREE.BackSide
    }));
    D.name = "Skybox", p = new THREE.MeshStandardMaterial({
        color: 16777215,
        metalness: 1,
        roughness: 0,
        side: THREE.FrontSide
    }), c = new THREE.TorusGeometry(T, T / 4, 15, 35);
    let A = new THREE.Mesh(c, p);
    A.name = "Object", function() {
        const u = document.createElement("div");
        document.body.appendChild(u), r = new THREE.Scene(), (l = new THREE.WebGLRenderer({
            antialias: !0,
            alpha: !0
        })).setPixelRatio(window.devicePixelRatio), l.setSize(window.innerWidth, window.innerHeight), 
        l.outputEncoding = THREE.sRGBEncoding, u.appendChild(l.domElement), d = new THREE.Clock(), 
        (i = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, .01, 500)).position.set(1.3 * w, 2 * w, 2.5 * w), 
        i.lookAt(0, 0, 0), r.add(i);
        let g = new THREE.WebGLRenderTarget(1024, 1024), T = new THREE.Mesh(new THREE.PlaneGeometry(w + H, w + H), new THREE.MeshBasicMaterial({
            side: THREE.FrontSide
        }));
        B[0] = g.clone(), k[0] = T.clone(), k[0].material = T.material.clone(), k[0].material.map = B[0].texture, 
        k[0].position.z = w / 2, r.add(k[0]), B[1] = g.clone(), k[1] = T.clone(), k[1].material = T.material.clone(), 
        k[1].material.map = B[1].texture, k[1].rotateY(Math.PI), k[1].position.z = -w / 2, 
        r.add(k[1]), B[2] = g.clone(), k[2] = T.clone(), k[2].material = T.material.clone(), 
        k[2].material.map = B[2].texture, k[2].rotateY(Math.PI / 2), k[2].position.x = w / 2, 
        r.add(k[2]), B[3] = g.clone(), k[3] = T.clone(), k[3].material = T.material.clone(), 
        k[3].material.map = B[3].texture, k[3].rotateY(-Math.PI / 2), k[3].position.x = -w / 2, 
        r.add(k[3]), B[4] = g.clone(), k[4] = T.clone(), k[4].material = T.material.clone(), 
        k[4].material.map = B[4].texture, k[4].rotateX(-Math.PI / 2), k[4].position.y = w / 2, 
        r.add(k[4]);
        for (let e = 0; e < k.length; e++) e = e, h = 2, R = w / 2, 0 == e ? (C[e] = new THREE.Scene(), 
        C[e].background = r.background, (S = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, .01, 50)).position.set(i.position.x, i.position.y, i.position.z), 
        S.lookAt(0, 0, 0), S.name = "Camera", C[e].add(S), C[e].add(D)) : (C[e] = C[0].clone(), 
        C[e].traverse(function(e) {
            e.isMesh && (e.material = e.material.clone());
        }));
        var y;
        for (let a = 0; a < k.length; a++) t(a), e(a);
        (s = new THREE.OrbitControls(i, l.domElement)).autoRotate = !0, s.autoRotateSpeed = 2, 
        s.enableDamping = !0, s.enablePan = !1, s.minDistance = w, s.maxDistance = 5 * w, 
        s.minPolarAngle = 0, s.maxPolarAngle = Math.PI / 2, s.target.set(0, 0, 0), s.update(), 
        o(), window.addEventListener("resize", a), document.getElementById("zoom").addEventListener("click", n), 
        document.getElementById("close").addEventListener("click", n), c.dispose(), p.dispose(), 
        g.dispose(), T.geometry.dispose(), T.material.dispose(), D.geometry.dispose(), D.material.dispose(), 
        m.geometry.dispose(), m.material.dispose(), A.geometry.dispose(), A.material.dispose(), 
        x.geometry.dispose(), x.material.dispose(), T.clear(), D.clear(), m.clear(), A.clear(), 
        x.clear(), c = p = E = g = T = D = m = A = x = null;
    }();
}();