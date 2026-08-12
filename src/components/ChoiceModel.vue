<template>
  <div class="choice-overlay" @click.self="handleBackdropClick">
    <div class="choice-card" role="dialog" aria-modal="true">
      <p class="choice-title">{{ title }}</p>

      <div class="choice-options">
        <button
          v-for="option in options"
          :key="option.id"
          class="choice-option"
          @click="choose(option.id)"
        >
          <span class="choice-option__label">{{ option.label }}</span>
          <span v-if="option.description" class="choice-option__desc">
            {{ option.description }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChoiceModal',
  props: {
    title: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
      // ожидаем [{ id: 'friend', label: '...', description: '...' }, ...]
    },
    closable: {
      type: Boolean,
      default: false, // важные сюжетные развилки нельзя закрыть кликом мимо
    },
  },
  emits: ['select'],
  methods: {
    choose(id) {
      this.$emit('select', id)
    },
    handleBackdropClick() {
      if (this.closable) {
        this.$emit('select', null)
      }
      // если closable = false — ничего не делаем,
      // пользователь обязан выбрать одну из веток
    },
  },
}
</script>

<style scoped>
.choice-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.78);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 1000;
}

.choice-card {
  width: min(92vw, 480px);
  background: linear-gradient(135deg, #1b1b1b, #101010);
  border: 1px solid rgba(201, 162, 39, 0.25);
  border-radius: 18px;
  padding: 1.6rem;
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.45);
}

.choice-title {
  font-family: 'Special Elite', serif;
  font-size: 1.15rem;
  color: #f4f1e8;
  margin: 0 0 1.2rem;
  line-height: 1.5;
}

.choice-options {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.choice-option {
  text-align: left;
  padding: 0.9rem 1.1rem;
  border-radius: 12px;
  border: 1px solid rgba(244, 241, 232, 0.15);
  background: rgba(255, 255, 255, 0.04);
  color: #f4f1e8;
  cursor: pointer;
  transition: border-color 0.25s ease, background 0.25s ease, transform 0.15s ease;
}

.choice-option:hover {
  border-color: #c9a227;
  background: rgba(201, 162, 39, 0.08);
  transform: translateY(-1px);
}

.choice-option__label {
  display: block;
  font-size: 1rem;
  font-weight: 600;
}

.choice-option__desc {
  display: block;
  margin-top: 0.3rem;
  font-size: 0.85rem;
  color: rgba(244, 241, 232, 0.65);
  font-weight: 400;
}
</style>