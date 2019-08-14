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
              <v-card-title>Recent Projects</v-card-title>
              <v-simple-table>
                <thead>
                  <tr>
                    <th class="text-left">File Name</th>
                    <th class="text-right">Open</th>
                    <th class="text-right">Export</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in $store.state.filelist" :key="item">
                    <td>{{ item }}</td>
                    <td>
                      <v-btn fab dark small color="teal">
                        <v-icon dark>mdi-upload</v-icon>
                      </v-btn>
                    </td>
                    <td>
                      <v-btn fab dark small color="purple">
                        <v-icon dark>mdi-export</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
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
  mounted() {
    this.timer = setInterval(async () => {
      try {
        const response = await this.$axios.post('/api/check')
        if (response.status === 405) {
          this.$store.commit('setInstallStatus', true)
          return
        }
        this.$store.commit('setStatus', response.data)
      } catch (error) {}
    }, 5000)
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  methods: {
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
    }
  }
}
</script>
