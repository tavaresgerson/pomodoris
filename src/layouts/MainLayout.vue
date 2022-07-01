<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-transparent">
      <q-bar class="q-electron-drag bg-transparent text-primary">
        <div>Pomodoris</div>

        <q-space />

        <q-btn dense flat icon="minimize" @click="minimize" />
        <q-btn dense flat icon="close" @click="closeApp" />
      </q-bar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  methods: {
    minimize () {
      if (process.env.MODE === 'electron') {
        window.application.minimize()
      }
    },

    toggleMaximize () {
      if (process.env.MODE === 'electron') {
        window.application.toggleMaximize()
      }
    },

    closeApp () {
      if (process.env.MODE === 'electron') {
        window.application.close()
      }
    }
  }
})
</script>
