// 妖兽类型定义
const monsterDatabase = {
    1: { 
        name: '狐妖', 
        health: 40, 
        attack: 6, 
        defense: 3, 
        speed: 8, 
        skills: ['魅惑', '连击'], 
        dropRate: 0.3, 
        dropItem: '狐尾' 
    },
    2: { 
        name: '狼妖', 
        health: 50, 
        attack: 8, 
        defense: 4, 
        speed: 6, 
        skills: ['撕咬', '狂怒'], 
        dropRate: 0.4, 
        dropItem: '狼牙' 
    },
    3: { 
        name: '熊罴', 
        health: 70, 
        attack: 10, 
        defense: 6, 
        speed: 3, 
        skills: ['拍击', '吼叫'], 
        dropRate: 0.2, 
        dropItem: '熊胆' 
    },
    4: { 
        name: '蛇精', 
        health: 35, 
        attack: 7, 
        defense: 2, 
        speed: 7, 
        skills: ['毒牙', '缠绕'], 
        dropRate: 0.5, 
        dropItem: '蛇胆' 
    },
    5: { 
        name: '虎妖', 
        health: 60, 
        attack: 9, 
        defense: 5, 
        speed: 5, 
        skills: ['猛扑', '嗜血'], 
        dropRate: 0.3, 
        dropItem: '虎骨' 
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
    }
};

export { monsterDatabase, monsterSkillEffects };