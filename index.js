const discord = require('discord.js')
const token = require('./config.json')
const intents = new discord.IntentsBitField(3276799)
const bot = new discord.Client({intents})
const ytld = require('ytdl-core')

bot.login(token["token"]);

bot.on("ready", async () => {
	console.log(`${bot.user.tag} est là et la boutique est ouverte !`)
})

function getUrl(message) {
	return message.embeds[0]?.url;
}

async function getDescription(url) {
	try {
		return (await ytld.getBasicInfo(url))?.videoDetails?.description;
	} catch (error) {
		console.error("Pas de description")
		return ""
	}
}

function extractData(description) {
	try {
		const regex = /👉 [^\n]+amzn\.to[^\n]+/g;
		return description.match(regex);
	} catch (error) {
		console.error("No data")
		return ""
	}
}

function createEmbed(data) {
	return new discord.EmbedBuilder()
		.setColor("#c2a30a")
		.setTitle("Une nouvelle vidéographie de votre éditeur préféré est sortie !\
		\nVoici nos liens collaboratifs et nos livres :")
		.setDescription(`👉 La librairie indépendante Agathos (code promotionnel : LEHUSSARD) : https://www.agathos-livres.fr/\
		\n👉 Pour de la lourde littérature visitez la maison d\'édition de votre Hussard préféré : https://www.lagiberne.fr/\
		\n${data ? data.join('\n'): ""}`)
}

bot.on('messageCreate', async message => {
	if (message.channel.id == 988839507287744572 && message.author.id == 282286160494067712) {
		const url = await getUrl(message);
		const description = await getDescription(url)
		const data = extractData(description)
		const embed = createEmbed(data);
		const channel = await bot.guilds.fetch(1044168120971038790)
		await channel.send({embeds: [embed]})
	}

	// TEST
	/*if (message.channel.id == 967893626371833916 && message.author.id == 359784239488696322) {
		await message.delete();
		const messages = await message.channel.messages.fetch({limit: 1});
		const url = await getUrl(messages.first());
		const description = await getDescription(url)
		const data = extractData(description)
		const embed = createEmbed(data);
		await message.channel.send({embeds: [embed]})
	}*/

});