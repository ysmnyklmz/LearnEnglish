//Giriş
document.getElementById('fakeLoginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Sayfanın yenilenmesini engelle
    
    // Modalı kapat
    var loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
    loginModal.hide();

    // Ekranları değiştir
    document.getElementById('landing-section').style.display = 'none'; // Giriş sayfasını gizle
    document.getElementById('dashboard-section').style.display = 'block'; // Dashboard'ı aç
    
    // Butonu kullanıcı adına çevir
    document.getElementById('loginBtn').style.display = 'none';
    document.getElementById('userDropdown').style.display = 'block';

    
    loadScoreFromStorage();
    showScorePanel();

    // Kelimeleri yükle
    loadWords('A1');
    loadQuizByLevel('A1');
});

//Veriler
const wordData = {
    'A1': [
        { word: "Beautiful", meaning: "Güzel", sentence: "The garden is very beautiful in spring." },
        { word: "Family", meaning: "Aile", sentence: "I love spending time with my family." },
        { word: "Listen", meaning: "Dinlemek", sentence: "Please listen to the teacher carefully." },
        { word: "Book", meaning: "Kitap", sentence: "I read a book every night before sleep." },
        { word: "Water", meaning: "Su", sentence: "You should drink more water daily." },
        { word: "Friend", meaning: "Arkadaş", sentence: "My best friend lives in Istanbul." },
        { word: "House", meaning: "Ev", sentence: "Their house has a big garden." },
        { word: "Help", meaning: "Yardım Etmek", sentence: "Can you help me with my homework?" },
        { word: "Work", meaning: "Çalışmak / İş", sentence: "He goes to work by bus." },
        { word: "Food", meaning: "Yiyecek", sentence: "Italian food is my favorite." }
    ],
    'A2': [
        { word: "Available", meaning: "Müsait / Mevcut", sentence: "Is this seat available?" },
        { word: "Delicious", meaning: "Lezzetli", sentence: "This cake is absolutely delicious." },
        { word: "Adventure", meaning: "Macera", sentence: "They went on an adventure in the forest." },
        { word: "Careful", meaning: "Dikkatli", sentence: "Be careful when crossing the street." },
        { word: "Expensive", meaning: "Pahalı", sentence: "That car is too expensive for me." },
        { word: "Famous", meaning: "Ünlü", sentence: "She wants to be a famous singer." },
        { word: "Improve", meaning: "Geliştirmek", sentence: "I want to improve my English skills." },
        { word: "Journey", meaning: "Yolculuk", sentence: "The journey took three hours." },
        { word: "Offer", meaning: "Teklif Etmek", sentence: "They offered him a new job." },
        { word: "Popular", meaning: "Popüler", sentence: "Football is very popular in Turkey." }
    ],
    'B1': [
        { word: "Development", meaning: "Gelişim", sentence: "Economic development is important." },
        { word: "Accurate", meaning: "Doğru / Kesin", sentence: "The report provided accurate information." },
        { word: "Benefit", meaning: "Fayda / Yarar", sentence: "Yoga has many health benefits." },
        { word: "Challenge", meaning: "Zorluk / Meydan Okuma", sentence: "This puzzle is a real challenge." },
        { word: "Determine", meaning: "Belirlemek", sentence: "We need to determine the cause of the problem." },
        { word: "Environment", meaning: "Çevre", sentence: "We must protect the environment." },
        { word: "Feature", meaning: "Özellik", sentence: "The new phone has many cool features." },
        { word: "Goal", meaning: "Hedef", sentence: "Her primary goal is to win the competition." },
        { word: "Habit", meaning: "Alışkanlık", sentence: "Eating late is a bad habit." },
        { word: "Locate", meaning: "Konumlandırmak / Yerini Bulmak", sentence: "Can you locate your city on the map?" }
    ],
    'B2': [
        { word: "Significant", meaning: "Önemli / Anlamlı", sentence: "There was a significant change in the weather." },
        { word: "Abandon", meaning: "Terk Etmek", sentence: "They had to abandon the sinking ship." },
        { word: "Capacity", meaning: "Kapasite", sentence: "The stadium has a capacity of 50,000 people." },
        { word: "Evaluate", meaning: "Değerlendirmek", sentence: "Teachers evaluate students' progress regularly." },
        { word: "Fluctuate", meaning: "Dalgalanmak", sentence: "Prices fluctuate depending on the season." },
        { word: "Generate", meaning: "Üretmek / Oluşturmak", sentence: "Solar panels generate electricity." },
        { word: "Hypothesis", meaning: "Hipotez", sentence: "The scientists tested their hypothesis." },
        { word: "Implement", meaning: "Uygulamak", sentence: "The government will implement new laws." },
        { word: "Justify", meaning: "Haklı Çıkarmak / Gerekçelendirmek", sentence: "Can you justify your decision?" },
        { word: "Keen", meaning: "İstekli / Keskin", sentence: "He is very keen on learning history." }
    ],
    'C1': [
        { word: "Inevitable", meaning: "Kaçınılmaz", sentence: "Change is inevitable in life." },
        { word: "Advocate", meaning: "Savunmak / Desteklemek", sentence: "She advocates for human rights." },
        { word: "Coherent", meaning: "Tutarlı", sentence: "He gave a coherent explanation for his absence." },
        { word: "Dilemma", meaning: "İkilem", sentence: "I am facing a difficult dilemma right now." },
        { word: "Empirical", meaning: "Deneysel", sentence: "There is no empirical evidence to support this claim." },
        { word: "Foster", meaning: "Teşvik Etmek / Büyütmek", sentence: "We try to foster a positive atmosphere." },
        { word: "Infrastructure", meaning: "Altyapı", sentence: "The country needs better infrastructure." },
        { word: "Lucrative", meaning: "Karlı / Kazançlı", sentence: "It was a lucrative business deal." },
        { word: "Manifest", meaning: "Göstermek / Belirtmek", sentence: "His anger manifested in his silence." },
        { word: "Nuance", meaning: "Nüans / İnce Fark", sentence: "She understood the nuances of the language." }
    ],
    'C2': [
        { word: "Profound", meaning: "Derin / Kapsamlı", sentence: "He has a profound knowledge of history." },
        { word: "Aberration", meaning: "Sapma / Anormallik", sentence: "The test result was an aberration." },
        { word: "Benevolent", meaning: "İyiliksever", sentence: "A benevolent leader is loved by everyone." },
        { word: "Debilitate", meaning: "Güçten Düşürmek", sentence: "The virus can debilitate the immune system." },
        { word: "Ephemeral", meaning: "Geçici / Kısa Süreli", sentence: "Fashion trends are often ephemeral." },
        { word: "Fortuitous", meaning: "Tesadüfi / Şans Eseri", sentence: "Our meeting was entirely fortuitous." },
        { word: "Garrulous", meaning: "Geveze / Konuşkan", sentence: "The garrulous old man told us many stories." },
        { word: "Iconoclast", meaning: "Gelenek Yıkıcı", sentence: "Picasso was an iconoclast in the art world." },
        { word: "Meticulous", meaning: "Titiz / Çok Dikkatli", sentence: "She is meticulous about her work." },
        { word: "Ubiquitous", meaning: "Her Yerde Olan", sentence: "Smartphones have become ubiquitous today." }
    ]
};

const quizQuestions = {
    'A1': [
        {
            question: "My brother __ a doctor at a big hospital in Ankara.",
            options: ["are", "is", "am", "be"],
            answer: "is"
        },
        {
            question: "We usually __ breakfast at 8 o'clock in the morning.",
            options: ["have", "has", "having", "had"],
            answer: "have"
        },
        {
            question: "There are __ apples in the basket on the table.",
            options: ["any", "a little", "much", "some"],
            answer: "some"
        },
        {
            question: "__ you like to drink coffee or tea?",
            options: ["Do", "Are", "Would", "Can"],
            answer: "Would"
        },
        {
            question: "They are not at home right now; they __ to the market.",
            options: ["go", "are going", "goes", "went"],
            answer: "are going"
        }
    ],
    'A2': [
        {
            question: "Last summer, we ______ to Antalya for our holiday and it was amazing.",
            options: ["go", "have gone", "went", "going"],
            answer: "went"
        },
        {
            question: "This examination looks ______ than the previous one.",
            options: ["difficult", "more difficult", "most difficult", "as difficult"],
            answer: "more difficult"
        },
        {
            question: "You ______ turn off your mobile phone during the flight. It is a rule.",
            options: ["must", "can", "should", "might"],
            answer: "must"
        },
        {
            question: "While I ______ to music, my mother was cooking dinner.",
            options: ["listened", "am listening", "was listening", "have listened"],
            answer: "was listening"
        },
        {
            question: "I haven't seen my best friend ______ we graduated from university.",
            options: ["for", "since", "ago", "when"],
            answer: "since"
        }
    ],
    'B1': [
        {
            question: "If the weather is nice tomorrow, we ______ for a picnic near the lake.",
            options: ["would go", "went", "will go", "go"],
            answer: "will go"
        },
        {
            question: "The new bridge ______ by the engineers next year.",
            options: ["will be built", "was built", "is building", "built"],
            answer: "will be built"
        },
        {
            question: "I have lived in this city ______ ten years, so I know everywhere.",
            options: ["since", "for", "in", "at"],
            answer: "for"
        },
        {
            question: "The man ______ car was stolen went to the police station immediately.",
            options: ["who", "which", "whose", "that"],
            answer: "whose"
        },
        {
            question: "She admitted that she had made a mistake ______ sending the email to the wrong person.",
            options: ["by", "with", "for", "on"],
            answer: "by"
        }
    ],
    'B2': [
        {
            question: "The most powerful ---- to parachuting is fear, but one should also take its high cost into account, as a total outfit for parachuting can be extremely expensive.",
            options: ["resemblance", "adjustment", "deterrent", "submission", "adherence"],
            answer: "deterrent"
        },
        {
            question: "Peanut may very well be the most common food allergy in some populations, but the ---- of a particular food allergy varies according to age and group.",
            options: ["utilisation", "withdrawal", "precaution", "termination", "prevalence"],
            answer: "prevalence"
        },
        {
            question: "Heating and cooling of the Earth are not ----, as it takes time for land, water, and air to either absorb heat and warm up or release stored heat and cool down.",
            options: ["hospitable", "convertible", "instantaneous", "detrimental", "preliminary"],
            answer: "instantaneous"
        },
        {
            question: "Since the mid-20th century, plastic pollution has increased ----, and resulting pollution has become a global environmental issue.",
            options: ["exponentially", "conveniently", "alternatively", "precisely", "fruitfully"],
            answer: "exponentially"
        },
        {
            question: "The most basic path to computer literacy is to ---- competence in using computers to perform personal or vocational tasks.",
            options: ["exclude", "relieve", "deteriorate", "restrict", "attain"],
            answer: "attain"
        }
    ],
    'C1': [
        {
            question: "Making videos should be a lot of fun, but it can also be a bit of a minefield, as lots of people ---- problems and lose momentum before they even get started.",
            options: ["hand over", "look for", "turn down", "give up", "run into"],
            answer: "run into"
        },
        {
            question: "A seminal study ---- that people who ---- less than seven hours a night are at increased risk of mortality.",
            options: ["revealed / will sleep", "has revealed / sleep", "reveals / will be sleeping", "will reveal / have slept", "had revealed / had been sleeping"],
            answer: "has revealed / sleep"
        },
        {
            question: "Ideally, the end of the Cold War between the United States and the Soviet Union ---- a substantial lessening of security concerns in the world; however, in practice, the focus ---- to terrorism and subnational groups.",
            options: ["might have signified / will have moved", "would have signified / used to move", "must have signified / had moved", "could have signified / had been moving", "should have signified / moved"],
            answer: "should have signified / moved"
        },
        {
            question: "The recent discovery of a toe made of wood and leather ---- to the mummified body of an Egyptian noblewoman in Cairo, approximately 3,000 years old, ---- that artificial limbs are nothing new.",
            options: ["attached / proves", "being attached / had proven", "attach / has proven", "attaching / proved", "to be attached / used to prove"],
            answer: "attached / proves"
        },
        {
            question: "Anorexia nervosa is a severe eating disorder, usually involving excessive weight loss ---- self-starvation, most often found ---- teenage girls.",
            options: ["at / with", "from / of", "for / between", "by / on", "through / among"],
            answer: "through / among"
        }
    ],
    'C2': [
        {
            question: "______ the gravity of the situation, the board members decided to convene an emergency meeting immediately.",
            options: ["Notwithstanding", "Given", "Furthermore", "Albeit", "Whereby"],
            answer: "Given"
        },
        {
            question: "Not only ______ the deadline, but they also managed to complete the project under budget.",
            options: ["they met", "did they meet", "they had met", "met they", "have they met"],
            answer: "did they meet"
        },
        {
            question: "The philosophical treatise was so dense and esoteric that it was ______ to all but the most dedicated scholars.",
            options: ["unintelligible", "lucid", "coherent", "explicit", "rudimentary"],
            answer: "unintelligible"
        },
        {
            question: "Had it not been for his timely intervention, the negotiations ______ in a complete deadlock.",
            options: ["would end", "will have ended", "would have ended", "ended", "had ended"],
            answer: "would have ended"
        },
        {
            question: "The prime minister's speech was ostensibly about unity, yet it contained ______ attacks on the opposition party.",
            options: ["subtle", "hospitable", "obsolete", "reciprocal", "mandatory"],
            answer: "subtle"
        }
    ]
};

//Skor Yönetimi
const STORAGE_KEY = 'gsb_user_score';
let userScore = 0;

function loadScoreFromStorage() {
    userScore = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
    if (isNaN(userScore)) userScore = 0;
    updateScoreDisplay();
}

function saveScoreToStorage() {
    localStorage.setItem(STORAGE_KEY, String(userScore));
}

function updateScoreDisplay() {
    const el = document.getElementById('userScore');
    if (el) el.innerText = userScore;
}

function incrementUserScore(amount = 10) {
    userScore += amount;
    saveScoreToStorage();
    updateScoreDisplay();
}

function showScorePanel() {
    document.getElementById('scorePanel').style.display = 'flex';
}

function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f7b731', '#5f27cd'];
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = confetti.style.width;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = '50%';
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 2000);
    }
}

function triggerCelebration(element) {
    element.classList.add('celebrate');
    createConfetti();
    setTimeout(() => element.classList.remove('celebrate'), 600);
}

function triggerShake() {
    document.body.classList.add('shake');
    setTimeout(() => document.body.classList.remove('shake'), 500);
}


function loadWords(level) {
    const container = document.getElementById('wordList');
    document.getElementById('currentLevelTitle').innerText = level + " Seviyesi - En Çok Kullanılan Kelimeler";
    container.innerHTML = "";
    
    // Butonların aktiflik durumunu güncelle
    document.querySelectorAll('#study .btn-group .btn').forEach(btn => { // #study eklendi
        btn.classList.remove('active');
        if(btn.innerText === level) btn.classList.add('active');
    });

    const list = wordData[level] || [];
    if(list.length === 0) container.innerHTML = "<p class='text-muted'>Bu seviye için henüz kelime eklenmedi.</p>";

    list.forEach((item, index) => {
        
        const feedbackId = `feedback-${level}-${index}`;
        
        const cardHTML = `
        <div class="col-md-6 mb-3">
            <div class="card h-100 shadow-sm border-0" style="background: #fff; border-left: 5px solid #cc0000 !important;">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <h4 class="text-danger fw-bold mb-0">${item.word}</h4>
                        <div>
                            <button class="btn btn-sm btn-light rounded-circle border" onclick="speak('${item.word}')" title="Kelimeyi Dinle">
                                <i class="fas fa-volume-up text-secondary"></i>
                            </button>
                            
                            <button class="btn btn-sm btn-outline-danger rounded-circle ms-1" onclick="checkPronunciation('${item.word}', '${feedbackId}', this)" title="Mikrofona Konuş">
                                <i class="fas fa-microphone"></i>
                            </button>
                        </div>
                    </div>
                    
                    <p class="mb-1 text-dark fw-bold mt-2">${item.meaning}</p>
                    <small class="text-muted fst-italic">"${item.sentence}"</small>

                    <div id="${feedbackId}" class="mt-2 small fw-bold" style="min-height: 20px; color: #555;"></div>
                </div>
            </div>
        </div>`;
        container.innerHTML += cardHTML;
    });
}

//speech to text
function checkPronunciation(targetWord, feedbackElementId, btnElement) {
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
        alert("Tarayıcınız sesli komut özelliğini desteklemiyor. Lütfen Chrome kullanın.");
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US'; 
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    const feedbackEl = document.getElementById(feedbackElementId);


    // Dinleme Başladığında
    recognition.onstart = function() {
        btnElement.classList.remove('btn-outline-danger');
        btnElement.classList.add('btn-danger', 'pulse-animation');
        btnElement.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'; // Dönme ikonu
        feedbackEl.innerHTML = '<span class="text-warning">Dinleniyor...</span>';
    };

    // Ses Algılandığında (Sonuç)
    recognition.onresult = function(event) {
        // Kullanıcının söylediği kelimeyi al
        const userSpeech = event.results[0][0].transcript.trim();
        
        // Karşılaştırma yap 
        const cleanUserSpeech = userSpeech.toLowerCase().replace(/[^a-zA-Z ]/g, "");
        const cleanTarget = targetWord.toLowerCase().replace(/[^a-zA-Z ]/g, "");

        if (cleanUserSpeech === cleanTarget) {
            
            feedbackEl.innerHTML = `<span class="text-success"><i class="fas fa-check-circle"></i> Harika! (${userSpeech})</span>`;
            
            
            if(typeof incrementUserScore === 'function') {
                incrementUserScore(5); 
            }
            
            
            btnElement.className = "btn btn-success rounded-circle ms-1";
            btnElement.innerHTML = '<i class="fas fa-check"></i>';
            
            
            setTimeout(() => {
                btnElement.className = "btn btn-sm btn-outline-danger rounded-circle ms-1";
                btnElement.innerHTML = '<i class="fas fa-microphone"></i>';
                feedbackEl.innerHTML = ''; 
            }, 2500);

        } else {
            
            feedbackEl.innerHTML = `<span class="text-danger"><i class="fas fa-times-circle"></i> Algılanan: "${userSpeech}"</span>`;
            
            
            if(typeof triggerShake === 'function') {
                triggerShake();
            }

            // Butonu eski haline getir
            btnElement.className = "btn btn-sm btn-outline-danger rounded-circle ms-1";
            btnElement.innerHTML = '<i class="fas fa-microphone"></i>';
        }
    };

    // Hata Olursa
    recognition.onerror = function(event) {
        feedbackEl.innerHTML = '<span class="text-muted">Anlaşılamadı, tekrar dene.</span>';
        btnElement.className = "btn btn-sm btn-outline-danger rounded-circle ms-1";
        btnElement.innerHTML = '<i class="fas fa-microphone"></i>';
    };

    recognition.start();
}

function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
}

//Sınav fonksiyonları
let currentQIndex = 0;
let currentQuizLevel = 'A1';

function loadQuizByLevel(level) {
    currentQuizLevel = level;
    currentQIndex = 0;
    
    
    document.querySelectorAll('#quiz .btn-group .btn').forEach(btn => {
        btn.classList.remove('active');
        if(btn.innerText === level) btn.classList.add('active');
    });

    
    document.getElementById('currentQuizLevelTitle').innerText = level + " Seviyesi - Sınav";

    
    loadQuiz();
}

function loadQuiz() {
    if (currentQIndex >= quizQuestions[currentQuizLevel].length) {
        alert("Tebrikler! " + currentQuizLevel + " seviyesinin tüm soruları tamamladınız. Başa dönülüyor.");
        currentQIndex = 0;
    }
    const q = quizQuestions[currentQuizLevel][currentQIndex];
    document.getElementById('question-text').innerText = (currentQIndex + 1) + ". " + q.question;
    const optsDiv = document.getElementById('options-container');
    optsDiv.innerHTML = "";
    
    q.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = "btn btn-outline-secondary text-start py-2";
        btn.innerHTML = `<span class="fw-bold me-2"></span> ${opt}`;
        btn.onclick = () => checkAnswer(opt, q.answer, btn);
        optsDiv.appendChild(btn);
    });
}

function checkAnswer(selected, correct, btn) {
    
    const optionButtons = document.querySelectorAll('#options-container button');
    optionButtons.forEach(b => b.disabled = true);

    if (selected === correct) {
        btn.className = "btn btn-success text-start py-2";
        btn.innerHTML += ' <i class="fas fa-check float-end mt-1"></i>';
        
        incrementUserScore(10);
        
        const quizCard = document.querySelector('.card.border-danger');
        triggerCelebration(quizCard);
    } else {
        btn.className = "btn btn-danger text-start py-2";
        btn.innerHTML += ' <i class="fas fa-times float-end mt-1"></i>';
        
        triggerShake();
        
        optionButtons.forEach(b => {
            if (b.innerText.trim().includes(correct)) {
                
                if(b.className.includes("btn-danger") === false) { 
                    b.className = 'btn btn-success text-start py-2';
                }
            }
        });
    }
}

function nextQuestion() {
    currentQIndex++;
    loadQuiz();
}

// Sayfa yüklendiğinde skor
document.addEventListener('DOMContentLoaded', loadScoreFromStorage);

//oturumu kapatma
function logout() {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
        console.warn('LocalStorage temizlenemedi:', e);
    }
    userScore = 0;
    updateScoreDisplay();

    
    var scorePanel = document.getElementById('scorePanel'); if(scorePanel) scorePanel.style.display = 'none';
    var dashboard = document.getElementById('dashboard-section'); if(dashboard) dashboard.style.display = 'none';
    var landing = document.getElementById('landing-section'); if(landing) landing.style.display = 'block';
    var loginBtn = document.getElementById('loginBtn'); if(loginBtn) loginBtn.style.display = 'inline-block';
    var userDropdown = document.getElementById('userDropdown'); if(userDropdown) userDropdown.style.display = 'none';

    
    window.location.href = 'index.html';
}


document.addEventListener('DOMContentLoaded', function() {
    var lb = document.getElementById('logoutBtn');
    if (lb) {
        lb.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    }
});