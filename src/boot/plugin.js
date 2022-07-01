import VideoBackground from 'vue-responsive-video-background-player'
import { boot } from 'quasar/wrappers'

export default boot(({ app }) => {
  app.component('video-background', VideoBackground)
})
