class StatisticsApi {
    constructor() {
        this.userId = '';
        this.token = '';
        this.statistics = {};
        this.initStat = {
            "learnedWords": 0,
            "optional": {
                "#": "#"
            }
        }
    }

    initIdToken() {
        this.userId = localStorage.userId;
        this.token = localStorage.userToken;
    }

    async getStatistics() {
        const url = `https://afternoon-falls-25894.herokuapp.com/users/${this.userId}/statistics`;
        
        const res = await fetch(url, {
            method: 'GET',
            withCredentials: true,
            headers: {
              'Authorization': `Bearer ${this.token}`,
              'Accept': 'application/json'
            }
        });
        if (res.status === 404) {
            await this.initStatistics()
            return res.status;
        }
        if (res.status === 401) {
            console.log('Access token is missing or invalid');
            return res.status;
        }
        const data = await res.json();
        delete data.id;
        this.statistics = data;
        return data;
    }

    async initStatistics() {
        await this.putStatistics(this.initStat);
        await this.getStatistics();
    }

    async putStatistics(obj) {
        const url = `https://afternoon-falls-25894.herokuapp.com/users/${this.userId}/statistics`;

        await fetch(url, {
            method: 'PUT',
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        });
    }

    statisticsDataMiniGame(nameGame, result) {
        const date = new Date();
        const key = `${date.toLocaleDateString()}-${date.toLocaleTimeString()}`;
        const maxValue = 5;
        if (!this.statistics.optional[nameGame]) {
            this.statistics.optional[nameGame] = {'#' : '#'};
        }
        const arr = Object.entries(this.statistics.optional[nameGame]);
        if (arr.length >= maxValue) {
            arr.shift();
        }
        arr.push([key, result]);
        this.statistics.optional[nameGame] = Object.fromEntries(arr);
    }

    async miniGameStat(nameGame, result) {
        this.initIdToken();
        await this.getStatistics();
        this.statisticsDataMiniGame(nameGame, result);
        await this.putStatistics(this.statistics);
        
        console.log(await this.getStatistics());  /* можно убрать если мешает */
    }
}

export default new StatisticsApi();