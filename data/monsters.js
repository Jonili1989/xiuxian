// 妖兽类型定义
const monsterDatabase = {
    // 基础妖兽
    1: { 
        name: '狐妖', 
        health: 40, 
        attack: 6, 
        defense: 3, 
        speed: 8, 
        skills: ['魅惑', '连击'], 
        dropRate: 0.3, 
        dropItem: '狐尾',
        tier: 'basic'
    },
    2: { 
        name: '狼妖', 
        health: 50, 
        attack: 8, 
        defense: 4, 
        speed: 6, 
        skills: ['撕咬', '狂怒'], 
        dropRate: 0.4, 
        dropItem: '狼牙',
        tier: 'basic'
    },
    3: { 
        name: '熊罴', 
        health: 70, 
        attack: 10, 
        defense: 6, 
        speed: 3, 
        skills: ['拍击', '吼叫'], 
        dropRate: 0.2, 
        dropItem: '熊胆',
        tier: 'basic'
    },
    4: { 
        name: '蛇精', 
        health: 35, 
        attack: 7, 
        defense: 2, 
        speed: 7, 
        skills: ['毒牙', '缠绕'], 
        dropRate: 0.5, 
        dropItem: '蛇胆',
        tier: 'basic'
    },
    5: { 
        name: '虎妖', 
        health: 60, 
        attack: 9, 
        defense: 5, 
        speed: 5, 
        skills: ['猛扑', '嗜血'], 
        dropRate: 0.3, 
        dropItem: '虎骨',
        tier: 'basic'
    },
    
    // 进阶妖兽（属性增强版本）
    101: { 
        name: '九尾狐妖', 
        health: 55, 
        attack: 8, 
        defense: 4, 
        speed: 10, 
        skills: ['魅惑', '连击'], 
        dropRate: 0.4, 
        dropItem: '九尾狐尾',
        tier: 'advanced'
    },
    102: { 
        name: '银月狼王', 
        health: 70, 
        attack: 11, 
        defense: 6, 
        speed: 8, 
        skills: ['撕咬', '狂怒'], 
        dropRate: 0.5, 
        dropItem: '银月狼牙',
        tier: 'advanced'
    },
    103: { 
        name: '铁甲熊王', 
        health: 95, 
        attack: 14, 
        defense: 9, 
        speed: 4, 
        skills: ['拍击', '吼叫'], 
        dropRate: 0.3, 
        dropItem: '铁甲熊胆',
        tier: 'advanced'
    },
    104: { 
        name: '碧鳞蛇皇', 
        health: 50, 
        attack: 10, 
        defense: 3, 
        speed: 9, 
        skills: ['毒牙', '缠绕'], 
        dropRate: 0.6, 
        dropItem: '碧鳞蛇胆',
        tier: 'advanced'
    },
    105: { 
        name: '白虎妖王', 
        health: 85, 
        attack: 13, 
        defense: 7, 
        speed: 7, 
        skills: ['猛扑', '嗜血'], 
        dropRate: 0.4, 
        dropItem: '白虎王骨',
        tier: 'advanced'
    }
};

// 妖兽技能效果定义
const monsterSkillEffects = {
    '魅惑': {
        description: '使目标攻击力暂时下降',
        damageMultiplier: 1.2,
        defenseMultiplier: 1.0
    },
    '连击': {
        description: '连续攻击两次',
        extraAttack: true,
        damageMultiplier: 1.0
    },
    '撕咬': {
        description: '造成额外伤害',
        damageMultiplier: 1.3
    },
    '狂怒': {
        description: '攻击力大幅提升',
        damageMultiplier: 1.5
    },
    '拍击': {
        description: '有几率击晕目标',
        damageMultiplier: 1.4,
        stunChance: 0.3
    },
    '吼叫': {
        description: '使目标防御力暂时下降',
        defenseMultiplier: 0.8
    },
    '毒牙': {
        description: '使目标中毒，持续受到伤害',
        damageMultiplier: 1.1,
        poisonDamage: 3,
        poisonDuration: 2
    },
    '缠绕': {
        description: '使目标无法移动',
        immobilizeDuration: 1
    },
    '猛扑': {
        description: '造成巨大伤害',
        damageMultiplier: 1.6
    },
    '嗜血': {
        description: '攻击后恢复生命值',
        lifeStealRatio: 0.33
    },
    // 境界boss技能
    '灵气冲击': {
        description: '释放强大的灵气攻击',
        damageMultiplier: 1.5
    },
    '防御强化': {
        description: '大幅提升防御力',
        defenseMultiplier: 1.5
    },
    '基础爆发': {
        description: '爆发全部力量进行攻击',
        damageMultiplier: 1.8
    },
    '生命汲取': {
        description: '攻击时大量恢复生命值',
        lifeStealRatio: 0.5
    },
    '金丹之力': {
        description: '金丹释放恐怖力量',
        damageMultiplier: 2.0
    },
    '元气护盾': {
        description: '元气形成强大护盾',
        defenseMultiplier: 2.0
    },
    '元婴出窍': {
        description: '元婴攻击，无视防御',
        ignoreDefense: true,
        damageMultiplier: 1.5
    },
    '灵魂攻击': {
        description: '直接攻击灵魂',
        damageMultiplier: 1.7,
        stunChance: 0.4
    },
    '神识碾压': {
        description: '神识碾压敌人心智',
        damageMultiplier: 2.2,
        stunChance: 0.5
    },
    '空间撕裂': {
        description: '撕裂空间进行攻击',
        damageMultiplier: 2.5
    },
    '虚空掌控': {
        description: '掌控虚空之力',
        damageMultiplier: 2.8,
        ignoreDefense: true
    },
    '时空禁锢': {
        description: '禁锢敌人于时空中',
        immobilizeDuration: 2,
        damageMultiplier: 1.5
    },
    '天地合一': {
        description: '与天地合为一体',
        damageMultiplier: 3.0,
        defenseMultiplier: 2.5
    },
    '万法归宗': {
        description: '万法归于一宗',
        damageMultiplier: 3.5
    },
    '大乘神通': {
        description: '大乘期的无上神通',
        damageMultiplier: 4.0,
        ignoreDefense: true
    },
    '仙帝威压': {
        description: '仙帝的恐怖威压',
        damageMultiplier: 2.0,
        stunChance: 0.7
    },
    '天劫降临': {
        description: '召唤天劫攻击敌人',
        damageMultiplier: 5.0,
        ignoreDefense: true
    },
    '道法自然': {
        description: '道法自然，返璞归真',
        damageMultiplier: 4.5,
        lifeStealRatio: 0.8
    }
};

export { monsterDatabase, monsterSkillEffects };