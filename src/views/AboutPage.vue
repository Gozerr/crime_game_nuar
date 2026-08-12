<template>
  <div class="about-page">



    <h1 class='vyacheslav-title'>Вячеслава ?</h1>
    <div class="story-text">
      <AboutTypingText
        :text="aboutText.main"
        :skip="skipAnimations"
        @finished="onMainFinished"
      />
    </div>

    <div class="about-grid">
      <transition name="fade-up">
        <div v-if="phoneVisible" class="phone-message">
          <PhoneMessage />
        </div>
      </transition>

      <div class="right-column">
        <transition name="fade-up">
          <div v-if="extraTextVisible" class="story-text1">
            <AboutTypingText
              :text="extraText"
              :skip="skipAnimations"
              @finished="phoneProfileVisible = true"
            />
          </div>
        </transition>

        <transition name="fade-up">
          <div v-if="phoneProfileVisible" class="phone-profile">
            <ProfileCard />
          </div>
        </transition>
      </div>

      <div class="left-column">
        <transition name="fade-up">
          <div v-if="phoneProfileVisible" class="story-text2">
            <AboutTypingText
              :text="dopnikText"
              :skip="skipAnimations"
              @finished="onDopnikFinished"
            />
          </div>
        </transition>
        <img v-if="imageVisible"
          src="/компания людей.png"
          alt="Наша компашка"
          class="photo_group"
          @click="openImage"
        />
      </div>

      <div v-if="imageOpen" class="image-modal" @click.self="closeImage">
        <button class="image-modal__close" @click="closeImage">×</button>
        <img src="/компания людей.png" alt="Наша компашка" class="image-modal__img" />
        <ChoiceModel
          v-if="showGirlChoice"
          title="Я вглядываюсь в размытое лицо на фотографии... и понимаю "
          :options="girlChoiceOptions"
          @select="handleChoice"
        />
      </div>
    </div>

    <button @click="goToHome" class="goToHome">Вернуться на главную</button>

    

  </div>
</template>

<script>
import AboutTypingText from '../components/AboutTypingText.vue'
import PhoneMessage from '../components/PhoneMessage.vue'
import ProfileCard from '../components/ProfileCard.vue'
import { aboutText } from '../data/aboutText'
import { loadProgress, updateProgress } from '../data/progress.js'
import ChoiceModel from '../components/ChoiceModel.vue'
import AnyaPage from '../views/AnyaPage.vue'

export default {
  components: {
    AboutTypingText,
    PhoneMessage,
    ProfileCard,
    ChoiceModel,
  },
  data() {
    return {
      timerStarted: false,
      timeLeft: 10 * 60 * 60,
      timeInterval: null,
      aboutText,
      extraTextVisible: false,
      extraTyping: false,
      phoneVisible: false,
      phoneProfileVisible: false,
      extraTypedText: '',
      extraText: aboutText.extra,
      dopnikText: aboutText.dopnik,
      imageVisible: false,
      imageOpen: false,
      skipAnimations: false,
      showGirlChoice: false,
      girlChoiceOptions: [
        { id: 'anya',   label: 'Это Аня',              description: 'Подруга, с которой мы перестали общаться' },
        { id: 'stranger', label: 'Я её не знаю',          description: 'Но лицо кажется смутно знакомым' },
        { id: 'self',     label: 'Это... я?',             description: 'Куртка, стрижка — но я не помню этого кадра' },
      ],
    }
  },
  created() {
    // created() срабатывает до монтирования дочерних AboutTypingText,
    // поэтому skipAnimations успевает стать true ДО того, как компонент
    // текста прочитает свой проп skip в собственном mounted().
    const progress = loadProgress()
    if (progress.seenAbout) {
      this.skipAnimations = true
      this.phoneVisible = true
      this.extraTextVisible = true
      this.phoneProfileVisible = true
      this.imageVisible = true
    } else {
      this.startMainTyping()
    }
  },
  beforeUnmount() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval)
    }
  },
  methods: {
    goToHome() {
      this.$router.push('/start-message')
    },
    startMainTyping() {
      // Начало первого набора текста, если нужна дополнительная логика.
    },
    onMainFinished() {
      this.phoneVisible = true
      setTimeout(() => {
        this.extraTextVisible = true
      }, 300)
    },
    openImage() {
      this.imageOpen = true

      this.showGirlChoice = false

      setTimeout(() => {
        this.showGirlChoice = true
      }, 2500)
    },
    closeImage() {
      this.imageOpen = false
      this.showGirlChoice = false
    },
    onDopnikFinished() {
      const progress = loadProgress()
      if (progress.girlIdentity) {
        this.girlIdentity = progress.girlIdentity
        
      } 
      this.imageVisible = true
      
      updateProgress({ seenAbout: true })
    },
    onGirlChoiceSelected(id) {
      this.showGirlChoice = false
      updateProgress({ girlIdentity: id })
      // дальше — показ текста нужной ветки, например:
      this.girlIdentity = id
      this.imageVisible = true
    },
    handleChoice(id) {
      if (id === 'anya')
      this.$router.push('/anya')
      else if (id === 'stranger') {
        this.$router.push('/start-message')
      } else if (id === 'self') {
        this.$router.push('/start-message')
      }
    },
  },
}
</script>

<style scoped>

.photo_group {
  width: 100%;
  max-width: 600px;
  margin-top: 2rem;
  border-radius: 12px;
  box-shadow: 0 10px 24px rgba(0,0,0,0.35);
  cursor: zoom-in;
}

.image-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  z-index: 20;
}

.image-modal__img {
  max-width: 100%;
  max-height: 100%;
  border-radius: 14px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.65);
}

.image-modal__close {
  position: fixed;
  top: 1rem;
  right: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  background: rgba(255, 255, 255, 0.08);
  color: #f4f1e8;
  font-size: 1.8rem;
  border-radius: 50%;
  cursor: pointer;
  z-index: 25;
}

.about-page {
  min-height: 100vh;
  padding: 2rem;
  box-sizing: border-box;
  background: linear-gradient(135deg, #111 0%, #1f1a17 100%);
  color: #f4f1e8;
  font-family: 'Special Elite', serif;
  position: relative;
}

.goToHome {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  background-color: #cca01d;
  color: #111;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  position: fixed;
  top: 1rem;
  right: 1rem;
  left: auto;
  box-shadow: 0 10px 24px rgba(0,0,0,0.35);
  backdrop-filter: blur(6px);
}

.goToHome:hover {
  background-color: #cca01d;
  scale: 1.05;
  transition: all 0.4s ease-in-out;
}

.story-text {
  margin: 1.5rem 0 0;
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(244,241,232,0.9);
  position: relative;
  max-width: 42rem;
  width: min(100%, 42rem);
}

.story-text1 {
  margin: 0 0 1.5rem;
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(244,241,232,0.9);
  position: relative;
  max-width: 42rem;
  width: min(100%, 42rem);
  text-align: left;
}

.story-text2 {
  margin: 0 0 1.5rem;
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(244,241,232,0.9);
  position: relative;
  max-width: 42rem;
  width: min(100%, 42rem);
  text-align: left;
}

.vyacheslav-title {
  margin: 1.5rem 0 0;
  color: #f5ecec;
  font-size: 2.5rem;
}

.about-grid {
  display: grid;
  grid-template-columns: minmax(280px, 30rem) minmax(280px, 1fr);
  gap: 2rem;
  align-items: start;
  margin-top: 2rem;
}

.left-column,
.right-column {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  align-items: flex-start;
}

.right-column {
  justify-self: end;
}

.photo_group,
.phone-message,
.phone-profile,
.story-text,
.story-text1,
.story-text2 {
  width: 100%;
  max-width: 100%;
}

@media (max-width: 900px) {
  .about-page {
    padding: 1.25rem;
  }

  .about-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .right-column,
  .left-column {
    justify-self: start;
  }

  .goToHome {
    top: 0.75rem;
    right: 0.75rem;
    padding: 0.45rem 0.9rem;
    font-size: 0.85rem;
  }

  .story-text,
  .story-text1,
  .story-text2 {
    max-width: 100%;
  }

  .photo_group {
    max-width: 100%;
  }
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

.phone-message {
  margin-top: 2rem;
  max-width: 30rem;
  width: min(100%, 30rem);
}

.phone-shell {
  background: linear-gradient(180deg, #131313 0%, #0d0d0d 100%);
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 1rem;
  box-shadow: 0 18px 36px rgba(0, 0, 0, 0.35);
} 

.phone-body--offset {
  margin-top: 1.1rem;
}

.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(16px);
}

.fade-up-enter-to,
.fade-up-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.phone-profile {
  margin-top: 0;
  width: min(100%, 30rem);
}

.profile-card {
  background: #0f1317;
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 1rem;
  box-shadow: 0 18px 36px rgba(0, 0, 0, 0.35);
}

.profile-top {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.2rem;
}

.profile-avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, #cca01d, #cca01d);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: 1.4rem;
}

.profile-top-meta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
}

.profile-name {
  font-size: 1.05rem;
  font-weight: 700;
  color: #f4f1e8;
  text-align: center;
}

.profile-last-seen {
  font-size: 0.9rem;
  color: rgba(244, 241, 232, 0.65);
  text-align: center;
}

.profile-status-block {
  padding: 1rem;
  border-radius: 18px;
  background: rgba(255,255,255,0.05);
}

.status-label {
  font-size: 0.9rem;
  color: rgba(244, 241, 232, 0.8);
  margin-bottom: 0.45rem;
}

.status-value {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.9);
  text-align: left;
  line-height: 1.5;
}

.phone-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #cca01d;
  color: #111;
  font-weight: 700;
}

.phone-avatar1 {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #cca01d;
  color: #111;
  font-weight: 700;
}

.phone-name {
  font-size: 1rem;
  font-weight: 700;
}

.phone-name1 {
  font-size: 1.25rem;
  font-weight: 900;
}

.phone-status {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
}

.phone-status1 {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
}

.phone-body {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

.phone-bubble {
  align-self: flex-start;
  background: #f4f1e8;
  color: #111;
  padding: 0.9rem 1.5rem;
  border-radius: 18px 18px 18px 6px;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.16);
  line-height: 1.4;
}

.phone-time {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.55);
}

.status-name {
  font-size: 1rem;
  font-weight: 700;
  margin-top: 1rem;
}

.status-text {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.6);
}

</style>