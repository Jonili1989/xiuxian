// 技能系统数据定义

// 技能数据库
const skillDatabase = {
    // 攻击类技能
    '烈火斩': {
        name: '烈火斩',
        type: 'attack',
        description: '释放烈火之力，造成额外火焰伤害',
        triggerChance: 0.15,
        effects: {
            damageMultiplier: 1.5,
            elementType: 'fire'
        },
        message: '你释放烈火斩，火焰包围了敌人！'
    },
    '雷霆一击': {
        name: '雷霆一击',
        type: 'attack',
        description: '召唤雷电之力，有概率麻痹敌人',
        triggerChance: 0.12,
        effects: {
            damageMultiplier: 1.4,
            stunChance: 0.3,
            elementType: 'thunder'
        },
        message: '雷霆从天而降，电光闪烁！'
    },
    '寒冰刺': {
        name: '寒冰刺',
        type: 'attack',
        description: '凝聚寒冰之力，减缓敌人速度',
        triggerChance: 0.18,
        effects: {
            damageMultiplier: 1.3,
            slowEffect: 0.5,
            elementType: 'ice'
        },
        message: '寒冰凝聚成刺，刺骨的寒意袭来！'
    },
    '风刃斩': {
        name: '风刃斩',
        type: 'attack',
        description: '操控风之力量，提高攻击速度',
        triggerChance: 0.20,
        effects: {
            damageMultiplier: 1.2,
            speedBoost: 1.5,
            elementType: 'wind'
        },
        message: '风刃呼啸而过，快如闪电！'
    },
    '土石拳': {
        name: '土石拳',
        type: 'attack',
        description: '凝聚大地之力，造成重击伤害',
        triggerChance: 0.14,
        effects: {
            damageMultiplier: 1.6,
            armorPierce: 0.3,
            elementType: 'earth'
        },
        message: '大地之力汇聚于拳，重击如山！'
    },
    
    // 防御类技能
    '金刚护体': {
        name: '金刚护体',
        type: 'defense',
        description: '激活护体真气，大幅减少受到的伤害',
        triggerChance: 0.10,
        effects: {
            damageReduction: 0.5,
            duration: 3
        },
        message: '金光护体，真气环绕！'
    },
    '灵盾术': {
        name: '灵盾术',
        type: 'defense',
        description: '凝聚灵力护盾，完全抵挡一次攻击',
        triggerChance: 0.08,
        effects: {
            blockNextAttack: true
        },
        message: '灵力凝聚成盾，光芒闪耀！'
    },
    '反震护甲': {
        name: '反震护甲',
        type: 'defense',
        description: '受到攻击时反弹部分伤害给敌人',
        triggerChance: 0.12,
        effects: {
            reflectDamage: 0.3,
            damageReduction: 0.2
        },
        message: '护甲闪烁，反震之力激活！'
    },
    
    // 恢复类技能
    '回春术': {
        name: '回春术',
        type: 'heal',
        description: '快速恢复生命值',
        triggerChance: 0.15,
        effects: {
            healAmount: 0.2,
            healType: 'percentage'
        },
        message: '生命之力涌动，伤势快速愈合！'
    },
    '真气回流': {
        name: '真气回流',
        type: 'heal',
        description: '调动体内真气，持续恢复生命',
        triggerChance: 0.10,
        effects: {
            healOverTime: 5,
            duration: 3
        },
        message: '真气在体内循环，生机勃勃！'
    },
    
    // 辅助类技能
    '洞察术': {
        name: '洞察术',
        type: 'utility',
        description: '看破敌人弱点，提高暴击率',
        triggerChance: 0.12,
        effects: {
            critChanceBoost: 0.3,
            duration: 5
        },
        message: '慧眼如炬，敌人弱点一览无余！'
    },
    '疾风步': {
        name: '疾风步',
        type: 'utility',
        description: '提高闪避能力和移动速度',
        triggerChance: 0.15,
        effects: {
            dodgeBoost: 0.4,
            speedBoost: 1.3,
            duration: 4
        },
        message: '身如疾风，飘忽不定！'
    },
    '聚气凝神': {
        name: '聚气凝神',
        type: 'utility',
        description: '凝聚精神力，提升所有属性',
        triggerChance: 0.08,
        effects: {
            allStatsBoost: 0.2,
            duration: 3
        },
        message: '精神高度集中，实力全面提升！'
    },
    
    // 特殊技能
    '血祭之术': {
        name: '血祭之术',
        type: 'special',
        description: '消耗生命值换取强大攻击力',
        triggerChance: 0.05,
        effects: {
            healthCost: 0.15,
            damageMultiplier: 2.5
        },
        message: '以血为祭，换取毁灭之力！'
    },
    '涅槃重生': {
        name: '涅槃重生',
        type: 'special',
        description: '濒死时触发，完全恢复生命值',
        triggerChance: 0.03,
        effects: {
            revive: true,
            fullHeal: true
        },
        message: '凤凰涅槃，浴火重生！'
    },
    '时空扭曲': {
        name: '时空扭曲',
        type: 'special',
        description: '扭曲时空，获得额外行动机会',
        triggerChance: 0.04,
        effects: {
            extraTurn: true
        },
        message: '时空扭曲，时间为你停滞！'
    }
};

// 按境界分类的技能池
const skillPoolsByRealm = {
    0: ['烈火斩', '回春术', '疾风步'], // 练气期
    1: ['雷霆一击', '金刚护体', '洞察术'], // 筑基期
    2: ['寒冰刺', '灵盾术', '真气回流'], // 金丹期
    3: ['风刃斩', '反震护甲', '聚气凝神'], // 元婴期
    4: ['土石拳', '血祭之术'], // 化神期
    5: ['涅槃重生'], // 炼虚期
    6: ['时空扭曲'], // 合体期
    7: [], // 大乘期
    8: [] // 渡劫期
};

// 技能效果处理函数
const skillEffectHandlers = {
    // 处理攻击技能效果
    processAttackSkill: (skill, baseDamage, target) => {
        let finalDamage = baseDamage;
        const effects = skill.effects;
        
        if (effects.damageMultiplier) {
            finalDamage = Math.floor(finalDamage * effects.damageMultiplier);
        }
        
        if (effects.armorPierce) {
            // 穿甲效果，忽略部分防御
            const piercedDefense = Math.floor(target.defense * effects.armorPierce);
            finalDamage += piercedDefense;
        }
        
        return {
            damage: finalDamage,
            stunChance: effects.stunChance || 0,
            slowEffect: effects.slowEffect || 0,
            speedBoost: effects.speedBoost || 0
        };
    },
    
    // 处理防御技能效果
    processDefenseSkill: (skill, incomingDamage) => {
        let finalDamage = incomingDamage;
        const effects = skill.effects;
        
        if (effects.blockNextAttack) {
            return { damage: 0, blocked: true };
        }
        
        if (effects.damageReduction) {
            finalDamage = Math.floor(finalDamage * (1 - effects.damageReduction));
        }
        
        let reflectedDamage = 0;
        if (effects.reflectDamage) {
            reflectedDamage = Math.floor(incomingDamage * effects.reflectDamage);
        }
        
        return {
            damage: finalDamage,
            reflectedDamage: reflectedDamage,
            duration: effects.duration || 0
        };
    },
    
    // 处理恢复技能效果
    processHealSkill: (skill, currentHealth, maxHealth) => {
        const effects = skill.effects;
        let healAmount = 0;
        
        if (effects.healType === 'percentage') {
            healAmount = Math.floor(maxHealth * effects.healAmount);
        } else {
            healAmount = effects.healAmount || 0;
        }
        
        return {
            healAmount: healAmount,
            healOverTime: effects.healOverTime || 0,
            duration: effects.duration || 0
        };
    },
    
    // 处理辅助技能效果
    processUtilitySkill: (skill) => {
        const effects = skill.effects;
        
        return {
            critChanceBoost: effects.critChanceBoost || 0,
            dodgeBoost: effects.dodgeBoost || 0,
            speedBoost: effects.speedBoost || 0,
            allStatsBoost: effects.allStatsBoost || 0,
            duration: effects.duration || 0
        };
    },
    
    // 处理特殊技能效果
    processSpecialSkill: (skill, gameState) => {
        const effects = skill.effects;
        const result = {};
        
        if (effects.healthCost) {
            const healthCost = Math.floor(gameState.maxHealth * effects.healthCost);
            result.healthCost = healthCost;
        }
        
        if (effects.revive && gameState.health <= 0) {
            result.revive = true;
            if (effects.fullHeal) {
                result.healToFull = true;
            }
        }
        
        if (effects.extraTurn) {
            result.extraTurn = true;
        }
        
        if (effects.damageMultiplier) {
            result.damageMultiplier = effects.damageMultiplier;
        }
        
        return result;
    }
};

export { skillDatabase, skillPoolsByRealm, skillEffectHandlers };