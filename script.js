// UI elements
const messageBox = document.getElementById('message-box');
const confirmOverlay = document.getElementById('custom-confirm-overlay');
const confirmMessageElem = document.getElementById('confirm-message');
const confirmYesBtn = document.getElementById('confirm-yes');
const confirmNoBtn = document.getElementById('confirm-no');
const userInfoElem = document.getElementById('user-info');

const wordEnInput = document.getElementById('word-en');
const wordArInput = document.getElementById('word-ar');
// العناصر الجديدة (للامثلة)
const exampleEnInput = document.getElementById('example-en');
const exampleArInput = document.getElementById('example-ar');
// نهاية العناصر الجديدة
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

// NEW MEMORY GAME ELEMENTS
const memoryStartSection = document.getElementById('memory-start');
const memoryGameSection = document.getElementById('memory-game');
const memoryCategoriesGrid = document.getElementById('memory-categories-grid');
const memoryMessageElem = document.getElementById('memory-message');
const memoryGrid = document.getElementById('memory-grid');
const memoryRestartBtn = document.getElementById('memory-restart-btn');
const memoryLevelElem = document.getElementById('memory-level');
const memoryTriesElem = document.getElementById('memory-tries');
// عناصر الصعوبة الجديدة
const memoryDifficultyBtns = document.querySelectorAll('.memory-difficulty-btn');
const memoryDifficultyInfo = document.getElementById('memory-difficulty-info');


// New Settings Elements
const exportDataBtn = document.getElementById('export-data-btn');
const importFileHidden = document.getElementById('import-file-hidden'); // تم تغيير المعرف

let currentWordId = null;
let vocabularyData = [];
let quizWordsList = [];
let currentQuestionIndex = 0;

// NEW MEMORY GAME STATE
let memoryCards = [];
let flippedCards = [];
let lockBoard = false;
let matchedPairs = 0;
let memoryGameTries = 0;
let memoryGameLevel = 1;
// تم تعديل الحد الأدنى ليتناسب مع المستوى الأسهل
const MEMORY_MIN_WORDS = 3; 
// متغير جديد لتخزين عدد الكلمات المطلوبة
let currentDifficultyWordCount = 6; 
let currentMemoryCategory = null;

const WIN_MESSAGES = [
    "🌟 فوز رائع! ذاكرتك خارقة!",
    "🎉 أحسنت! أنت محترف في الحفظ.",
    "🥳 مهمة مكتملة بنجاح! كلمة السر هي التركيز.",
    "😎 لقد هزمت اللعبة! استراحة قصيرة ثم التحدي القادم.",
    "💯 بطل الذاكرة الجديد!"
];

// --- Web Storage Functions ---
const STORAGE_KEY = 'englishLearningVocabulary';
const MEMORY_LEVEL_KEY = 'memoryGameLevel';

function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(vocabularyData));
}

function loadData() {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
        vocabularyData = JSON.parse(storedData);
    } else {
        // Add some sample data if no data exists in localStorage
        vocabularyData = [
            // Sample data for memory game testing (ensure at least 6 words for Nouns)
            { id: '1', english: 'Hello', arabic: 'مرحبا', exampleEn: 'Hello, how are you?', exampleAr: 'مرحبا، كيف حالك؟', image: '', category: 'Other', createdAt: new Date().toISOString() },
            { id: '2', english: 'Book', arabic: 'كتاب', exampleEn: 'I am reading a good book.', exampleAr: 'أنا أقرأ كتاباً جيداً.', image: '', category: 'Nouns', createdAt: new Date().toISOString() },
            { id: '3', english: 'Cat', arabic: 'قطة', exampleEn: 'The cat is sleeping.', exampleAr: 'القطة نائمة.', image: '', category: 'Nouns', createdAt: new Date().toISOString() },
            { id: '4', english: 'Run', arabic: 'يركض', exampleEn: 'He runs fast.', exampleAr: 'هو يركض بسرعة.', image: '', category: 'Verbs', createdAt: new Date().toISOString() },
            { id: '5', english: 'Happy', arabic: 'سعيد', exampleEn: 'She is happy today.', exampleAr: 'هي سعيدة اليوم.', image: '', category: 'Adjectives', createdAt: new Date().toISOString() },
            { id: '6', english: 'House', arabic: 'منزل', exampleEn: 'A big house.', exampleAr: 'منزل كبير.', image: '', category: 'Nouns', createdAt: new Date().toISOString() },
            { id: '7', english: 'Dog', arabic: 'كلب', exampleEn: 'The dog is barking.', exampleAr: 'الكلب ينبح.', image: '', category: 'Nouns', createdAt: new Date().toISOString() },
            { id: '8', english: 'Eat', arabic: 'يأكل', exampleEn: 'Time to eat lunch.', exampleAr: 'حان وقت أكل الغداء.', image: '', category: 'Verbs', createdAt: new Date().toISOString() },
            { id: '9', english: 'New', arabic: 'جديد', exampleEn: 'I bought a new car.', exampleAr: 'اشتريت سيارة جديدة.', image: '', category: 'Adjectives', createdAt: new Date().toISOString() },
            // كلمات إضافية لتجربة الصعوبة
            { id: '10', english: 'Beautiful', arabic: 'جميل', exampleEn: 'A beautiful painting.', exampleAr: 'لوحة جميلة.', image: '', category: 'Adjectives', createdAt: new Date().toISOString() },
            { id: '11', english: 'Computer', arabic: 'حاسوب', exampleEn: 'I use my computer for work.', exampleAr: 'أستخدم حاسوبي للعمل.', image: '', category: 'Nouns', createdAt: new Date().toISOString() },
            { id: '12', english: 'Program', arabic: 'برنامج', exampleEn: 'He is writing a program.', exampleAr: 'هو يكتب برنامجاً.', image: '', category: 'Nouns', createdAt: new Date().toISOString() },
            { id: '13', english: 'Understand', arabic: 'يفهم', exampleEn: 'Do you understand the lesson?', exampleAr: 'هل تفهم الدرس؟', image: '', category: 'Verbs', createdAt: new Date().toISOString() },
            { id: '14', english: 'Fast', arabic: 'سريع', exampleEn: 'The car is very fast.', exampleAr: 'السيارة سريعة جداً.', image: '', category: 'Adjectives', createdAt: new Date().toISOString() },
            { id: '15', english: 'Dream', arabic: 'حلم', exampleEn: 'I had a strange dream.', exampleAr: 'رأيت حلماً غريباً.', image: '', category: 'Nouns', createdAt: new Date().toISOString() },
        ];
        saveData();
    }
    
    // تأكد من وجود حقول المثال في البيانات القديمة المحفوظة (للبيانات التي تم إدخالها قبل التحديث)
    vocabularyData = vocabularyData.map(word => ({
        ...word,
        exampleEn: word.exampleEn || '',
        exampleAr: word.exampleAr || ''
    }));
    
    // Load memory game level
    const storedLevel = localStorage.getItem(MEMORY_LEVEL_KEY);
    if (storedLevel) {
        memoryGameLevel = parseInt(storedLevel, 10);
    }
    updateGameInfoDisplay();
    updateDifficultyDisplay(); // تحديث عرض الصعوبة الافتراضي
}

function saveMemoryLevel() {
    localStorage.setItem(MEMORY_LEVEL_KEY, memoryGameLevel.toString());
}

// Custom message box and confirmation dialog
function showMessage(message) {
    messageBox.textContent = message;

    if (message.includes("Incorrect!") || message.includes("❌")) {
        messageBox.classList.remove('correct');
        messageBox.classList.add('incorrect');
    } else if (message.includes("Correct!") || message.includes("🎉") || message.includes("🏆") || message.includes("🌟")) {
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
    // الحصول على قيم الأمثلة الجديدة
    const exEn = exampleEnInput.value.trim();
    const exAr = exampleArInput.value.trim();
    // نهاية الحصول على قيم الأمثلة الجديدة
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
        exampleEn: exEn, // إضافة الحقل
        exampleAr: exAr, // إضافة الحقل
        image: img,
        category: category,
        createdAt: new Date().toISOString()
    };
    
    vocabularyData.push(newWord);
    saveData();
    showMessage("✨ Word added successfully!");
    clearInputs();
    displayWords();
}

function updateWord() {
    if (!currentWordId) return;

    const en = wordEnInput.value.trim();
    const ar = wordArInput.value.trim();
    // الحصول على قيم الأمثلة الجديدة
    const exEn = exampleEnInput.value.trim();
    const exAr = exampleArInput.value.trim();
    // نهاية الحصول على قيم الأمثلة الجديدة
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
        wordToUpdate.exampleEn = exEn; // تحديث الحقل
        wordToUpdate.exampleAr = exAr; // تحديث الحقل
        wordToUpdate.image = img;
        wordToUpdate.category = category;
        saveData();
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
    saveData();
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
        vocabularyList.innerHTML = '<p style="text-align: center; color: rgba(224, 224, 224, 0.6); margin-top: 2rem; font-size: 0.7rem;">No words found in this category. Add a new word! 📝</p>';
        return;
    }

    sortedWords.forEach(word => {
        const wordItem = document.createElement('div');
        wordItem.className = 'word-item';
        
        // بناء جملة المثال للعرض
        let exampleHtml = '';
        if (word.exampleEn || word.exampleAr) {
            exampleHtml += `<div class="example-text">`;
            if (word.exampleEn) {
                exampleHtml += `<p style="direction: ltr;">Ex: ${word.exampleEn}</p>`;
            }
            if (word.exampleAr) {
                exampleHtml += `<p style="direction: rtl;">مثال: ${word.exampleAr}</p>`;
            }
            exampleHtml += `</div>`;
        }
        // نهاية بناء جملة المثال

        wordItem.innerHTML = `
            <div class="word-content">
                <div class="word-details">
                    <p>${word.english}</p>
                    <p>${word.arabic}</p>
                    <p>Category: ${word.category}</p>
                    ${exampleHtml}
                </div>
                <button class="speak-btn" data-word="${word.english}"></button>
            </div>
            ${word.image ? `<img src="${word.image}" alt="${word.english}">` : ''}
            <div class="word-actions">
                <button class="btn bg-blue-600 edit-btn" data-id="${word.id}">✏️ Edit</button>
                <button class="btn bg-red-600 delete-btn" data-id="${word.id}">🗑️ Delete</button>
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
                // ملء حقول الأمثلة
                exampleEnInput.value = wordToEdit.exampleEn || ''; 
                exampleArInput.value = wordToEdit.exampleAr || '';
                // نهاية ملء حقول الأمثلة
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
    exampleEnInput.value = ''; // مسح حقل المثال
    exampleArInput.value = ''; // مسح حقل المثال
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


// --- MEMORY GAME Functions ---

function updateDifficultyDisplay() {
    const difficultyName = 
        currentDifficultyWordCount === 6 ? 'Easy' : 
        currentDifficultyWordCount === 10 ? 'Medium' : 'Hard';
    memoryDifficultyInfo.innerHTML = `Current Difficulty: **${difficultyName} (${currentDifficultyWordCount} Words)**`;

    // Highlight the active difficulty button
    memoryDifficultyBtns.forEach(btn => {
        if (parseInt(btn.dataset.difficulty) === currentDifficultyWordCount) {
            btn.classList.remove('bg-blue-600');
            btn.classList.add('bg-purple-600');
        } else {
            btn.classList.remove('bg-purple-600');
            btn.classList.add('bg-blue-600');
        }
    });
}

function updateGameInfoDisplay() {
    memoryLevelElem.textContent = memoryGameLevel;
    memoryTriesElem.textContent = memoryGameTries;
}

function startMemoryGame(category) {
    const filteredWords = vocabularyData.filter(w => w.category === category);
    currentMemoryCategory = category;
    memoryMessageElem.textContent = ''; // Clear message

    // Check if enough words exist for the selected difficulty
    if (filteredWords.length < currentDifficultyWordCount) {
        memoryMessageElem.textContent = `❌ Cannot start game. The '${category}' category needs at least ${currentDifficultyWordCount} words for the selected difficulty.`;
        return;
    }

    // Select a random set of words based on the chosen difficulty
    const selectedWords = getRandomWords(filteredWords, currentDifficultyWordCount);
    
    // Prepare cards: English and Arabic pairs
    let gameWords = selectedWords.map(word => ([
        { id: word.id, content: word.english, lang: 'en', matched: false },
        { id: word.id, content: word.arabic, lang: 'ar', matched: false }
    ])).flat();

    // Shuffle and reset state
    memoryCards = shuffleArray(gameWords);
    matchedPairs = 0;
    memoryGameTries = 0;
    flippedCards = [];
    lockBoard = false;
    updateGameInfoDisplay();

    // UI visibility
    memoryStartSection.style.display = 'none';
    memoryGameSection.style.display = 'block';

    // Generate grid
    generateMemoryGrid(memoryCards.length);
}

function generateMemoryGrid(cardCount) {
    memoryGrid.innerHTML = '';
    
    // Determine grid columns: 12 cards (4x3), 20 cards (5x4), 30 cards (6x5)
    let columns;
    if (cardCount === 12) { // 6 words (4x3)
        columns = 4;
    } else if (cardCount === 20) { // 10 words (5x4)
        columns = 4;
    } else if (cardCount === 30) { // 15 words (6x5)
        columns = 5; 
    } else {
        // Fallback for custom counts (should not happen with default difficulties)
        columns = 4;
    }

    memoryGrid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

    memoryCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'memory-card';
        cardElement.dataset.index = index; // Use index to reference the card in the array
        
        cardElement.innerHTML = `
            <div class="memory-card-inner">
                <div class="memory-card-front">${card.content}</div>
                <div class="memory-card-back"></div>
            </div>
        `;

        cardElement.addEventListener('click', flipCard);
        memoryGrid.appendChild(cardElement);
    });
}

function flipCard() {
    if (lockBoard) return;
    const cardElement = this;
    const index = parseInt(cardElement.dataset.index);
    const cardData = memoryCards[index];

    // Don't flip a card that is already matched or already flipped
    if (cardElement.classList.contains('flipped') || cardElement.classList.contains('matched')) return;
    // Don't flip the second card if it's the same card element
    if (flippedCards.length === 1 && flippedCards[0].element === cardElement) return;

    // Flip the card
    cardElement.classList.add('flipped');
    flippedCards.push({ element: cardElement, data: cardData, index: index });

    if (flippedCards.length === 2) {
        lockBoard = true;
        memoryGameTries++;
        updateGameInfoDisplay();
        checkForMatch();
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    
    const isMatch = card1.data.id === card2.data.id;
    
    if (isMatch) {
        // Correct match!
        playCorrectSound();
        showMessage("Correct! Pair found. 👍");
        disableCards(card1.element, card2.element);
        matchedPairs++;
        if (matchedPairs === memoryCards.length / 2) {
            winGame();
        }
    } else {
        // Incorrect match! Reset all cards and start over.
        playIncorrectSound();
        showMessage("❌ Incorrect! Resetting the board. You must complete the sequence correctly!");
        
        // Use a small delay to allow the user to see the second card before reset
        setTimeout(() => {
            unflipAllCardsAndResetGame();
        }, 1200);
    }
}

function disableCards(card1Element, card2Element) {
    // Visually mark them as matched and remove click listener for safety
    card1Element.classList.add('matched');
    card2Element.classList.add('matched');
    card1Element.removeEventListener('click', flipCard);
    card2Element.removeEventListener('click', flipCard);
    
    // Clear state after successful match
    flippedCards = [];
    lockBoard = false;
}

function unflipAllCardsAndResetGame() {
    // Unflip all currently flipped cards
    document.querySelectorAll('.memory-card.flipped').forEach(card => {
        card.classList.remove('flipped');
    });

    // Remove 'matched' class from all cards
    document.querySelectorAll('.memory-card.matched').forEach(card => {
        card.classList.remove('matched');
        card.addEventListener('click', flipCard); // Re-add listener
    });

    // Reset game state
    matchedPairs = 0;
    flippedCards = [];
    lockBoard = false;
    memoryGameTries = 0; // Reset tries as required by the rule
    updateGameInfoDisplay();
    showMessage("Game reset. Start a new sequence! 🔄");
}

function winGame() {
    memoryGameLevel++;
    saveMemoryLevel();

    let winMessage;
    // Special message for every 10 wins
    if ((memoryGameLevel - 1) % 10 === 0) {
        winMessage = `🎉 خذ صورة للشاشة وارسلها لي أحسنت! تستحق 5 ريال 🎉 (Level ${memoryGameLevel-1} Complete!)`;
    } else {
        // Random message from the list
        winMessage = getRandomElement(WIN_MESSAGES) + ` (Level ${memoryGameLevel-1} Complete!)`;
    }

    showMessage(winMessage);
    playCorrectSound(); // Play a nice sound on win

    // Go back to category selection after a short delay
    setTimeout(() => {
        memoryGameSection.style.display = 'none';
        memoryStartSection.style.display = 'flex';
        updateGameInfoDisplay(); // Update level display on the main page too
    }, 4000);
}

function endGameAndReset() {
    memoryGameSection.style.display = 'none';
    memoryStartSection.style.display = 'flex';
    memoryGrid.innerHTML = '';
    memoryMessageElem.textContent = 'Game ended. Choose a new category to play.';
}

// --- Settings Functions (Import/Export) ---

function exportData() {
    if (vocabularyData.length === 0) {
        showMessage("Export failed: Your vocabulary list is empty. Add some words first! 📝");
        return;
    }

    const dataStr = JSON.stringify(vocabularyData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'english_vocabulary_backup_' + new Date().toISOString().slice(0, 10) + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showMessage("Export successful! Your data has been downloaded. 💾");
}

function importData(file) {
    if (!file) {
        showMessage("Please select a JSON file to import.");
        return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
        try {
            const importedWords = JSON.parse(event.target.result);

            if (!Array.isArray(importedWords)) {
                showMessage("Import failed: File content is not a valid list of words.");
                return;
            }

            let importCount = 0;
            const newWordsMap = new Map();
            importedWords.forEach(word => {
                // Ensure the word has essential properties
                if (word.english && word.arabic) {
                    // Check if an identical word (by English word) already exists to prevent simple duplication
                    const existingWord = vocabularyData.find(
                        w => w.english.toLowerCase() === word.english.toLowerCase()
                    );
                    
                    if (!existingWord) {
                        // Generate a new unique ID for the imported word
                        const newId = Date.now().toString() + Math.random().toString(36).substring(2, 9);
                        const wordToAdd = {
                            id: newId, 
                            english: word.english,
                            arabic: word.arabic,
                            // تأكد من إضافة الحقول الجديدة عند الاستيراد
                            exampleEn: word.exampleEn || '',
                            exampleAr: word.exampleAr || '',
                            // نهاية إضافة الحقول الجديدة
                            image: word.image || '',
                            category: word.category || 'Other',
                            createdAt: word.createdAt || new Date().toISOString()
                        };
                        newWordsMap.set(newId, wordToAdd);
                        importCount++;
                    }
                }
            });

            // Append new words while keeping existing ones
            vocabularyData.push(...Array.from(newWordsMap.values()));
            saveData();
            displayWords(); // Refresh the list
            showMessage(`Import successful! Added ${importCount} new words to your collection. ⬆️`);

        } catch (error) {
            console.error(error);
            showMessage("Import failed: Error reading or parsing the file. Make sure it's a valid JSON format.");
        } finally {
            // Clear the file input value so that the 'change' event fires again 
            // if the user imports the same file twice in a row
            importFileHidden.value = '';
        }
    };

    reader.readAsText(file);
}


// --- Utility Functions ---

function getRandomWords(arr, num) {
    // Ensure we don't try to get more words than available
    const count = Math.min(num, arr.length);
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
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

document.querySelectorAll('.nav-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        e.target.classList.add('active');
        const tabId = e.target.dataset.tab;
        document.getElementById(tabId).classList.add('active');
        
        // Optional: Hide the game and show start selection if switching back to memory tab
        if (tabId === 'memory') {
             endGameAndReset();
        }
    });
});

addWordBtn.addEventListener('click', addWord);
updateWordBtn.addEventListener('click', updateWord);
filterCategorySelect.addEventListener('change', displayWords);

// Settings Event Listeners
exportDataBtn.addEventListener('click', exportData);

// Import functionality is now triggered by the file input's change event
importFileHidden.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        importData(file);
    }
});


// Add enter key support for inputs
[wordEnInput, wordArInput, exampleEnInput, exampleArInput, wordImageInput].forEach(input => {
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


// NEW MEMORY GAME EVENT LISTENERS
document.querySelectorAll('#memory-categories-grid button[data-category]').forEach(button => {
    button.addEventListener('click', (e) => {
        const category = e.target.dataset.category;
        startMemoryGame(category);
    });
});

// Event listener for difficulty buttons
memoryDifficultyBtns.forEach(button => {
    button.addEventListener('click', (e) => {
        const newDifficulty = parseInt(e.target.dataset.difficulty);
        if (newDifficulty !== currentDifficultyWordCount) {
            currentDifficultyWordCount = newDifficulty;
            updateDifficultyDisplay();
            showMessage(`Difficulty set to ${newDifficulty} words.`);
            // Reset state to ensure the user selects a category again
            endGameAndReset();
        }
    });
});

memoryRestartBtn.addEventListener('click', endGameAndReset);

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    displayWords();
    if (userInfoElem) {
        userInfoElem.style.display = 'none';
    }
});