// ## TODO ## import character data from armory
function getArmoryData(name, realm) {
    //validate realm <- Check out regular expressions for this
    //validate name
    let blizz_api_url = "https://eu.api.battle.net";
    let api_key = 'fhmzgc7qd2ypwdg87t2j8nuv6pxcbftb'; // risky to have it here ? :p

    //  let data = $.getJSON(blizz_api_url + '/wow/character/' + realm + '/' + name + '?fields=stats&locale=en_GB&apikey=' + api_key);
}


export function getKeyBindings() {
    return keybindings;
}

/* Future goal:  grab spelldata from simcraft files.  */
export function getSpellData(spell) {
    return spelldata[spell];
}

export function getClassColor(classId) {
    let classColors = [0xC79C6E, 0xF58CBA, 0xABD473, 0xFFF569, 0xFFFFFF, 0xC41F3B, 0x0070DE, 0x69CCF0, 0x9482C9, 0x00FF96, 0xFF7D0A];
    return classColors[classId] || classColors[1];
}

export function generatePlayerName() {
    let nameList = "Eowiragan,Ferraseth,Umeilith,Wice,Brierid,Fedriric,Higod,Gweann,Thigovudd,Fraliwyr,Zardorin,Halrik,Qae,Gwoif,Zoican,Tjolme,Dalibwyn,Miram,Medon,Aseannor,Angleus,Seita,Sejta,Fraggoji,Verdisha,Oixte,Lazeil,Jhazrun,Kahva,Ussos,Usso,Neverknow,Sco,Treckie,Slootbag,Unpl,Smirk,Lappe,Fraggoboss,Devai,Luumu,Alzu,Altzu";
    let nameArray = nameList.split(",");
    let random_index = game.rnd.between(0, nameArray.length - 1);
    return nameArray[random_index];
}

// Needed for some spells. ## Todo: fix this function since its been moved from player


let keybindings = { // keybinding         // spellbidning
    ACTION_BUTTON_1: {
        key: '1',
        spell: 'flash_of_light'
    },
    ACTION_BUTTON_2: {
        key: '2',
        spell: 'power_word_shield'
    },
    ACTION_BUTTON_3: {
        key: '3',
        spell: 'clarity_of_will'
    },
    ACTION_BUTTON_4: {
        key: '4',
        spell: 'power_infusion'
    }
};

let spelldata = {

    flash_of_light: {
        casttime: 1500,
        resource_cost: 6700,
        resource_type: "mana",
        cooldown: 0,
        name: 'Flash Of Light',
        id: "flash_of_light"
    },

    power_infusion: {
        casttime: 0,
        resource_cost: 5000,
        resource_type: "mana",
        cooldown: 30000,
        name: 'Power Infusion',
        id: "power_infusion"

    },

    healing_surge: {
        casttime: 1500,
        resource_cost: 10000,
        resource_type: "mana",
        cooldown: 0,
        name: 'Flash Of Light',
        id: 3

    },

    chain_heal: {
        casttime: 1620,
        resource_cost: 10,
        resource_type: "mana",
        cooldown: 0,
        name: 'Chain Heal',
        id: 4


    },

    power_word_shield: {
        casttime: 0,
        resource_cost: 4400,
        resource_type: "mana",
        cooldown: 6000,
        name: 'Power Word Shield',
        id: "power_word_shield"
    },

    clarity_of_will: {
        casttime: 2500,
        resource_cost: 3300,
        resource_type: "mana",
        cooldown: 0,
        name: 'Clarity Of Will',
        id: "clarity_of_will"
    }


};
