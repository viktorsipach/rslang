import {putUserSettings, getUserSettings} from './userSettingsAPI';

class UserSettingsMiniGame {
    constructor() {
        this.putSettings = putUserSettings;
        this.getSettings = getUserSettings;
        this.initSettings = {
            "wordsPerDay": 10,
            "optional": {}
        };
    }

    async getUserSettingsMiniGame(nameGame) {
        const settings = await this.getSettings();
        const initLevelRound = {level: 1, round: 1};

        if (!settings || !settings.optional || !settings.optional[`${nameGame}Settings`]) return initLevelRound;

        const levelRound = settings.optional[`${nameGame}Settings`];

        if (levelRound) return levelRound;
        return initLevelRound;
    }

    async updateUserSettingsMiniGame(nameGame, level, round) {
        let settings = await this.getSettings();
        const settingsMiniGame = {level, round};

        if (!settings) {
            settings = this.initSettings;
        };
        if (settings.id) delete settings.id;

        settings.optional[`${nameGame}Settings`] = settingsMiniGame;
        this.putSettings({settings});
        return settings;
    }
}

export default new UserSettingsMiniGame();