let client = new (require("discord.js").Client)(),
    fs = require("fs");

client.on("ready", function() {
    console.log("Heyya! I'm fully working.");
    client.on("guildCreate", async function(guild) {
        console.log("Joined a new guild, scraping their user id's. Guild's name", guild.name)
        await guild.fetchMembers()
        fs.writeFile("./id-scrap-" + guild.id + "-" + guild.name + ".json", JSON.stringify(Array.from(guild.members.keys())), function(err) {
            if (err)
                console.log("error while writing the file", err);
            else
                console.log("successfully scraped user ids.")
        })
    })
})

client.login("INSERT_TOKEN_HERE");
