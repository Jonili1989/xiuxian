// 数据加载脚本 - 将所有游戏数据合并到一个文件中

// 境界等级数据
const realmLevels = [
    { name: "练气", cap: 1000 },
    { name: "筑基", cap: 3000 },
    { name: "金丹", cap: 6000 },
    { name: "元婴", cap: 10000 },
    { name: "化神", cap: 15000 },
    { name: "炼虚", cap: 21000 },
    { name: "合体", cap: 28000 },
    { name: "大乘", cap: 36000 },
    { name: "渡劫", cap: 45000 }
];

// 角色默认属性
const characterDefaults = {
    health: 100,
    maxHealth: 100,
    attack: 10,
    defense: 5,
    luck: 5,
    maxLuck: 10,
    cultivation: 0,
    realm: 0,
    isGameStarted: false,
    day: 1,
    actionPoints: 3,
    maxActionPoints: 3
};

// 境界突破奖励
const realmBreakthroughBonuses = {
    health: 20,
    attack: 5,
    defense: 3,
    actionPoints: 1
};

// 妖兽数据库
const monsterDatabase = {
    fox: {
        name: "狐妖",
        health: 30,
        attack: 8,
        defense: 3,
        speed: 7,
        skill: "魅惑",
        dropRate: 0.7,
        dropItem: "狐尾"
    },
    wolf: {
        name: "狼妖",
        health: 40,
        attack: 12,
        defense: 4,
        speed: 8,
        skill: "连击",
        dropRate: 0.6,
        dropItem: "狼牙"
    },
    bear: {
        name: "熊罴",
        health: 70,
        attack: 15,
        defense: 8,
        speed: 4,
        skill: "拍击",
        dropRate: 0.5,
        dropItem: "熊胆"
    },
    snake: {
        name: "蛇精",
        health: 35,
        attack: 10,
        defense: 5,
        speed: 6,
        skill: "毒牙",
        dropRate: 0.65,
        dropItem: "蛇胆"
    },
    tiger: {
        name: "虎妖",
        health: 60,
        attack: 18,
        defense: 7,
        speed: 7,
        skill: "猛扑",
        dropRate: 0.4,
        dropItem: "虎骨"
    }
};

// 妖兽技能效果
const monsterSkillEffects = {
    "魅惑": {
        description: "降低防御",
        defenseMultiplier: 0.7
    },
    "连击": {
        description: "造成两次伤害",
        extraAttack: true
    },
    "撕咬": {
        description: "造成更多伤害",
        damageMultiplier: 1.3
    },
    "狂怒": {
        description: "造成更多伤害",
        damageMultiplier: 1.5
    },
    "拍击": {
        description: "造成眩晕",
        stunChance: 0.3
    },
    "吼叫": {
        description: "降低攻击",
        attackMultiplier: 0.8
    },
    "毒牙": {
        description: "造成中毒",
        poisonDamage: 5,
        poisonDuration: 3
    },
    "缠绕": {
        description: "降低速度",
        entangleEffect: 0.5
    },
    "猛扑": {
        description: "造成更多伤害",
        damageMultiplier: 1.4
    },
    "嗜血": {
        description: "吸取生命",
        lifeStealRatio: 0.3
    }
};

// 物品效果
const itemEffects = {
    "狐尾": {
        description: "增加幸运值",
        effect: (gameState) => {
            gameState.luck = Math.min(gameState.luck + 1, gameState.maxLuck);
            return "幸运值+1";
        }
    },
    "狼牙": {
        description: "增加攻击力",
        effect: (gameState) => {
            gameState.attack += 2;
            return "攻击力+2";
        }
    },
    "熊胆": {
        description: "增加生命上限",
        effect: (gameState) => {
            gameState.maxHealth += 10;
            gameState.health += 10;
            return "生命上限+10";
        }
    },
    "蛇胆": {
        description: "增加修为",
        effect: (gameState) => {
            gameState.cultivation += 100;
            return "修为+100";
        }
    },
    "虎骨": {
        description: "增加防御力",
        effect: (gameState) => {
            gameState.defense += 3;
            return "防御力+3";
        }
    }
};

// 每日事件
const dailyEvents = [
    {
        text: "你发现了一处灵气充沛的洞穴，在此修炼事半功倍。",
        type: "positive",
        effect: (gameState) => {
            const cultivationGain = 50;
            gameState.cultivation += cultivationGain;
            return `修为+${cultivationGain}`;
        }
    },
    {
        text: "一位路过的修士赠予你一枚丹药，服用后感觉精力充沛。",
        type: "positive",
        effect: (gameState) => {
            gameState.health = Math.min(gameState.health + 20, gameState.maxHealth);
            return "生命值+20";
        }
    },
    {
        text: "你偶然发现一本古籍，阅读后对修炼有了新的理解。",
        type: "positive",
        effect: (gameState) => {
            const cultivationGain = 30;
            gameState.cultivation += cultivationGain;
            return `修为+${cultivationGain}`;
        }
    },
    {
        text: "你在河边冥想，突然顿悟，修为有所增长。",
        type: "positive",
        effect: (gameState) => {
            const cultivationGain = 40;
            gameState.cultivation += cultivationGain;
            return `修为+${cultivationGain}`;
        }
    },
    {
        text: "你帮助一位老者，他给了你一些修炼心得作为回报。",
        type: "positive",
        effect: (gameState) => {
            const cultivationGain = 35;
            gameState.cultivation += cultivationGain;
            return `修为+${cultivationGain}`;
        }
    },
    {
        text: "你在山中发现了一株灵草，服用后感觉身轻如燕。",
        type: "positive",
        effect: (gameState) => {
            gameState.luck = Math.min(gameState.luck + 1, gameState.maxLuck);
            return "幸运值+1";
        }
    },
    {
        text: "你在一处古遗迹中发现了一本武功秘籍，研读后武艺有所精进。",
        type: "positive",
        effect: (gameState) => {
            gameState.attack += 1;
            return "攻击力+1";
        }
    },
    {
        text: "你在深山中遇到一位隐士，他传授给你一套防御心法。",
        type: "positive",
        effect: (gameState) => {
            gameState.defense += 1;
            return "防御力+1";
        }
    },
    {
        text: "你在雨中修行，领悟了水的柔韧，防御能力有所提升。",
        type: "positive",
        effect: (gameState) => {
            gameState.defense += 1;
            return "防御力+1";
        }
    },
    {
        text: "你在悬崖边冒险采摘了一株珍贵药草，服用后生命力增强。",
        type: "positive",
        effect: (gameState) => {
            gameState.maxHealth += 5;
            gameState.health += 5;
            return "生命上限+5";
        }
    },
    {
        text: "你在山洞中被毒蛇咬伤，损失了一些生命值。",
        type: "negative",
        effect: (gameState) => {
            const damage = 10;
            gameState.health = Math.max(gameState.health - damage, 1);
            return `生命值-${damage}`;
        }
    },
    {
        text: "你在修炼时走火入魔，损失了一些生命值。",
        type: "negative",
        effect: (gameState) => {
            const damage = 15;
            gameState.health = Math.max(gameState.health - damage, 1);
            return `生命值-${damage}`;
        }
    },
    {
        text: "你在探索时不慎跌入陷阱，受了伤。",
        type: "negative",
        effect: (gameState) => {
            const damage = 12;
            gameState.health = Math.max(gameState.health - damage, 1);
            return `生命值-${damage}`;
        }
    },
    {
        text: "一场突如其来的暴雨打断了你的修炼，修为略有损失。",
        type: "negative",
        effect: (gameState) => {
            const cultivationLoss = 20;
            gameState.cultivation = Math.max(gameState.cultivation - cultivationLoss, 0);
            return `修为-${cultivationLoss}`;
        }
    },
    {
        text: "你今天心神不宁，修炼效果不佳。",
        type: "negative",
        effect: (gameState) => {
            const cultivationLoss = 15;
            gameState.cultivation = Math.max(gameState.cultivation - cultivationLoss, 0);
            return `修为-${cultivationLoss}`;
        }
    },
    {
        text: "你在山中迷路，浪费了不少时间。",
        type: "neutral",
        effect: (gameState) => {
            return "无效果";
        }
    },
    {
        text: "你遇到了一位旅行的修士，交流了一些修炼心得。",
        type: "neutral",
        effect: (gameState) => {
            return "无效果";
        }
    },
    {
        text: "你在河边冥想，感受自然的力量。",
        type: "neutral",
        effect: (gameState) => {
            return "无效果";
        }
    },
    {
        text: "你在村庄帮助村民解决了一些小麻烦。",
        type: "neutral",
        effect: (gameState) => {
            return "无效果";
        }
    },
    {
        text: "你在山洞中发现了一处温泉，泡了个澡，恢复了一些生命值。",
        type: "positive",
        effect: (gameState) => {
            const healing = 15;
            gameState.health = Math.min(gameState.health + healing, gameState.maxHealth);
            return `生命值+${healing}`;
        }
    },
    {
        text: "你在古树下打坐，领悟了一些道理，修为有所增长。",
        type: "positive",
        effect: (gameState) => {
            const cultivationGain = 25;
            gameState.cultivation += cultivationGain;
            return `修为+${cultivationGain}`;
        }
    },
    {
        text: "你今天休息了一整天，没有特别的收获。",
        type: "neutral",
        effect: (gameState) => {
            return "无效果";
        }
    }
];

// 正面事件
const goodEvents = dailyEvents.filter(event => event.type === "positive");

// 负面事件
const badEvents = dailyEvents.filter(event => event.type === "negative");

// 普通事件
const normalEvents = dailyEvents.filter(event => event.type === "neutral");

// 战斗相关参数
const combatSettings = {
    playerDamageVariance: 0.2, // 玩家伤害浮动范围
    monsterDamageVariance: 0.1, // 妖兽伤害浮动范围
    criticalHitChance: 0.1, // 暴击几率基础值
    criticalHitMultiplier: 1.5, // 暴击伤害倍率
    luckImpactOnCrit: 0.01, // 每点幸运值增加的暴击几率
    luckImpactOnDodge: 0.01, // 每点幸运值增加的闪避几率
    baseDodgeChance: 0.05, // 基础闪避几率
    actionPointCost: 1, // 战斗消耗的行动力
    postCombatHealMin: 5, // 战斗后最小恢复生命值
    postCombatHealMax: 15, // 战斗后最大恢复生命值
    fleeBaseChance: 0.5 // 基础逃跑几率
};

// 修炼相关参数
const cultivationSettings = {
    baseCultivationGain: 30, // 基础修为增长
    variancePercentage: 0.2, // 浮动百分比
    luckImpact: 2, // 每点幸运值增加的修为
    actionPointCost: 1, // 修炼消耗的行动力
    attributeUpgradeChance: 0.3, // 属性提升几率
    breakthroughBaseChance: 0.7, // 基础突破成功率
    failedBreakthroughPenalty: 0.8, // 突破失败后保留的修为比例
    breakthroughHealthPenalty: 20 // 突破失败后的生命值惩罚
};

// 探索相关参数
const explorationSettings = {
    monsterEncounterChance: 0.7, // 遇到妖兽的几率
    itemFindChance: 0.3, // 找到物品的几率
    eventChance: 0.4, // 触发事件的几率
    luckImpactOnItemFind: 0.02, // 每点幸运值增加的找到物品几率
    actionPointCost: 1, // 探索消耗的行动力
    combatChance: 0.5, // 遭遇战斗的几率
    goodEventChance: 0.2, // 遭遇好事件的几率
    badEventChance: 0.2 // 遭遇坏事件的几率
};

// 恢复养伤相关参数
const restSettings = {
    minHealthRecovery: 15, // 最小恢复生命值
    maxHealthRecovery: 25, // 最大恢复生命值
    luckImpactOnRecovery: 0.1 // 每点幸运值增加的恢复量系数
};

// 将所有数据暴露到全局作用域
window.realmLevels = realmLevels;
window.characterDefaults = characterDefaults;
window.realmBreakthroughBonuses = realmBreakthroughBonuses;
window.monsterDatabase = monsterDatabase;
window.monsterSkillEffects = monsterSkillEffects;
window.itemEffects = itemEffects;
window.dailyEvents = dailyEvents;
window.goodEvents = goodEvents;
window.badEvents = badEvents;
window.normalEvents = normalEvents;
window.combatSettings = combatSettings;
window.cultivationSettings = cultivationSettings;
window.explorationSettings = explorationSettings;
window.restSettings = restSettings;