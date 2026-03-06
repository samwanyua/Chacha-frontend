# Chacha AI - Speech Support Tool for Children 

Chacha is an AI-powered speech support platform designed to help children overcome speech impairments and developmental delays through interactive, engaging, and feedback-driven learning.

---

## 1. Problem Statement

Millions of young children experience speech impairments or delayed speech development, making clear communication a daily challenge. 
Professional speech therapy is often:
- **Limited in Access:** High demand but few qualified therapists.
- **Expensive:** Often out of reach for many families and schools.
- **Inconsistent:** Significant gaps between therapy sessions hinder progress.

Without frequent practice, children face academic and social hurdles, leading to decreased confidence and participation.

### Target Challenges
We focus on a spectrum of speech impairments from mild to moderate:
1. **Mild:** Lisps (difficutly with "s" and "z"), mild articulation errors, and occasional stuttering.
2. **Moderate:** Phonological disorders, Childhood Apraxia of Speech (difficulty coordinating movements), and Dysarthria (weakness/slowness of speech muscles).

---

## 2. Solution

Chacha provides a scalable, interactive **AI Speech Partner**. 
The application:
- **Listens:** Captures child speech in real-time.
- **Analyzes:** Uses advanced AI models to evaluate pronunciation accuracy.
- **Gamifies:** Provides instant feedback, "stars," and badges to turn practice into a game.
- **Supports:** Offers data-driven progress tracking for parents, teachers, and therapists.

---

## 3. Approach

Our platform combines cutting-edge AI with child-centric design:
1. **Speech Capture:** High-quality recording via browser-based MediaRecorder.
2. **Pronunciation Analysis:** 
   - **STT (Speech-to-Text):** Transcribing audio using Whisper models.
   - **Scoring:** Detailed comparison between transcription and target text using Levenshtein distance and weighted accuracy metrics.
3. **Feedback Loop:** Visual indicators (Excellent, Good, Practice More) and "Star Progress" keep the user engaged.
4. **Progress Monitoring:** A detailed dashboard showing historical attempts, average accuracy, and mastered modules.

---

## 4. Key Differentiators

While apps like *Otsimo*, *Speech Blubs*, and *Better Speech* exist, Chacha focuses on:
- **Localized Adaptability:** Design targeting diverse learners and speech patterns.
- **Child-Friendly UX:** Vibrantly animated "Chameleon" mascot and intuitive, low-friction interfaces.

---

## 5. Technical Documentation

### Project Structure
```text
src
 ┣ app
 ┃ ┣ favicon.ico
 ┃ ┣ globals.css
 ┃ ┣ layout.js
 ┃ ┣ page.js
 ┃ ┣ page.module.css
 ┃ ┗ theme-provider.js
 ┣ assets
 ┃ ┣ background.png
 ┃ ┣ chacha-logo.png
 ┃ ┗ chameleon-mascot.png
 ┣ components
 ┃ ┣ ChachaLogo.jsx
 ┃ ┣ ChameleonMascot.jsx
 ┃ ┣ ComingSoon.jsx
 ┃ ┣ FeedbackBadge.jsx
 ┃ ┣ MicButton.jsx
 ┃ ┣ ProgressDots.jsx
 ┃ ┣ SideNav.jsx
 ┃ ┗ StarBar.jsx
 ┣ constants
 ┃ ┣ data.js
 ┃ ┗ theme.js
 ┣ hooks
 ┃ ┗ useSpeech.js
 ┣ screens
 ┃ ┣ AuthPage.jsx
 ┃ ┣ HowItWorks.jsx
 ┃ ┣ LandingPage.jsx
 ┃ ┣ Module1.jsx
 ┃ ┣ Module2.jsx
 ┃ ┣ Module3.jsx
 ┃ ┣ ModuleSelector.jsx
 ┃ ┗ ProgressPage.jsx
 ┣ styles
 ┃ ┗ animations.css
 ┗ utils
 ┃ ┗ audioHelper.js
```

### Frontend Setup (Next.js)
1. **Navigate to project root:** `cd chacha-next`
2. **Install dependencies:** `npm install`
3. **Configure API:** Ensure the frontend points to the new [Chacha-backend repository](https://github.com/samwanyua/Chacha-backend) URL. Look at `src/utils/audioHelper.js` or similar for API endpoints.
4. **Run Development:** `npm run dev`

---

## 6. Backend Integration
The backend for Chacha is now maintained in its own repository. It handles:
- **STT Processing:** Using Whisper for transcription.
- **Scoring Engine:** Calculating pronunciation accuracy.
- **TTS Synthesis:** Providing voice responses.

For backend setup, please refer to the dedicated [Chacha-backend](https://github.com/samwanyua/Chacha-backend) project.



Developed with ❤️ for children everywhere.