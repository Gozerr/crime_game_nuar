<template>
    <div class="telegram-shell">
        <div class="telegram-header">
            <div class="avatar">Т</div>
            <div>
                <div class="chat-name">89224375282</div>
                <div class="chat-status">online</div>
            </div>
        </div>

        <div class="telegram-messages">
            <div class="message incoming" v-if="showFirst">
                <div class="bubble">{{ typedText1 }}</div>
                <div class="time">14:45</div>
            </div>

            <div class="message incoming" v-if="showSecond">
                <div class="bubble">{{ typedText2 }}</div>
                <div class="time">14:45</div>
            </div>

            <div class="message incoming photo-message" v-if="showPhoto">
                <img src="/девушка.jpg" alt="Фотография из сообщения" class="chat-photo" />
                <div class="time">14:46</div>
            </div>

            <div class="typing" v-if="isTyping">
                <span></span><span></span><span></span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LetterPhoto',
    props: {
        skip: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            typedText1: '',
            typedText2: '',
            fullText1: 'Привет.',
            fullText2: 'В следующий раз фотография будет ещё ближе.',
            showFirst: false,
            showSecond: false,
            showPhoto: false,
            isTyping: true,
        }
    },
    mounted() {
        if (this.skip) {
            this.isTyping = false;
            this.showFirst = true;
            this.showSecond = true;
            this.showPhoto = true;
            this.typedText1 = this.fullText1;
            this.typedText2 = this.fullText2;
        } else {
            this.runTypingSequence();
        }
    },
    methods: {
        runTypingSequence() {
            setTimeout(() => {
                this.isTyping = false;
                this.showFirst = true;
                this.typeText(this.fullText1, 'typedText1').then(() => {
                    setTimeout(() => {
                        this.showSecond = true;
                        this.typeText(this.fullText2, 'typedText2').then(() => {
                            setTimeout(() => {
                                this.showPhoto = true;
                            }, 1000);
                        });
                    }, 800);
                });
            }, 900);
        },
        typeText(text, target) {
            return new Promise((resolve) => {
                let index = 0;
                const interval = setInterval(() => {
                    this[target] += text[index];
                    index++;
                    if (index >= text.length) {
                        clearInterval(interval);
                        resolve();
                    }
                }, 50);
            });
        }
    }
}
</script>

<style scoped>
.telegram-shell {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: linear-gradient(180deg, #0e0f11 0%, #0c0d0f 100%);
    color: #0f172a;
    border-radius: 28px;
    overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif;
    box-shadow: inset 0 0 0 1px rgba(0,0,0,0.08), 0 10px 22px rgba(0,0,0,0.22);
}

.telegram-header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 14px;
    background: linear-gradient(90deg, #13161a 0%, #0c0d0f 100%);
    border-bottom: 1px solid rgba(0,0,0,0.06);
}

.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #5b8cff 0%, #2f6df6 100%);
    font-weight: 700;
    color: white;
}

.chat-name {
    font-size: 15px;
    font-weight: 700;
    color: #dbdde0;
}

.chat-status {
    font-size: 12px;
    color: #64748b;
}

.telegram-messages {
    flex: 1;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    background:
        radial-gradient(circle at top left, #13161a, transparent 35%),
        linear-gradient(180deg, #13161a 0%, #13161a 100%);
}

.message {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 82%;
}

.bubble {
    background: #ffffff;
    border-radius: 18px 18px 18px 6px;
    padding: 10px 12px;
    font-size: 14px;
    line-height: 1.4;
    box-shadow: 0 2px 6px rgba(0,0,0,0.08);
    color: #111827;
}

.time {
    font-size: 11px;
    color: #94a3b8;
    margin-top: 4px;
}

.photo-message {
    align-items: flex-start;
}

.chat-photo {
    width: 100%;
    max-width: 220px;
    border-radius: 16px;
    object-fit: cover;
    border: 1px solid rgba(0,0,0,0.08);
    box-shadow: 0 6px 16px rgba(0,0,0,0.14);
}

.typing {
    display: flex;
    gap: 4px;
    align-items: center;
    padding: 10px 12px;
    width: fit-content;
    background: #ffffff;
    border-radius: 18px 18px 18px 6px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.08);
}

.typing span {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #94a3b8;
    animation: blink 1.2s infinite ease-in-out;
}

.typing span:nth-child(2) { animation-delay: 0.2s; }
.typing span:nth-child(3) { animation-delay: 0.4s; }

@keyframes blink {
    0%, 80%, 100% { opacity: 0.2; transform: scale(0.9); }
    40% { opacity: 1; transform: scale(1); }
}
</style>