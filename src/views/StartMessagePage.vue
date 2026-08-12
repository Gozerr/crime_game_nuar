<template>
  <div class="start-message-page">
    <div class="content-card">
      <div class="story-column">
        <p class="eyebrow">Ночной вызов</p>
        <h1>Письмо из тьмы</h1>
        <p class="story-line" :class="{ 'is-visible': textVisible }">
          {{ typedText }}<span class="typing-cursor" v-if="typing">|</span>
        </p>
        <div class="actions" :class="{ 'is-visible': actionsVisible }">
          <button class="answer-btn" @click="openModal">{{ solved ? 'Продолжить расследование' : 'Ввести ответ' }}</button>
          <button class="back-btn" @click="goHome">Вернуться назад</button>
        </div>
      </div>

      <div class="phone-column">
        <div class="phone-frame">
          <LetterPhoto :skip="skipPhoneAnimation" />
        </div>
      </div>
    </div>

    <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal-card" role="dialog" aria-modal="true">
        <button class="close-btn" @click="closeModal" aria-label="Закрыть">×</button>
        <h2>Введите правильный ответ</h2>
        <p class="modal-hint">А вы реально оставляете неизвестные номера без пробива ? Неужели так не интересно чей это номер ?.</p>
        <input v-model="answer" type="text" placeholder="Введите ответ" @keyup.enter="submitAnswer" />
        <button class="modal-submit" @click="submitAnswer">Подтвердить</button>
        <p v-if="error" class="error">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import LetterPhoto from '../components/LetterPhoto.vue';
import { loadProgress, updateProgress } from '../data/progress.js';

export default {
  components: { LetterPhoto },
  data() {
    return {
      typedText: '',
      fullText: 'Последние несколько недель тебе кажется, что за тобой кто-то следит. Сначала ты старалась не обращать внимания на странные звонки, одну и ту же машину возле дома и незнакомых людей, которых начала замечать слишком часто. Но сегодня тебе пришло сообщение в Telegram. В нём была фотография тебя. Сделанная в тот момент, когда ты не ожидаешь.',
      typingInterval: null,
      typing: false,
      textVisible: false,
      actionsVisible: false,
      isModalOpen: false,
      answer: '',
      error: '',
      solved: false,
      skipPhoneAnimation: false
    }
  },
  created() {
    // created() срабатывает до монтирования дочерних компонентов (LetterPhoto),
    // поэтому skipPhoneAnimation успевает стать нужным значением ДО того,
    // как LetterPhoto прочитает свой проп skip в собственном mounted().
    const progress = loadProgress();
    this.solved = progress.solvedFirstPuzzle;
    this.skipPhoneAnimation = progress.seenIntro;

    if (progress.seenIntro) {
      this.typedText = this.fullText;
      this.textVisible = true;
      this.actionsVisible = true;
      this.typing = false;
    } else {
      this.textVisible = true;
      this.typing = true;
      this.actionsVisible = false;
    }
  },
  mounted() {
    // setInterval трогает DOM опосредованно через реактивность, безопасно
    // запускать его и в mounted() — важно было только раньше выставить skip.
    if (this.typing) {
      this.typeText();
    }
  },
  methods: {
    typeText() {
      if (this.typingInterval) {
        clearInterval(this.typingInterval);
      }

      let index = 0;
      this.typedText = '';
      this.typingInterval = setInterval(() => {
        this.typedText += this.fullText[index];
        index++;
        if (index >= this.fullText.length) {
          clearInterval(this.typingInterval);
          this.typingInterval = null;
          this.typing = false;
          this.textVisible = true;
          setTimeout(() => {
            this.actionsVisible = true;
          }, 250);
          updateProgress({ seenIntro: true });
        }
      }, 45);
    },
    openModal() {
      if (this.solved) {
        this.$router.push('/about');
        return;
      }
      this.isModalOpen = true;
      this.error = '';
    },
    closeModal() {
      this.isModalOpen = false;
      this.answer = '';
      this.error = '';
    },
    submitAnswer() {
      const correctAnswer = 'vyacheslava';
      if (this.answer.trim().toLowerCase() === correctAnswer) {
        this.closeModal();
        this.solved = true;
        const endTime = Date.now() + 10 * 60 * 60 * 1000;
        updateProgress({
          solvedFirstPuzzle: true,
          timerEnd: endTime,
          timerActive: true,
        });
        this.$router.push('/about');
      } else {
        this.error = 'Неверный ответ. Попробуйте снова.';
      }
    },
    goHome() {
      this.$router.push('/');
    }

  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Special+Elite&display=swap');

.start-message-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  box-sizing: border-box;
  background: radial-gradient(circle at top left, rgba(0,0,0,0.2), transparent 25%), #080808;
  color: #f4f1e8;
}

.content-card {
  width: 100%;
  max-width: 1400px;
  display: grid;
  grid-template-columns: 1fr 0.9fr;
  gap: 2rem;
  align-items: center;
}

.story-column {
  max-width: 560px;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.24em;
  color: #c9a227;
  font-size: 0.85rem;
  margin-bottom: 0.6rem;
}

h1 {
  font-family: 'Special Elite', serif;
  font-size: clamp(2rem, 4vw, 3rem);
  margin: 0 0 1rem;
}

.story-line {
  font-size: 1.08rem;
  line-height: 1.35;
  color: rgba(244, 241, 232, 0.92);
  min-height: 120px;
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.story-line.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.typing-cursor {
  display: inline-block;
  margin-left: 2px;
  animation: blink-cursor 1s step-start infinite;
  color: rgba(244, 241, 232, 0.92);
}

@keyframes blink-cursor {
  0%, 40%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 1rem;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.actions.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.actions {
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 1rem;
}

.answer-btn,
.back-btn,
.modal-submit {
  padding: 0.9rem 1.4rem;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, #c9a227, #8b6712);
  color: #111;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 8px 22px rgba(0,0,0,0.28);
}

.back-btn {
  background: transparent;
  color: #f4f1e8;
  border: 1px solid rgba(244, 241, 232, 0.25);
  box-shadow: none;
}

.phone-column {
  display: flex;
  justify-content: center;
}

.phone-frame {
  width: min(92%, 360px);
  height: min(92%, 680px);
  border-radius: 36px;
  background: linear-gradient(145deg, #111827, #0f172a);
  box-shadow: 0 25px 55px rgba(0,0,0,0.6);
  border: 8px solid #111827;
  overflow: hidden;
}

.phone-frame > * {
  width: 100%;
  height: 100%;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.72);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 1000;
}

.modal-card {
  width: min(92vw, 420px);
  background: linear-gradient(135deg, #1b1b1b, #101010);
  border: 1px solid rgba(201, 162, 39, 0.25);
  border-radius: 18px;
  padding: 1.4rem;
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.45);
  position: relative;
}

.modal-card h2 {
  margin: 0 0 0.6rem;
  font-size: 1.2rem;
}

.modal-hint {
  margin: 0 0 1rem;
  color: rgba(244, 241, 232, 0.8);
  line-height: 1.6;
}

.modal-card input {
  width: 100%;
  box-sizing: border-box;
  padding: 0.8rem 1rem;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.08);
  color: #fff;
  margin-bottom: 0.9rem;
}

.close-btn {
  position: absolute;
  top: 0.7rem;
  right: 0.7rem;
  border: none;
  background: transparent;
  color: #fff;
  font-size: 1.3rem;
  cursor: pointer;
}

.error {
  margin-top: 0.8rem;
  color: #ff8a8a;
}

@media (max-width: 900px) {
  .content-card {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 0 0.25rem;
  }

  .story-column {
    max-width: 100%;
  }

  .story-line {
    font-size: 1rem;
    min-height: auto;
  }

  .phone-column {
    display: flex;
    justify-content: center;
  }

  .phone-frame {
    width: 100%;
    min-height: 420px;
    max-height: 580px;
  }

  .actions {
    flex-direction: column;
    align-items: stretch;
  }

  .answer-btn,
  .back-btn {
    width: 100%;
  }

  .modal-card {
    width: min(100%, 92vw);
    padding: 1rem;
  }

  .modal-card h2 {
    font-size: 1.1rem;
  }

  .modal-hint {
    font-size: 0.95rem;
  }
}
</style>