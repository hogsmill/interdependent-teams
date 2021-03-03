<template>
  <div id="app">
    <h1>Socket Test</h1>
    <h2>Message: {{ message }}, {{ date }}</h2>
    <button @click="send()">
      Send
    </button>
  </div>
</template>

<script>
import io from 'socket.io-client'

export default {
  name: 'App',
  data() {
    return {
      date: '',
      message: ''
    }
  },
  created() {
    let connStr
    if (location.hostname == 'localhost') {
      connStr = 'http://localhost:3017'
    } else {
      connStr = 'https://agilesimulations.co.uk:3017'
    }
    console.log('Connecting to: ' + connStr)
    this.socket = io(connStr)

    const self = this
    this.socket.on('testMessage', (data) => {
      console.log(data)
      self.date = data.date
      self.message = data.message
    })
  },
  methods: {
    send() {
      this.socket.emit('testMessage', {message: 'Hello World!'})
    }
  }
}
</script>
