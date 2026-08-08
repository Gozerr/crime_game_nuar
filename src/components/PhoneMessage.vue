<template>
  <div class="phone-message">
    <div class="phone-shell">
      <div class="phone-header">
        <div class="phone-avatar">В</div>
        <div>
          <div class="phone-name">Вячеслава</div>
          <div class="phone-status">online</div>
        </div>
      </div>
      <div class="phone-body phone-body--offset">
        <div class="phone-bubble">Береги себя</div>
        <div class="phone-time">14:52</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PhoneMessage',
}
</script>

<style scoped>
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

.phone-header {
  display: flex;
  align-items: center;
  gap: 0.85rem;
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

.phone-name {
  font-size: 1rem;
  font-weight: 700;
}

.phone-status {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
}

.phone-body {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.phone-body--offset {
  margin-top: 1.1rem;
}

.phone-bubble {
  align-self: flex-start;
  background: #f4f1e8;
  color: #111;
  padding: 0.9rem 1rem;
  border-radius: 18px 18px 18px 6px;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.16);
  line-height: 1.4;
}

.phone-time {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.55);
}
</style>
