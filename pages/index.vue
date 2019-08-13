<template>
  <v-app id="inspire">
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
                <v-icon middle color="error">mdi-circle</v-icon>
                <span></span>
                Server Status:
                {{ status ? 'Running' : 'Stopped' }}
              </v-card-title>
              <v-col>
                <v-autocomplete label="File Name"></v-autocomplete>
              </v-col>
              <v-card-actions>
                <v-btn color="success">Re/Start</v-btn>
                <v-btn color="error">Stop</v-btn>
              </v-card-actions>
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
  data: () => ({
    status: false
  })
}
</script>
