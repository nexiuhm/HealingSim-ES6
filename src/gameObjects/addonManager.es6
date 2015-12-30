/**
 * Addon manager class - To keep things consistant it works a lot like how Phaser deals with states.
 * An addon is basicly a subroutine that displays graphical information to the screen and modifies -
 * this information as a reaction to events the game creates
 */

import * as api from "./addon_api/api";
import {printPrettyError} from "../util";
export default class AddonManager {
    constructor() {
        this._addons = new Map();
    }

    add(addonKey, addonCode) {
        this._addons.set(addonKey, {
            name: addonKey,
            enabled: true,
            execute: addonCode
        });
    }

    disableAddon(addonKey) {
        if (!this._addons.has(addonKey))
            return;
        else
            this._addons[addonKey].enabled = false;
    }
    enableAddon(addonKey) {
        if (!this._addons.has(addonKey))
            return;
        else
            this._addons[addonKey].enabled = true;
    }

    getListOfAddons() {
        var addonList = [];
        for (var addon of this._addons) {
            addonList.push([addon.name, addon.enabled]);
        }
        return addonList;
    }

    /* Loads addons to the current context/state*/
    loadEnabledAddons(state) {

       let apiFunctions = api.init(state);
        for (let [_, addon] of this._addons) {
            if (addon.enabled) {
                try {
                    addon.execute(apiFunctions);
                } catch (error) {
                    printPrettyError("Executing addon failed: " + addon.name,error);
                }
            }
        }
    }
}
