const express = require('express');
const router = express.Router();
const User = require('../model/userModel');

// 로그인/회원가입 통합 처리
router.post('/api/users/login', async (req, res) => {
    try {
        const { kakaoId, profileName, profileImage } = req.body;

        // 기존 사용자 찾기
        let user = await User.findOne({ kakaoId });

        if (!user) {
            // 새 사용자 생성
            user = new User({
                kakaoId,
                profileName,
                profileImage
            });
            await user.save();
        } else {
            // 기존 사용자 정보 업데이트
            user.profileName = profileName;
            user.profileImage = profileImage;
            await user.save();
        }

        res.status(200).json(user);
    } catch (err) {
        console.error('사용자 저장 오류:', err);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});

// 사용자 조회
router.get('/api/users/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
