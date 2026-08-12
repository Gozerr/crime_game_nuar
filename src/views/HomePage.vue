<template>
  <div class="home-page">
    <div class="intro-scene">
      <img src="/девушка у окна.png" alt="Девушка у окна" class="portrait-image" />

      <div class="intro-copy">
        <p class="eyebrow">Нуарный детектив</p>
        <h1>Тьма у окна</h1>
        <p class="description">
          Все началось два месяца назад, когда в ночь, похожую на эту, на телефон пришло сообщение.
          Теперь тебе предстоит пройти по следу, который ведёт к правде.
        </p>
        <p class="rules">
          Правила просты: 
          <p class="rules-list">
            <p>— Обращай внимание на даты и время.</p>
            <p>— Проверяй найденную информацию.</p>
            <p>— Не игнорируй мелкие детали.</p>
            <p>— Не доверяй первой версии.</p>
            <p>— Сохраняй всё, что может стать уликой.</p>
          </p>
        </p>
        <button class="center-btn" @click="goToStartMessage">Начать расследование</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToStartMessage() {
      this.$router.push('/start-message');
    }
  },

  mounted() {
  const animationFinished = localStorage.getItem('detectiveStoryAnimationFinished');

    if (animationFinished === 'true') {
      this.typedText = this.fullText;
      this.textVisible = true;
      this.actionsVisible = true;
      this.typing = false;
    } else {
      this.textVisible = true;
      this.typing = true;
      this.actionsVisible = false;
      this.typeText();
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Special+Elite&display=swap');

.home-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  box-sizing: border-box;
  background: #080808;
  color: #f4f1e8;
  overflow: hidden;
}

.intro-scene {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: left;
}

.portrait-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  filter: grayscale(90%) contrast(1.15) brightness(0.65) sepia(0.2);
}

.intro-copy {
  position: relative;
  z-index: 1;
  max-width: 560px;
  margin-left: 2rem;
  padding: 2rem;
  border-radius: 24px;
  background: linear-gradient(90deg, rgba(0,0,0,0.72), rgba(0,0,0,0.35));
  backdrop-filter: blur(6px);
  box-shadow: 0 20px 45px rgba(0,0,0,0.3);
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.24em;
  color: #c9a227;
  font-size: 0.85rem;
  margin-bottom: 0.6rem;
}

.intro-copy h1 {
  font-family: 'Special Elite', serif;
  font-size: clamp(2rem, 4vw, 3rem);
  margin: 0 0 1rem;
}

.description,
.rules {
  font-size: 1.05rem;
  line-height: 1.4;
  color: rgba(244,241,232,0.9);
}

.center-btn {
  margin-top: 1.2rem;
  padding: 0.9rem 1.4rem;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, #c9a227, #8b6712);
  color: #111;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 8px 22px rgba(0,0,0,0.28);
}

.rules-list {
  margin-top: 0.35rem;
  padding-left: 1rem;
  font-size: 0.95rem;
  line-height: 1.3;
}

@media (max-width: 900px) {
  .home-page {
    padding: 0 0 2rem;
  }

  .intro-scene {
    display: block;
    min-height: auto;
  }

  .portrait-image {
    object-position: center 35%;
  }

  .intro-copy {
    margin: 1rem;
    padding: 1.5rem;
    max-width: calc(100vw - 2rem);
  }

  .description,
  .rules,
  .rules-list {
    font-size: 0.98rem;
  }

  .rules-list {
    padding-left: 0.75rem;
  }

  .center-btn {
    width: 100%;
  }
}
</style>
