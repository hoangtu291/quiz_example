import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDxoUD-7xCpL2Gpc3mcIBdZuqhbcBhH6G8",
    authDomain: "quiz-exam-78de8.firebaseapp.com",
    projectId: "quiz-exam-78de8",
    storageBucket: "quiz-exam-78de8.firebasestorage.app",
    messagingSenderId: "1007173328551",
    appId: "1:1007173328551:web:ad85131014f87350074582",
    measurementId: "G-3LWV51WB9F"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ❌ Không export nữa
async function handleStoreExam(quizInfo, totalTime) {
    if (!quizInfo) return;
    const submittedTime = new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
    const correctCount = quizInfo.filter(q => q.userAnswer === q.answer).length;
    const answeredCount = quizInfo.filter(q => !!q.userAnswer).length;

    const quizRecord = {
        submittedTime,
        data: quizInfo,
        statistic: {
            total: quizInfo.length,
            correct: correctCount,
            answered: answeredCount,
            timeTaken: totalTime || null
        }
    };

    try {
        await addDoc(collection(db, "quiz_submissions"), quizRecord);
        alert("✅ Đã nộp bài! Dữ liệu lưu vào Firestore.");
        document.getElementById('submitQuizBtn').disabled = true;
    } catch (error) {
        console.error(error);
        alert("❌ Lỗi khi lưu dữ liệu. Xem console để biết chi tiết.");
    }
}

// ✅ Gắn global để file khác gọi được
window.handleStoreExam = handleStoreExam;
