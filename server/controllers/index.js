const bcrypt = require('bcrypt');
const User = require('../models/user');
const Transaction = require('../models/transaction');

const register = async (req, res) => {
    const reqUser = {
        email: req.body.email,
        password: req.body.password,
        cashBalance: 5000
    }
    try {
        const user = await new User(reqUser);
        await user.save();
        return res.status(201).json({
            user
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email: email });
		if (await bcrypt.compare(password, user.password)) {
			const payload = {
				id: user.id,
				email: user.email
			}
			return res.status(201).json({ payload })
		} else {
			res.status(401).json({ error: 'Username and password do not match.'})
		}
	} catch (error) {
		return res.status(500).json({ error: error.message })
	}
}

module.exports = {
    register,
    login
}