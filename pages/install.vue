<template>
  <v-app>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <svgicon icon-class="logo" height="50" width="110" />
                <v-toolbar-title>AegiCloud Installer</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="username"
                    label="Username"
                    prepend-icon="mdi-login"
                    type="text"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="password"
                    label="Password"
                    prepend-icon="mdi-lock"
                    type="password"
                    required
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="submit">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    username: '',
    password: ''
  }),
  methods: {
    async submit() {
      let response
      try {
        response = await this.$axios.post('/api/install', {
          username: this.username,
          password: this.password
        })
      } catch (error) {
        console.log(error)
        return
      }

      if (!response) {
        console.log('No Response')
        return
      }

      if (response.status !== 200) {
        console.log('Err Stat: ' + response.status)
        console.log(response)
        return
      }

      console.log(response)

      this.$router.push('/login')
    }
  }
}
</script>
