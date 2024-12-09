const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const userRoutes = require('./routes/index');
const app = express();

// 미들웨어 설정
app.use(express.json());
app.use(express.static(path.join(__dirname, 'treesmaschri')));

// 라우터 설정
app.use('/', userRoutes);

// MongoDB 연결
mongoose.connect('mongodb://127.0.0.1:27017/mydatabase')
    .then(() => {
        console.log('MongoDB Connected');
        app.listen(8080, function(){
            console.log("서버 온");
        });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

// Ornament 모델 가져오기
const Ornament = require('./model/ornamentModel');

// 장식물과 메시지 저장 API
app.post('/api/save-ornament', async (req, res) => {
    try {
        const { imageCode, message, userId } = req.body;

        const ornament = new Ornament({
            userId,
            imageCode,
            message
        });

        const savedOrnament = await ornament.save();
        res.json({ success: true, data: savedOrnament });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 사용자의 장식물 조회 API
app.get('/api/ornaments/:userId', async (req, res) => {
    try {
        const ornaments = await Ornament.find({ userId: req.params.userId });
        res.json(ornaments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 홈 라우트
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'treesmaschri/html/index.html'));
});

