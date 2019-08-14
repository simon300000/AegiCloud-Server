<template>
  <v-app>
    <v-app-bar app clipped-left>
      <svgicon icon-class="logo" height="40" width="90" />
      <v-toolbar-title>AegiCloud</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="7">
            <v-card>
              <v-card-title>
                <v-icon
                  middle
                  :color="$store.state.isRunning ? 'success' : 'error'"
                  >mdi-circle</v-icon
                >
                <span></span>
                Server Status:
                {{ $store.state.isRunning ? 'Running' : 'Stopped' }}
              </v-card-title>
              <v-col>
                <v-text-field v-model="fname" label="File Name"></v-text-field>
              </v-col>
              <v-card-actions>
                <v-btn color="success" @click="serverStart">Re/Start</v-btn>
                <v-btn color="error" @click="serverStop">Stop</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="7">
            <v-card>
              <v-data-table
                :headers="[
                  { text: 'File Name', value: 'name' },
                  { text: 'Actions', value: 'action', sortable: false }
                ]"
                :items="$store.state.filelist"
              >
                <template v-slot:item.name="{ item }">
                  <v-label dark>{{ item }}</v-label>
                </template>
                <template v-slot:item.action="{ item }">
                  <v-icon small class="mr-2" @click="fname = item"
                    >mdi-upload</v-icon
                  >
                  <v-icon small @click="exportStart(item)">mdi-export</v-icon>
                </template>
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; AegiCloud 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  head: () => ({
    title: 'AegiCloud'
  }),
  data: () => ({
    fname: ''
  }),
  created() {
    if (!this.$store.state.token || this.$store.state.token === '')
      this.$router.push('/login')
  },
  async mounted() {
    await this.Check()
    this.timer = setInterval(this.Check, 5000)
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  methods: {
    async Check() {
      try {
        const response = await this.$axios.post('/api/check')
        if (response.status === 405) {
          this.$store.commit('setInstallStatus', true)
          return
        }
        this.$store.commit('setStatus', response.data)
      } catch (error) {}
    },
    async serverStart() {
      if (!this.fname || this.fname === '') return
      try {
        await this.$axios.post('/api/init', {
          filename: this.fname
        })
      } catch (error) {
        console.log(error)
      }
    },
    async serverStop() {
      try {
        await this.$axios.post('/api/stop')
      } catch (error) {
        console.log(error)
      }
    },
    async exportStart(item) {
      try {
        const res = await this.$axios({
          method: 'post',
          url: '/api/exportfile',
          data: {
            filename: item
          },
          responseType: 'arraybuffer'
        })
        this.download(res, item)
        // const blob = new Blob([res.data], { type: res.headers['content-type'] })
        // const downUrl = URL.createObjectURL(blob)
        // window.location.href = downUrl
      } catch (error) {
        console.log(error)
      }
    },
    download(res, item) {
      if (!res.data) {
        return
      }
      const url = window.URL.createObjectURL(
        new Blob([res.data], { type: res.headers['content-type'] })
      )
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', item)
      document.body.appendChild(link)
      link.click()
      URL.revokeObjectURL(link.href) // 释放URL 对象
      document.body.removeChild(link)
    }
  }
}
</script>
