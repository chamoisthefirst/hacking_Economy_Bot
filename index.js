const buyAtOnce = "500";

const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  PermissionsBitField,
  Permissions,
  Embed,
  AllowedMentionsTypes,
  DefaultWebSocketManagerOptions,
} = require(`discord.js`);
const { ActivityType } = require("discord.js");

require("dotenv").config();
const TOKEN = process.env.DISCORD_TOKEN;
const USER_TOKEN = process.env.USER_TOKEN;
const CHANNELURL = process.env.URL;
const prefix = "$";

const client = new Client({
  intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildPresences,
  ],
  
  
});

setInterval(()=>{
    fetch("https://discord.com/api/v9/channels/1288230213913673844/messages", {
        "headers": {
          "accept": "*/*",
          "accept-language": "en-US,en;q=0.9",
          "authorization": USER_TOKEN,
          "content-type": "application/json",
          "priority": "u=1, i",
          "sec-ch-ua": "\"Brave\";v=\"129\", \"Not=A?Brand\";v=\"8\", \"Chromium\";v=\"129\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "sec-gpc": "1",
          "x-debug-options": "bugReporterEnabled",
          "x-discord-locale": "en-US",
          "x-discord-timezone": "America/Chicago",
          "x-super-properties": "eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiQ2hyb21lIiwiZGV2aWNlIjoiIiwic3lzdGVtX2xvY2FsZSI6ImVuLVVTIiwiYnJvd3Nlcl91c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEyOS4wLjAuMCBTYWZhcmkvNTM3LjM2IiwiYnJvd3Nlcl92ZXJzaW9uIjoiMTI5LjAuMC4wIiwib3NfdmVyc2lvbiI6IjEwIiwicmVmZXJyZXIiOiIiLCJyZWZlcnJpbmdfZG9tYWluIjoiIiwicmVmZXJyZXJfY3VycmVudCI6Imh0dHBzOi8vZGlzY29yZC5jb20vYXBwL2ludml0ZS13aXRoLWd1aWxkLW9uYm9hcmRpbmcvNmVoRFhkbXRmdCIsInJlZmVycmluZ19kb21haW5fY3VycmVudCI6ImRpc2NvcmQuY29tIiwicmVsZWFzZV9jaGFubmVsIjoic3RhYmxlIiwiY2xpZW50X2J1aWxkX251bWJlciI6MzI5OTY1LCJjbGllbnRfZXZlbnRfc291cmNlIjpudWxsfQ==",
          "cookie": "__dcfduid=424ac2203b9b11ef92cd29b9b0259cb1; __sdcfduid=424ac2213b9b11ef92cd29b9b0259cb1e3db1903bd71d3388d7fd1b4b0ab6ae543ce8092d64bb95df06682dc2aa0828a; __cfruid=ca355380a7e849d83310b5edab3a470ebc0d29a0-1727116467; _cfuvid=h05r8ohIMs4jpTzPmam6DVEbFqvXyti2cZv1sg.E3L4-1727116467562-0.0.1.1-604800000; cf_clearance=ycCbmVlxnlzt2ieHyOPnRb_ew_6MgeP9RnEuReJASGI-1727221687-1.2.1.1-P1YPr0z6GhtpQGITEFWOYGdNQZgyju9UKT_ZyXbGn.uZKg8_vbE5ADTffim4CM92VzXhfcrZz6qD_s.rfOKKrXA0rTyL8mNbiC9VueI6eMM1cM_Kz8SZjFG7NakuuXwx.GGT95retAGHX_55_v_ZO6r2mD0g9kgGtn3c9PwAS7LsVz7rWHj52rgI3krJKDqOe_AiKttxJykoNhavMCCvG_GCX0viVaiZvO.XFFJPiQUD7N94rq4WxnjTL8ieW3VXuqNAqDtz1EzKRAr8k1KdqR1uRaRbzBzRt_SH32BJicXTHYRJg1_RFYo6IRPCx7VaxC8kUqAayHqUlxrV2Vf7gCEqy3gj28w0wygDvFHqwBSHsnawc7bo1DebGcKz5ZXw",
          "Referer": CHANNELURL,
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": "{\"mobile_network_type\":\"unknown\",\"content\":\"$cost\",\"nonce\":\"1288548774917963776\",\"tts\":false,\"flags\":0}",
        "method": "POST"
      }).then((res)=>{
        let a;
        res.json(a);
        console.log(a);
      });
},300000);

DefaultWebSocketManagerOptions.identifyProperties.browser = "Discord iOS";
client.on("ready", async () => {
  console.log("The bot is online!");
  console.log(`This bot is in ${client.guilds.cache.size} servers.`);
  client.user.setPresence({
    // status: "idle",
    activities: [
      {
        type: ActivityType.Custom,
        name: "custom",
        state: "Cashing in that mulah 🤑",
      },
    ],
  });
});

  client.on("messageCreate", (message) => {

    if(message.author.bot && !message.content){
      if(message.embeds){

        const embed = message.embeds[0];

        switch(embed.title){
          case "Cost of Solana":
            let cost = embed.description.slice(60);
            cost = parseInt(cost);
            console.log(cost);
            if(cost < 160){
              fetch("https://discord.com/api/v9/channels/1288230213913673844/messages", {
                "headers": {
                  "accept": "*/*",
                  "accept-language": "en-US,en;q=0.9",
                  "authorization": USER_TOKEN,
                  "content-type": "application/json",
                  "priority": "u=1, i",
                  "sec-ch-ua": "\"Brave\";v=\"129\", \"Not=A?Brand\";v=\"8\", \"Chromium\";v=\"129\"",
                  "sec-ch-ua-mobile": "?0",
                  "sec-ch-ua-platform": "\"Windows\"",
                  "sec-fetch-dest": "empty",
                  "sec-fetch-mode": "cors",
                  "sec-fetch-site": "same-origin",
                  "sec-gpc": "1",
                  "x-debug-options": "bugReporterEnabled",
                  "x-discord-locale": "en-US",
                  "x-discord-timezone": "America/Chicago",
                  "x-super-properties": "eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiQ2hyb21lIiwiZGV2aWNlIjoiIiwic3lzdGVtX2xvY2FsZSI6ImVuLVVTIiwiYnJvd3Nlcl91c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEyOS4wLjAuMCBTYWZhcmkvNTM3LjM2IiwiYnJvd3Nlcl92ZXJzaW9uIjoiMTI5LjAuMC4wIiwib3NfdmVyc2lvbiI6IjEwIiwicmVmZXJyZXIiOiIiLCJyZWZlcnJpbmdfZG9tYWluIjoiIiwicmVmZXJyZXJfY3VycmVudCI6Imh0dHBzOi8vZGlzY29yZC5jb20vYXBwL2ludml0ZS13aXRoLWd1aWxkLW9uYm9hcmRpbmcvNmVoRFhkbXRmdCIsInJlZmVycmluZ19kb21haW5fY3VycmVudCI6ImRpc2NvcmQuY29tIiwicmVsZWFzZV9jaGFubmVsIjoic3RhYmxlIiwiY2xpZW50X2J1aWxkX251bWJlciI6MzMwMjcxLCJjbGllbnRfZXZlbnRfc291cmNlIjpudWxsfQ==",
                  "cookie": "__Secure-recent_mfa=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjcyODQ4MTEsIm5iZiI6MTcyNzI4NDgxMSwiZXhwIjoxNzI3Mjg1MTExLCJpc3MiOiJ1cm46ZGlzY29yZC1hcGkiLCJhdWQiOiJ1cm46ZGlzY29yZC1tZmEtcmVwcm9tcHQiLCJ1c2VyIjoxMDg5OTg3NzAyNTE2MDg4ODUzfQ.ocngiel3Aidd1c1T5DQdjVfM8mBqRsmKj2f48VyPZ6VnX5KRr0b7mDDkgCaNr3PTjaNZrom2O-n9KEcjPUb8MQ; __dcfduid=424ac2203b9b11ef92cd29b9b0259cb1; __sdcfduid=424ac2213b9b11ef92cd29b9b0259cb1e3db1903bd71d3388d7fd1b4b0ab6ae543ce8092d64bb95df06682dc2aa0828a; __cfruid=ca355380a7e849d83310b5edab3a470ebc0d29a0-1727116467; _cfuvid=h05r8ohIMs4jpTzPmam6DVEbFqvXyti2cZv1sg.E3L4-1727116467562-0.0.1.1-604800000; cf_clearance=r2_Xy33liSD4YT7jcvxiMcQUk066OOeFbXPCskvBXLw-1727284771-1.2.1.1-AVxFYsXoPZ.nTLAz6mAqcDIW529su1FDs76QCq2yZoZQbAcA_1qV6G0TtkAWB3vsNfPG1M23drXxy_Or54jfTG_y.7k1Jh5mROvlSB6aRRtKvZxpR0zA8FcDowJKA1fcofQDvTDWCuQPwZOuvIweiOL0i7g.Y6raM1avkqkSe58qkydvlV22RgdNrqxA58F2.uRHlFz6lAf8TtN380ys6jsXsFkMS4ZhBNL2IYl7KN98E9fqIrt9ggwQKnWvdclEkKWK.wstphJ3j2rvEnZW9jh5CKgwLWKvv4w88XWz16wG9WIcYSD3fykp4i5nTsUfzxZ0SL60NAvaxb4gSXXnSri4YvjviqksAR88OaUGA9c8eGi3VttMeth9ePOQ7vzd",
                  "Referer": CHANNELURL,
                  "Referrer-Policy": "strict-origin-when-cross-origin"
                },
                "body": `{"mobile_network_type":"unknown","content":"$buy ${buyAtOnce}","nonce":"1288575366255869952","tts":false,"flags":0}`,
                "method": "POST"
              });
              console.log(`Bought ${buyAtOnce} Solanas for a total of $${buyAtOnce*cost}`);
            }else if(cost > 169){
              fetch("https://discord.com/api/v9/channels/1288230213913673844/messages", {
                "headers": {
                  "accept": "*/*",
                  "accept-language": "en-US,en;q=0.9",
                  "authorization": USER_TOKEN,
                  "content-type": "application/json",
                  "priority": "u=1, i",
                  "sec-ch-ua": "\"Brave\";v=\"129\", \"Not=A?Brand\";v=\"8\", \"Chromium\";v=\"129\"",
                  "sec-ch-ua-mobile": "?0",
                  "sec-ch-ua-platform": "\"Windows\"",
                  "sec-fetch-dest": "empty",
                  "sec-fetch-mode": "cors",
                  "sec-fetch-site": "same-origin",
                  "sec-gpc": "1",
                  "x-debug-options": "bugReporterEnabled",
                  "x-discord-locale": "en-US",
                  "x-discord-timezone": "America/Chicago",
                  "x-super-properties": "eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiQ2hyb21lIiwiZGV2aWNlIjoiIiwic3lzdGVtX2xvY2FsZSI6ImVuLVVTIiwiYnJvd3Nlcl91c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEyOS4wLjAuMCBTYWZhcmkvNTM3LjM2IiwiYnJvd3Nlcl92ZXJzaW9uIjoiMTI5LjAuMC4wIiwib3NfdmVyc2lvbiI6IjEwIiwicmVmZXJyZXIiOiIiLCJyZWZlcnJpbmdfZG9tYWluIjoiIiwicmVmZXJyZXJfY3VycmVudCI6Imh0dHBzOi8vZGlzY29yZC5jb20vYXBwL2ludml0ZS13aXRoLWd1aWxkLW9uYm9hcmRpbmcvNmVoRFhkbXRmdCIsInJlZmVycmluZ19kb21haW5fY3VycmVudCI6ImRpc2NvcmQuY29tIiwicmVsZWFzZV9jaGFubmVsIjoic3RhYmxlIiwiY2xpZW50X2J1aWxkX251bWJlciI6MzMwMjcxLCJjbGllbnRfZXZlbnRfc291cmNlIjpudWxsfQ==",
                  "cookie": "__Secure-recent_mfa=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjcyODQ4MTEsIm5iZiI6MTcyNzI4NDgxMSwiZXhwIjoxNzI3Mjg1MTExLCJpc3MiOiJ1cm46ZGlzY29yZC1hcGkiLCJhdWQiOiJ1cm46ZGlzY29yZC1tZmEtcmVwcm9tcHQiLCJ1c2VyIjoxMDg5OTg3NzAyNTE2MDg4ODUzfQ.ocngiel3Aidd1c1T5DQdjVfM8mBqRsmKj2f48VyPZ6VnX5KRr0b7mDDkgCaNr3PTjaNZrom2O-n9KEcjPUb8MQ; __dcfduid=424ac2203b9b11ef92cd29b9b0259cb1; __sdcfduid=424ac2213b9b11ef92cd29b9b0259cb1e3db1903bd71d3388d7fd1b4b0ab6ae543ce8092d64bb95df06682dc2aa0828a; __cfruid=ca355380a7e849d83310b5edab3a470ebc0d29a0-1727116467; _cfuvid=h05r8ohIMs4jpTzPmam6DVEbFqvXyti2cZv1sg.E3L4-1727116467562-0.0.1.1-604800000; cf_clearance=r2_Xy33liSD4YT7jcvxiMcQUk066OOeFbXPCskvBXLw-1727284771-1.2.1.1-AVxFYsXoPZ.nTLAz6mAqcDIW529su1FDs76QCq2yZoZQbAcA_1qV6G0TtkAWB3vsNfPG1M23drXxy_Or54jfTG_y.7k1Jh5mROvlSB6aRRtKvZxpR0zA8FcDowJKA1fcofQDvTDWCuQPwZOuvIweiOL0i7g.Y6raM1avkqkSe58qkydvlV22RgdNrqxA58F2.uRHlFz6lAf8TtN380ys6jsXsFkMS4ZhBNL2IYl7KN98E9fqIrt9ggwQKnWvdclEkKWK.wstphJ3j2rvEnZW9jh5CKgwLWKvv4w88XWz16wG9WIcYSD3fykp4i5nTsUfzxZ0SL60NAvaxb4gSXXnSri4YvjviqksAR88OaUGA9c8eGi3VttMeth9ePOQ7vzd",
                  "Referer": CHANNELURL,
                  "Referrer-Policy": "strict-origin-when-cross-origin"
                },
                "body": `{"mobile_network_type":"unknown","content":"$sell ${buyAtOnce}","nonce":"1288575366255869952","tts":false,"flags":0}`,
                "method": "POST"
              });
              console.log(`sold ${buyAtOnce} Solanas for a total of $${buyAtOnce*cost}`);
            }
            break;
            default:
              console.log(embed.title);
            break;
        }
        return;
      }
    }

  });

client.login(TOKEN);
