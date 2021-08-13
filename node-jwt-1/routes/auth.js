import express from "express";

const router = express.Router();

router.post('/signup', (req, res) => {

    const { password, email } = req.body;

    console.log(password, email)
    res.send('Auth is working')
})


export default router;