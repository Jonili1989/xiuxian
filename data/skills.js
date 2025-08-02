// 技能系统数据定义

// 技能数据库
const skillDatabase = {
    // 攻击类技能
    '九天焚炎诀': {
        name: '九天焚炎诀',
        type: 'attack',
        description: '引动九天真火，焚尽万物',
        triggerChance: 0.15,
        effects: {
            damageMultiplier: 1.5,
            elementType: 'fire'
        },
        message: '九天真火降世，焚尽一切！'
    },
    '紫霄神雷术': {
        name: '紫霄神雷术',
        type: 'attack',
        description: '召唤紫霄神雷，雷威震慑敌胆',
        triggerChance: 0.12,
        effects: {
            damageMultiplier: 1.4,
            stunChance: 0.3,
            elementType: 'thunder'
        },
        message: '紫霄神雷轰鸣，雷光耀世！'
    },
    '玄冰千里冻': {
        name: '玄冰千里冻',
        type: 'attack',
        description: '施展玄冰奥义，冰封万里',
        triggerChance: 0.18,
        effects: {
            damageMultiplier: 1.3,
            slowEffect: 0.5,
            elementType: 'ice'
        },
        message: '玄冰之力席卷，万物凝结！'
    },
    '御风无影斩': {
        name: '御风无影斩',
        type: 'attack',
        description: '御风而行，剑气如影随形',
        triggerChance: 0.20,
        effects: {
            damageMultiplier: 1.2,
            speedBoost: 1.5,
            elementType: 'wind'
        },
        message: '御风而行，剑影无踪！'
    },
    '撼山震地拳': {
        name: '撼山震地拳',
        type: 'attack',
        description: '汇聚大地精华，拳威撼山岳',
        triggerChance: 0.14,
        effects: {
            damageMultiplier: 1.6,
            armorPierce: 0.3,
            elementType: 'earth'
        },
        message: '大地精华汇聚，拳威撼山岳！'
    },
    
    // 防御类技能
    '不灭金身诀': {
        name: '不灭金身诀',
        type: 'defense',
        description: '修炼不灭金身，万法不侵',
        triggerChance: 0.10,
        effects: {
            damageReduction: 0.5,
            duration: 3
        },
        message: '金身显现，万法不侵！'
    },
    '太极玄天盾': {
        name: '太极玄天盾',
        type: 'defense',
        description: '凝聚太极玄力，化解一切攻击',
        triggerChance: 0.08,
        effects: {
            blockNextAttack: true
        },
        message: '太极玄盾现，阴阳护体！'
    },
    '天罡反噬阵': {
        name: '天罡反噬阵',
        type: 'defense',
        description: '布下天罡大阵，反噬敌人攻击',
        triggerChance: 0.12,
        effects: {
            reflectDamage: 0.3,
            damageReduction: 0.2
        },
        message: '天罡大阵启动，反噬之力涌现！'
    },
    
    // 恢复类技能
    '太乙回生术': {
        name: '太乙回生术',
        type: 'heal',
        description: '运转太乙玄功，起死回生',
        triggerChance: 0.15,
        effects: {
            healAmount: 0.2,
            healType: 'percentage'
        },
        message: '太乙玄光普照，生机重现！'
    },
    '天地灵气诀': {
        name: '天地灵气诀',
        type: 'heal',
        description: '吸纳天地灵气，滋养肉身',
        triggerChance: 0.10,
        effects: {
            healOverTime: 5,
            duration: 3
        },
        message: '天地灵气汇聚，生机盎然！'
    },
    
    // 辅助类技能
    '天眼通明诀': {
        name: '天眼通明诀',
        type: 'utility',
        description: '开启天眼，洞察万物本源',
        triggerChance: 0.12,
        effects: {
            critChanceBoost: 0.3,
            duration: 5
        },
        message: '天眼开启，万物本源尽显！'
    },
    '凌波微步': {
        name: '凌波微步',
        type: 'utility',
        description: '身法如仙，踏波而行',
        triggerChance: 0.15,
        effects: {
            dodgeBoost: 0.4,
            speedBoost: 1.3,
            duration: 4
        },
        message: '凌波微步现，身如游龙！'
    },
    '万法归一诀': {
        name: '万法归一诀',
        type: 'utility',
        description: '万法归一，道法自然',
        triggerChance: 0.08,
        effects: {
            allStatsBoost: 0.2,
            duration: 3
        },
        message: '万法归一，道法自然！'
    },
    
    // 特殊技能
    '燃血魔功': {
        name: '燃血魔功',
        type: 'special',
        description: '燃烧精血，换取无上神威',
        triggerChance: 0.05,
        effects: {
            healthCost: 0.15,
            damageMultiplier: 2.5
        },
        message: '精血燃烧，魔威滔天！'
    },
    '凤凰涅槃诀': {
        name: '凤凰涅槃诀',
        type: 'special',
        description: '凤凰涅槃，浴火重生',
        triggerChance: 0.03,
        effects: {
            revive: true,
            fullHeal: true
        },
        message: '凤凰涅槃，浴火重生！'
    },
    '乾坤大挪移': {
        name: '乾坤大挪移',
        type: 'special',
        description: '挪移乾坤，逆转时空',
        triggerChance: 0.04,
        effects: {
            extraTurn: true
        },
        message: '乾坤挪移，时空逆转！'
    }
};

// 按境界分类的技能池
const skillPoolsByRealm = {
    0: ['九天焚炎诀', '太乙回生术', '凌波微步'], // 练气期
    1: ['紫霄神雷术', '不灭金身诀', '天眼通明诀'], // 筑基期
    2: ['玄冰千里冻', '太极玄天盾', '天地灵气诀'], // 金丹期
    3: ['御风无影斩', '天罡反噬阵', '万法归一诀'], // 元婴期
    4: ['撼山震地拳', '燃血魔功'], // 化神期
    5: ['凤凰涅槃诀'], // 炼虚期
    6: ['乾坤大挪移'], // 合体期
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