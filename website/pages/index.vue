<template>
  <v-app id="home">
    <v-app-bar app clipped-left>
      <svgicon icon-class="logo" height="40" width="90" />
      <v-toolbar-title>AegiCloud</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container fluid pa-0>
        <v-responsive
          class="white--text py-12"
          style="background: linear-gradient(to bottom, #303030, #505050)"
        >
          <v-container>
            <v-layout align-center justify-center wrap>
              <v-img
                :class="{
                  'mx-5': $vuetify.breakpoint.mdAndUp,
                  'mb-6': $vuetify.breakpoint.smAndDown
                }"
                :height="$vuetify.breakpoint.mdAndUp ? 256 : 135"
                :width="$vuetify.breakpoint.mdAndUp ? 256 : 135"
                class="shrink"
                contain
                src="https://raw.githubusercontent.com/Afanyiyu/AegiCloud-Server/master/docs/logo.png"
              ></v-img>
              <div
                class="text-center text-lg-left"
                :style="
                  `flex: 0 1 ${$vuetify.breakpoint.mdAndDown ? '100%' : 'auto'}`
                "
              >
                <h1
                  :class="
                    ($vuetify.breakpoint.smAndDown && 'display-1') ||
                      'display-3'
                  "
                  class="font-weight-light mb-6 mx-4"
                >
                  下一代实时协作字幕编辑的开源解决方案
                </h1>
                <v-layout justify-center pa-4 wrap>
                  <v-btn
                    :block="$vuetify.breakpoint.xsOnly"
                    class="ma-2"
                    href="https://github.com/Afanyiyu/AegiCloud-Server"
                    large
                  >
                    <v-icon left>mdi-github-circle</v-icon>Github
                  </v-btn>
                </v-layout>
                <v-layout justify-center pa-4 wrap>
                  <kbd>
                    docker run -d -p 2120:2120 -p 2121:2121 -v
                    /aegicloud:/aegicloud/projects -e
                    VUE_APP_API_URL=http://&lt;your-ip-address&gt;:2120
                    afanyiyu/aegicloud --restart=always
                  </kbd>
                </v-layout>
                <v-layout justify-center pa-4 wrap>
                  <h1>直接联系</h1>
                </v-layout>
                <v-layout justify-center pa-4 wrap>
                  <p>
                    如果你是字幕组的成员且所属字幕组有使用 AegiCloud
                    的需要，开发者可以免费提供服务。
                  </p>
                </v-layout>
              </div>
            </v-layout>
            <v-layout justify-center pa-4 wrap>
              <v-btn
                :block="$vuetify.breakpoint.xsOnly"
                class="ma-2"
                href="mailto:afanyiyu@hotmail.com"
                large
                light
              >
                <v-icon left>mdi-email-outline</v-icon
                >E-Mail:afanyiyu@hotmail.com
              </v-btn>
              <v-btn
                :block="$vuetify.breakpoint.xsOnly"
                class="ma-2"
                href="http://wpa.qq.com/msgrd?v=3&uin=1302744182&site=qq&menu=yes"
                large
              >
                <v-icon left>mdi-chat-outline</v-icon>QQ:1302744182
              </v-btn>
            </v-layout>
            <v-layout justify-center pa-4 wrap>
              <h1>捐赠</h1>
            </v-layout>
            <v-layout justify-center pa-4 wrap>
              <p>您的捐赠是对该项目及我本人的支持。</p>
            </v-layout>
            <v-layout justify-center pa-4 wrap>
              <v-img
                :class="{
                  'mx-5': $vuetify.breakpoint.mdAndUp,
                  'mb-6': $vuetify.breakpoint.smAndDown
                }"
                :height="$vuetify.breakpoint.mdAndUp ? 320 : 135"
                :width="$vuetify.breakpoint.mdAndUp ? 320 : 135"
                class="shrink"
                contain
                src="https://raw.githubusercontent.com/Afanyiyu/AegiCloud-Server/master/docs/pay/Alipay.jpg"
              ></v-img>
              <v-img
                :class="{
                  'mx-5': $vuetify.breakpoint.mdAndUp,
                  'mb-6': $vuetify.breakpoint.smAndDown
                }"
                :height="$vuetify.breakpoint.mdAndUp ? 320 : 135"
                :width="$vuetify.breakpoint.mdAndUp ? 320 : 135"
                class="shrink"
                contain
                src="https://raw.githubusercontent.com/Afanyiyu/AegiCloud-Server/master/docs/pay/Wechat.png"
              ></v-img>
              <!-- <v-img
                :class="{
                  'mx-5': $vuetify.breakpoint.mdAndUp,
                  'mb-6': $vuetify.breakpoint.smAndDown
                }"
                :height="$vuetify.breakpoint.mdAndUp ? 256 : 135"
                :width="$vuetify.breakpoint.mdAndUp ? 256 : 135"
                class="shrink"
                contain
                src="https://raw.githubusercontent.com/Afanyiyu/AegiCloud-Server/master/docs/pay/WechatReward.png"
              ></v-img>-->
            </v-layout>
          </v-container>
        </v-responsive>
        <v-layout justify-center pa-4 wrap>&copy; 2019 Il Harper</v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<style lang="sass">
#home
  .v-card
    border-radius: 6px
.mono
  font-family: 'Roboto Mono', monospace !important
</style>
