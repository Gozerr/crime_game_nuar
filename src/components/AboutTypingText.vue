<template>
  <div class="typing-text">
    <p>
      {{ typedText }}<span class="typing-cursor" v-if="typing">|</span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'AboutTypingText',
  props: {
    text: {
      type: String,
      required: true,
    },
    speed: {
      type: Number,
      default: 40,
    },
  },
  data() {
    return {
      typedText: '',
      typing: false,
      intervalId: null,
    }
  },
  emits: ['finished'],
  mounted() {
    this.startTyping()
  },
  beforeUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  },
  methods: {
    startTyping() {
      if (this.intervalId) {
        clearInterval(this.intervalId)
      }

      this.typedText = ''
      this.typing = true
      let index = 0

      this.intervalId = setInterval(() => {
        this.typedText += this.text[index]
        index += 1
        if (index >= this.text.length) {
          clearInterval(this.intervalId)
          this.intervalId = null
          this.typing = false
          this.$emit('finished')
        }
      }, this.speed)
    },
  },
}
</script>

<style scoped>
.typing-text {
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(244, 241, 232, 0.95);
  max-width: 42rem;
  width: min(100%, 42rem);
}

.typing-cursor {
  display: inline-block;
  margin-left: 0.2rem;
  animation: blink-cursor 1s steps(2, start) infinite;
}

@keyframes blink-cursor {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>
