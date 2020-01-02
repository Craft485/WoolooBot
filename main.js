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

client.on('message', (receivedMessage)=>{
    let msg = receivedMessage
    let MSG = receivedMessage.content.toUpperCase()
    if (receivedMessage === client.user) {
        return
    }
    if (receivedMessage.content.startsWith("w.") || receivedMessage.content.startsWith("W.")) {
        CMD(msg)
    }
    if (MSG === "WOO") {
        receivedMessage.channel.send("loo")
    }
})

function CMD(msg) {
    let fullCommand = msg.content.substr(2) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

    if (primaryCommand === "code") {
        msg.channel.send("```haskell" + "\n" + 
        `The Wooloo Code:
        1. All Wooloos are created equal
        2. In a Wooloo environment it may arise that a shiny Wooloo(visible via its black coat color) can become the alpha or lead Wooloo within that Wooloo village 
        3. All non-Wooloos may be enlightened to the Wooloo ways, however their own views are to be treated with respect, Wooloo may not force beliefs on others, Wooloo or not
        4. Hierarchy is a common thing among Wooloo societies, this is used to organize larger groups Wooloo groups, not to segregate fellow Wooloos
        5. All Wooloos are entitled to their own individual beliefs outside the Wooloo Code` + "\n" + 
        "```")
    } else if (primaryCommand === "help") {
        msg.channel.send("```" + "\n" +
        `Commands:
        -w.help: shows this list
        -w.code: shows the Wooloo Code` + "\n" + 
        "```")
    }
}

client.login(config.BOT_SECRET)