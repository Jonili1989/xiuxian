// 事件数据定义

// 每日随机事件
const dailyEvents = [
    {
        text: '你在睡梦中悟道，修为+5！',
        type: 'positive',
        effect: (gameState) => {
            gameState.cultivation += 5;
            return '修为+5';
        }
    },
    {
        text: '你被蚊虫叮咬，生命值-3！',
        type: 'negative',
        effect: (gameState) => {
            gameState.health = Math.max(gameState.health - 3, 0);
            return '生命值-3';
        }
    },
    {
        text: '你梦到了仙人指点，幸运值+1！',
        type: 'positive',
        effect: (gameState) => {
            gameState.luck = Math.min(gameState.luck + 1, gameState.maxLuck);
            return '幸运值+1';
        }
    },
    {
        text: '你夜间受凉，防御力-1！',
        type: 'negative',
        effect: (gameState) => {
            gameState.defense = Math.max(gameState.defense - 1, 0);
            return '防御力-1';
        }
    },
    {
        text: '你得到了灵感，攻击力+1！',
        type: 'positive',
        effect: (gameState) => {
            gameState.attack += 1;
            return '攻击力+1';
        }
    }
];

// 好事件
const goodEvents = [
    {
        text: '你发现了一个隐藏的宝箱，获得了10点修为！',
        type: 'positive',
        effect: (gameState) => {
            gameState.cultivation += 10;
            return '修为+10';
        }
    },
    {
        text: '你遇到了一位仙人，获得了5点幸运值！',
        type: 'positive',
        effect: (gameState) => {
            gameState.luck = Math.min(gameState.luck + 5, gameState.maxLuck);
            return '幸运值+5';
        }
    },
    {
        text: '你找到了一株仙草，生命值+20！',
        type: 'positive',
        effect: (gameState) => {
            gameState.health = Math.min(gameState.health + 20, gameState.maxHealth);
            return '生命值+20';
        }
    },
    {
        text: '你获得了一本武功秘籍，攻击力+3！',
        type: 'positive',
        effect: (gameState) => {
            gameState.attack += 3;
            return '攻击力+3';
        }
    },
    {
        text: '你找到了一件宝甲，防御力+3！',
        type: 'positive',
        effect: (gameState) => {
            gameState.defense += 3;
            return '防御力+3';
        }
    }
];

// 坏事件
const badEvents = [
    {
        text: '你遇到了劫匪，失去了5点生命值！',
        type: 'negative',
        effect: (gameState) => {
            gameState.health -= 5;
            return '生命值-5';
        }
    },
    {
        text: '你误食了毒草，生命值-10！',
        type: 'negative',
        effect: (gameState) => {
            gameState.health -= 10;
            return '生命值-10';
        }
    },
    {
        text: '你遇到了恶劣天气，修为-5！',
        type: 'negative',
        effect: (gameState) => {
            gameState.cultivation = Math.max(gameState.cultivation - 5, 0);
            return '修为-5';
        }
    },
    {
        text: '你被野兽袭击，生命值-15！',
        type: 'negative',
        effect: (gameState) => {
            gameState.health -= 15;
            return '生命值-15';
        }
    },
    {
        text: '你迷路了，浪费了一天时间，没有获得任何东西。',
        type: 'negative',
        effect: () => {
            return '无效果';
        }
    }
];

// 普通事件
const normalEvents = [
    {
        text: '你在森林中漫步，没有发现任何特别的东西。',
        type: 'neutral',
        effect: () => {
            return '无效果';
        }
    },
    {
        text: '你遇到了一位旅行者，聊了一会儿天。',
        type: 'neutral',
        effect: () => {
            return '无效果';
        }
    },
    {
        text: '你找到了一些野果，恢复了5点生命值。',
        type: 'positive',
        effect: (gameState) => {
            gameState.health = Math.min(gameState.health + 5, gameState.maxHealth);
            return '生命值+5';
        }
    },
    {
        text: '你在山洞中休息，感觉精神饱满。',
        type: 'neutral',
        effect: () => {
            return '无效果';
        }
    },
    {
        text: '你观察天象，感悟到了一些修炼心得，获得了3点修为。',
        type: 'positive',
        effect: (gameState) => {
            gameState.cultivation += 3;
            return '修为+3';
        }
    }
];

export { dailyEvents, goodEvents, badEvents, normalEvents };