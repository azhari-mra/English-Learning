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

// New Settings Elements
const exportDataBtn = document.getElementById('export-data-btn');
const importFileHidden = document.getElementById('import-file-hidden'); // تم تغيير المعرف

let currentWordId = null;
let vocabularyData = [];
let quizWordsList = [];
let currentQuestionIndex = 0;

// --- Web Storage Functions ---
const STORAGE_KEY = 'englishLearningVocabulary';

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
            {
                id: '1',
                english: 'Hello',
                arabic: 'مرحبا',
                // حقول المثال الجديدة
                exampleEn: 'Hello, how are you?',
                exampleAr: 'مرحبا، كيف حالك؟',
                image: '',
                category: 'Other',
                createdAt: new Date().toISOString()
            },
            {
                id: '2',
                english: 'Book',
                arabic: 'كتاب',
                // حقول المثال الجديدة
                exampleEn: 'I am reading a good book.',
                exampleAr: 'أنا أقرأ كتاباً جيداً.',
                image: '',
                category: 'Nouns',
                createdAt: new Date().toISOString()
            }
        ];
        saveData();
    }
    
    // تأكد من وجود حقول المثال في البيانات القديمة المحفوظة (للبيانات التي تم إدخالها قبل التحديث)
    vocabularyData = vocabularyData.map(word => ({
        ...word,
        exampleEn: word.exampleEn || '',
        exampleAr: word.exampleAr || ''
    }));
}

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

            if (importCount === 0) {
                showMessage("Import completed: No new unique words were added. 🧐");
                return;
            }

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

document.querySelectorAll('.nav-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        e.target.classList.add('active');
        const tabId = e.target.dataset.tab;
        document.getElementById(tabId).classList.add('active');
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

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    displayWords();
    if (userInfoElem) {
        userInfoElem.style.display = 'none';
    }
});