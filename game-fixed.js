// 游戏主逻辑文件
// 由于ES模块加载问题，改为直接引用数据
// 这些变量将通过data-loader-fixed.js脚本提前加载

// 游戏状态对象
let gameState = {};

// 在DOM加载完成后初始化游戏状态
document.addEventListener('DOMContentLoaded', () => {
    // 确保characterDefaults已加载
    if (window.characterDefaults) {
        gameState = { ...window.characterDefaults };
        
        // 随机调整攻击力、防御力和幸运值
        const attackVariance = Math.floor(Math.random() * 5) - 2; // -2到+2的随机值
        const defenseVariance = Math.floor(Math.random() * 5) - 2; // -2到+2的随机值
        const luckVariance = Math.floor(Math.random() * 3) - 1; // -1到+1的随机值
        
        // 确保属性不会低于1
        gameState.attack = Math.max(1, gameState.attack + attackVariance);
        gameState.defense = Math.max(1, gameState.defense + defenseVariance);
        gameState.luck = Math.max(1, Math.min(gameState.maxLuck, gameState.luck + luckVariance));
        
        // 初始化UI
        updateUI();
        
        // 设置事件监听器
        setupEventListeners();
    } else {
        alert('错误: 游戏数据未正确加载，请刷新页面重试');
    }
});

// 游戏函数和状态

// DOM元素引用
const elements = {
    health: document.getElementById('health'),
    maxHealth: document.getElementById('max-health'),
    attack: document.getElementById('attack'),
    defense: document.getElementById('defense'),
    luck: document.getElementById('luck'),
    cultivation: document.getElementById('cultivation'),
    cultivationCap: document.getElementById('cultivation-cap'),
    cultivationBar: document.getElementById('cultivation-bar'),
    realm: document.getElementById('realm'),
    healthBar: document.getElementById('health-bar'),
    actionBar: document.getElementById('action-bar'),
    actionPoints: document.getElementById('action-points'),
    maxActionPoints: document.getElementById('max-action-points'),
    day: document.getElementById('day'),
    logContainer: document.getElementById('log-container'),
    startGameBtn: document.getElementById('start-game'),
    meditateBtn: document.getElementById('meditate'),
    exploreBtn: document.getElementById('explore'),
    restBtn: document.getElementById('rest'),
    endDayBtn: document.getElementById('end-day')
};

// 初始化游戏
function initGame() {
    // 开始游戏，不重置属性值（保持页面加载时的随机值）
    gameState.isGameStarted = true;
    
    // 重置其他游戏状态
    gameState.health = gameState.maxHealth;
    gameState.cultivation = 0;
    gameState.realm = 0;
    gameState.day = 1;
    gameState.actionPoints = gameState.maxActionPoints;

    // 显示游戏统计和事件日志
    document.getElementById('game-stats').classList.remove('hidden');
    document.getElementById('event-log').classList.remove('hidden');

    // 更新UI
    updateUI();

    // 添加游戏开始日志
    addLog('游戏开始！祝你修仙顺利！', 'neutral');
    addLog(`你的属性：攻击力 ${gameState.attack}，防御力 ${gameState.defense}，幸运值 ${gameState.luck}。`, 'neutral');
    addLog(`第${gameState.day}天开始了，你有${gameState.actionPoints}点行动力。`, 'neutral');

    // 禁用开始按钮，启用其他按钮
    elements.startGameBtn.disabled = true;
    elements.meditateBtn.disabled = false;
    elements.exploreBtn.disabled = false;
    elements.restBtn.disabled = false;
    elements.endDayBtn.disabled = false;
}

// 设置事件监听器
function setupEventListeners() {
    // 开始游戏按钮
    elements.startGameBtn.addEventListener('click', initGame);
    
    // 修炼按钮
    elements.meditateBtn.addEventListener('click', meditate);
    
    // 探索按钮
    elements.exploreBtn.addEventListener('click', explore);
    
    // 恢复养伤按钮
    elements.restBtn.addEventListener('click', rest);
    
    // 结束今天按钮
    elements.endDayBtn.addEventListener('click', endDay);
}

// 更新UI
function updateUI() {
    elements.health.textContent = gameState.health;
    elements.maxHealth.textContent = gameState.maxHealth;
    elements.attack.textContent = gameState.attack;
    elements.defense.textContent = gameState.defense;
    elements.luck.textContent = gameState.luck;
    elements.day.textContent = gameState.day;
    elements.actionPoints.textContent = gameState.actionPoints;
    elements.maxActionPoints.textContent = gameState.maxActionPoints;

    // 更新修为和境界
    elements.cultivation.textContent = gameState.cultivation;
    const currentRealm = window.realmLevels[gameState.realm];
    elements.realm.textContent = currentRealm.name;
    elements.cultivationCap.textContent = currentRealm.cap;

    // 更新进度条
    const healthPercent = (gameState.health / gameState.maxHealth) * 100;
    elements.healthBar.style.width = `${healthPercent}%`;

    const actionPercent = (gameState.actionPoints / gameState.maxActionPoints) * 100;
    elements.actionBar.style.width = `${actionPercent}%`;

    const cultivationPercent = (gameState.cultivation / currentRealm.cap) * 100;
    elements.cultivationBar.style.width = `${cultivationPercent}%`;

    // 根据行动力禁用/启用按钮
    const noActionPoints = gameState.actionPoints <= 0;
    elements.meditateBtn.disabled = noActionPoints || !gameState.isGameStarted;
    elements.exploreBtn.disabled = noActionPoints || !gameState.isGameStarted;
    elements.restBtn.disabled = noActionPoints || !gameState.isGameStarted;
    elements.endDayBtn.disabled = !gameState.isGameStarted;
}

// 添加日志
function addLog(message, type = 'neutral') {
    const logEntry = document.createElement('div');
    logEntry.className = `log-entry ${type}`;
    logEntry.textContent = message;
    elements.logContainer.appendChild(logEntry);
    elements.logContainer.scrollTop = elements.logContainer.scrollHeight;
}

// 游戏结束
function gameOver() {
    addLog('你的生命值耗尽，但死亡并非终点...', 'negative');
    
    // 禁用所有游戏按钮
    elements.meditateBtn.disabled = true;
    elements.exploreBtn.disabled = true;
    elements.restBtn.disabled = true;
    elements.endDayBtn.disabled = true;
    
    // 显示轮回按钮
    showReincarnationButton();
}

// 显示轮回按钮
function showReincarnationButton() {
    // 检查是否已经存在轮回按钮
    if (document.getElementById('reincarnation-btn')) {
        return;
    }
    
    const reincarnationBtn = document.createElement('button');
    reincarnationBtn.id = 'reincarnation-btn';
    reincarnationBtn.className = 'action-btn';
    reincarnationBtn.textContent = '轮回重生';
    reincarnationBtn.onclick = () => {
        reincarnationSystem.startReincarnation(gameState);
        reincarnationBtn.remove();
    };
    
    // 将按钮添加到游戏操作区域
    const actionsContainer = document.querySelector('.game-controls');
    actionsContainer.appendChild(reincarnationBtn);
}

// 恢复养伤
function rest() {
    if (gameState.actionPoints <= 0) {
        addLog('你没有足够的行动力！', 'negative');
        return;
    }

    // 消耗行动力
    gameState.actionPoints -= window.restSettings.actionPointCost || 1;

    // 计算恢复量
    const minRecovery = window.restSettings.minHealthRecovery;
    const maxRecovery = window.restSettings.maxHealthRecovery;
    const luckBonus = gameState.luck * window.restSettings.luckImpactOnRecovery;
    
    const recoveryAmount = Math.floor(Math.random() * (maxRecovery - minRecovery + 1)) + minRecovery + luckBonus;
    const oldHealth = gameState.health;
    gameState.health = Math.min(gameState.health + recoveryAmount, gameState.maxHealth);
    const actualRecovery = gameState.health - oldHealth;

    addLog(`你休息了一会儿，恢复了${actualRecovery}点生命值。`, 'positive');
    updateUI();
}

// 结束今天
function endDay() {
    gameState.day++;
    gameState.actionPoints = gameState.maxActionPoints;
    
    // 处理每日事件
    handleDailyEvent();
    
    addLog(`第${gameState.day}天开始了，你有${gameState.actionPoints}点行动力。`, 'neutral');
    updateUI();
}

// 处理每日事件
function handleDailyEvent() {
    // 随机选择一个事件
    const event = window.dailyEvents[Math.floor(Math.random() * window.dailyEvents.length)];
    
    addLog(`【每日事件】${event.text}`, event.type);
    const result = event.effect(gameState);
    if (result) {
        addLog(`效果：${result}`, event.type);
    }
    
    // 检查是否可以突破
    checkRealmBreakthrough();
}

// 检查是否可以突破境界
function checkRealmBreakthrough() {
    const currentRealm = window.realmLevels[gameState.realm];
    const nextRealmIndex = gameState.realm + 1;
    
    // 如果已经是最高境界，则不能再突破
    if (nextRealmIndex >= window.realmLevels.length) {
        return;
    }
    
    // 如果修为达到当前境界上限，显示突破按钮
    if (gameState.cultivation >= currentRealm.cap) {
        addLog('你的修为已达到当前境界上限，可以尝试突破了！', 'positive');
        
        // 创建突破按钮
        const breakthroughBtn = document.createElement('button');
        breakthroughBtn.textContent = '尝试突破';
        breakthroughBtn.className = 'breakthrough-btn';
        breakthroughBtn.addEventListener('click', performBreakthrough);
        
        // 添加到日志容器
        elements.logContainer.appendChild(breakthroughBtn);
        elements.logContainer.scrollTop = elements.logContainer.scrollHeight;
    }
}

// 执行境界突破
function performBreakthrough() {
    // 移除所有突破按钮
    document.querySelectorAll('.breakthrough-btn').forEach(btn => btn.remove());
    
    // 计算突破成功率
    const baseChance = window.cultivationSettings.breakthroughBaseChance;
    const luckBonus = gameState.luck * 0.02; // 每点幸运增加2%成功率
    const successChance = Math.min(baseChance + luckBonus, 0.95); // 最高95%成功率
    
    // 随机决定是否成功
    const isSuccess = Math.random() < successChance;
    
    if (isSuccess) {
        // 突破成功
        gameState.realm++;
        const newRealm = window.realmLevels[gameState.realm];
        
        // 应用突破奖励
        gameState.maxHealth += window.realmBreakthroughBonuses.health;
        gameState.health = gameState.maxHealth; // 突破后恢复满生命
        gameState.attack += window.realmBreakthroughBonuses.attack;
        gameState.defense += window.realmBreakthroughBonuses.defense;
        gameState.maxActionPoints += window.realmBreakthroughBonuses.actionPoints;
        gameState.actionPoints = gameState.maxActionPoints; // 突破后恢复满行动力
        
        // 重置修为为0
        gameState.cultivation = 0;
        
        addLog(`恭喜！你成功突破到了${newRealm.name}境界！`, 'positive');
        addLog('你感到体内灵力充盈，各项属性得到了提升！', 'positive');
    } else {
        // 突破失败
        const penaltyRatio = window.cultivationSettings.failedBreakthroughPenalty;
        gameState.cultivation = Math.floor(gameState.cultivation * penaltyRatio);
        
        // 生命值惩罚
        const healthPenalty = window.cultivationSettings.breakthroughHealthPenalty;
        gameState.health = Math.max(1, gameState.health - healthPenalty);
        
        addLog('突破失败！你感到一阵心悸，修为受到了损失。', 'negative');
        addLog(`你损失了一些修为和${healthPenalty}点生命值。`, 'negative');
    }
    
    updateUI();
}

// 修炼
function meditate() {
    if (gameState.actionPoints <= 0) {
        addLog('你没有足够的行动力！', 'negative');
        return;
    }

    // 消耗行动力
    gameState.actionPoints -= window.cultivationSettings.actionPointCost;

    // 计算获得的修为
    const baseCultivationGain = window.cultivationSettings.baseCultivationGain;
    const variance = baseCultivationGain * window.cultivationSettings.variancePercentage;
    const luckBonus = gameState.luck * window.cultivationSettings.luckImpact;
    
    const cultivationGain = Math.floor(
        baseCultivationGain + 
        (Math.random() * variance * 2 - variance) + 
        luckBonus
    );
    
    gameState.cultivation += cultivationGain;
    addLog(`你静心修炼，获得了${cultivationGain}点修为。`, 'positive');
    
    // 随机提升属性
    const attributeUpgradeChance = window.cultivationSettings.attributeUpgradeChance;
    if (Math.random() < attributeUpgradeChance) {
        // 随机选择一个属性提升
        const attributes = ['attack', 'defense', 'luck'];
        const attribute = attributes[Math.floor(Math.random() * attributes.length)];
        
        if (attribute === 'luck' && gameState.luck >= gameState.maxLuck) {
            // 如果幸运已达上限，改为提升攻击
            gameState.attack += 1;
            addLog('你在修炼中有所领悟，攻击力+1！', 'positive');
        } else {
            // 提升选中的属性
            gameState[attribute] += 1;
            
            const attributeNames = {
                attack: '攻击力',
                defense: '防御力',
                luck: '幸运值'
            };
            
            addLog(`你在修炼中有所领悟，${attributeNames[attribute]}+1！`, 'positive');
        }
    }
    
    // 检查是否可以突破
    checkRealmBreakthrough();
    
    // 更新UI
    updateUI();
}

// 探索
function explore() {
    if (gameState.actionPoints <= 0) {
        addLog('你没有足够的行动力！', 'negative');
        return;
    }

    // 消耗行动力
    gameState.actionPoints -= window.explorationSettings.actionPointCost;

    addLog('你外出探索...', 'neutral');
    
    // 决定探索结果
    const eventRoll = Math.random();
    
    if (eventRoll < window.explorationSettings.combatChance) {
        // 遭遇战斗
        handleCombat();
    } else if (eventRoll < window.explorationSettings.combatChance + window.explorationSettings.goodEventChance) {
        // 遭遇好事件
        handleGoodEvent();
    } else if (eventRoll < window.explorationSettings.combatChance + window.explorationSettings.goodEventChance + window.explorationSettings.badEventChance) {
        // 遭遇坏事件
        handleBadEvent();
    } else {
        // 普通探索，可能发现物品
        const itemFindChance = window.explorationSettings.itemFindChance + (gameState.luck * window.explorationSettings.luckImpactOnItemFind);
        
        if (Math.random() < itemFindChance) {
            // 找到物品
            findItem();
        } else {
            addLog('你探索了一段时间，但没有发现什么特别的东西。', 'neutral');
        }
    }
    
    updateUI();
}

// 处理好事件
function handleGoodEvent() {
    const event = window.goodEvents[Math.floor(Math.random() * window.goodEvents.length)];
    
    addLog(`【好事件】${event.text}`, 'positive');
    const result = event.effect(gameState);
    if (result) {
        addLog(`效果：${result}`, 'positive');
    }
}

// 处理坏事件
function handleBadEvent() {
    const event = window.badEvents[Math.floor(Math.random() * window.badEvents.length)];
    
    addLog(`【坏事件】${event.text}`, 'negative');
    const result = event.effect(gameState);
    if (result) {
        addLog(`效果：${result}`, 'negative');
    }
    
    // 检查是否游戏结束
    if (gameState.health <= 0) {
        gameOver();
    }
}

// 处理战斗
function handleCombat() {
    // 随机选择一个妖兽
    const monsterKeys = Object.keys(window.monsterDatabase);
    const randomMonsterKey = monsterKeys[Math.floor(Math.random() * monsterKeys.length)];
    const monster = window.monsterDatabase[randomMonsterKey];
    
    // 创建妖兽实例
    const monsterInstance = {
        ...monster,
        currentHealth: monster.health
    };
    
    addLog(`你遇到了一只${monster.name}！`, 'negative');
    
    // 开始战斗回合
    startCombatRound(monsterInstance);
}

// 战斗回合
function startCombatRound(monster) {
    // 玩家先攻
    playerAttack(monster);
    
    // 如果妖兽还活着，妖兽反击
    if (monster.currentHealth > 0) {
        monsterAttack(monster);
        
        // 如果玩家还活着，继续下一回合
        if (gameState.health > 0) {
            // 创建战斗选项按钮
            const combatOptionsDiv = document.createElement('div');
            combatOptionsDiv.className = 'combat-options';
            
            const attackBtn = document.createElement('button');
            attackBtn.textContent = '攻击';
            attackBtn.addEventListener('click', () => {
                // 移除战斗选项
                combatOptionsDiv.remove();
                // 继续战斗
                startCombatRound(monster);
            });
            
            const fleeBtn = document.createElement('button');
            fleeBtn.textContent = '逃跑';
            fleeBtn.addEventListener('click', () => {
                // 移除战斗选项
                combatOptionsDiv.remove();
                // 尝试逃跑
                tryToFlee(monster);
            });
            
            combatOptionsDiv.appendChild(attackBtn);
            combatOptionsDiv.appendChild(fleeBtn);
            
            elements.logContainer.appendChild(combatOptionsDiv);
            elements.logContainer.scrollTop = elements.logContainer.scrollHeight;
        } else {
            // 玩家死亡，游戏结束
            gameOver();
        }
    } else {
        // 妖兽死亡，战斗结束
        endCombat(monster);
    }
}

// 玩家攻击
function playerAttack(monster) {
    // 计算伤害
    const baseDamage = gameState.attack - monster.defense;
    const damageVariance = baseDamage * window.combatSettings.playerDamageVariance;
    let damage = Math.max(1, Math.floor(baseDamage + (Math.random() * damageVariance * 2 - damageVariance)));
    
    // 检查暴击
    const critChance = window.combatSettings.criticalHitChance + (gameState.luck * window.combatSettings.luckImpactOnCrit);
    const isCritical = Math.random() < critChance;
    
    if (isCritical) {
        damage = Math.floor(damage * window.combatSettings.criticalHitMultiplier);
        addLog(`暴击！你对${monster.name}造成了${damage}点伤害！`, 'positive');
    } else {
        addLog(`你攻击${monster.name}，造成了${damage}点伤害。`, 'neutral');
    }
    
    monster.currentHealth -= damage;
    addLog(`${monster.name}剩余生命值：${Math.max(0, monster.currentHealth)}`, 'neutral');
}

// 妖兽攻击
function monsterAttack(monster) {
    // 检查闪避
    const dodgeChance = window.combatSettings.baseDodgeChance + (gameState.luck * window.combatSettings.luckImpactOnDodge);
    const isDodged = Math.random() < dodgeChance;
    
    if (isDodged) {
        addLog(`你灵巧地闪避了${monster.name}的攻击！`, 'positive');
        return;
    }
    
    // 计算伤害
    const baseDamage = monster.attack - gameState.defense;
    const damageVariance = baseDamage * window.combatSettings.monsterDamageVariance;
    let damage = Math.max(1, Math.floor(baseDamage + (Math.random() * damageVariance * 2 - damageVariance)));
    
    // 检查妖兽是否使用技能
    const useSkill = Math.random() < 0.3 && monster.skill;
    
    if (useSkill) {
        const skillEffect = window.monsterSkillEffects[monster.skill];
        
        if (skillEffect) {
            addLog(`${monster.name}使用了${monster.skill}！`, 'negative');
            
            if (skillEffect.damageMultiplier) {
                damage = Math.floor(damage * skillEffect.damageMultiplier);
            }
            
            if (skillEffect.defenseMultiplier) {
                // 临时降低防御
                const originalDefense = gameState.defense;
                gameState.defense = Math.floor(gameState.defense * skillEffect.defenseMultiplier);
                addLog(`你的防御力暂时降低了！`, 'negative');
                
                // 计算新的伤害
                const newBaseDamage = monster.attack - gameState.defense;
                damage = Math.max(1, Math.floor(newBaseDamage + (Math.random() * damageVariance * 2 - damageVariance)));
                
                // 恢复防御力
                gameState.defense = originalDefense;
            }
            
            if (skillEffect.extraAttack) {
                addLog(`${monster.name}发动连击！`, 'negative');
                // 额外攻击造成的伤害
                const extraDamage = Math.max(1, Math.floor(baseDamage / 2));
                damage += extraDamage;
            }
            
            // 其他技能效果...
        }
    }
    
    addLog(`${monster.name}攻击了你，造成了${damage}点伤害！`, 'negative');
    gameState.health -= damage;
    addLog(`你剩余生命值：${Math.max(0, gameState.health)}`, 'neutral');
}

// 尝试逃跑
function tryToFlee(monster) {
    const fleeChance = window.combatSettings.fleeBaseChance + (gameState.luck * 0.02) - (monster.speed * 0.01);
    
    if (Math.random() < fleeChance) {
        // 逃跑成功
        addLog(`你成功逃脱了${monster.name}的追击！`, 'positive');
    } else {
        // 逃跑失败
        addLog(`你试图逃跑，但${monster.name}拦住了你的去路！`, 'negative');
        
        // 妖兽获得一次免费攻击
        monsterAttack(monster);
        
        // 如果玩家还活着，继续战斗
        if (gameState.health > 0) {
            startCombatRound(monster);
        } else {
            // 玩家死亡，游戏结束
            gameOver();
        }
    }
}

// 结束战斗
function endCombat(monster) {
    addLog(`你击败了${monster.name}！`, 'positive');
    
    // 随机掉落物品
    if (Math.random() < monster.dropRate) {
        addLog(`${monster.name}掉落了${monster.dropItem}！`, 'positive');
        
        // 使用物品效果
        const itemEffect = window.itemEffects[monster.dropItem];
        if (itemEffect) {
            const result = itemEffect.effect(gameState);
            addLog(`你获得了${monster.dropItem}，${itemEffect.description}。效果：${result}`, 'positive');
        }
    }
    
    // 战斗后恢复一些生命值
    const minHeal = window.combatSettings.postCombatHealMin;
    const maxHeal = window.combatSettings.postCombatHealMax;
    const healAmount = Math.floor(Math.random() * (maxHeal - minHeal + 1)) + minHeal;
    
    gameState.health = Math.min(gameState.health + healAmount, gameState.maxHealth);
    addLog(`战斗结束后，你恢复了${healAmount}点生命值。`, 'positive');
}

// 发现物品
function findItem() {
    // 获取所有可能的物品
    const items = Object.keys(window.itemEffects);
    const randomItem = items[Math.floor(Math.random() * items.length)];
    
    addLog(`你发现了${randomItem}！`, 'positive');
    
    // 使用物品效果
    const itemEffect = window.itemEffects[randomItem];
    if (itemEffect) {
        const result = itemEffect.effect(gameState);
        addLog(`你获得了${randomItem}，${itemEffect.description}。效果：${result}`, 'positive');
    }
}