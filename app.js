const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const sequelize = require('./util/database');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const signUpRoutes = require('./routes/signUp');
const loginRoutes = require('./routes/login');
const chatRoutes = require('./routes/chat');
const groupRoutes = require('./routes/group');
const AdminRoutes = require('./routes/Admin');
const userGroupRoutes = require('./routes/userGroup');
const { Sequelize } = require('sequelize');
const UserModel = require('./model/signUp');
const ChatModel =require('./model/chat');
const groupModel = require('./model/group');
const userGroupModel = require('./model/userGroup');
const AdminModel = require('./model/Admin');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const multer=require('multer')

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 100000
    }
})
app.use('/profile', express.static('upload/images'));


const users = {};
io.on('connection', (socket) => {
  socket.on('new-user', (data) => {
    const { name, groupId } = data;
    socket.join(groupId);
    users[socket.id] = { name, groupId };
    socket.to(groupId).emit('user-connected', { name, groupId });
  });

  socket.on('send-chat-message', (data) => {
    const { message, groupId } = data;
    io.to(groupId).emit('chat-message', { message, name: users[socket.id].name, groupId });
  });

  socket.on('disconnect', () => {
    if (users[socket.id]) {
      const { name, groupId } = users[socket.id];
      socket.to(groupId).emit('user-disconnected', { name, groupId });
      delete users[socket.id];
    }
  });
});
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5500');
  next();
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(signUpRoutes);
app.use(loginRoutes);
app.use(chatRoutes);
app.use(groupRoutes);
app.use(AdminRoutes);
app.use(userGroupRoutes);

app.use('/signUp', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views', 'SignUp.html'));
});
app.use('/login', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});
app.use('/chat', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views', 'chat.html'));
});
app.use('/group', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views', 'group.html'));
});
app.use('/invite', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views', 'invite.html'));
});
app.use('/AllGroupsUsers', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views', 'AllGroupsUsers.html'));
});

ChatModel.belongsTo(UserModel, { foreignKey: 'userId' });
UserModel.hasMany(ChatModel, { foreignKey: 'userId' });

ChatModel.belongsTo(groupModel, { foreignKey: 'groupId' });
groupModel.hasMany(ChatModel, { foreignKey: 'groupId' });

groupModel.belongsToMany(UserModel, {
  through: userGroupModel,
  foreignKey: 'groupId',
});
UserModel.belongsToMany(groupModel, {
  through: userGroupModel,
  foreignKey: 'userId',
});

sequelize
  .sync({ force: false })
  .then(() => {
    http.listen(5500, () => {
      console.log('Server is running on port 5500');
    });
  })
  .catch((err) => {
    console.error('Error syncing the database:', err);
  });
