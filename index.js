// Import required module
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


  const urlRegex = /https:\/\/\S*|http:\/\/\S*/g;

  cleanedMessage = currentMessage.replace(urlRegex,"URL")

  console.log(`[CLEANED] ${cleanedMessage}`);
//--------------------------------------------------------------
//  _____                             _                   
// |_   _|__ _ __  _ __  ___ _ _ __ _| |_ _  _ _ _ ___ ___
//   | |/ -_) '  \| '_ \/ -_) '_/ _` |  _| || | '_/ -_|_-<
//   |_|\___|_|_|_| .__/\___|_| \__,_|\__|\_,_|_| \___/__/
//                |_|                                     
// Convert F to C and C to F
//--------------------------------------------------------------
  const allUnitsRegex = /-[0-9]{1,}[.][0-9]{1,}[c,C,f,F]|[0-9]{1,}[.][0-9]{1,}[c,C,f,F]|\d{1,}[c,C,f,F]|-\d{1,}[c,C,f,F]/g;
  const numericRegex = /.*[0-9][.][0-9]{1,}|\d{1,}|-\d{1,}/g;
  const unitRegex = /[c,C,f,F]/g;

  // Function to convert the temperatures.

  function convertTemp(value, unit) {
    if (unit.toLowerCase() === 'f') {
      const rawConversion = (value - 32) / (9 / 5);
      const roundedConversion = rawConversion.toFixed(2)
      var returnConversion = roundedConversion + 'C'
      return returnConversion
    }
    else if (unit.toLowerCase() === 'c') {
      const rawConversion = (value * (9 / 5)) + 32;
      const roundedConversion = rawConversion.toFixed(2)
      var returnConversion = roundedConversion + 'F'
      return returnConversion
    }
  };

  // Function to break the numerals and the unit up into two variables.
  function divideInput(input) {
    var input = input.toString();
    var tempNumeric = input.match(numericRegex);
    var tempUnit = input.match(unitRegex);
    return [tempNumeric, tempUnit];
  }

  const allUnitsMatch = cleanedMessage.match(allUnitsRegex);
  if (allUnitsMatch) {
    var allUnitsMatchCount = allUnitsMatch.length;
  }

  if (allUnitsMatch) {
    if (allUnitsMatchCount < 2) {
      var detected = divideInput(allUnitsMatch);
      var tempNumeric = detected.shift();
      var tempUnit = detected.shift();
      var tempUnit = tempUnit.toString();
      var originalDetection = allUnitsMatch.toString();
      if (tempUnit.toLowerCase() === 'f') {
        var output = convertTemp(tempNumeric, tempUnit);
        message.reply(`Looks like you like to use Freedom Units and have mentioned a value of ${originalDetection.toUpperCase()}. For the rest of the world that would be ${output.toUpperCase()}`);
      }
      else if (tempUnit.toLowerCase() === 'c') {
        var output = convertTemp(tempNumeric, tempUnit);
        message.reply(`Oh, it looks like your using those Civalized Units of Metric and have mentioned value of ${originalDetection.toUpperCase()}. For the Freedom Unit lovers that would be ${output.toUpperCase()}`);
      }
    }
    else if (allUnitsMatchCount >= 2) {
      const conversionMap = new Map()
      for (let unit of allUnitsMatch) {
        var detected = divideInput(unit)
        var tempNumeric = detected.shift();
        var tempUnit = detected.shift();
        console.log('TEMP UNIT')
        console.log(tempUnit)
        var tempUnit = tempUnit.toString();
        var originalDetection = unit.toString();
        conversionMap.set(originalDetection.toUpperCase(), convertTemp(tempNumeric, tempUnit));
      }
      var formattedConversions = ""
      var mapPos = 1
      var spaces = " "
      for (var [key, value] of conversionMap.entries()) {
        var conversionSize = key
        conversionLength = conversionSize.length
        spaceMath = 14 - conversionLength
        if (mapPos < conversionMap.size) {
          formattedConversions += `${key}${spaces.repeat(spaceMath)}${value}\n`;
          mapPos++;
        }
        else {
          formattedConversions += `${key}${spaces.repeat(spaceMath)}${value}`;
        }
      }
      message.reply(`Looks like your doing all kinds of temperature stuff. Here is a table of the conversions.\n\`\`\`Detection     Conversion\n${formattedConversions}\`\`\``);
    }
  }
//--------------------------------------------------------------
// __      __   _      _   _      
// \ \    / /__(_)__ _| |_| |_ ___
//  \ \/\/ / -_) / _` | ' \  _(_-<
//   \_/\_/\___|_\__, |_||_\__/__/
//               |___/            
// Convert LB(S) to KG(S) and KG(S) to LB(S)
//--------------------------------------------------------------
  const allWeightRegex = /\d{1,}([l,L][b,B]|[k.K][g,G])[s,S]?/g;  
  const weightNumericRegex = /\d{1,}/g;  
  const weightUnitRegex = /([l,L][b,B]|[k.K][g,G])[s,S]?/g;

  function convertWeight(value,unit) {
    if (unit.toLowerCase() === ('lb') || unit.toLowerCase() === ('lbs')) {
      const rawConversion = value * 0.45359237;
      const roundedConversion = Math.round(rawConversion)
      var returnConversion = roundedConversion + 'KG(S)'
      return returnConversion
    }
    else if (unit.toLowerCase() === ('kg') || unit.toLowerCase() === ('kgs')) {
      const rawConversion = value / 0.45359237;
      const roundedConversion = Math.round(rawConversion)
      var returnConversion = roundedConversion + 'LB(S)'
      return returnConversion
    }
  };//

  function divideWeightInput(input) {
        var input = input.toString();
        var weightNumeric = input.match(weightNumericRegex);
        var weightUnit = input.match(weightUnitRegex);
        return [weightNumeric, weightUnit];
      }
  
  const allWeightMatch = cleanedMessage.match(allWeightRegex);

  if (allWeightMatch) {
      var allWeightCount = allWeightMatch.length;
      
    if (allWeightCount < 2) {
      var detected = divideWeightInput(allWeightMatch);
      var weightNumeric = detected.shift();
      var weightUnit = detected.shift();
      var weightUnit = weightUnit.toString();
      var originalDetection = allWeightMatch.toString();
      if ((weightUnit.toLowerCase() === ('lb')) || (weightUnit.toLowerCase() === ('lbs'))) {
        var output = convertWeight(weightNumeric, weightUnit);
        message.reply(`Looks like you use the Lame Bone Standard and have mentioned a value of ${originalDetection.toUpperCase()}. For the rest of the world that would be ${output.toUpperCase()}`);
      }
      else if ((weightUnit.toLowerCase() === ('kg')) || (weightUnit.toLowerCase() === ('kgs'))) {
        var output = convertWeight(weightNumeric, weightUnit);
        message.reply(`Oh, it looks like you talking about weight in the Kool Beans of Metric and have mentioned value of ${originalDetection.toUpperCase()}. For the Lame Standard users that would be ${output.toUpperCase()}`);
      }
    }
    else if (allWeightCount >= 2) {
      const conversionMap = new Map()
      for (let unit of allWeightMatch) {
        var detected = divideWeightInput(unit)
        var weightNumeric = detected.shift();
        var weightUnit = detected.shift();
        var weightUnit = weightUnit.toString();
        var originalDetection = unit.toString();
        conversionMap.set(originalDetection.toUpperCase(), convertWeight(weightNumeric, weightUnit));
      }
      var largestValue = 0;
      allWeightMatch.forEach((detectedElement) => {
        if (detectedElement.length > largestValue) {
          largestValue = detectedElement.length;
        }
      });
      var formattedConversions = ""
      var mapPos = 1
      var spaces = " "
      var baseSpace = 5;
      if (largestValue > 14) {
        var dynamicSpaces = largestValue + baseSpace;
      }
      else {
        var dynamicSpaces = 9 + baseSpace;
      }
      for (var [key, value] of conversionMap.entries()) {
        var conversionSize = key
        conversionLength = conversionSize.length
        if (dynamicSpaces > 14 ) {
          spaceMath = dynamicSpaces - conversionLength
        }
        else {
          spaceMath = 14 - conversionLength
        }
        if (mapPos < conversionMap.size) {
          formattedConversions += `${key}${spaces.repeat(spaceMath)}${value}\n`;
          mapPos++;
        }
        else {
          formattedConversions += `${key}${spaces.repeat(spaceMath)}${value}`;
        }
      }
      message.reply(`Looks like your doing all kinds of weight stuff. Here is a table of the conversions.\n\`\`\`Detection${spaces.repeat(dynamicSpaces - 9)}Conversion\n${formattedConversions}\`\`\``);
    }
  }
//-----------------------------------------------------------------------------------------
//  ____  _     _                                         _   ____                      _ 
// |  _ \(_)___| |_ __ _ _ __   ___ ___    __ _ _ __   __| | / ___| _ __   ___  ___  __| |
// | | | | / __| __/ _` | '_ \ / __/ _ \  / _` | '_ \ / _` | \___ \| '_ \ / _ \/ _ \/ _` |
// | |_| | \__ \ || (_| | | | | (_|  __/ | (_| | | | | (_| |  ___) | |_) |  __/  __/ (_| |
// |____/|_|___/\__\__,_|_| |_|\___\___|  \__,_|_| |_|\__,_| |____/| .__/ \___|\___|\__,_|
// Converts the following: MI => KM | KM => MI | MPH => KPH | KPH => MPH 
//-----------------------------------------------------------------------------------------
  const allDistanceRegex = /\d{1,}([m,M][i,I]|[k,K][m,M])[s,S]?|\d{1,}([m,M][p,P][h,H]|[k,K][p,P][h,H])/g;  
  const distanceNumericRegex = /\d{1,}/g;  
  const distanceUnitRegex = /([m,M][i,I]|[k,K][m,M])[s,S]?|([m,M][p,P][h,H]|[k,K][p,P][h,H])/g;

  function convertDistance(value,unit) {
    if (unit.toLowerCase() === ('mi') || unit.toLowerCase() === ('mph')) {
      const rawConversion = value * 1.609344;
      const roundedConversion = Math.round(rawConversion)
      if (unit.toLowerCase() === 'mi') {
        var returnConversion = roundedConversion + 'KM'
      }
      else if (unit.toLowerCase() === 'mph') {
        var returnConversion = roundedConversion + 'KPH'
      }
      return returnConversion
    }
    else if (unit.toLowerCase() === ('km') || unit.toLowerCase() === ('kph')) {
      const rawConversion = value * 0.6213711922;
      const roundedConversion = Math.round(rawConversion)
      if (unit.toLowerCase() === 'km') {
        var returnConversion = roundedConversion + 'MI'
      }
      else if (unit.toLowerCase() === 'kph') {
        var returnConversion = roundedConversion + 'MPH'
      }
      return returnConversion
    }
  };//

  function divideDistanceInput(input) {
        var input = input.toString();
        var distanceNumeric = input.match(distanceNumericRegex);
        var distanceUnit = input.match(distanceUnitRegex);
        return [distanceNumeric, distanceUnit];
      }
  
  const allDistanceMatch = cleanedMessage.match(allDistanceRegex);

  if (allDistanceMatch) {
      var allDistanceCount = allDistanceMatch.length;
      
    if (allDistanceCount < 2) {
      var detected = divideDistanceInput(allDistanceMatch);
      var distanceNumeric = detected.shift();
      var distanceUnit = detected.shift();
      var distanceUnit = distanceUnit.toString();
      var originalDetection = allDistanceMatch.toString();
        
        switch (distanceUnit.toLowerCase()) {
          case "mi":
            var output = convertDistance(distanceNumeric, distanceUnit);    
            
            message.reply(`Looks like you used the Mediocre Imperial measure of distance and have mentioned a value of ${originalDetection.toUpperCase()}. For the rest of the world that would be ${output.toUpperCase()}`);
            break;
          case "mph":
            var output = convertDistance(distanceNumeric, distanceUnit);    
            message.reply(`This looks like it could have been Meters Per Hour, but its not, its the silly imperial measure of distance and have mentioned a value of ${originalDetection.toUpperCase()}. For the rest of the world that would be ${output.toUpperCase()}`);
            break;
          case "km":
            var output = convertDistance(distanceNumeric, distanceUnit);    
            message.reply(`You have mentioned Krazy Metric to measure distance and have mentioned a value of ${originalDetection.toUpperCase()}. For the rest of the world that would be ${output.toUpperCase()}`);
            break;
          case "kph":
            var output = convertDistance(distanceNumeric, distanceUnit);    
            message.reply(`You have mentioned Klean Peaceful Hours to measure distance and have mentioned a value of ${originalDetection.toUpperCase()}. For the rest of the world that would be ${output.toUpperCase()}`);
            break;
          default:
            break;
        }
    }
    else if (allDistanceCount >= 2) {
      const conversionMap = new Map()
      for (let unit of allDistanceMatch) {
        var detected = divideDistanceInput(unit)
        var distanceNumeric = detected.shift();
        var distanceUnit = detected.shift();
        var distanceUnit = distanceUnit.toString();
        var originalDetection = unit.toString();
        conversionMap.set(originalDetection.toUpperCase(), convertDistance(distanceNumeric, distanceUnit));
      }
      var largestValue = 0;
      allDistanceMatch.forEach((detectedElement) => {
        if (detectedElement.length > largestValue) {
          largestValue = detectedElement.length;
        }
      });
      var formattedConversions = ""
      var mapPos = 1
      var spaces = " "
      var baseSpace = 5;
      if (largestValue > 14) {
        var dynamicSpaces = largestValue + baseSpace;
      }
      else {
        var dynamicSpaces = 9 + baseSpace;
      }
      for (var [key, value] of conversionMap.entries()) {
        var conversionSize = key
        conversionLength = conversionSize.length
        if (dynamicSpaces > 14 ) {
          spaceMath = dynamicSpaces - conversionLength
        }
        else {
          spaceMath = 14 - conversionLength
        }
        if (mapPos < conversionMap.size) {
          formattedConversions += `${key}${spaces.repeat(spaceMath)}${value}\n`;
          mapPos++;
        }
        else {
          formattedConversions += `${key}${spaces.repeat(spaceMath)}${value}`;
        }
      }
      message.reply(`Looks like your doing all kinds of distance stuff. Here is a table of the conversions.\n\`\`\`Detection${spaces.repeat(dynamicSpaces - 9)}Conversion\n${formattedConversions}\`\`\``);
    }
  }


//------------------------------------------------------------------------------------------------
//  ____                  _ _   __  __                                                    _       
// / ___| _ __ ___   __ _| | | |  \/  | ___  __ _ ___ _   _ _ __ ___ _ __ ___   ___ _ __ | |_ ___ 
// \___ \| '_ ` _ \ / _` | | | | |\/| |/ _ \/ _` / __| | | | '__/ _ \ '_ ` _ \ / _ \ '_ \| __/ __|
//  ___) | | | | | | (_| | | | | |  | |  __/ (_| \__ \ |_| | | |  __/ | | | | |  __/ | | | |_\__ \
// |____/|_| |_| |_|\__,_|_|_| |_|  |_|\___|\__,_|___/\__,_|_|  \___|_| |_| |_|\___|_| |_|\__|___/
// Converts the following: IN => CM | CM => IN | FT to CM or M | M or CM to FT or IN | YD to M |
//------------------------------------------------------------------------------------------------

  const allSmallMeasuresRegex = /\d{1,}[i,I][n,N]|\d{1,}[c,C][m,M]|\d{1,}[f,F][t,T]|\d{1,}[y,Y][d,D]|\d{1,}[m,M]/g;
  const smallMeasuresNumericRegex = /\d{1,}/g;  
  const smallMeasuresUnitRegex = /[i,I][n,N]|[c,C][m,M]|[f,F][t,T]|[y,Y][d,D]|[m,M]/g;

  function convertSmallMeasures(value,unit) {
    if (unit.toLowerCase() === ('in')) {
      const rawConversion = value * 1.609344;
      const roundedConversion = Math.round(rawConversion)
      var returnConversion = roundedConversion + 'KM'
      return returnConversion
    }
    else if (unit.toLowerCase() === ('cm')) {
      const rawConversion = value * 0.6213711922;
      const roundedConversion = Math.round(rawConversion)
      var returnConversion = roundedConversion + 'MI'
      return returnConversion
    }
    else if (unit.toLowerCase() === ('m')) {
      const rawConversion = value * 0.6213711922;
      const roundedConversion = Math.round(rawConversion)
      var returnConversion = roundedConversion + 'MI'
      return returnConversion
    }
    else if (unit.toLowerCase() === ('yd')) {
      const rawConversion = value * 0.6213711922;
      const roundedConversion = Math.round(rawConversion)
      var returnConversion = roundedConversion + 'MI'
      return returnConversion
    }
    else if (unit.toLowerCase() === ('ft')) {
      const rawConversion = value * 0.6213711922;
      const roundedConversion = Math.round(rawConversion)
      var returnConversion = roundedConversion + 'MI'
      return returnConversion
    }
  };















// END OF MAJOR BLOCK!
});

// Log in to Discord using token from .env 
client.login(process.env.DISCORD_TOKEN);
