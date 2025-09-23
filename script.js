const hiddenWords = {
    "Nouns": [
        { en: "apple", ar: "تفاحة", category: "Nouns" },
        { en: "book", ar: "كتاب", category: "Nouns" },
        { en: "house", ar: "منزل", category: "Nouns" },
        { en: "car", ar: "سيارة", category: "Nouns" },
        { en: "tree", ar: "شجرة", category: "Nouns" },
        { en: "computer", ar: "كمبيوتر", category: "Nouns" },
        { en: "phone", ar: "هاتف", category: "Nouns" },
        { en: "table", ar: "طاولة", category: "Nouns" },
        { en: "chair", ar: "كرسي", category: "Nouns" },
        { en: "window", ar: "نافذة", category: "Nouns" },
        { en: "door", ar: "باب", category: "Nouns" },
        { en: "sun", ar: "شمس", category: "Nouns" },
        { en: "moon", ar: "قمر", category: "Nouns" },
        { en: "water", ar: "ماء", category: "Nouns" },
        { en: "fire", ar: "نار", category: "Nouns" },
        { en: "city", ar: "مدينة", category: "Nouns" },
        { en: "country", ar: "بلد", category: "Nouns" },
        { en: "school", ar: "مدرسة", category: "Nouns" },
        { en: "hospital", ar: "مستشفى", category: "Nouns" },
        { en: "market", ar: "سوق", category: "Nouns" },
        { en: "friend", ar: "صديق", category: "Nouns" },
        { en: "family", ar: "عائلة", category: "Nouns" },
        { en: "food", ar: "طعام", category: "Nouns" },
        { en: "drink", ar: "شراب", category: "Nouns" },
        { en: "animal", ar: "حيوان", category: "Nouns" },
        { en: "plant", ar: "نبات", category: "Nouns" },
        { en: "money", ar: "مال", category: "Nouns" },
        { en: "time", ar: "وقت", category: "Nouns" },
        { en: "work", ar: "عمل", category: "Nouns" },
        { en: "home", ar: "منزل", category: "Nouns" },
    ],
    "Verbs": [
        { en: "run", ar: "يركض", category: "Verbs" },
        { en: "eat", ar: "يأكل", category: "Verbs" },
        { en: "sleep", ar: "ينام", category: "Verbs" },
        { en: "read", ar: "يقرأ", category: "Verbs" },
        { en: "write", ar: "يكتب", category: "Verbs" },
        { en: "talk", ar: "يتحدث", category: "Verbs" },
        { en: "listen", ar: "يستمع", category: "Verbs" },
        { en: "play", ar: "يلعب", category: "Verbs" },
        { en: "walk", ar: "يمشي", category: "Verbs" },
        { en: "drive", ar: "يقود", category: "Verbs" },
        { en: "sing", ar: "يغني", category: "Verbs" },
        { en: "dance", ar: "يرقص", category: "Verbs" },
        { en: "swim", ar: "يسبح", category: "Verbs" },
        { en: "fly", ar: "يطير", category: "Verbs" },
        { en: "jump", ar: "يقفز", category: "Verbs" },
        { en: "go", ar: "يذهب", category: "Verbs" },
        { en: "come", ar: "يأتي", category: "Verbs" },
        { en: "see", ar: "يرى", category: "Verbs" },
        { en: "hear", ar: "يسمع", category: "Verbs" },
        { en: "feel", ar: "يشعر", category: "Verbs" },
        { en: "think", ar: "يفكر", category: "Verbs" },
        { en: "know", ar: "يعرف", category: "Verbs" },
        { en: "want", ar: "يريد", category: "Verbs" },
        { en: "need", ar: "يحتاج", category: "Verbs" },
        { en: "like", ar: "يحب", category: "Verbs" },
        { en: "love", ar: "يعشق", category: "Verbs" },
        { en: "help", ar: "يساعد", category: "Verbs" },
        { en: "ask", ar: "يسأل", category: "Verbs" },
        { en: "answer", ar: "يجيب", category: "Verbs" },
        { en: "start", ar: "يبدأ", category: "Verbs" },
    ],
    "Adjectives": [
        { en: "happy", ar: "سعيد", category: "Adjectives" },
        { en: "sad", ar: "حزين", category: "Adjectives" },
        { en: "big", ar: "كبير", category: "Adjectives" },
        { en: "small", ar: "صغير", category: "Adjectives" },
        { en: "beautiful", ar: "جميل", category: "Adjectives" },
        { en: "ugly", ar: "قبيح", category: "Adjectives" },
        { en: "fast", ar: "سريع", category: "Adjectives" },
        { en: "slow", ar: "بطيء", category: "Adjectives" },
        { en: "new", ar: "جديد", category: "Adjectives" },
        { en: "old", ar: "قديم", category: "Adjectives" },
        { en: "tall", ar: "طويل", category: "Adjectives" },
        { en: "short", ar: "قصير", category: "Adjectives" },
        { en: "strong", ar: "قوي", category: "Adjectives" },
        { en: "weak", ar: "ضعيف", category: "Adjectives" },
        { en: "hot", ar: "حار", category: "Adjectives" },
        { en: "cold", ar: "بارد", category: "Adjectives" },
        { en: "easy", ar: "سهل", category: "Adjectives" },
        { en: "difficult", ar: "صعب", category: "Adjectives" },
        { en: "good", ar: "جيد", category: "Adjectives" },
        { en: "bad", ar: "سيء", category: "Adjectives" },
        { en: "clean", ar: "نظيف", category: "Adjectives" },
        { en: "dirty", ar: "قذر", category: "Adjectives" },
        { en: "rich", ar: "غني", category: "Adjectives" },
        { en: "poor", ar: "فقير", category: "Adjectives" },
        { en: "full", ar: "ممتلئ", category: "Adjectives" },
        { en: "empty", ar: "فارغ", category: "Adjectives" },
        { en: "smart", ar: "ذكي", category: "Adjectives" },
        { en: "stupid", ar: "غبي", category: "Adjectives" },
        { en: "loud", ar: "مرتفع الصوت", category: "Adjectives" },
        { en: "quiet", ar: "هادئ", category: "Adjectives" },
    ],
    "Other": [
        { en: "on", ar: "على", category: "Other" },
        { en: "in", ar: "في", category: "Other" },
        { en: "under", ar: "تحت", category: "Other" },
        { en: "and", ar: "و", category: "Other" },
        { en: "but", ar: "لكن", category: "Other" },
        { en: "with", ar: "مع", category: "Other" },
        { en: "to", ar: "إلى", category: "Other" },
        { en: "from", ar: "من", category: "Other" },
        { en: "he", ar: "هو", category: "Other" },
        { en: "she", ar: "هي", category: "Other" },
        { en: "they", ar: "هم", category: "Other" },
        { en: "we", ar: "نحن", category: "Other" },
        { en: "you", ar: "أنت", category: "Other" },
        { en: "I", ar: "أنا", category: "Other" },
        { en: "it", ar: "هو/هي (لغير العاقل)", category: "Other" },
        { en: "by", ar: "بواسطة", category: "Other" },
        { en: "for", ar: "لأجل", category: "Other" },
        { en: "of", ar: "من", category: "Other" },
        { en: "at", ar: "في", category: "Other" },
        { en: "about", ar: "حول", category: "Other" },
        { en: "then", ar: "ثم", category: "Other" },
        { en: "so", ar: "لذلك", category: "Other" },
        { en: "because", ar: "لأن", category: "Other" },
        { en: "if", ar: "إذا", category: "Other" },
        { en: "or", ar: "أو", category: "Other" },
        { en: "also", ar: "أيضًا", category: "Other" },
        { en: "here", ar: "هنا", category: "Other" },
        { en: "there", ar: "هناك", category: "Other" },
        { en: "now", ar: "الآن", category: "Other" },
        { en: "ever", ar: "أبدًا", category: "Other" },
    ],
};

const userWords = {
    "Nouns": [],
    "Verbs": [],
    "Adjectives": [],
    "Other": [],
};

let currentQuizWords = [];
let currentQuestion = {};
let wordToEdit = null;

function openTab(evt, tabName) {
    let i, tabcontent, tabbuttons;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tabbuttons = document.getElementsByClassName("tab-button");
    for (i = 0; i < tabbuttons.length; i++) {
        tabbuttons[i].className = tabbuttons[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function showMessage(message, type = 'info', duration = 3000) {
    const msgBox = document.getElementById('message-box');
    msgBox.textContent = message;
    msgBox.className = `show ${type}`;
    setTimeout(() => {
        msgBox.className = '';
    }, duration);
}

function showConfirmation(message, onConfirmCallback) {
    const overlay = document.getElementById('custom-confirm-overlay');
    const confirmMsg = document.getElementById('confirm-message');
    const confirmYes = document.getElementById('confirm-yes');
    const confirmNo = document.getElementById('confirm-no');

    confirmMsg.textContent = message;
    overlay.style.display = 'flex';

    confirmYes.onclick = () => {
        onConfirmCallback(true);
        overlay.style.display = 'none';
    };
    confirmNo.onclick = () => {
        onConfirmCallback(false);
        overlay.style.display = 'none';
    };
}

function addWord() {
    const wordEn = document.getElementById('word-en').value.toLowerCase().trim();
    const wordAr = document.getElementById('word-ar').value.trim();
    const wordImage = document.getElementById('word-image').value.trim();
    const wordCategory = document.getElementById('word-category').value;

    if (wordEn && wordAr) {
        const newWord = { en: wordEn, ar: wordAr, img: wordImage, category: wordCategory };
        userWords[wordCategory].push(newWord);
        showMessage(`Added '${wordEn}'!`, 'success');
        displayWords();
        document.getElementById('word-en').value = '';
        document.getElementById('word-ar').value = '';
        document.getElementById('word-image').value = '';
    } else {
        showMessage('Please fill in both English and Arabic word fields.', 'error');
    }
}

function displayWords() {
    const list = document.getElementById('vocabulary-list');
    list.innerHTML = '';
    for (const category in userWords) {
        userWords[category].forEach((word) => {
            const wordCard = document.createElement('div');
            wordCard.className = 'word-card';
            wordCard.innerHTML = `
                <div>
                    <p><strong>${word.en}</strong> (${word.category})</p>
                    <p>${word.ar}</p>
                    ${word.img ? `<img src="${word.img}" alt="${word.en}" style="max-width: 100%; height: auto; margin-top: 10px; border-radius: 8px;">` : ''}
                </div>
                <div class="actions">
                    <button onclick="pronounceWord('${word.en}')">🔊</button>
                    <button onclick="editWord('${word.en}', '${word.category}')">✏️</button>
                    <button onclick="deleteWord('${word.en}', '${word.category}')">🗑️</button>
                </div>
            `;
            list.appendChild(wordCard);
        });
    }
}

function pronounceWord(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
}

function editWord(englishWord, category) {
    wordToEdit = userWords[category].find(w => w.en === englishWord);
    if (wordToEdit) {
        document.getElementById('word-en').value = wordToEdit.en;
        document.getElementById('word-ar').value = wordToEdit.ar;
        document.getElementById('word-image').value = wordToEdit.img;
        document.getElementById('word-category').value = wordToEdit.category;
        
        document.getElementById('add-word-btn').style.display = 'none';
        document.getElementById('update-word-btn').style.display = 'block';
    }
}

function updateWord() {
    if (wordToEdit) {
        const newEn = document.getElementById('word-en').value.toLowerCase().trim();
        const newAr = document.getElementById('word-ar').value.trim();
        const newImage = document.getElementById('word-image').value.trim();
        const newCategory = document.getElementById('word-category').value;
        
        userWords[wordToEdit.category] = userWords[wordToEdit.category].filter(w => w.en !== wordToEdit.en);
        
        userWords[newCategory].push({ en: newEn, ar: newAr, img: newImage, category: newCategory });
        
        showMessage(`Word '${wordToEdit.en}' updated successfully!`, 'success');
        
        document.getElementById('word-en').value = '';
        document.getElementById('word-ar').value = '';
        document.getElementById('word-image').value = '';
        document.getElementById('add-word-btn').style.display = 'block';
        document.getElementById('update-word-btn').style.display = 'none';
        wordToEdit = null;
        displayWords();
    }
}

function deleteWord(englishWord, category) {
    showConfirmation(`Are you sure you want to delete '${englishWord}'?`, (isConfirmed) => {
        if (isConfirmed) {
            userWords[category] = userWords[category].filter(word => word.en !== englishWord);
            displayWords();
            showMessage(`Word '${englishWord}' deleted.`, 'success');
        }
    });
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startQuiz(category) {
    const userWordsInCategory = userWords[category];
    if (userWordsInCategory.length < 4) {
        document.getElementById('quiz-message').textContent = 'Please add at least 4 words of your own to this category to start the quiz.';
        return;
    }
    
    document.getElementById('quiz-message').textContent = '';
    currentQuizWords = shuffle([...userWordsInCategory]);
    document.getElementById('quiz-start').style.display = 'none';
    document.getElementById('quiz-questions').style.display = 'block';
    nextQuestion(category);
}

function nextQuestion(category) {
    if (currentQuizWords.length === 0) {
        showMessage("Quiz finished! You've gone through all your words in this category.", 'info', 5000);
        document.getElementById('quiz-start').style.display = 'block';
        document.getElementById('quiz-questions').style.display = 'none';
        return;
    }

    currentQuestion = currentQuizWords.pop();
    document.getElementById('quiz-question').textContent = `What is the Arabic meaning of "${currentQuestion.en}"?`;
    
    const allWordsInCategories = Object.values(hiddenWords).flat().concat(Object.values(userWords).flat());
    const incorrectOptions = shuffle(allWordsInCategories.filter(w => w.ar !== currentQuestion.ar)).slice(0, 3).map(w => w.ar);
    const options = shuffle([currentQuestion.ar, ...incorrectOptions]);

    const buttons = document.querySelectorAll('.quiz-options button');
    buttons.forEach((button, index) => {
        button.textContent = options[index];
        button.classList.remove('correct', 'incorrect');
    });
}

function checkAnswer(event) {
    const selectedAnswer = event.target.textContent;
    const buttons = document.querySelectorAll('.quiz-options button');
    
    if (selectedAnswer === currentQuestion.ar) {
        event.target.classList.add('correct');
        setTimeout(() => {
            showMessage('Correct! 🎉', 'success');
            nextQuestion(currentQuestion.category);
        }, 500);
    } else {
        event.target.classList.add('incorrect');
        buttons.forEach(button => {
            if (button.textContent === currentQuestion.ar) {
                button.classList.add('correct');
            }
        });
        setTimeout(() => {
            showMessage('Incorrect. 😞', 'error');
            buttons.forEach(button => button.classList.remove('correct', 'incorrect'));
        }, 100);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    displayWords();
});