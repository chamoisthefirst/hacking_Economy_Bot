const buyAtOnce = "500";
let botOwner = {
  "id":"1089987702516088853"
}
let perms = {
  dm:["1089987702516088853","592825756095348748"],
  admin:["1089987702516088853","592825756095348748"],
  owner:"1089987702516088853"
}

const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  PermissionsBitField,
  Permissions,
  Embed,
  AllowedMentionsTypes,
  DirectMessages,
  DefaultWebSocketManagerOptions,
} = require(`discord.js`);
const { ActivityType } = require("discord.js");

require("dotenv").config();
const TOKEN = process.env.DISCORD_TOKEN;
const USER_TOKEN = process.env.USER_TOKEN;
const ALT_USER_TOKEN = process.env.ALLT_USER_TOKEN;
const CHANNELURL = process.env.URL;
const prefix = "$";

const client = new Client({
  intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildPresences,
  GatewayIntentBits.DirectMessages,
  GatewayIntentBits.DirectMessageTyping,
  GatewayIntentBits.DirectMessageReactions
  ],
  
  
});

let xSuperProperties = '{"os":"iOS","browser":"Chrome","device":"","system_locale":"en-US","browser_user_agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36","browser_version":"129.0.0.0","os_version":"10","referrer":"","referring_domain":"","referrer_current":"https://discord.com/app/invite-with-guild-onboarding/6ehDXdmtft","referring_domain_current":"discord.com","release_channel":"stable","client_build_number":329965,"client_event_source":null}';
async function sendAsUser(authorization,message){
  let r;
  fetch("https://discord.com/api/v9/channels/1288230213913673844/messages", {
    "headers": {
      "accept": "*/*",
      "accept-language": "en-US,en;q=0.9",
      "authorization": authorization,
      "content-type": "application/json",
      "x-discord-locale": "en-US",
      "x-discord-timezone": "America/Chicago",
      "x-super-properties": btoa(xSuperProperties),
      "Referer": CHANNELURL,
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": `{"mobile_network_type":"unknown","content":"${message}","nonce":"1288548774917963776","tts":false,"flags":0}`,
    "method": "POST"
  }).then((res)=>{
    r = res;
  }).catch((err)=>{
    console.log(err)
  });
  return r;
}

async function DM(userID,message){
  let u;
  client.users.fetch(userID).then((user)=>{
    u = user;
    user.send(message);
  }).catch((err)=>{
    console.log(err);
  });
  return u;
}


DefaultWebSocketManagerOptions.identifyProperties.browser = "Discord iOS";
client.on("ready", async () => {
  console.log("The bot is online!");
  console.log(`This bot is in ${client.guilds.cache.size} servers.`);

  client.users.fetch(botOwner.id).then((user)=>{
    botOwner = user;
  })
  client.user.setPresence({
    // status: "idle",
    activities: [
      {
        type: ActivityType.Custom,
        name: "custom",
        state: " ",
      },
    ],
  });
});

let data = {

}

  client.on("messageCreate", (message) => {

    if(message.author.bot && !message.content){
      if(message.embeds){

        const embed = message.embeds[0];

        switch(embed.title){
          case "Cost of Solana":
            let cost = embed.description.slice(60);
            cost = parseInt(cost);

            if(!data[`${message.author.id}`]){
              data[`${message.author.id}`] = {
                "next":null,
                "cash":null,
                "bank":null,
                "total":null,
                "solanas":null
              }
            }else{
              if(data[`${message.author.id}`].cash){
                let id = `${message.author.id}`;
                message.channel.send(`You can buy ${Math.floor(data[id].cash/cost)} Solanas and have ${data[id].solanas} Solanas to sell.`);
              }
            }

            /*
            console.log(cost);
            if(cost < 161){
              sendAsUser(USER_TOKEN,`$buy ${buyAtOnce}`);
              console.log(`Bought ${buyAtOnce} Solanas for a total of $${buyAtOnce*cost}`);
            }else if(cost > 160){
              sendAsUser(USER_TOKEN,`$sell ${buyAtOnce}`);
              console.log(`sold ${buyAtOnce} Solanas for a total of $${buyAtOnce*cost}`);
            }
              */
            break;
            case "Balance":
              let cash = embed.fields[1].value.slice(32,embed.fields[1].value.length-2);
              let bank = embed.fields[0].value.slice(32,embed.fields[0].value.length-2);
              let solanas = embed.fields[3].value.slice(32,embed.fields[3].value.length-2);
              let total = cash+bank;
              console.log(cash);
              if(!data[`${message.author.id}`]){
                data[`${message.author.id}`]={
                  "next":null,
                  "cash":cash,
                  "bank":bank,
                  "total":total,
                  "solanas":solanas
                }
              }else{
                data[`${message.author.id}`].next = null;
                data[`${message.author.id}`].cash = cash;
                data[`${message.author.id}`].bank = bank;
                data[`${message.author.id}`].total = total;
                data[`${message.author.id}`].solanas = solanas
              }
            break;
            default:
              console.log(embed.title);
            break;
        }
        return;
      }
    }

    if(!message.content.startsWith(prefix) || message.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    const messageArray = message.content.split(" ");
    const argument = messageArray.slice(1);
    const cmd = messageArray[0];


    if(command === "ping"){
      message.channel.send("pong!");
    }

    if(perms[`${command}`]){
      if(!perms[`${command}`].includes(message.author.id)){
        DM(message.author.id,`Sorry, you do not have permission to use ${prefix}${command}`);
        return;
      }
      if(command === "dm"){
        let id = args[0]
        if(id.startsWith("<@")){
          id = id.slice(2,id.length-1);
        }
        let msg = args.slice(1).join(" ");
        
        DM(id,`${msg}\n\n-# sent by ${message.author.username}(#${message.author.id})\n-# if spam report to ${botOwner.username}(#${botOwner.id})`);
      }

      if(command === "admin"){

        if(args[0] === "members"){
          let admins = [];
          for(var i = 0; i < perms.admin.length; i++){
            client.users.fetch(perms.admin[i]).then((user)=>{
              admins.push(`${user.username}(${user.id})`);
            })
          }
          console.log(admins);
          client.users.fetch(message.author.id).then((user)=>{
            user.send(`My admins are as follows:\n${admins.join(",\n")}`)
          });
        }
      }



    }
    
    
    

  });

client.login(TOKEN);
