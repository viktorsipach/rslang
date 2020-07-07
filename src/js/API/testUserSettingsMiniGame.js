import UserSettingsMiniGame from './userSettingsMiniGameAPI';

export default async function test() {
    const nameGame = 'findWords';
    const level = 999;
    const round = 999;

    const getSett = await UserSettingsMiniGame.getUserSettingsMiniGame(nameGame);
    console.log(getSett);

    const putSett = await UserSettingsMiniGame.updateUserSettingsMiniGame(nameGame, level, round);
    console.log(putSett);
}
