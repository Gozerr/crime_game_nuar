<template>
  <div class="app-shell">
    <transition name="fade-dark" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
}

.fade-dark-enter-active,
.fade-dark-leave-active {
  transition: opacity 4s ease, transform 2s ease;
}

.fade-dark-enter-from,
.fade-dark-leave-to {
  opacity: 0;
  transform: scale(0.98);
}

.fade-dark-enter-to,
.fade-dark-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
