// Import required modules 
const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

// Create a new Discord client with message intent 
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent]
});

// Bot is ready 
client.once('clientready', () => {
  console.log(`🤖 Logged in as ${client.user.tag}`);
});



// Listen and respond to messages 
client.on('messageCreate', message => {

  // Ignore messages from bots 
  if (message.author.bot) return;

  // Respond to a specific message 
  if (message.content.toLowerCase() === '!list') {
    message.reply('What does this look like? The early 00s?');
  }

  if (message.content.toLowerCase() === '!ping') {
    message.reply('Your offline.');
  }

  if (message.content.toLowerCase() === '@find') {
    message.reply('@find a foot up your ass.');
  }

  // Detect, convert, and message the chat with the temperature conversion.
  const currentMessage = message.content;

  console.log(currentMessage);

  //const freedomUnitsRegex = /\d{1,3}[f,F]/g;
  //const civializedUnitsRegex = /\d{1,3}[c,C]/g;

  const allUnitsRegex = /\d{1,4}[c,C,f,F]/g;
  const numericRegex = /\d{1,4}/g;
  const unitRegex = /[c,C,f,F]/g;

  // Function to convert the temperatures.

  function convertTemp(value, unit) {
    if (unit.toLowerCase() === 'f') {
      console.log('Value ${value} Unit ${unit}')
      const rawConversion = (value - 32) / (9 / 5);
      const roundedConversion = Math.round(rawConversion)
      var returnConversion = roundedConversion + 'C.'
      return returnConversion
    }
    else if (unit.toLowerCase() === 'c') {
      const rawConversion = (value * (9 / 5)) + 32;
      const roundedConversion = Math.round(rawConversion)
      var returnConversion = roundedConversion + 'F.'
      return returnConversion
    }
  };

  // Function to break the numerals and the unit up into two variables.
  function divideInput(input) {
    var input = input.toString
    var tempNumeric = input.match(numericRegex)
    var tempUnit = input.match(unitRegex)
    return [tempNumeric,tempUnit]; 
  }

  console.log(allUnitsRegex);
  console.log('Starting matches')
  const allUnitsMatch = currentMessage.match(allUnitsRegex);
  console.log('All Match')
  console.log(allUnitsMatch);

  //  const tempNumeric = allUnitsMatch[0].match(numericRegex);
  //  const tempUnit = allUnitsMatch[0].match(unitRegex);

  console.log('Length of all units match');
  if (allUnitsMatch) {
    const matchPresent = true
    var allUnitsMatchCount = allUnitsMatch.length;
    console.log(allUnitsMatchCount);

    console.log('Regex for getting temp and unit.');
    //var tempNumeric = allUnitsMatch[0].match(numericRegex);
    //var tempUnit = allUnitsMatch[0].match(unitRegex);
    //var tempUnit = tempUnit.toString();
    //var tempUnit = tempUnit.toLowerCase();
    //console.log(tempNumeric);
    //console.log(tempUnit);

  }
if (matchPresent === true) {
  if (allUnitsMatchCount < 2) {
    console.log('Just one entry');
    var detected = divideInput(allUnitsMatch);
      if (detected[1] === 'f') {
        var output = convertTemp(detected[0], detected[1]);
        message.reply('Looks like you like to use Freedom Units and have mentioned a value of ' + allUnitsMatch + '. For the rest of the world that would be ' + output);
      }
      else if (detected[1] === 'c') {
        var output = convertTemp(tempNumeric, tempUnit);
        message.reply('Oh, it looks like your using those Civalized Units of Metric and have mentioned value of ' + allUnitsMatch + '. For the Freedom Unit lovers that would be ' + output);
      }
  }
  else if (allUnitsMatchCount >= 2) {
    console.log('You must be talking about your local weather. Here is all the conversions.');
    const conversionMap = new Map()
    for (let unit of allUnitsMatch) {
      console.log('IN FOR LOOP')
      console.log(numericRegex);
      console.log('TEMP UNIT');
      console.log(tempUnit);
      conversionMap.set(unit,convertTemp(tempUnit,tempNumeric));
    }
    console.log(conversionMap);
    console.log(currentMatchCount);
    message.reply('**More than one entry**');
    console.log('The current count of matches is ' + allUnitsMatchCount);
  }
}
  if (allUnitsMatch) {
    console.log('All units is not null');
    console.log(allUnitsMatch.length);
  }

});

// Log in to Discord using token from .env 
client.login(process.env.DISCORD_TOKEN);
