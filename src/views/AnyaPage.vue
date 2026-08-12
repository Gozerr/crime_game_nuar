<template>

    <div class="anya-page">

        <h1 class='anya-title'>Aня... Девочка , которую никто не помнит... </h1>

        <div class="content">

            <div class="photo-block">
                <div class="image-wrapper">
                    <img src="/аня.png" alt="девушка Аня" class="anya-image" />
                </div>
            </div>

            <div class="story-block">
                <AboutTypingText 
                    :text="aboutText.anyaStory"
                    :skip="skipAnimations"
                    @finished="onMainFinished" 
                />
            </div>

        </div>

    </div>

</template>

<script>
import AboutTypingText from '../components/AboutTypingText.vue'
import { aboutText } from '../data/aboutText'

export default {
    components: {
        AboutTypingText
    },

    data() {
        return {
            aboutText,
            skipAnimations: false
        }
    }
}

</script>

<style scoped>

.content {
    display:flex;
    gap: 2.5rem;
    align-item: flex-start;
}

.photo-block {
    flex: 0 0 840px;
}

.image-wrapper {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
}

.anya-image {
    display: block;
    max-width: 100%;
    max-height: 100%;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.anya-title {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    color: #ffff;
}

.story-block {
    flex: 1;
    color: #ffff;
    line-height: 1.7;
    font-size: 1.05rem;
}

/* ===== Адаптив для телефонов ===== */
@media (max-width: 768px) {
  .content {
    flex-direction: column;
    gap: 1.5rem;
  }

  .photo-block {
    flex: none;
    width: 100%;
    max-width: 320px;
    margin: 0 auto;
  }
}


/* ===== Адаптив для телефонов ===== */
@media (max-width: 768px) {
  .content {
    flex-direction: column;
    gap: 1.5rem;
  }

  .photo-block {
    flex: none;
    width: 100%;
    max-width: 320px;
    margin: 0 auto;
  }
}


</style>