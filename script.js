// UI elements
const messageBox = document.getElementById('message-box');
const confirmOverlay = document.getElementById('custom-confirm-overlay');
const confirmMessageElem = document.getElementById('confirm-message');
const confirmYesBtn = document.getElementById('confirm-yes');
const confirmNoBtn = document.getElementById('confirm-no');
const userInfoElem = document.getElementById('user-info');

const wordEnInput = document.getElementById('word-en');
const wordArInput = document.getElementById('word-ar');
const wordImageInput = document.getElementById('word-image');
const wordCategorySelect = document.getElementById('word-category');
const addWordBtn = document.getElementById('add-word-btn');
const updateWordBtn = document.getElementById('update-word-btn');
const vocabularyList = document.getElementById('vocabulary-list');
const filterCategorySelect = document.getElementById('filter-category');

const quizStartSection = document.getElementById('quiz-start');
const quizQuestionsSection = document.getElementById('quiz-questions');
const quizQuestionElem = document.getElementById('quiz-question');
const quizOptionsBtns = quizQuestionsSection.querySelectorAll('.quiz-options button');
const quizMessageElem = document.getElementById('quiz-message');

let currentWordId = null;
let vocabularyData = [];
let quizWordsList = [];
let currentQuestionIndex = 0;

// Custom message box and confirmation dialog
function showMessage(message) {
    messageBox.textContent = message;

    if (message.includes("Incorrect!")) {
        messageBox.classList.remove('correct');
        messageBox.classList.add('incorrect');
    } else if (message.includes("Correct!")) {
        messageBox.classList.remove('incorrect');
        messageBox.classList.add('correct');
    } else {
        messageBox.classList.remove('incorrect', 'correct');
    }

    messageBox.style.display = 'block';
    messageBox.style.opacity = '1';
    setTimeout(() => {
        messageBox.style.opacity = '0';
        setTimeout(() => {
            messageBox.style.display = 'none';
            messageBox.classList.remove('incorrect', 'correct');
        }, 300);
    }, 3000);
}

function showConfirm(message) {
    return new Promise((resolve) => {
        confirmMessageElem.textContent = message;
        confirmOverlay.style.display = 'flex';
        const onYes = () => {
            confirmOverlay.style.display = 'none';
            confirmYesBtn.removeEventListener('click', onYes);
            confirmNoBtn.removeEventListener('click', onNo);
            resolve(true);
        };
        const onNo = () => {
            confirmOverlay.style.display = 'none';
            confirmYesBtn.removeEventListener('click', onYes);
            confirmNoBtn.removeEventListener('click', onNo);
            resolve(false);
        };
        confirmYesBtn.addEventListener('click', onYes);
        confirmNoBtn.addEventListener('click', onNo);
    });
}

function playIncorrectSound() {
    // Create a simple beep sound for incorrect answer
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 200;
    oscillator.type = 'square';
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
}

function playCorrectSound() {
    // Create a pleasant sound for correct answer
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
}

// --- Vocabulary Functions ---
 
function addWord() {
    const en = wordEnInput.value.trim();
    const ar = wordArInput.value.trim();
    const img = wordImageInput.value.trim();
    const category = wordCategorySelect.value;

    if (!en || !ar) {
        showMessage("Please enter both English and Arabic words.");
        return;
    }

    const newWord = {
        id: Date.now().toString(),
        english: en,
        arabic: ar,
        image: img,
        category: category,
        createdAt: new Date().toISOString()
    };
    
    vocabularyData.push(newWord);
    showMessage("✨ Word added successfully!");
    clearInputs();
    displayWords();
}

function updateWord() {
    if (!currentWordId) return;

    const en = wordEnInput.value.trim();
    const ar = wordArInput.value.trim();
    const img = wordImageInput.value.trim();
    const category = wordCategorySelect.value;
    
    if (!en || !ar) {
        showMessage("Please enter both English and Arabic words.");
        return;
    }

    const wordToUpdate = vocabularyData.find(w => w.id === currentWordId);
    if (wordToUpdate) {
        wordToUpdate.english = en;
        wordToUpdate.arabic = ar;
        wordToUpdate.image = img;
        wordToUpdate.category = category;
        showMessage("💾 Word updated successfully!");
        clearInputs();
        currentWordId = null;
        addWordBtn.style.display = 'block';
        updateWordBtn.style.display = 'none';
        displayWords();
    }
}

async function deleteWord(id) {
    const confirmed = await showConfirm("Are you sure you want to delete this word?");
    if (!confirmed) return;

    vocabularyData = vocabularyData.filter(word => word.id !== id);
    showMessage("🗑️ Word deleted successfully!");
    displayWords();
}

function displayWords() {
    vocabularyList.innerHTML = '';
    const selectedCategory = filterCategorySelect.value;

    let filteredWords = vocabularyData;
    if (selectedCategory !== 'All') {
        filteredWords = vocabularyData.filter(word => word.category === selectedCategory);
    }

    const sortedWords = [...filteredWords].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    if (sortedWords.length === 0) {
        vocabularyList.innerHTML = '<p style="text-align: center; color: rgba(255, 255, 255, 0.6); margin-top: 2rem; font-size: 1.1rem;">No words found in this category. Add a new word! 📝</p>';
        return;
    }

    sortedWords.forEach(word => {
        const wordItem = document.createElement('div');
        wordItem.className = 'word-item';
        wordItem.innerHTML = `
            <div class="word-content">
                <div class="word-details">
                    <p>${word.english}</p>
                    <p>${word.arabic}</p>
                    <p>Category: ${word.category}</p>
                </div>
                <button class="speak-btn" data-word="${word.english}"></button>
            </div>
            ${word.image ? `<img src="${word.image}" alt="${word.english}">` : ''}
            <div class="word-actions">
                <button class="bg-blue-600 edit-btn" data-id="${word.id}">✏️ Edit</button>
                <button class="bg-red-600 delete-btn" data-id="${word.id}">🗑️ Delete</button>
            </div>
        `;
        vocabularyList.appendChild(wordItem);
    });

    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            const wordToEdit = vocabularyData.find(w => w.id === id);
            if (wordToEdit) {
                wordEnInput.value = wordToEdit.english;
                wordArInput.value = wordToEdit.arabic;
                wordImageInput.value = wordToEdit.image || '';
                wordCategorySelect.value = wordToEdit.category;
                currentWordId = id;
                addWordBtn.style.display = 'none';
                updateWordBtn.style.display = 'block';
                
                // Scroll to top of vocabulary section
                document.getElementById('vocabulary').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            deleteWord(id);
        });
    });

    document.querySelectorAll('.speak-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const wordToSpeak = e.currentTarget.dataset.word;
            speakEnglishWord(wordToSpeak);
        });
    });
}

function clearInputs() {
    wordEnInput.value = '';
    wordArInput.value = '';
    wordImageInput.value = '';
    wordCategorySelect.value = 'Nouns';
}

// --- Quiz Functions ---

function startQuiz(category) {
    const filteredWords = vocabularyData.filter(w => w.category === category);

    if (filteredWords.length < 4) {
        quizMessageElem.textContent = `Not enough words in the '${category}' category. Add at least 4 words to start a quiz. 📚`;
        return;
    }

    quizWordsList = shuffleArray([...filteredWords]);
    currentQuestionIndex = 0;

    quizMessageElem.textContent = '';
    quizStartSection.style.display = 'none';
    quizQuestionsSection.style.display = 'block';

    generateQuestion();
}

function generateQuestion() {
    if (currentQuestionIndex >= quizWordsList.length) {
        endQuiz();
        return;
    }

    const correctWord = quizWordsList[currentQuestionIndex];
    const otherWords = vocabularyData.filter(w => w.id !== correctWord.id && w.category === correctWord.category);
    const quizOptions = [correctWord, ...getRandomWords(otherWords, 3)];

    quizQuestionElem.textContent = `What is the English word for "${correctWord.arabic}"? 🤔`;
    shuffleArray(quizOptions);

    quizOptionsBtns.forEach((btn, index) => {
        btn.textContent = quizOptions[index].english;
        btn.dataset.isCorrect = quizOptions[index].id === correctWord.id;
        btn.classList.remove('bg-green-600', 'bg-red-600');
        btn.classList.add('bg-gray-600');
        btn.disabled = false;
    });
}

function checkAnswer(event) {
    const isCorrect = event.target.dataset.isCorrect === 'true';
    
    quizOptionsBtns.forEach(btn => {
        btn.disabled = true;
        if (btn.dataset.isCorrect === 'true') {
            btn.classList.remove('bg-gray-600');
            btn.classList.add('bg-green-600');
        } else if (btn === event.target) {
            btn.classList.remove('bg-gray-600');
            btn.classList.add('bg-red-600');
        }
    });

    const message = isCorrect ? "🎉 Correct! Great job!" : "❌ Incorrect! Better luck next time!";
    showMessage(message);

    if (isCorrect) {
        playCorrectSound();
    } else {
        playIncorrectSound();
    }

    setTimeout(() => {
        currentQuestionIndex++;
        generateQuestion();
    }, 1500);
}

function endQuiz() {
    showMessage("🏆 Quiz finished! Well done!");
    setTimeout(() => {
        quizQuestionsSection.style.display = 'none';
        quizStartSection.style.display = 'flex';
        quizOptionsBtns.forEach(btn => {
            btn.disabled = false;
            btn.classList.remove('bg-green-600', 'bg-red-600');
            btn.classList.add('bg-gray-600');
        });
    }, 2000);
}

// --- Utility Functions ---

function getRandomWords(arr, num) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function speakEnglishWord(text) {
    if (text) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.8;
        utterance.pitch = 1.1;
        window.speechSynthesis.speak(utterance);
    }
}

// --- Event Listeners & Initial State ---

document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', (e) => {
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        e.target.classList.add('active');
        const tabId = e.target.dataset.tab;
        document.getElementById(tabId).classList.add('active');
    });
});

addWordBtn.addEventListener('click', addWord);
updateWordBtn.addEventListener('click', updateWord);
filterCategorySelect.addEventListener('change', displayWords);

// Add enter key support for inputs
[wordEnInput, wordArInput, wordImageInput].forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            if (currentWordId) {
                updateWord();
            } else {
                addWord();
            }
        }
    });
});

document.querySelectorAll('#quiz-start button[data-category]').forEach(button => {
    button.addEventListener('click', (e) => {
        const category = e.target.dataset.category;
        startQuiz(category);
    });
});

quizOptionsBtns.forEach(btn => {
    btn.addEventListener('click', checkAnswer);
});

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    displayWords();
    userInfoElem.style.display = 'none';
    
    // Add some sample data if none exists
    if (vocabularyData.length === 0) {
        vocabularyData = [
            {
                id: '1',
                english: 'Hello',
                arabic: 'مرحبا',
                image: '',
                category: 'Other',
                createdAt: new Date().toISOString()
            },
            {
                id: '2',
                english: 'Book',
                arabic: 'كتاب',
                image: '',
                category: 'Nouns',
                createdAt: new Date().toISOString()
            }
        ];
        displayWords();
    }
});