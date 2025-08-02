// 数据加载脚本 - 将所有游戏数据合并到一个文件中

// 境界等级数据
const realmLevels = [
    { name: '练气', cap: 100, dayLimit: 5, bossId: 'qi_boss' },
    { name: '筑基', cap: 250, dayLimit: 10, bossId: 'foundation_boss' },
    { name: '金丹', cap: 600, dayLimit: 18, bossId: 'golden_core_boss' },
    { name: '元婴', cap: 1500, dayLimit: 30, bossId: 'nascent_soul_boss' },
    { name: '化神', cap: 3500, dayLimit: 60, bossId: 'spirit_transformation_boss' },
    { name: '炼虚', cap: 8000, dayLimit: 90, bossId: 'void_refinement_boss' },
    { name: '合体', cap: 18000, dayLimit: 100, bossId: 'unity_boss' },
    { name: '大乘', cap: 40000, dayLimit: 150, bossId: 'mahayana_boss' },
    { name: '渡劫', cap: 80000, dayLimit: 300, bossId: 'tribulation_boss' }
];

// 境界心魔数据
const realmBosses = {
    qi_boss: {
        name: '练气期心魔',
        health: 80,
        attack: 12,
        defense: 8,
        speed: 5,
        skills: ['恐惧侵蚀', '意志动摇'],
        description: '练气期修炼者内心的恐惧与不安'
    },
    foundation_boss: {
        name: '筑基期心魔',
        health: 150,
        attack: 18,
        defense: 12,
        speed: 6,
        skills: ['贪婪诱惑', '愤怒燃烧'],
        description: '筑基期修炼者内心的贪婪与愤怒'
    },
    golden_core_boss: {
        name: '金丹期心魔',
        health: 280,
        attack: 25,
        defense: 18,
        speed: 7,
        skills: ['傲慢膨胀', '嫉妒腐蚀'],
        description: '金丹期修炼者内心的傲慢与嫉妒'
    },
    nascent_soul_boss: {
        name: '元婴期心魔',
        health: 500,
        attack: 35,
        defense: 25,
        speed: 8,
        skills: ['绝望深渊', '仇恨烈焰'],
        description: '元婴期修炼者内心的绝望与仇恨'
    },
    spirit_transformation_boss: {
        name: '化神期心魔',
        health: 900,
        attack: 50,
        defense: 35,
        speed: 9,
        skills: ['执念束缚', '痛苦折磨'],
        description: '化神期修炼者内心的执念与痛苦'
    },
    void_refinement_boss: {
        name: '炼虚期心魔',
        health: 1600,
        attack: 70,
        defense: 50,
        speed: 10,
        skills: ['虚无吞噬', '迷失幻境'],
        description: '炼虚期修炼者内心的虚无与迷失'
    },
    unity_boss: {
        name: '合体期心魔',
        health: 2800,
        attack: 95,
        defense: 70,
        speed: 11,
        skills: ['分裂人格', '混沌意识'],
        description: '合体期修炼者内心的分裂与混沌'
    },
    mahayana_boss: {
        name: '大乘期心魔',
        health: 5000,
        attack: 130,
        defense: 95,
        speed: 12,
        skills: ['终极恐惧', '绝对绝望'],
        description: '大乘期修炼者内心的终极恐惧'
    },
    tribulation_boss: {
        name: '渡劫期心魔',
        health: 8000,
        attack: 180,
        defense: 130,
        speed: 15,
        skills: ['心魔劫难', '道心崩坏'],
        description: '渡劫期修炼者内心的终极考验'
    }
};

// 按境界划分的技能池
const skillPoolsByRealm = {
    0: ['power_strike', 'iron_skin'], // 练气期
    1: ['flame_slash', 'dodge_master', 'life_steal'], // 筑基期
    2: ['thunder_strike', 'regeneration', 'berserker'], // 金丹期
    3: ['wind_blade', 'focus', 'counter_attack'], // 元婴期
    4: ['double_strike'], // 化神期及以上
    5: [], // 炼虚期
    6: [], // 合体期
    7: [], // 大乘期
    8: [] // 渡劫期
};

// 技能效果处理器
const skillEffectHandlers = {
    attack: (skill, attacker, defender) => {
        let damage = attacker.attack * (skill.effect.damageMultiplier || 1);
        let effects = {};
        
        if (skill.effect.burnDamage) {
            effects.burn = {
                damage: skill.effect.burnDamage,
                duration: skill.effect.burnDuration || 1
            };
        }
        
        if (skill.effect.stunChance && Math.random() < skill.effect.stunChance) {
            effects.stun = { duration: 1 };
        }
        
        return { damage, effects };
    },
    
    defense: (skill, target) => {
        let effects = {};
        
        if (skill.effect.defenseMultiplier) {
            effects.defenseBoost = {
                multiplier: skill.effect.defenseMultiplier,
                duration: skill.effect.duration || 1
            };
        }
        
        if (skill.effect.dodgeBonus) {
            effects.dodgeBoost = {
                bonus: skill.effect.dodgeBonus,
                duration: skill.effect.duration || 1
            };
        }
        
        return { effects };
    },
    
    recovery: (skill, target) => {
        let healing = 0;
        let effects = {};
        
        if (skill.effect.lifeStealRatio) {
            // 吸血效果在攻击时处理
            effects.lifeSteal = { ratio: skill.effect.lifeStealRatio };
        }
        
        if (skill.effect.healPerTurn) {
            effects.regeneration = {
                healPerTurn: skill.effect.healPerTurn,
                duration: skill.effect.duration || 1
            };
        }
        
        return { healing, effects };
    },
    
    buff: (skill, target) => {
        let effects = {};
        
        if (skill.effect.attackMultiplier) {
            effects.attackBoost = {
                multiplier: skill.effect.attackMultiplier,
                duration: skill.effect.duration || 1
            };
        }
        
        if (skill.effect.defenseMultiplier) {
            effects.defenseBoost = {
                multiplier: skill.effect.defenseMultiplier,
                duration: skill.effect.duration || 1
            };
        }
        
        if (skill.effect.critChanceBonus) {
            effects.critBoost = {
                chanceBonus: skill.effect.critChanceBonus,
                multiplierBonus: skill.effect.critMultiplierBonus || 0,
                duration: skill.effect.duration || 1
            };
        }
        
        return { effects };
    },
    
    special: (skill, attacker, defender) => {
        let effects = {};
        
        if (skill.effect.counterChance) {
            effects.counter = {
                chance: skill.effect.counterChance,
                multiplier: skill.effect.counterMultiplier || 1
            };
        }
        
        if (skill.effect.extraAttackChance && Math.random() < skill.effect.extraAttackChance) {
            effects.extraAttack = {
                multiplier: skill.effect.extraAttackMultiplier || 1
            };
        }
        
        return { effects };
    }
};

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
    maxActionPoints: 3,
    mood: 100,
    maxMood: 100,
    skills: [], // 玩家拥有的技能列表
    activeEffects: [] // 当前生效的技能效果
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
        dropItem: "狐尾",
        tier: "basic"
    },
    wolf: {
        name: "狼妖",
        health: 40,
        attack: 12,
        defense: 4,
        speed: 8,
        skill: "连击",
        dropRate: 0.6,
        dropItem: "狼牙",
        tier: "basic"
    },
    bear: {
        name: "熊罴",
        health: 70,
        attack: 15,
        defense: 8,
        speed: 4,
        skill: "拍击",
        dropRate: 0.5,
        dropItem: "熊胆",
        tier: "advanced"
    },
    snake: {
        name: "蛇精",
        health: 35,
        attack: 10,
        defense: 5,
        speed: 6,
        skill: "毒牙",
        dropRate: 0.65,
        dropItem: "蛇胆",
        tier: "basic"
    },
    tiger: {
        name: "虎妖",
        health: 60,
        attack: 18,
        defense: 7,
        speed: 7,
        skill: "猛扑",
        dropRate: 0.4,
        dropItem: "虎骨",
        tier: "advanced"
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
    },
    // 境界boss技能
    "灵气冲击": {
        description: "释放强大的灵气攻击",
        damageMultiplier: 1.5
    },
    "防御强化": {
        description: "大幅提升防御力",
        defenseMultiplier: 1.5
    },
    "基础爆发": {
        description: "爆发全部力量进行攻击",
        damageMultiplier: 1.8
    },
    "生命汲取": {
        description: "攻击时大量恢复生命值",
        lifeStealRatio: 0.5
    },
    "金丹之力": {
        description: "金丹释放恐怖力量",
        damageMultiplier: 2.0
    },
    "元气护盾": {
        description: "元气形成强大护盾",
        defenseMultiplier: 2.0
    },
    "元婴出窍": {
        description: "元婴攻击，无视防御",
        ignoreDefense: true,
        damageMultiplier: 1.5
    },
    "灵魂攻击": {
        description: "直接攻击灵魂",
        damageMultiplier: 1.7,
        stunChance: 0.4
    },
    "神识碾压": {
        description: "神识碾压敌人心智",
        damageMultiplier: 2.2,
        stunChance: 0.5
    },
    "空间撕裂": {
        description: "撕裂空间进行攻击",
        damageMultiplier: 2.5
    },
    "虚空掌控": {
        description: "掌控虚空之力",
        damageMultiplier: 2.8,
        ignoreDefense: true
    },
    "时空禁锢": {
        description: "禁锢敌人于时空中",
        immobilizeDuration: 2,
        damageMultiplier: 1.5
    },
    "天地合一": {
        description: "与天地合为一体",
        damageMultiplier: 3.0,
        defenseMultiplier: 2.5
    },
    "万法归宗": {
        description: "万法归于一宗",
        damageMultiplier: 3.5
    },
    "大乘神通": {
        description: "大乘期的无上神通",
        damageMultiplier: 4.0,
        ignoreDefense: true
    },
    "仙帝威压": {
        description: "仙帝的恐怖威压",
        damageMultiplier: 2.0,
        stunChance: 0.7
    },
    "天劫降临": {
        description: "召唤天劫攻击敌人",
        damageMultiplier: 5.0,
        ignoreDefense: true
    },
    "道法自然": {
        description: "道法自然，返璞归真",
        damageMultiplier: 4.5,
        lifeStealRatio: 0.8
    },
    // 心魔技能效果
    "恐惧侵蚀": {
        description: "恐惧侵蚀玩家心智，降低防御力",
        defenseMultiplier: 0.8,
        damageMultiplier: 1.2
    },
    "意志动摇": {
        description: "动摇玩家意志，降低攻击力",
        attackMultiplier: 0.9,
        damageMultiplier: 1.1
    },
    "贪婪诱惑": {
        description: "贪婪诱惑玩家，造成精神伤害",
        damageMultiplier: 1.3,
        stunChance: 0.2
    },
    "愤怒燃烧": {
        description: "愤怒之火燃烧，造成持续伤害",
        damageMultiplier: 1.4,
        poisonDamage: 8,
        poisonDuration: 2
    },
    "傲慢膨胀": {
        description: "傲慢情绪膨胀，大幅提升攻击力",
        damageMultiplier: 1.6,
        defenseMultiplier: 1.2
    },
    "嫉妒腐蚀": {
        description: "嫉妒腐蚀心灵，降低玩家各项能力",
        damageMultiplier: 1.3,
        attackMultiplier: 0.8,
        defenseMultiplier: 0.8
    },
    "绝望深渊": {
        description: "绝望将玩家拖入深渊",
        damageMultiplier: 1.8,
        stunChance: 0.3
    },
    "仇恨烈焰": {
        description: "仇恨烈焰焚烧一切",
        damageMultiplier: 2.0,
        ignoreDefense: true
    },
    "执念束缚": {
        description: "执念束缚玩家行动",
        damageMultiplier: 1.5,
        immobilizeDuration: 1
    },
    "痛苦折磨": {
        description: "痛苦折磨玩家身心",
        damageMultiplier: 1.7,
        poisonDamage: 12,
        poisonDuration: 3
    },
    "虚无吞噬": {
        description: "虚无吞噬一切存在",
        damageMultiplier: 2.2,
        lifeStealRatio: 0.3
    },
    "迷失幻境": {
        description: "迷失在幻境中无法自拔",
        damageMultiplier: 1.6,
        stunChance: 0.4
    },
    "分裂人格": {
        description: "分裂人格造成混乱",
        damageMultiplier: 2.5,
        extraAttack: true
    },
    "混沌意识": {
        description: "混沌意识扰乱心智",
        damageMultiplier: 2.0,
        attackMultiplier: 0.7,
        defenseMultiplier: 0.7
    },
    "终极恐惧": {
        description: "终极恐惧降临",
        damageMultiplier: 3.0,
        stunChance: 0.5
    },
    "绝对绝望": {
        description: "绝对的绝望吞噬希望",
        damageMultiplier: 2.8,
        ignoreDefense: true,
        lifeStealRatio: 0.4
    },
    "心魔劫难": {
        description: "心魔劫难考验道心",
        damageMultiplier: 3.5,
        stunChance: 0.6
    },
    "道心崩坏": {
        description: "道心崩坏，万念俱灰",
        damageMultiplier: 4.0,
        ignoreDefense: true,
        attackMultiplier: 0.5
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
    luckImpactOnRecovery: 0.1, // 每点幸运值增加的恢复量系数
    actionPointCost: 1 // 休息消耗的行动力
};

// 将所有数据暴露到全局作用域
// 技能数据
const skillDatabase = {
    // 攻击类技能
    power_strike: {
        name: "力劈华山",
        type: "attack",
        description: "强力的攻击技能，造成150%伤害",
        triggerChance: 0.15,
        effect: { damageMultiplier: 1.5 },
        message: "你使出力劈华山，造成了巨大伤害！"
    },
    flame_slash: {
        name: "烈焰斩",
        type: "attack",
        description: "火焰攻击，造成额外灼烧伤害",
        triggerChance: 0.12,
        effect: { damageMultiplier: 1.3, burnDamage: 10, burnDuration: 3 },
        message: "你的攻击带着烈焰，敌人被灼烧！"
    },
    thunder_strike: {
        name: "雷霆一击",
        type: "attack",
        description: "雷电攻击，有几率造成眩晕",
        triggerChance: 0.10,
        effect: { damageMultiplier: 1.4, stunChance: 0.3 },
        message: "雷霆之力汇聚于你的攻击中！"
    },
    wind_blade: {
        name: "风刃术",
        type: "attack",
        description: "风属性攻击，提高命中率",
        triggerChance: 0.18,
        effect: { damageMultiplier: 1.2, hitBonus: 0.2 },
        message: "风刃呼啸而过，精准命中敌人！"
    },
    
    // 防御类技能
    iron_skin: {
        name: "铁布衫",
        type: "defense",
        description: "提升防御力，减少受到的伤害",
        triggerChance: 0.20,
        effect: { defenseMultiplier: 1.5, duration: 3 },
        message: "你的皮肤变得坚硬如铁！"
    },
    dodge_master: {
        name: "身法精通",
        type: "defense",
        description: "大幅提升闪避几率",
        triggerChance: 0.15,
        effect: { dodgeBonus: 0.3, duration: 2 },
        message: "你的身法变得飘逸如风！"
    },
    
    // 恢复类技能
    life_steal: {
        name: "吸血术",
        type: "recovery",
        description: "攻击时恢复生命值",
        triggerChance: 0.12,
        effect: { lifeStealRatio: 0.4 },
        message: "你吸取了敌人的生命力！"
    },
    regeneration: {
        name: "回春术",
        type: "recovery",
        description: "持续恢复生命值",
        triggerChance: 0.08,
        effect: { healPerTurn: 15, duration: 4 },
        message: "生命之力在你体内流淌！"
    },
    
    // 辅助类技能
    berserker: {
        name: "狂暴",
        type: "buff",
        description: "提升攻击力但降低防御力",
        triggerChance: 0.10,
        effect: { attackMultiplier: 1.8, defenseMultiplier: 0.7, duration: 3 },
        message: "你进入了狂暴状态！"
    },
    focus: {
        name: "专注",
        type: "buff",
        description: "提升暴击几率和暴击伤害",
        triggerChance: 0.15,
        effect: { critChanceBonus: 0.2, critMultiplierBonus: 0.5, duration: 3 },
        message: "你的注意力高度集中！"
    },
    
    // 特殊类技能
    counter_attack: {
        name: "反击",
        type: "special",
        description: "受到攻击时有几率反击",
        triggerChance: 0.12,
        effect: { counterChance: 0.4, counterMultiplier: 1.2 },
        message: "你发动了反击！"
    },
    double_strike: {
        name: "连击",
        type: "special",
        description: "有几率进行二次攻击",
        triggerChance: 0.10,
        effect: { extraAttackChance: 0.5, extraAttackMultiplier: 0.8 },
        message: "你发动了连击！"
    }
};

// 渡劫事件数据
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

// 突破奇遇事件数据
const breakthroughEvents = [
    // 正面事件 - 减弱心魔战斗力
    {
        text: '你在突破前偶遇一位高人指点，道心更加坚定！',
        type: 'positive',
        effect: {
            demonPowerMultiplier: 0.8, // 心魔战斗力降低20%
            description: '心魔战斗力降低20%'
        }
    },
    {
        text: '你发现了一株千年灵芝，服用后精神力大增！',
        type: 'positive',
        effect: {
            demonPowerMultiplier: 0.75, // 心魔战斗力降低25%
            description: '心魔战斗力降低25%'
        }
    },
    {
        text: '你在古洞中发现了前辈留下的心法秘籍，领悟颇深！',
        type: 'positive',
        effect: {
            demonPowerMultiplier: 0.85, // 心魔战斗力降低15%
            description: '心魔战斗力降低15%'
        }
    },
    {
        text: '你救助了一只受伤的仙鹤，它赠予你一枚定心丹！',
        type: 'positive',
        effect: {
            demonPowerMultiplier: 0.7, // 心魔战斗力降低30%
            description: '心魔战斗力降低30%'
        }
    },
    {
        text: '你在星空下冥想，感悟到了天地大道的奥秘！',
        type: 'positive',
        effect: {
            demonPowerMultiplier: 0.8, // 心魔战斗力降低20%
            description: '心魔战斗力降低20%'
        }
    },
    
    // 负面事件 - 增强心魔战斗力
    {
        text: '你在突破前遭遇了心爱之人的背叛，内心充满愤怒和痛苦！',
        type: 'negative',
        effect: {
            demonPowerMultiplier: 1.3, // 心魔战斗力增加30%
            description: '心魔战斗力增加30%'
        }
    },
    {
        text: '你想起了过去的失败和耻辱，负面情绪涌上心头！',
        type: 'negative',
        effect: {
            demonPowerMultiplier: 1.25, // 心魔战斗力增加25%
            description: '心魔战斗力增加25%'
        }
    },
    {
        text: '你突然想到了未完成的仇恨，杀意和怨念缠绕心头！',
        type: 'negative',
        effect: {
            demonPowerMultiplier: 1.4, // 心魔战斗力增加40%
            description: '心魔战斗力增加40%'
        }
    },
    {
        text: '你被贪婪、嫉妒、愤怒等负面情绪所困扰！',
        type: 'negative',
        effect: {
            demonPowerMultiplier: 1.35, // 心魔战斗力增加35%
            description: '心魔战斗力增加35%'
        }
    },
    {
        text: '你想起了曾经的恐惧和绝望，内心开始动摇！',
        type: 'negative',
        effect: {
            demonPowerMultiplier: 1.2, // 心魔战斗力增加20%
            description: '心魔战斗力增加20%'
        }
    },
    
    // 中性事件 - 轻微影响
    {
        text: '你在突破前保持平静，心境如水！',
        type: 'neutral',
        effect: {
            demonPowerMultiplier: 1.0, // 心魔战斗力无变化
            description: '心魔战斗力无变化'
        }
    },
    {
        text: '你回忆起师父的教诲，心中略有波澜！',
        type: 'neutral',
        effect: {
            demonPowerMultiplier: 0.95, // 心魔战斗力降低5%
            description: '心魔战斗力降低5%'
        }
    },
    {
        text: '你想起了修炼路上的点点滴滴，心情复杂！',
        type: 'neutral',
        effect: {
            demonPowerMultiplier: 1.05, // 心魔战斗力增加5%
            description: '心魔战斗力增加5%'
        }
    }
];

window.realmLevels = realmLevels;
window.realmBosses = realmBosses;
window.characterDefaults = characterDefaults;
window.realmBreakthroughBonuses = realmBreakthroughBonuses;
window.monsterDatabase = monsterDatabase;
window.monsterSkillEffects = monsterSkillEffects;
window.itemEffects = itemEffects;
window.dailyEvents = dailyEvents;
window.goodEvents = goodEvents;
window.badEvents = badEvents;
window.normalEvents = normalEvents;
window.tribulationEvents = tribulationEvents;
window.breakthroughEvents = breakthroughEvents;
window.combatSettings = combatSettings;
window.cultivationSettings = cultivationSettings;
window.explorationSettings = explorationSettings;
window.restSettings = restSettings;
window.skillDatabase = skillDatabase;
window.skillPoolsByRealm = skillPoolsByRealm;
window.skillEffectHandlers = skillEffectHandlers;