// 突破奇遇事件数据

// 突破前的奇遇事件，影响心魔的战斗力
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

export { breakthroughEvents };