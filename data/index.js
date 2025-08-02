// 数据模块入口文件
// 统一导出所有游戏数据，方便在游戏逻辑中引用

import realmLevels from './realms.js';
import { characterDefaults, realmBreakthroughBonuses } from './character.js';
import { monsterDatabase, monsterSkillEffects } from './monsters.js';
import itemEffects from './items.js';
import { dailyEvents, goodEvents, badEvents, normalEvents } from './events.js';
import { 
    difficultySettings, 
    combatSettings, 
    cultivationSettings, 
    explorationSettings, 
    restSettings 
} from './config.js';

export {
    // 境界数据
    realmLevels,
    
    // 角色数据
    characterDefaults,
    realmBreakthroughBonuses,
    
    // 妖兽数据
    monsterDatabase,
    monsterSkillEffects,
    
    // 物品数据
    itemEffects,
    
    // 事件数据
    dailyEvents,
    goodEvents,
    badEvents,
    normalEvents,
    
    // 配置数据
    difficultySettings,
    combatSettings,
    cultivationSettings,
    explorationSettings,
    restSettings
};