//get the information stored in the config module(file)
const  config = require("./config.js")
const Discord = require('discord.js') //get discord.js lib
const client = new Discord.Client() //create a new client
//when the bot loads up
client.on('ready', _=> {
    //set activity/status
    client.user.setActivity("Just Wooloo Things")
    client.user.setStatus("online")
    //list guild we are in to the console
    console.log("Servers: ")
    client.guilds.forEach((guild)=>{
        console.log("-" + guild.name)
    })
})
//when a message is sent to a channel
client.on('message', (receivedMessage)=>{
    //msg is just an alternative to using receivedMessage
    let msg = receivedMessage
    //MSG allows us to ignore what case the message is in
    let MSG = receivedMessage.content.toUpperCase()
    //messing with logging date/time of a message to console
    var today = new Date()
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
    var dateTime = date+' '+time
    console.log(msg.author.toString() + ": " + msg + " " + dateTime)
    //make sure we don't respond to ourselves
    if (receivedMessage === client.user) {
        return
    }
    //check a message for the prefix "w." to signal that someone has used a command
    if (receivedMessage.content.startsWith("w.") || receivedMessage.content.startsWith("W.")) {
        CMD(receivedMessage)
    }
    //a wooloo version of ping pong
    if (MSG === "WOO") {
        receivedMessage.channel.send("loo")
    } else if (MSG.includes("HELLO WOOLOO")) {
        //get the :woolooSip: emote(the bot has nitro capabilities so it can use the emote anywhere)
        const sip = client.emojis.find(emoji => emoji.name === "woolooSip")
        receivedMessage.reply(`Hello there! ${sip}`)
    }
})
//al strings in the array are the file names of the wooloo images
var woolooArray = [
    "WoolooRoll.gif", "woolooSip.PNG", "WoolooSurprise.png", 
    "upsidedownWooloo.png", "shinyWooLoo.png", "hapWooloo.png", 
    "zekloo.png", "wooflower.png"
]
//send a wooloo image to the channel
function getWooloo(receivedMessage) {
    //select a random file name from the array of file names
    let i = Math.floor(Math.random() * woolooArray.length)
    //send an image attachment of the wooloo
    let wooloo = new Discord.Attachment("./WoolooImages/" + woolooArray[i])

    receivedMessage.channel.send(wooloo)
}
//all strings are file names
var snugArray = [
    "woohug.png", "woolooLay.png"
]
function hugWooloo(receivedMessage) {
    //select a random wooloo from the snug array
    let i = Math.floor(Math.random() * snugArray.length)
    let snugged = new Discord.Attachment("./snuglooImages/" + snugArray[i])
    //send attachment
    receivedMessage.channel.send(snugged)
}
//find which command is being used
function CMD(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(2) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command
    //send a code block containg the wooloo code to the channel
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
    //get :WoooshWoolooRoll: emote
    const roll =client.emojis.find(emoji => emoji.name === "WoooshWoolooRoll")
    //create a new embed
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
//login the bot using client secret(will call the client.on('ready'))
client.login(config.BOT_SECRET)