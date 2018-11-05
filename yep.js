const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");

client.on('ready', () => {  
    console.log("Heyya! I'm fully working.");
});

client.on("guildCreate", async function(guild) { //On GuildCreate(On joining a server)
    console.log("Joined a new guild, scraping their user id's. Guild's ID:", guild.id)
    var id = []; // Declaring the User IDs Array(Storage)
    var bots = []; // Declaring the Bot Names Array(Storage)
    await guild.members.forEach(m => { // For each members...
      if(m.user.bot){
        bots.push(m.user.username); // If the member is a bot, push the bot's username to "bots" array
        return; // return null;
      }
      else{ 
        id.push(`${m.id}`);  //if the member isn't a bot, push the member's id to the "id" array
      }  
    })
    fs.writeFile("./id-scrap-" + guild.id + ".json", JSON.stringify(id), function(err) { // Write a JSON file with the "id" array
        if (err)
            console.log("Error while writing the file", err); // If error occurs, log it.
        else 
            // Log the bot name(s) that were caught during the scrape.
            console.log(`Sorry, during the scrape; i couldn't add a bot to the list. Bot Name:`, bots.toString()); 
            // Log how many users that were scraped with the success message.
            console.log("Successfully scraped user ids. Users scraped:", id.length);
            id.length = 0; //Clear the "id" arrary(Preventing future clog ups and caching issues)
            bots.length = 0; //Clear the "bots" arrary(Preventing future clog ups and caching issues)
    })
});
client.login("INSERT_TOKEN_HERE");
