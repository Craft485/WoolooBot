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
    
    var today = new Date()
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
    var dateTime = date+' '+time
    console.log(msg.author.toString() + ": " + msg + " " + dateTime)
    if (receivedMessage === client.user) {
        return
    }
    if (receivedMessage.content.startsWith("w.") || receivedMessage.content.startsWith("W.")) {
        CMD(receivedMessage)
    }
    if (MSG === "WOO") {
        receivedMessage.channel.send("loo")
    } else if (MSG.includes("HELLO WOOLOO")) {
        const sip = client.emojis.find(emoji => emoji.name === "woolooSip")
        receivedMessage.reply(`Hello there! ${sip}`)
    }
})

var woolooArray = [
    "WoolooRoll.gif", "woolooSip.PNG", "WoolooSurprise.png", 
    "upsidedownWooloo.png", "shinyWooLoo.png", "hapWooloo.png", 
    "zekloo.png", "wooflower.png"
]

function getWooloo(receivedMessage) {
    //console.log(receivedMessage)
    let i = Math.floor(Math.random() * woolooArray.length)
    //console.log(woolooArray[i])
    let wooloo = new Discord.Attachment("./WoolooImages/" + woolooArray[i])

    receivedMessage.channel.send(wooloo)
}

var snugArray = [
    "woohug.png", "woolooLay.png"
]
function hugWooloo(receivedMessage) {
    let i = Math.floor(Math.random() * snugArray.length)
    let snugged = new Discord.Attachment("./snuglooImages/" + snugArray[i])
    //send attachment
    receivedMessage.channel.send(snugged)
}

function CMD(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(2) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

    if (primaryCommand === "code") {
        receivedMessage.channel.send("```haskell" + "\n" + 
        `The Wooloo Code:
        1. All Wooloos are created equal
        2. In a Wooloo environment it may arise that a shiny Wooloo(visible via its black coat color) can become the alpha or lead Wooloo within that Wooloo village 
        3. All non-Wooloos may be enlightened to the Wooloo ways, however their own views are to be treated with respect, Wooloo may not force beliefs on others, Wooloo or not
        4. Hierarchy is a common thing among Wooloo societies, this is used to organize larger groups Wooloo groups, not to segregate fellow Wooloos
        5. All Wooloos are entitled to their own individual beliefs outside the Wooloo Code` + "\n" + 
        "```")
    } else if (primaryCommand === "help") {
        receivedMessage.channel.send("```" + "\n" +
        `Commands:
        -w.help: shows this list
        -w.code: shows the Wooloo Code
        -w.wooloo: shows an image of a Wooloo
        -w.snug: snug/hug a wooloo` + "\n" + 
        "```")
    } else if (primaryCommand === "wooloo") {
        getWooloo(receivedMessage)
    } else if (primaryCommand === "snug") {
        hugWooloo(receivedMessage)
    } else if (primaryCommand === "dex" || primaryCommand === "info") {
        dex(receivedMessage)
    }
}

function dex(receivedMessage) {
    const roll =client.emojis.find(emoji => emoji.name === "WoooshWoolooRoll")
    let woolooEmbed = new Discord.RichEmbed()
        .setColor("#7df9ff")
        .addField("Wooloo Info:",
                 "Wooloo is a Normal type Pokémon introduced in Generation 8. It is known as the Sheep Pokémon." + "\n" +
                 "The white fur that covers their bodies grows throughout their lives, and it will fully grow back in three months even if the Wooloo has been completely shorn. \n"+
                 "Wooloo live as a herd and mimic the actions of their Trainer or herd leader. They dislike conflict, and if they need to escape from enemies, they will simply roll away. \n"+
                 roll, 
                 true)
    receivedMessage.channel.send(woolooEmbed)
}

client.login(config.BOT_SECRET)