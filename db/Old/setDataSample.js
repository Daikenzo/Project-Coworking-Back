const mockCoworkings = require('./mock-coworkings');
const mockUsers = require('./mock-users');
const roles = require('./roleUserDb');
const bcrypt = require('bcrypt');


module.exports = (CoworkingModel, UserModel, RoleModel, ReviewModel) => {
    
    // Coworking Data
    const coworkingPromises = mockCoworkings.map(coworking => {
        return CoworkingModel.create({
            name:coworking.name,
            price:coworking.price,
            address:coworking.address,
            superficy:coworking.superficy,
            capacity:coworking.capacity,
            picture:coworking.picture,
            created:new Date()
        });
    })
    // Role Data
    const rolePromises = roles.map(role => {
        return RoleModel.create({
            label: role
        })
    })
    // User Data & set Promises for user Role Id
    Promise.all(coworkingPromises).then(() => {
        Promise.all(rolePromises).then(() => {
            //set User Role ID
            const userPromises = []
            let role
            userPromises.push(
                // Define RoleId into User (value => label)
                RoleModel.findOne({ where: { label: 'editor' } })
                    .then(role => {
                        // Import all mockUsers with this label
                            return mockUsers.filter(user =>{
                                return user.role == role.id
                            }).forEach(user =>{
                                // Hash Password
                                return bcrypt.hash(user.password, 10)
                                .then(hash =>{
                                    // Store & Inser Body Request Data
                                        return UserModel.create({
                                        firstname:user.firstname,
                                        lastname:user.lastname,
                                        username:user.username? user.username : `${user.firstname} ${user.lastname}`,
                                        password:hash,
                                        RoleId : role.id
                                    });
                                });
                            });
                    },
                ),
                RoleModel.findOne({ where: { label: 'admin' } })
                    .then(role => {
                        // Select All user with role id
                            return mockUsers.filter(user =>{
                                return user.role == role.id
                            }).forEach(user =>{
                                // Hash Password
                                return bcrypt.hash(user.password, 10)
                                .then(hash =>{
                                    // Store & Inser Body Request Data
                                        return UserModel.create({
                                        firstname:user.firstname,
                                        lastname:user.lastname,
                                        username:user.username? user.username : `${user.firstname} ${user.lastname}`,
                                        password:hash,
                                        RoleId : role.id
                                    });
                                });
                            });
                }),
                RoleModel.findOne({ where: { label: 'user' } })
                    .then(role => {
                            // Select All user with role id
                            return mockUsers.filter(user =>{
                                return user.role == role.id
                            }).forEach(user =>{
                                // Hash Password
                                return bcrypt.hash(user.password, 10)
                                .then(hash =>{
                                    // Store & Inser Body Request Data
                                        return UserModel.create({
                                        firstname:user.firstname,
                                        lastname:user.lastname,
                                        username:user.username? user.username : `${user.firstname} ${user.lastname}`,
                                        password:hash,
                                        RoleId : role.id
                                    });
                                });
                            });
                })    
                
                /* Méthode Simple
                RoleModel.findOne({ where: { label: 'editor' } })
                    .then(role => {
                        return bcrypt.hash('mdp', 10)
                            .then(hash => {
                                return UserModel.create({
                                    username: 'Simon',
                                    password: hash,
                                    RoleId: role.id
                                })
                            })
                    }),*/
            )
            // review Generator
            Promise.all(userPromises).then(() =>{
                
            })
            
            Promise.all(userPromises)
            .then(() => {
                console.log(userPromises);
                ReviewModel.create({
                    content: 'Lorem Ipsum',
                    rating: 3,
                    UserId: 1,
                    CoworkingId: 10
                })
                ReviewModel.create({
                    content: 'Dolor sit amet',
                    rating: 5,
                    UserId: 2,
                    CoworkingId: 7
                })
            })
        })
    })
}

/*
error message :
code: 'ER_NO_REFERENCED_ROW_2
message :  sqlMessage: 'Cannot add or update a child row: a foreign key constraint fails (`coworking_07_2023`.`reviews`, CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE)',
dans: review table (lroem ipsum, fields UserId)
error type : SequelizeForeignKeyConstraintError
faltalError ? false

*/