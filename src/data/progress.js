const STORAGE_KEY = 'gameProgress'

// Дефолтная структура прогресса. Когда будешь добавлять развилку,
// просто расширь этот объект — например path: null (или 'external' / 'internal').
const defaultProgress = {
  seenIntro: false,       // прошла ли анимация текста на StartMessagePage
  solvedFirstPuzzle: false, // введён ли верный ответ в первой модалке
  timerEnd: null,          // timestamp окончания таймера расследования
  timerActive: false,
  seenAbout: false,        // прошла ли анимация на AboutPage
  // path: null,           // <- сюда позже ляжет ветка сюжета
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...defaultProgress }
    return { ...defaultProgress, ...JSON.parse(raw) }
  } catch (e) {
    return { ...defaultProgress }
  }
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

// Обновить один или несколько полей и сразу сохранить.
// Пример: updateProgress({ solvedFirstPuzzle: true, timerActive: true })
function updateProgress(patch) {
  const current = loadProgress()
  const next = { ...current, ...patch }
  saveProgress(next)
  return next
}

function resetProgress() {
  localStorage.removeItem(STORAGE_KEY)
}

export { loadProgress, updateProgress, resetProgress }