const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User , Orders} = require('../models/models')
const generateJwt = (id,email,role) =>{
    return jwt.sign({id, email, role},
        process.env.SECRET_KEY,
       {expiresIn:'24h'}
   )
   
}

class UserController {
    async registration(req,res,next){
        const {email, password, role}= req.body
        if(!email && !password){
            return next(ApiError.badRequest('none correct input'))
        }
        const candidate=await User.findOne({where:{email}})
        if(candidate){
            return next(ApiError.badRequest('email was occupid'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password: hashPassword})
        await Orders.create({userId: user.id})
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})

    }
    async login(req,res,next){
        const {email,password}=req.body
        const user = await User.findOne({where:{email}})
        if(!user){
            return next(ApiError.internal('none exist'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword){
            return next(ApiError.internal('wrong pass'))
        }
        if(user.block){
            return next(ApiError.internal('account is blocked'))
        }
        const token = generateJwt(user.id,user.email, user.role)
        return res.json({token})
    }
    async check(req,res,next){
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
    async report(req, res, next) {
        try {
            const users = await User.findAll({
                attributes: ['id', 'email', 'role', 'block', 'createdAt'],   });
            const formattedUsers = users.map(user => ({
                id: user.id,
                email: user.email,
                role: user.role,
                block: user.block,
                createdAt: user.createdAt
            }));
            res.status(200).json(formattedUsers); } catch (error) {
            console.error('Ошибка при получении данных о пользователях:', error);
            return next(ApiError.internal('Ошибка при получении данных о пользователях'));
        }
    }

    async control(req, res, next) {
        try {
            const { userId, action } = req.body; // userId - ID пользователя, action - 'ban' или 'unban'

            if (!userId || !action) {
                return next(ApiError.badRequest('Не указан ID пользователя или действие.'));
            }

            const user = await User.findByPk(userId);
            if (!user) {
                return next(ApiError.notFound('Пользователь не найден.'));
            }

            if (action === 'ban') {
                user.block = true;
            } else if (action === 'unban') {
                user.block = false;
            } else {
                return next(ApiError.badRequest('Некорректное действие. Используйте "ban" или "unban".'));
            }

            await user.save();
            return res.json({ message: `Пользователь ${user.email} успешно ${action}.` });
        } catch (error) {
            console.error('Ошибка при изменении статуса пользователя:', error);
            return next(ApiError.internal('Ошибка при изменении статуса пользователя.'));
        }
    }
}

module.exports = new UserController()