
const Sequelize=require('sequelize');
const sequelize=require('../util/database');
const ArchivedChat = sequelize.define('ArchivedChat', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    message: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  
  const cron = require('node-cron');
  
  cron.schedule('0 0 * * *', async () => {
    try {
      const oneDayAgo = new Date();
      oneDayAgo.setSeconds(oneDayAgo.getDate() - 1);
      const chatsToMove = await chatData.findAll({
        where: {
          createdAt: {
            [Sequelize.Op.lt]: oneDayAgo,
          },
        },
      });
  
      for (const chat of chatsToMove) {
        await ArchivedChat.create({
          message: chat.message,
          username: chat.username,
        });
        await chat.destroy();
      }
  
      console.log('Moved and deleted one-day-old messages.');
    } catch (error) {
      console.error('Error moving and deleting messages:', error);
    }
  });

  module.exports=ArchivedChat;