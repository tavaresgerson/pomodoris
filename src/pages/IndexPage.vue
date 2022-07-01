<template>
  <q-page class="flex flex-center index-page full-height relative">
    <div class="inner">
      <div v-if="!stand" class="pomodoris">
        <p class="time">
          {{ formatDate(time) }}
        </p>
        <p v-if="repeats" class="info">
          <small>
            {{ repeats }} de 4 Pomodoris
          </small>
        </p>
      </div>

      <div v-if="stand" class="stand-interval">
        <p class="time">
          {{ formatDate(stand) }}
        </p>
        <p class="info">
          Em Intervalo...
          <br>
          <small v-if="repeats">x{{ repeats }} Pomodoris</small>
        </p>
      </div>
      <div>
        <q-btn
          v-if="!stand && !time"
          @click="start()"
          label="Iniciar"
          color="primary"
        />
        <q-btn
          v-else
          label="Parar"
          @click="stopAll()"
          color="grey-9"
          text-color="white"
        />
      </div>
    </div>

    <div class="overlay" v-if="stand"></div>
    <div class="background" v-if="stand">
      <video-background
        src="/movies/await_pexels-rodnae-productions-7515918.mp4"
        style="max-height: 100%; height: 100%; width: 100%"
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { format } from 'quasar'

export default defineComponent({
  name: 'IndexPage',
  data () {
    return {
      time: 0,
      stand: 0,
      repeats: 0,
      interval: null,
      isCounter: 0,
      backgrounds: 'work',
      standInterval: null
    }
  },
  watch: {
    time (secs) {
      if (secs === 1500 && this.repeats < 4) {
        this.stop()
        this.repeats++
        this.playBell()
        this.startStand()
      }

      if (this.repeats >= 4) {
        this.stop()
        this.playBell()
        this.clearStand()
        this.repeats = 0

        Notification('Pomodoris concluído')
      }
    },
    stand (secs) {
      if (secs >= 300) {
        this.clearStand()
        this.start()
      }
    }
  },
  methods: {
    start () {
      this.interval = setInterval(() => {
        this.time++
      }, 1000)
    },
    stop () {
      if (this.interval) clearInterval(this.interval)
      this.time = 0
    },
    startStand () {
      this.standInterval = setInterval(() => {
        this.stand++
      }, 1000)
    },
    clearStand () {
      if (this.standInterval) clearInterval(this.standInterval)
      this.stand = 0
    },
    playBell () {
      const audio = new Audio('/sounds/339822__inspectorj__hand-bells-cluster.wav')
      audio.play()
    },
    stopAll () {
      this.stop()
      this.clearStand()
      this.repeats = 0
      this.$q.notify('Parado')
    },
    formatDate (secs) {
      let minutes = Math.floor(secs / 60)
      secs = secs % 60
      const hours = Math.floor(minutes / 60)
      minutes = minutes % 60
      return `${format.pad(hours)}:${format.pad(minutes)}:${format.pad(secs)}`
    }
  }
})
</script>
