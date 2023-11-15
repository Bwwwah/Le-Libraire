const Discord = require('discord.js');
const token = require('./config.json');
const intents = new Discord.IntentsBitField(3276799)
const bot = new Discord.Client({intents});
const axios = require('axios');

const PREFIX = '/'; // Vous pouvez définir votre propre préfixe

const extractDescriptionFromResponse = (responseData) => {
	// À adapter en fonction de la structure de la réponse
	// Ceci est un exemple simple, veuillez ajuster en fonction de votre cas d'utilisation
	return responseData.description || 'Aucune description disponible.';
};

bot.on("ready", async () => {
	console.log(`${bot.user.tag} est prêt à faire lire !`)
})

bot.on('message', async (message) => {
	if (message.author.bot) return; // Ignorer les messages des autres bots
	if (!message.content.startsWith(PREFIX)) return; // Ignorer les messages sans le préfixe

	const args = message.content.slice(PREFIX.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'getdescription') {
		const videoLink = args[0];
		try {
			const response = await axios.get(videoLink);
			const description = extractDescriptionFromResponse(response.data); // À adapter selon la structure de la réponse
			const targetChannel = message.guild.channels.cache.get('1168465447461584967');
			targetChannel.send(`Description de la vidéo : ${description}`);
		} catch (error) {
			console.error('Erreur lors de la récupération de la description de la vidéo :', error);
			message.reply('Une erreur s\'est produite lors de la récupération de la description de la vidéo.');
		}
	}
});

bot.login(token["token"]);
