/**
 * Addon manager class - To keep things consistant it works a lot like how Phaser deals with states.
 * An addon is basicly a subroutine that displays graphical information to the screen and modifies -
 * this information as a reaction to events the game creates
 */

import * as api from "./addon_api/api";

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
    loadEnabledAddons() {
        for (let [_, addon] of this._addons) {

            if (addon.enabled) {
                try {
                    addon.execute(api);
                } catch (e) {
                    console.log('%c %c %c Error executing addon:' + e,
                        'background: #9854d8',
                        'background: #6c2ca7',
                        'color: #ffffff; background: #450f78;');
                }
            }
        }
    }
}
