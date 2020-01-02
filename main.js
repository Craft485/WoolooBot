let config = require("./config.mjs")
const Discord = require('discord.js') //get discord.js lib
const client = new Discord.Client() //create a new client

client.on('ready', _=> {
    client.user.setActivity("Just Wooloo Things")
    client.user.setStatus("online")
    //list guild we are in
    console.log("Servers: ")
    client.guilds.forEach((guild)=>{
        console.log("-" + guild.name)
    })
})



client.login(config.BOT_SECRET)