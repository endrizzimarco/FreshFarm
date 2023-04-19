<script>
import { useRouter } from 'vue-router'
import {
  createApp,
  Box,
  Camera,
  LambertMaterial,
  PointLight,
  Renderer,
  Scene,
  InstancedMesh,
  BoxGeometry,
  PhongMaterial,
  EffectComposer,
  RenderPass,
  FXAAPass,
  TiltShiftPass,
  AmbientLight
} from 'troisjs'
import { InstancedBufferAttribute, Object3D } from 'three'

const simplex = new SimplexNoise()

export default {
  setup() {
    const router = useRouter()
    const SIZE = 1.6,
      NX = 25,
      NY = 25,
      PADDING = 1
    const SIZEP = SIZE + PADDING
    const W = NX * SIZEP - PADDING
    const H = NY * SIZEP - PADDING
    return {
      router,
      SIZE,
      NX,
      NY,
      PADDING,
      SIZEP,
      W,
      H,
      NUM_INSTANCES: NX * NY
    }
  },
  data() {
    return {
      tiltRadius: 100,
      tiltY: 100
    }
  },
  mounted() {
    this.renderer = this.$refs.renderer
    this.size = this.renderer.three.size
    this.pointer = this.renderer.three.pointer
    this.imesh = this.$refs.imesh.mesh
    // init color attribute
    const colors = []
    for (let i = 0; i < this.NUM_INSTANCES; i++) {
      const c = Math.random()
      colors.push(c, c, c)
    }
    this.imesh.geometry.setAttribute('color', new InstancedBufferAttribute(new Float32Array(colors), 3))
    this.tiltRadius = this.size.height / 3
    this.tiltY = this.size.height / 2
    this.renderer.onAfterResize(this.updateTilt)
    this.dummy = new Object3D()
    this.renderer.onBeforeRender(this.animate)
  },
  methods: {
    animate() {
      this.updateInstanceMatrix()
    },
    updateTilt() {
      this.tiltRadius = this.size.height / 3
      this.tiltY = (this.pointer.positionN.y + 1) * 0.5 * this.size.height
    },
    updateInstanceMatrix() {
      const x0 = -this.W / 2 + this.PADDING
      const y0 = -this.H / 2 + this.PADDING
      const time = Date.now() * 0.0001
      const noise = 0.005
      let x, y, nx, ny, rx, ry
      for (let i = 0; i < this.NX; i++) {
        for (let j = 0; j < this.NY; j++) {
          x = x0 + i * this.SIZEP
          y = y0 + j * this.SIZEP
          nx = x * noise
          ny = y * noise
          rx = simplex.noise3D(nx, ny, time) * Math.PI
          ry = simplex.noise3D(ny, nx, time) * Math.PI
          this.dummy.position.set(x, y, -10)
          this.dummy.rotation.set(rx, ry, 0)
          this.dummy.updateMatrix()
          this.imesh.setMatrixAt(i * this.NY + j, this.dummy.matrix)
        }
      }
      this.imesh.instanceMatrix.needsUpdate = true
    }
  },
  components: {
    Box,
    Camera,
    LambertMaterial,
    PointLight,
    Renderer,
    Scene,
    InstancedMesh,
    BoxGeometry,
    PhongMaterial,
    EffectComposer,
    RenderPass,
    FXAAPass,
    TiltShiftPass,
    AmbientLight
  }
}
</script>

<template lang="pug">
div
  q-btn(
    @click='router.push("/")',
    rounded,
    label="Back to map"
    color='grey-10',
    icon='arrow_back',
    style='position: absolute; left: 2em; top: 3em; z-index: 1'
  )

  Renderer(ref='renderer' :pointer='{ onMove: updateTilt }' resize='window')
    Camera(:position='{ y: -20, z: 10 }' :look-at='{ x: 0, y: 0, z: 0 }')
    Scene(background='#ffffff')
      AmbientLight
      PointLight(ref='light' :position='{ y: 0, z: 20 }')
      InstancedMesh(ref='imesh' :count='NUM_INSTANCES' :position='{ y: 20, z: 10 }')
        BoxGeometry(:size='SIZE')
        PhongMaterial(vertex-colors='')
    EffectComposer
      RenderPass
      FXAAPass
      TiltShiftPass(:blur-radius='10' :gradient-radius='tiltRadius' :start='{ x: 0, y: tiltY }' :end='{ x: 100, y: tiltY }')


  q-card.centered.opacity-90.rounded-xl.shadow-2xl.p-5
    p.text-xl.font-semibold.pb-2 About us
    span Welcome to FreshFarm, a platform dedicated to supporting local farmers and bringing fresh produce to your doorstep. Our mission is to provide a hassle-free way for farmers to connect with customers who are looking for the freshest, healthiest and most delicious produce available.
    span We believe in sustainable agriculture, and we are committed to helping farmers reduce food waste, increase profits, and grow their business.
    p At FreshFarm, we have a passion for supporting small farmers and promoting a healthy lifestyle. We believe that everyone deserves access to fresh, local food, and we are working hard to make it a reality. Our platform allows farmers to post their available produce on a map, making it easy for customers to find the closest farm and place an order. We believe that this is the future of food distribution and we are excited to be a part of it.
    p.text-xl.font-semibold.mt-6 Privacy
    p.mt-2 At FreshFarm, we take your privacy seriously. We understand that you are trusting us with your personal information, and we are committed to protecting it. We will never share or sell your personal data to third parties without your consent, and we only collect the minimum amount of data necessary to provide our services. Here is what we collect and how we use it:
    ul.mt-2
      li
        span.font-medium Personal information:
        span We collect your name, email address, and phone number when you sign up for our service. This information is used to create your account and to contact you about your orders.
      li.mt-1
        span.font-medium Payment information:
        span We collect your payment information when you place an order. This information is encrypted and securely stored by our payment processor, and is only used to process your payment.
      li.mt-1
        span.font-medium Location data:
        span We collect your location data when you use our platform. This information is used to display the location of nearby farms on a map, and to provide you with the most accurate information about available produce. We take all reasonable measures to protect your personal information from unauthorized access, use or disclosure. If you have any questions or concerns about our privacy policy, please don't hesitate to contact us.
</template>

<style scoped>
.centered {
  position: fixed;
  top: 47%;
  left: 50%;
  text-align: justify;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
}
</style>
