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

// 渡劫事件 - 用于境界突破
const tribulationEvents = [
    {
        text: '天雷滚滚，你在雷劫中感悟天道，成功突破！',
        type: 'success',
        successRate: 0.7,
        effect: (gameState) => {
            return '渡劫成功！境界提升！';
        }
    },
    {
        text: '心魔现世，你战胜了内心的恐惧，突破成功！',
        type: 'success',
        successRate: 0.6,
        effect: (gameState) => {
            return '心魔劫成功渡过！';
        }
    },
    {
        text: '天火降临，你在烈焰中淬炼肉身，成功突破！',
        type: 'success',
        successRate: 0.65,
        effect: (gameState) => {
            return '天火劫渡过成功！';
        }
    },
    {
        text: '风劫来袭，你在狂风中稳固道心，突破成功！',
        type: 'success',
        successRate: 0.75,
        effect: (gameState) => {
            return '风劫成功渡过！';
        }
    },
    {
        text: '雷劫太过猛烈，你受了重伤，突破失败！',
        type: 'failure',
        successRate: 0.3,
        effect: (gameState) => {
            gameState.health = Math.max(1, Math.floor(gameState.health * 0.5));
            gameState.cultivation = Math.max(0, gameState.cultivation - 20);
            return '渡劫失败！生命值减半，修为-20！';
        }
    },
    {
        text: '心魔太强，你迷失在幻境中，突破失败！',
        type: 'failure',
        successRate: 0.4,
        effect: (gameState) => {
            gameState.cultivation = Math.max(0, gameState.cultivation - 15);
            gameState.attack = Math.max(1, gameState.attack - 2);
            return '心魔劫失败！修为-15，攻击力-2！';
        }
    },
    {
        text: '天火焚身，你无法承受，突破失败！',
        type: 'failure',
        successRate: 0.35,
        effect: (gameState) => {
            gameState.health = Math.max(1, Math.floor(gameState.health * 0.6));
            gameState.defense = Math.max(0, gameState.defense - 2);
            return '天火劫失败！生命值大减，防御力-2！';
        }
    },
    {
        text: '狂风撕裂，你道心不稳，突破失败！',
        type: 'failure',
        successRate: 0.25,
        effect: (gameState) => {
            gameState.cultivation = Math.max(0, gameState.cultivation - 25);
            return '风劫失败！修为大幅下降-25！';
        }
    }
];

export { dailyEvents, goodEvents, badEvents, normalEvents, tribulationEvents };