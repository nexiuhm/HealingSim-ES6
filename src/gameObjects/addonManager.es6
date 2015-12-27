/**
 * Addon manager class - To keep things consistant it works a lot like how Phaser deals with states.
 * An addon is basicly a subroutine that displays graphical information to the screen and modifies -
 * this information as a reaction to events the game creates
 */

export default class AddonManager {
    constructor(){
        this._addons = {};
    }

    add(addonKey, addonCode) {
        this._addons[addonKey] = { name: addonKey, enabled: true, code: addonCode };
    }

    disableAddon(addonKey) {
        if (!this._addons[addonKey])
            return;
        else
            this._addons[addonKey].enabled = false;
    }
    enableAddon(addonKey) {
        if (!this._addons[addonKey])
            return;
        else
            this._addons[addonKey].enabled = true;
    }


    getListOfAddons() {
        var addonList = [];
        for (var addon in this._addons) {
            var currentAddon = this._addons[addon];
            addonList.push([currentAddon.name, currentAddon.enabled]);
        }
        return addonList;
    }

    /* Loads addons to the current context/state*/
    loadEnabledAddons() {
        for (var addon in this._addons) {
            var currentAddon = this._addons[addon];
            if (currentAddon.enabled)
                currentAddon.code();
        }
    }
}