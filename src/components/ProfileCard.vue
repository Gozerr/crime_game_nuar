<template>
  <div class="phone-profile">
    <div class="profile-card">
      <div class="profile-top">
        <div class="profile-avatar">В</div>
        <div class="profile-top-meta">
          <div class="profile-name">Вячеслава</div>
          <div class="profile-last-seen">последний визит скрыт</div>
        </div>
      </div>

      <div class="profile-status-block">
        <div class="status-label">Статус</div>
        <div class="status-value">Пользователь ещё не заполнил статус</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileCard',
}
</script>

<style scoped>
.phone-profile {
  margin-top: 0;
  max-width: 30rem;
  width: min(100%, 30rem);
}

.profile-card {
  background: #0f1317;
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 1.2rem;
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
  background: linear-gradient(135deg, #4f6dff, #2a4edf);
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
</style>
