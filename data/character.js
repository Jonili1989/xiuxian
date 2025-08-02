// 角色初始属性和默认值
const characterDefaults = {
    // 基础属性
    health: 100,
    maxHealth: 100,
    attack: 10,
    defense: 5,
    luck: 5,
    maxLuck: 20,
    
    // 修炼相关
    cultivation: 0,
    realm: 0, // 当前境界索引
    
    // 游戏状态
    isGameStarted: false,
    day: 1,
    actionPoints: 5,
    maxActionPoints: 5
};

// 境界突破后的属性提升
const realmBreakthroughBonuses = {
    maxHealth: 20,
    attack: 2,
    defense: 2,
    maxActionPoints: 1
};

export { characterDefaults, realmBreakthroughBonuses };