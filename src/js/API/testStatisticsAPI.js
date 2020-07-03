import StatisticsAPI from './statisticsAPI';

export default function testStatisticsAPI() {
    const nameGame = 'nameGame';
    const result = '100%'
    StatisticsAPI.miniGameStat(nameGame, result);
}
