const Discord = require('discord.js');

const Util = require('discord.js');

const getYoutubeID = require('get-youtube-id');

const fetchVideoInfo = require('youtube-info');

const YouTube = require('simple-youtube-api');

const youtube = new YouTube("AIzaSyAdORXg7UZUo7sePv97JyoDqtQVi3Ll0b8");

const queue = new Map();

const ytdl = require('ytdl-core');

const fs = require('fs');

const gif = require("gif-search");

const client = new Discord.Client({disableEveryone: true});

const prefix = "+";
/////////////////////////
////////////////////////


client.on('message',async message => { var room; var title; var duration; var gMembers; var filter = m => m.author.id === message.author.id; if(message.content.startsWith(prefix + "giveaway")) { //return message.channel.send(':heavy_multiplication_x:| **هذا الامر معطل حاليا.. ``حاول في وقت لاحق``**'); if(!message.guild.member(message.author).hasPermission('MANAGE_GUILD')) return message.channel.send(':heavy_multiplication_x:| **يجب أن يكون لديك خاصية التعديل على السيرفر**'); message.channel.send(`:eight_pointed_black_star:| **منشن الروم الذي تريد به القيف اواي**`).then(msgg => { message.channel.awaitMessages(filter, { max: 1, time: 20000, errors: ['time'] }).then(collected => { let room = message.guild.channels.find('name', collected.first().content); if(!room) return message.channel.send(':heavy_multiplication_x:| **لم اقدر على ايجاد الروم المطلوب**'); room = collected.first().content; collected.first().delete(); msgg.edit(':eight_pointed_black_star:| **اكتب مدة القيف اواي**').then(msg => { message.channel.awaitMessages(filter, { max: 1, time: 20000, errors: ['time'] }).then(collected => { if(isNaN(collected.first().content)) return message.channel.send(':heavy_multiplication_x:| **يجب عليك ان تحدد وقت زمني صحيح.. ``يجب عليك اعادة كتابة الامر``**'); duration = collected.first().content * 60000; collected.first().delete(); msgg.edit(':eight_pointed_black_star:| **واخيرا اكتب على ماذا تريد القيف اواي**').then(msg => { message.channel.awaitMessages(filter, { max: 1, time: 20000, errors: ['time'] }).then(collected => { title = collected.first().content; collected.first().delete(); try { let giveEmbed = new Discord.RichEmbed() .setAuthor(message.guild.name, message.guild.iconURL) .setTitle(title) .setDescription(`المدة : ${duration / 60000} دقائق`) .setFooter(message.author.username, message.author.avatarURL); message.guild.channels.find('name', room).send(giveEmbed).then(m => { let re = m.react('🎉'); setTimeout(() => { let users = m.reactions.get("🎉").users; let list = users.array().filter(u => u.id !== m.author.id); let gFilter = list[Math.floor(Math.random() * list.length) + 0]; if(users.size === 1) gFilter = '**لم يتم التحديد**'; let endEmbed = new Discord.RichEmbed() .setAuthor(message.author.username, message.author.avatarURL) .setTitle(title) .addField('انتهى القيف اواي !',`الفائز هو : ${gFilter}`) .setFooter(message.guild.name, message.guild.iconURL); m.edit(endEmbed); },duration); }); msgg.edit(`:heavy_check_mark:| **تم اعداد القيف اواي**`); } catch(e) { msgg.edit(`:heavy_multiplication_x:| **لم اقدر على اعداد القيف اواي بسبب نقص الخصائص**`); console.log(e); } }); }); }); }); }); }); } });


    
client.on('ready', () => {
   console.log(`----------------`);
      console.log(`Giveaway  Bot- Script By : M3a4x Clan`);
        console.log(`----------------`);
      console.log(`ON ${client.guilds.size} Servers '     Script By : M3a4x Clan ' `);
    console.log(`----------------`);
  console.log(`Logged in as ${client.user.tag}!`);
client.user.setGame(`Dark Unit.`,"http://twitch.tv/Death Shop")
client.user.setStatus("dnd")
});

client.login(process.env.BOT_TOKEN);
