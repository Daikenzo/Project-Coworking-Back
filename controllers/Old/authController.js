// Authentificator Controllers
const { UniqueConstraintError, ValidationError } = require('sequelize');
const bcrypt = require('bcrypt');
const {UserModel, RoleModel} = require('../db/sequelize')
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'clé_secrete';
const test = true;

// role Hiearchy
// permet de préciser les éléments que peuvent touché 
const rolesHierarchy = {
    user: ["user"],
    editor: ["user", "editor"],
    admin: ["user", "editor", "admin"]
}


// Create Object
exports.signUp = (req, res) =>{
    //Init bcrypt Hash
    bcrypt.hash(req.body.password, 10)
        .then(hash =>{
            // Store & Inser Body Request Data
            const dataUser = {...req.body, password: hash};
            console.log(dataUser)
            return UserModel
                .create(
                    dataUser
                )
                .then(user =>{
                    res.status(201).json({ message: 
                        `l'utilisateur ${user.username} a été créé.`,
                        data:user});
                })
        })
        .catch(error =>{
            const cleanMessage = error.message.split(': ')[1]
            if (error.name === "SequelizeUniqueConstraintError" || error instanceof UniqueConstraintError){
                const messageRescue = 
                `${error.name}: Le nom est déjà pris.`;
                //console.log(error.name)
                if (error.message === "Validation error"){
                    return res.status(400).json({ message: messageRescue})}
                } else{
                    return res.status(400).json({ message: `${cleanMessage}`})
                }
            if ( error instanceof ValidationError) {
                return res.status(400).json({ message: cleanMessage })
            } 
            res.status(500).json({ message: 
                `${error}`})
        });
}
// Sign In
exports.login = (req, res) => {
    // Check Correct Login
    console.log("check login")
    UserModel.findOne({ where: { username: req.body.username } })
        .then(user => {
            const messageerror = `L'utilisateur ou le mot de passe est incorrect`;
            console.log("Info request:", req.body)
            // Compare Password User with request Body
             if(!user){
                return res.status(404).json({message: messageerror});
             }
            bcrypt.compare(req.body.password, user.password)
                .then(isValid => {
                    if (isValid) {
                        const token = jwt.sign({
                            data: {
                                username: req.body.username,
                                id: user.id,
                                role:user.RoleId
                            },
                        }, 
                        SECRET_KEY, { expiresIn: 60 * 60 });
                        console.log(token) // Demo
                        res.json({ message: 'login réussi', data: token })
                    } else {
                        return res.status(404).json({ message: messageerror })
                    }
                })
        })
        .catch(error => {
            console.log(error)
            return res.status(500).json( {username : error.message})
        })
}
// User Acess Protect
exports.protect = (req, res, next)=>{
    // Check auth User
    console.log('protect check', req.body) 
    if (!req.headers.authorization) {
        return res.status(401).json({ 
            message: `Vous n'êtes pas authentifié` })
    }
    // Check Valid Token
    console.log('check token')
    const token = req.headers.authorization.split(' ')[1]
    if (token) {
        console.log('decode protect')
        try {
            // Decode and Send Token
            const decoded = jwt.verify(token, SECRET_KEY)
            console.log(req.data.username); // Undefined
            req.username = decoded.data.username
            next()
        } catch (error) {
            res.status(403).json({ message: `Le jeton n'est pas valide` })
        }
    } else {
        res.status(401).json({ message: `Vous n'êtes pas authentifié.` })
    }
}

// Restric controller
exports.restrictTo = (roleParam) =>{
    return (req, res, next) =>{
        console.log(req)
        return UserModel.findOne({where: {username: req.username}})
            .then(user =>{
                console.log(user, roleParam)
                // Check role & acess restrict
                return RoleModel.findByPk(user.RoleId)
                    .then(role =>{
                        //Old
                        // if(role.label === roleParam){
                        if (rolesHierarchy[role.label].includes(roleParam)){
                            return next()
                        }
                        else{
                            return res.status(403).json({
                                message: `Vous avez pas les droits suffisants pour cette requette.`
                            })
                        }
                    })
            })
            .catch(error => {
                return res.status(500).json({ message: error.message })
            })
    }
};
exports.restrictToOwnerUser = (modelParam) =>{
    return (req, res, next) =>{
        // Check RoleUser
        return modelParam.findByPk(req.params.id)
            .then(result =>{
                if (!result){
                    const message = `La ressource n°${req.params.id} n'existe pas`
                    return res.status(404).json({message});
                }
                return UserModel.findOne({ where: { username: req.username } })
                    .then(user => {
                        if (result.UserId !== user.id) {
                            const message = "Tu n'es pas le créateur de cette ressource";
                            return res.status(403).json({ message })
                        }
                        return next();
                    })
            })
            .catch(error => {
                return res.status(500).json({ message: error.message })
            })
    }
};


// On passe bien par le restricto avec le parametre : 