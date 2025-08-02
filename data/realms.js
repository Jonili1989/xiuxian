// 境界等级和对应的修为上限
const realmLevels = [
    { name: '练气', cap: 1000, dayLimit: 30, bossId: 'qi_boss' },
    { name: '筑基', cap: 2500, dayLimit: 50, bossId: 'foundation_boss' },
    { name: '金丹', cap: 6000, dayLimit: 80, bossId: 'golden_core_boss' },
    { name: '元婴', cap: 15000, dayLimit: 120, bossId: 'nascent_soul_boss' },
    { name: '化神', cap: 35000, dayLimit: 180, bossId: 'spirit_transformation_boss' },
    { name: '炼虚', cap: 80000, dayLimit: 250, bossId: 'void_refinement_boss' },
    { name: '合体', cap: 180000, dayLimit: 350, bossId: 'unity_boss' },
    { name: '大乘', cap: 400000, dayLimit: 500, bossId: 'mahayana_boss' },
    { name: '渡劫', cap: 1000000, dayLimit: 999, bossId: 'tribulation_boss' }
];

// 境界boss数据
const realmBosses = {
    qi_boss: {
        name: '练气期守护者',
        health: 80,
        attack: 12,
        defense: 8,
        speed: 5,
        skills: ['灵气冲击', '防御强化'],
        description: '掌控练气期奥秘的强大存在'
    },
    foundation_boss: {
        name: '筑基期霸主',
        health: 150,
        attack: 18,
        defense: 12,
        speed: 6,
        skills: ['基础爆发', '生命汲取'],
        description: '筑基期的终极考验'
    },
    golden_core_boss: {
        name: '金丹期圣者',
        health: 280,
        attack: 25,
        defense: 18,
        speed: 7,
        skills: ['金丹之力', '元气护盾'],
        description: '凝聚金丹的至强者'
    },
    nascent_soul_boss: {
        name: '元婴期仙君',
        health: 500,
        attack: 35,
        defense: 25,
        speed: 8,
        skills: ['元婴出窍', '灵魂攻击'],
        description: '元婴期的无上存在'
    },
    spirit_transformation_boss: {
        name: '化神期天尊',
        health: 900,
        attack: 50,
        defense: 35,
        speed: 9,
        skills: ['神识碾压', '空间撕裂'],
        description: '化神期的绝世强者'
    },
    void_refinement_boss: {
        name: '炼虚期帝君',
        health: 1600,
        attack: 70,
        defense: 50,
        speed: 10,
        skills: ['虚空掌控', '时空禁锢'],
        description: '炼虚期的至尊帝王'
    },
    unity_boss: {
        name: '合体期圣皇',
        health: 2800,
        attack: 95,
        defense: 70,
        speed: 11,
        skills: ['天地合一', '万法归宗'],
        description: '合体期的无敌圣皇'
    },
    mahayana_boss: {
        name: '大乘期仙帝',
        health: 5000,
        attack: 130,
        defense: 95,
        speed: 12,
        skills: ['大乘神通', '仙帝威压'],
        description: '大乘期的仙界帝王'
    },
    tribulation_boss: {
        name: '渡劫期天道',
        health: 8000,
        attack: 180,
        defense: 130,
        speed: 15,
        skills: ['天劫降临', '道法自然'],
        description: '渡劫期的天道化身'
    }
};

export { realmLevels, realmBosses };
export default realmLevels;