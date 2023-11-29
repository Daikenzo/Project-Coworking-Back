var Error = {
  name: 'SequelizeUniqueConstraintError',
  errors: [
    ValidationErrorItem {
      message: 'undefined must be unique',
      type: 'unique violation',
      path: 'undefined',
      value: null,
      origin: 'DB',
      instance: [Users],
      validatorKey: 'not_unique',
      validatorName: null,
      validatorArgs: []
    }
  ],
  parent: SqlError: (conn=1432, no: 1062, SQLState: 23000) Duplicata du champ 'markevan@inazuma.jp' pour la clef 'uniqueKey'
  sql: INSERT INTO `Users` (`id`,`email`,`password`,`username`,`firstname`,`lastname`,`createdAt`,`updatedAt`,`RoleId`) VALUES (DEFAULT,?,?,?,?,?,?,?,?); - parameters:['markevan@inazuma.jp','$2b$10$jzYtTe9zBMVdBljxS4u/bOJgfo1tDfZFlq69RKSflzNdHj.jMxD9K','MainCeles...]
      at module.exports.createError (C:\Users\Duild\OneDrive\Documents\Travail\Formation\LaPiscine\Projects\Js\NodeJs\Express\_Exam\Nonchaloir-Back_API\node_modules\mariadb\lib\misc\errors.js:64:10)
      at PacketNodeEncoded.readError (C:\Users\Duild\OneDrive\Documents\Travail\Formation\LaPiscine\Projects\Js\NodeJs\Express\_Exam\Nonchaloir-Back_API\node_modules\mariadb\lib\io\packet.js:582:19)
      at Query.readResponsePacket (C:\Users\Duild\OneDrive\Documents\Travail\Formation\LaPiscine\Projects\Js\NodeJs\Express\_Exam\Nonchaloir-Back_API\node_modules\mariadb\lib\cmd\parser.js:58:28)
      at PacketInputStream.receivePacketBasic (C:\Users\Duild\OneDrive\Documents\Travail\Formation\LaPiscine\Projects\Js\NodeJs\Express\_Exam\Nonchaloir-Back_API\node_modules\mariadb\lib\io\packet-input-stream.js:85:9)
      at PacketInputStream.onData (C:\Users\Duild\OneDrive\Documents\Travail\Formation\LaPiscine\Projects\Js\NodeJs\Express\_Exam\Nonchaloir-Back_API\node_modules\mariadb\lib\io\packet-input-stream.js:135:20)
      at Socket.emit (node:events:514:28)
      at addChunk (node:internal/streams/readable:376:12)
      at readableAddChunk (node:internal/streams/readable:349:9)
      at Readable.push (node:internal/streams/readable:286:10)
      at TCP.onStreamRead (node:internal/stream_base_commons:190:23) {
    sqlMessage: "Duplicata du champ 'markevan@inazuma.jp' pour la clef 'uniqueKey'",
    sql: 'INSERT INTO `Users` (`id`,`email`,`password`,`username`,`firstname`,`lastname`,`createdAt`,`updatedAt`,`RoleId`) VALUES (DEFAULT,?,?,?,?,?,?,?,?);',
    fatal: false,
    errno: 1062,
    sqlState: '23000',
    code: 'ER_DUP_ENTRY',
    parameters: [
      'markevan@inazuma.jp',
      '$2b$10$jzYtTe9zBMVdBljxS4u/bOJgfo1tDfZFlq69RKSflzNdHj.jMxD9K',
      'MainCelesteduJapon',
      'Marc',
      'Evans',
      '2023-11-29 14:54:24.178',
      '2023-11-29 14:54:24.178',
      5
    ]
  },
  original: SqlError: (conn=1432, no: 1062, SQLState: 23000) Duplicata du champ 'markevan@inazuma.jp' pour la clef 'uniqueKey'
  sql: INSERT INTO `Users` (`id`,`email`,`password`,`username`,`firstname`,`lastname`,`createdAt`,`updatedAt`,`RoleId`) VALUES (DEFAULT,?,?,?,?,?,?,?,?); - parameters:['markevan@inazuma.jp','$2b$10$jzYtTe9zBMVdBljxS4u/bOJgfo1tDfZFlq69RKSflzNdHj.jMxD9K','MainCeles...]
      at module.exports.createError (C:\Users\Duild\OneDrive\Documents\Travail\Formation\LaPiscine\Projects\Js\NodeJs\Express\_Exam\Nonchaloir-Back_API\node_modules\mariadb\lib\misc\errors.js:64:10)
      at PacketNodeEncoded.readError (C:\Users\Duild\OneDrive\Documents\Travail\Formation\LaPiscine\Projects\Js\NodeJs\Express\_Exam\Nonchaloir-Back_API\node_modules\mariadb\lib\io\packet.js:582:19)
      at Query.readResponsePacket (C:\Users\Duild\OneDrive\Documents\Travail\Formation\LaPiscine\Projects\Js\NodeJs\Express\_Exam\Nonchaloir-Back_API\node_modules\mariadb\lib\cmd\parser.js:58:28)
      at PacketInputStream.receivePacketBasic (C:\Users\Duild\OneDrive\Documents\Travail\Formation\LaPiscine\Projects\Js\NodeJs\Express\_Exam\Nonchaloir-Back_API\node_modules\mariadb\lib\io\packet-input-stream.js:85:9)
      at PacketInputStream.onData (C:\Users\Duild\OneDrive\Documents\Travail\Formation\LaPiscine\Projects\Js\NodeJs\Express\_Exam\Nonchaloir-Back_API\node_modules\mariadb\lib\io\packet-input-stream.js:135:20)
      at Socket.emit (node:events:514:28)
      at addChunk (node:internal/streams/readable:376:12)
      at readableAddChunk (node:internal/streams/readable:349:9)
      at Readable.push (node:internal/streams/readable:286:10)
      at TCP.onStreamRead (node:internal/stream_base_commons:190:23) {
    sqlMessage: "Duplicata du champ 'markevan@inazuma.jp' pour la clef 'uniqueKey'",
    sql: 'INSERT INTO `Users` (`id`,`email`,`password`,`username`,`firstname`,`lastname`,`createdAt`,`updatedAt`,`RoleId`) VALUES (DEFAULT,?,?,?,?,?,?,?,?);',
    fatal: false,
    errno: 1062,
    sqlState: '23000',
    code: 'ER_DUP_ENTRY',
    parameters: [
      'markevan@inazuma.jp',
      '$2b$10$jzYtTe9zBMVdBljxS4u/bOJgfo1tDfZFlq69RKSflzNdHj.jMxD9K',
      'MainCelesteduJapon',
      'Marc',
      'Evans',
      '2023-11-29 14:54:24.178',
      '2023-11-29 14:54:24.178',
      5
    ]
  },
  fields: { undefined: undefined },
  sql: 'INSERT INTO `Users` (`id`,`email`,`password`,`username`,`firstname`,`lastname`,`createdAt`,`updatedAt`,`RoleId`) VALUES (DEFAULT,?,?,?,?,?,?,?,?);'
}