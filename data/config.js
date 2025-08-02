// 游戏配置参数

// 游戏难度设置
const difficultySettings = {
    easy: {
        monsterStatMultiplier: 0.8,  // 妖兽属性倍率
        expMultiplier: 1.2,          // 经验获取倍率
        actionPointsBonus: 1,         // 额外行动点数
        itemDropRateBonus: 0.1        // 物品掉落率加成
    },
    normal: {
        monsterStatMultiplier: 1.0,
        expMultiplier: 1.0,
        actionPointsBonus: 0,
        itemDropRateBonus: 0
    },
    hard: {
        monsterStatMultiplier: 1.2,
        expMultiplier: 0.8,
        actionPointsBonus: 0,
        itemDropRateBonus: -0.05
    }
};

// 战斗相关参数
const combatSettings = {
    baseCritChance: 0.05,           // 基础暴击率
    critDamageMultiplier: 2.0,       // 暴击伤害倍率
    monsterSkillChance: 0.3,         // 妖兽使用技能的概率
    fleeBaseChance: 0.5,             // 基础逃跑成功率
    postCombatHealMin: 1,            // 战斗后最小恢复生命值
    postCombatHealMax: 5             // 战斗后最大恢复生命值
};

// 修炼相关参数
const cultivationSettings = {
    baseCultivationGain: 5,          // 基础修炼获得修为
    attributeUpgradeChance: 0.1,     // 修炼时属性提升概率
    breakthroughBaseChance: 0.5,     // 基础突破成功率
    failedBreakthroughPenalty: 0.8,  // 突破失败后修为保留比例
    breakthroughHealthPenalty: 20,   // 突破失败后生命值惩罚
    actionPointCost: 1               // 修炼消耗的行动力
};

// 探索相关参数
const explorationSettings = {
    combatChance: 0.7,               // 探索时遇到战斗的概率
    goodEventChance: 0.15,           // 探索时遇到好事件的概率
    badEventChance: 0.1,             // 探索时遇到坏事件的概率
    normalEventChance: 0.05,         // 探索时遇到普通事件的概率
    actionPointCost: 1,              // 探索消耗的行动力
    itemFindChance: 0.3,             // 找到物品的几率
    luckImpactOnItemFind: 0.02       // 每点幸运值增加的找到物品几率
};

// 恢复养伤相关参数
const restSettings = {
    minHealAmount: 5,                // 最小恢复生命值
    maxHealAmount: 15,               // 最大恢复生命值
    luckHealBonus: 0.5,              // 幸运值对恢复量的加成系数
    actionPointCost: 1               // 休息消耗的行动力
};

export { 
    difficultySettings, 
    combatSettings, 
    cultivationSettings, 
    explorationSettings, 
    restSettings 
};