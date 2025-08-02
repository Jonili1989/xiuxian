// 游戏主逻辑文件
// 由于ES模块加载问题，改为直接引用数据
// 这些变量将通过data-loader-fixed.js脚本提前加载

// 游戏状态对象
let gameState = {};

// 战斗状态变量
let isInCombat = false;

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
    mood: document.getElementById('mood'),
    maxMood: document.getElementById('max-mood'),
    moodBar: document.getElementById('mood-bar'),
    cultivation: document.getElementById('cultivation'),
    cultivationCap: document.getElementById('cultivation-cap'),
    cultivationBar: document.getElementById('cultivation-bar'),
    realm: document.getElementById('realm'),
    realmCountdown: document.getElementById('realm-countdown'),
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
    gameState.realmStartDay = 1; // 记录当前境界开始的天数
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
    elements.mood.textContent = gameState.mood;
    elements.maxMood.textContent = gameState.maxMood;
    elements.day.textContent = gameState.day;
    elements.actionPoints.textContent = gameState.actionPoints;
    elements.maxActionPoints.textContent = gameState.maxActionPoints;

    // 更新修为和境界
    elements.cultivation.textContent = gameState.cultivation;
    const currentRealm = window.realmLevels[gameState.realm];
    elements.realm.textContent = currentRealm.name;
    elements.cultivationCap.textContent = currentRealm.cap;

    // 更新境界倒计时
    if (gameState.realmStartDay && currentRealm.dayLimit) {
        const daysInCurrentRealm = gameState.day - gameState.realmStartDay + 1;
        const remainingDays = currentRealm.dayLimit - daysInCurrentRealm;
        elements.realmCountdown.textContent = Math.max(0, remainingDays);
    } else {
        elements.realmCountdown.textContent = currentRealm.dayLimit || 30;
    }

    // 更新进度条
    const healthPercent = (gameState.health / gameState.maxHealth) * 100;
    elements.healthBar.style.width = `${healthPercent}%`;

    const actionPercent = (gameState.actionPoints / gameState.maxActionPoints) * 100;
    elements.actionBar.style.width = `${actionPercent}%`;

    const cultivationPercent = Math.min((gameState.cultivation / currentRealm.cap) * 100, 100);
    elements.cultivationBar.style.width = `${cultivationPercent}%`;

    const moodPercent = (gameState.mood / gameState.maxMood) * 100;
    elements.moodBar.style.width = `${moodPercent}%`;
    // 根据心情值改变进度条颜色
    if (moodPercent > 70) {
        elements.moodBar.style.backgroundColor = '#4caf50'; // 绿色
    } else if (moodPercent > 30) {
        elements.moodBar.style.backgroundColor = '#ff9800'; // 橙色
    } else {
        elements.moodBar.style.backgroundColor = '#f44336'; // 红色
    }

    // 更新技能显示
    updateSkillsDisplay();
    
    // 根据行动力、心情值和战斗状态禁用/启用按钮
    const noActionPoints = gameState.actionPoints <= 0;
    const lowMood = gameState.mood < 25;
    const inAnyCombat = isInCombat || window.isInAdventureCombat;
    
    // 调试信息：显示当前战斗状态
    if (inAnyCombat) {
        console.log('当前处于战斗状态，禁用按钮');
    }
    
    elements.meditateBtn.disabled = noActionPoints || lowMood || !gameState.isGameStarted || inAnyCombat;
    elements.exploreBtn.disabled = noActionPoints || !gameState.isGameStarted || inAnyCombat;
    elements.restBtn.disabled = noActionPoints || !gameState.isGameStarted || inAnyCombat;
    elements.endDayBtn.disabled = !gameState.isGameStarted || inAnyCombat;
}

// 添加日志
function addLog(message, type = 'neutral') {
    const logEntry = document.createElement('div');
    logEntry.className = `log-entry ${type}`;
    
    // 检查是否为战斗相关的日志
    const isCombatLog = message.includes('攻击') || message.includes('伤害') || message.includes('战斗') || 
                       message.includes('击败') || message.includes('心魔') || message.includes('妖兽') || 
                       message.includes('闪避') || message.includes('暴击') || message.includes('技能') ||
                       message.includes('逃跑') || message.includes('胜利') || message.includes('失败');
    
    if (isCombatLog) {
        logEntry.classList.add('combat-log');
        // 添加战斗图标
        const icon = document.createElement('span');
        icon.className = 'combat-icon';
        icon.innerHTML = '⚔️';
        logEntry.appendChild(icon);
        
        const messageSpan = document.createElement('span');
        messageSpan.textContent = message;
        messageSpan.style.fontWeight = 'bold';
        logEntry.appendChild(messageSpan);
    } else {
        logEntry.textContent = message;
    }
    
    elements.logContainer.appendChild(logEntry);
    elements.logContainer.scrollTop = elements.logContainer.scrollHeight;
}

// 游戏结束
function gameOver() {
    addLog('你的生命值耗尽，但死亡并非终点...', 'negative');
    
    // 重置战斗状态
    isInCombat = false;
    
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

// 更新技能显示
function updateSkillsDisplay() {
    const skillsContainer = document.getElementById('skills-container');
    
    if (!gameState.skills || gameState.skills.length === 0) {
        skillsContainer.innerHTML = '<div class="stat-item"><div>暂无技能</div></div>';
        return;
    }
    
    let skillsHTML = '';
    gameState.skills.forEach(skillId => {
        const skill = window.skillDatabase[skillId];
        if (skill) {
            skillsHTML += `
                <div class="skill-item">
                    <div class="skill-name">${skill.name}</div>
                    <div class="skill-description">${skill.description}</div>
                    <div class="skill-trigger">触发几率: ${(skill.triggerChance * 100).toFixed(0)}%</div>
                </div>
            `;
        }
    });
    
    skillsContainer.innerHTML = skillsHTML;
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

    // 恢复心情值
    const moodRecover = Math.floor(Math.random() * 8) + 3; // 3-10点随机恢复
    gameState.mood = Math.min(gameState.maxMood, gameState.mood + moodRecover);

    addLog(`你休息了一会儿，恢复了${actualRecovery}点生命值，心情值+${moodRecover}。`, 'positive');
    updateUI();
}

// 结束今天
function endDay() {
    gameState.day++;
    gameState.actionPoints = gameState.maxActionPoints;
    
    // 检查境界天数限制
    const currentRealm = window.realmLevels[gameState.realm];
    const daysInCurrentRealm = gameState.day - gameState.realmStartDay;
    
    if (daysInCurrentRealm >= currentRealm.dayLimit) {
        // 触发境界boss战斗
        triggerRealmBossFight();
        return; // 不继续执行其他逻辑
    }
    
    // 处理每日事件
    handleDailyEvent();
    
    // 结束今天恢复心情值
    const moodRecover = Math.floor(Math.random() * 12) + 8; // 8-19点随机恢复
    gameState.mood = Math.min(gameState.maxMood, gameState.mood + moodRecover);
    addLog(`新的一天开始了，你感到精神焕发，心情值+${moodRecover}`, 'positive');
    
    addLog(`第${gameState.day}天开始了，你有${gameState.actionPoints}点行动力。`, 'neutral');
    updateUI();
}

// 触发境界心魔战斗（强制触发）
function triggerRealmBossFight() {
    const currentRealm = window.realmLevels[gameState.realm];
    
    addLog(`【强制渡劫】你在${currentRealm.name}期已经修炼了${currentRealm.dayLimit}天，天劫降临，必须立即突破！`, 'negative');
    addLog('由于时间紧迫，你的内心更加不安，心魔的力量因此增强了50%！', 'bad');
    
    // 设置强制触发时的心魔战斗力增强50%
    window.heartDemonPowerMultiplier = 1.5;
    
    // 触发突破奇遇事件（但心魔已经增强了50%）
    triggerBreakthroughEventForced();
}

function triggerBreakthroughEventForced() {
    // 随机选择一个突破奇遇事件
    const randomEvent = window.breakthroughEvents[Math.floor(Math.random() * window.breakthroughEvents.length)];
    
    // 在已有50%增强基础上，再应用事件效果
    const eventMultiplier = randomEvent.effect.demonPowerMultiplier;
    window.heartDemonPowerMultiplier *= eventMultiplier;
    
    // 记录事件结果
    addLog(randomEvent.text, randomEvent.type);
    
    // 显示最终的心魔战斗力变化
    const totalIncrease = ((window.heartDemonPowerMultiplier - 1) * 100).toFixed(0);
    addLog(`心魔的最终战斗力增强了 ${totalIncrease}%！`, 'bad');
    
    // 延迟一秒后触发心魔战斗
    setTimeout(() => {
        addLog('内心的心魔在天劫的催化下变得更加强大，最终的考验开始了！', 'negative');
        triggerHeartDemonFight();
    }, 1000);
}

// 开始心魔战斗
function startBossFight() {
    if (!currentBoss) {
        addLog('错误：没有找到心魔数据！', 'bad');
        return;
    }
    
    // 设置战斗状态
    isInCombat = true;
    
    addLog(`\n=== 心魔战斗开始 ===`, 'neutral');
    addLog(`你的状态：生命值 ${gameState.health}/${gameState.maxHealth}，攻击力 ${gameState.attack}，防御力 ${gameState.defense}`, 'neutral');
    addLog(`${currentBoss.name}状态：生命值 ${currentBoss.health}/${currentBoss.maxHealth}`, 'neutral');
    
    // 更新UI以禁用按钮
    updateUI();
    
    // 开始战斗回合
    startBossCombatRound(currentBoss);
}

// boss战斗回合
function startBossCombatRound(boss) {
    if (gameState.health <= 0) {
        // 玩家死亡，战斗失败
        handleBossDefeat();
        return;
    }
    
    if (boss.health <= 0) {
        // boss死亡，战斗胜利
        handleBossVictory(boss);
        return;
    }
    
    // 显示当前状态
    addLog(`你的生命值：${gameState.health}/${gameState.maxHealth}`, 'neutral');
    addLog(`${boss.name}的生命值：${boss.health}/${boss.maxHealth}`, 'neutral');
    
    // 创建战斗选项
    const combatContainer = document.createElement('div');
    combatContainer.className = 'combat-options';
    
    const attackBtn = document.createElement('button');
    attackBtn.textContent = '攻击';
    attackBtn.addEventListener('click', () => {
        combatContainer.remove();
        playerAttackBoss(boss);
    });
    
    const fleeBtn = document.createElement('button');
    fleeBtn.textContent = '逃跑（失败）';
    fleeBtn.addEventListener('click', () => {
        combatContainer.remove();
        addLog('你试图逃跑，但境界试炼无法逃避！', 'negative');
        handleBossDefeat();
    });
    
    combatContainer.appendChild(attackBtn);
    combatContainer.appendChild(fleeBtn);
    elements.logContainer.appendChild(combatContainer);
    elements.logContainer.scrollTop = elements.logContainer.scrollHeight;
}

// 玩家攻击boss
function playerAttackBoss(boss) {
    const baseDamage = Math.max(1, gameState.attack - boss.defense);
    const variance = baseDamage * 0.2;
    let damage = Math.floor(baseDamage + (Math.random() * variance * 2 - variance));
    
    // 检查技能触发
    let skillTriggered = false;
    let skillDamageMultiplier = 1.0;
    let skillEffects = {};
    
    if (gameState.skills && gameState.skills.length > 0) {
        for (const skillId of gameState.skills) {
            const skill = window.skillDatabase[skillId];
            if (skill && Math.random() < skill.triggerChance) {
                skillTriggered = true;
                addLog(skill.message, 'positive');
                
                // 应用技能效果
                if (skill.type === 'attack' && skill.effect.damageMultiplier) {
                    skillDamageMultiplier *= skill.effect.damageMultiplier;
                }
                
                // 处理其他技能效果
                if (skill.effect.lifeStealRatio) {
                    skillEffects.lifeSteal = skill.effect.lifeStealRatio;
                }
                
                break; // 每次攻击只触发一个技能
            }
        }
    }
    
    // 应用技能伤害加成
    damage = Math.floor(damage * skillDamageMultiplier);
    
    // 检查暴击
    const critChance = 0.1 + (gameState.luck * 0.01);
    const isCrit = Math.random() < critChance;
    const finalDamage = isCrit ? Math.floor(damage * 1.5) : damage;
    
    boss.health = Math.max(0, boss.health - finalDamage);
    
    if (isCrit) {
        if (skillTriggered) {
            addLog(`技能暴击！你对${boss.name}造成了${finalDamage}点伤害！`, 'positive');
        } else {
            addLog(`你发动暴击攻击，对${boss.name}造成了${finalDamage}点伤害！`, 'positive');
        }
    } else {
        if (skillTriggered) {
            addLog(`技能攻击对${boss.name}造成了${finalDamage}点伤害！`, 'positive');
        } else {
            addLog(`你攻击${boss.name}，造成了${finalDamage}点伤害。`, 'neutral');
        }
    }
    
    // 处理技能效果
    if (skillEffects.lifeSteal) {
        const healAmount = Math.floor(finalDamage * skillEffects.lifeSteal);
        gameState.health = Math.min(gameState.maxHealth, gameState.health + healAmount);
        addLog(`你吸取了${healAmount}点生命值！`, 'positive');
    }
    
    // boss反击
    if (boss.health > 0) {
        setTimeout(() => bossAttackPlayer(boss), 1000);
    } else {
        setTimeout(() => startBossCombatRound(boss), 1000);
    }
}

// boss攻击玩家
function bossAttackPlayer(boss) {
    // boss可能使用技能
    const useSkill = Math.random() < 0.4 && boss.skills.length > 0;
    let skill = null;
    let finalDamage;
    
    if (useSkill) {
        skill = boss.skills[Math.floor(Math.random() * boss.skills.length)];
        const skillEffect = window.monsterSkillEffects[skill];
        
        if (skillEffect) {
            addLog(`${boss.name}使用了技能：${skill}！`, 'negative');
            
            let baseDamage = boss.attack;
            
            // 应用技能效果
            if (skillEffect.damageMultiplier) {
                baseDamage = Math.floor(baseDamage * skillEffect.damageMultiplier);
            }
            
            if (skillEffect.ignoreDefense) {
                // 无视防御
                finalDamage = baseDamage;
            } else {
                finalDamage = Math.max(1, baseDamage - gameState.defense);
            }
            
            // 检查眩晕
            if (skillEffect.stunChance && Math.random() < skillEffect.stunChance) {
                addLog('你被眩晕了！', 'negative');
            }
            
            // 生命偷取
            if (skillEffect.lifeStealRatio) {
                const healAmount = Math.floor(finalDamage * skillEffect.lifeStealRatio);
                boss.health = Math.min(boss.maxHealth, boss.health + healAmount);
                addLog(`${boss.name}恢复了${healAmount}点生命值！`, 'negative');
            }
        } else {
            finalDamage = Math.max(1, boss.attack - gameState.defense);
        }
    } else {
        finalDamage = Math.max(1, boss.attack - gameState.defense);
    }
    
    gameState.health = Math.max(0, gameState.health - finalDamage);
    
    if (useSkill && skill && window.monsterSkillEffects[skill]) {
        addLog(`${boss.name}的${skill}对你造成了${finalDamage}点伤害！`, 'negative');
    } else {
        addLog(`${boss.name}攻击你，造成了${finalDamage}点伤害。`, 'negative');
    }
    
    updateUI();
    
    setTimeout(() => startBossCombatRound(boss), 1000);
}

// 处理boss战斗胜利
function handleBossVictory(boss) {
    addLog(`【胜利】你成功击败了${boss.name}！`, 'positive');
    addLog('恭喜你战胜了内心的心魔，渡劫成功！', 'positive');
    
    // 重置战斗状态
    isInCombat = false;
    
    // 更新UI以重新启用按钮
    updateUI();
    
    // 增加基础属性值（根据境界等级）
    const realmLevel = gameState.realm;
    const attributeBonus = Math.max(1, Math.floor(realmLevel * 0.5) + 1);
    
    gameState.maxHealth += attributeBonus * 2;
    gameState.health = gameState.maxHealth; // 恢复满血
    gameState.attack += attributeBonus;
    gameState.defense += attributeBonus;
    gameState.luck += Math.floor(attributeBonus / 2);
    
    addLog(`突破成功！获得属性提升：生命值+${attributeBonus * 2}, 攻击力+${attributeBonus}, 防御力+${attributeBonus}, 幸运+${Math.floor(attributeBonus / 2)}`, 'positive');
    
    // 进入下一个境界
    if (gameState.realm + 1 < window.realmLevels.length) {
        actualBreakthrough();
    } else {
        addLog('你已经达到了修仙的最高境界！', 'positive');
        updateUI();
    }
    
    // 继续正常的每日事件
    handleDailyEvent();
    addLog(`第${gameState.day}天开始了，你有${gameState.actionPoints}点行动力。`, 'neutral');
}

// 处理boss战斗失败
function handleBossDefeat() {
    addLog('【失败】你在境界试炼中失败了...', 'negative');
    addLog('你的修为不足以通过这个境界的考验，必须轮回重生！', 'negative');
    
    // 重置战斗状态
    isInCombat = false;
    
    // 触发轮回
    if (window.triggerReincarnation) {
        window.triggerReincarnation();
    } else {
        // 如果轮回系统不可用，直接游戏结束
        gameOver();
    }
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
        return false;
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
        
        return true; // 返回true表示可以突破
    }
    
    return false; // 返回false表示不能突破
}

// 执行境界突破 - 渡劫系统
function performBreakthrough() {
    // 移除所有突破按钮
    document.querySelectorAll('.breakthrough-btn').forEach(btn => btn.remove());
    
    addLog('你开始尝试突破，即将面临内心的考验...', 'neutral');
    
    // 触发突破奇遇事件
    triggerBreakthroughEvent();
}

// 心魔战斗力倍数（全局变量）
window.heartDemonPowerMultiplier = 1.0;

function triggerBreakthroughEvent() {
    // 重置心魔战斗力倍数
    window.heartDemonPowerMultiplier = 1.0;
    
    // 随机选择一个突破奇遇事件
    const randomEvent = window.breakthroughEvents[Math.floor(Math.random() * window.breakthroughEvents.length)];
    
    // 应用事件效果（修改心魔战斗力倍数）
    window.heartDemonPowerMultiplier = randomEvent.effect.demonPowerMultiplier;
    
    // 记录事件结果
    addLog(randomEvent.text, randomEvent.type);
    
    // 根据事件结果显示心魔战斗力变化
    if (window.heartDemonPowerMultiplier > 1.0) {
        addLog(`心魔的力量因此增强了 ${((window.heartDemonPowerMultiplier - 1) * 100).toFixed(0)}%！`, 'bad');
    } else if (window.heartDemonPowerMultiplier < 1.0) {
        addLog(`心魔的力量因此减弱了 ${((1 - window.heartDemonPowerMultiplier) * 100).toFixed(0)}%！`, 'good');
    } else {
        addLog('心魔的力量没有发生变化。', 'neutral');
    }
    
    // 延迟一秒后触发心魔战斗
    setTimeout(() => {
        addLog('内心的心魔开始显现，准备迎接最终的考验！', 'neutral');
        triggerHeartDemonFight();
    }, 1000);
}

function triggerHeartDemonFight() {
    // 获取当前境界对应的心魔数据
    const currentRealmData = window.realmLevels[gameState.realm];
    const realmKey = currentRealmData.bossId;
    const heartDemonData = window.realmBosses[realmKey];
    
    if (!heartDemonData) {
        addLog('无法找到对应的心魔数据！', 'bad');
        return;
    }
    
    // 创建心魔实例，应用战斗力倍数
    const heartDemon = {
        name: heartDemonData.name,
        health: Math.floor(heartDemonData.health * window.heartDemonPowerMultiplier),
        maxHealth: Math.floor(heartDemonData.health * window.heartDemonPowerMultiplier),
        attack: Math.floor(heartDemonData.attack * window.heartDemonPowerMultiplier),
        defense: Math.floor(heartDemonData.defense * window.heartDemonPowerMultiplier),
        speed: heartDemonData.speed,
        skills: heartDemonData.skills,
        description: heartDemonData.description
    };
    
    // 设置当前boss为心魔
    currentBoss = heartDemon;
    
    // 显示心魔信息
    addLog(`${heartDemon.name}出现了！`, 'bad');
    addLog(`${heartDemon.description}`, 'neutral');
    addLog(`生命值: ${heartDemon.health}, 攻击力: ${heartDemon.attack}, 防御力: ${heartDemon.defense}`, 'neutral');
    
    // 开始战斗
    startBossFight();
}

// 渡劫系统
function triggerTribulation() {
    // 随机选择一个渡劫事件
    const tribulationEvent = window.tribulationEvents[Math.floor(Math.random() * window.tribulationEvents.length)];
    
    addLog('天空乌云密布，雷声阵阵...', 'neutral');
    addLog(tribulationEvent.text, tribulationEvent.type === 'success' ? 'positive' : 'negative');
    
    // 根据事件类型和成功率判断结果
    const isSuccess = Math.random() < tribulationEvent.successRate;
    
    if (tribulationEvent.type === 'success' && isSuccess) {
        // 渡劫成功
        const effectResult = tribulationEvent.effect(gameState);
        addLog(effectResult, 'positive');
        actualBreakthrough();
    } else {
        // 渡劫失败
        const effectResult = tribulationEvent.effect(gameState);
        addLog(effectResult, 'negative');
        addLog('突破失败，你需要继续修炼积累实力！', 'negative');
    }
    
    // 尝试触发奇遇事件
    if (window.adventureEventManager) {
        window.adventureEventManager.triggerRandomEvent();
    }
    
    updateUI();
}

// 实际的突破逻辑，在boss战胜利后调用
function actualBreakthrough() {
    // 突破成功（boss战胜利后直接突破）
    gameState.realm++;
    gameState.realmStartDay = gameState.day; // 重置境界开始天数
    const newRealm = window.realmLevels[gameState.realm];
    
    // 应用突破奖励
    gameState.maxHealth += window.realmBreakthroughBonuses.health;
    gameState.health = gameState.maxHealth; // 突破后恢复满生命
    gameState.attack += window.realmBreakthroughBonuses.attack;
    gameState.defense += window.realmBreakthroughBonuses.defense;
    gameState.maxActionPoints += window.realmBreakthroughBonuses.actionPoints;
    gameState.actionPoints = gameState.maxActionPoints; // 突破后恢复满行动力
    gameState.mood = gameState.maxMood; // 突破后恢复满心情值
    
    // 重置修为为0
    gameState.cultivation = 0;
    
    // 随机获得一个技能
    const availableSkills = window.skillPoolsByRealm[gameState.realm] || [];
    if (availableSkills.length > 0) {
        // 过滤掉已经拥有的技能
        const newSkills = availableSkills.filter(skillId => !gameState.skills.includes(skillId));
        
        if (newSkills.length > 0) {
            const randomSkillId = newSkills[Math.floor(Math.random() * newSkills.length)];
            const skill = window.skillDatabase[randomSkillId];
            
            gameState.skills.push(randomSkillId);
            addLog(`【技能觉醒】你在突破过程中领悟了新技能：${skill.name}！`, 'positive');
            addLog(`技能效果：${skill.description}`, 'positive');
        }
    }
    
    addLog(`恭喜！你成功突破到了${newRealm.name}境界！`, 'positive');
    addLog('你感到体内灵力充盈，各项属性得到了提升！', 'positive');
    addLog('突破成功让你心情大好，心情值恢复满值！', 'positive');
    addLog(`新的境界试炼将在${newRealm.dayLimit}天后开始。`, 'neutral');
    
    updateUI();
}

// 修炼
function meditate() {
    if (gameState.actionPoints <= 0) {
        addLog('你没有足够的行动力！', 'negative');
        return;
    }

    if (gameState.mood < 25) {
        addLog('你心情低落，无法专心修炼！', 'negative');
        return;
    }

    // 消耗行动力
    gameState.actionPoints -= window.cultivationSettings.actionPointCost;

    // 随机减少心情值
    const moodDecrease = Math.floor(Math.random() * 15) + 5; // 5-19点随机减少
    gameState.mood = Math.max(0, gameState.mood - moodDecrease);
    addLog(`修炼消耗了你的精神，心情值-${moodDecrease}`, 'neutral');

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
    const canBreakthrough = checkRealmBreakthrough();
    
    // 只有在不能突破的情况下才触发奇遇事件
    if (!canBreakthrough && window.adventureEventManager) {
        window.adventureEventManager.triggerRandomEvent();
    }
    
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
    
    // 探索恢复心情值
    const moodRecover = Math.floor(Math.random() * 10) + 5; // 5-14点随机恢复
    gameState.mood = Math.min(gameState.maxMood, gameState.mood + moodRecover);
    addLog(`外出探索让你心情愉悦，心情值+${moodRecover}`, 'positive');
    
    // 决定探索结果
    const eventRoll = Math.random();
    let eventTriggered = false;
    
    if (eventRoll < window.explorationSettings.combatChance) {
        // 遭遇战斗
        handleCombat();
        eventTriggered = true;
    } else if (eventRoll < window.explorationSettings.combatChance + window.explorationSettings.goodEventChance) {
        // 遭遇好事件
        handleGoodEvent();
        eventTriggered = true;
    } else if (eventRoll < window.explorationSettings.combatChance + window.explorationSettings.goodEventChance + window.explorationSettings.badEventChance) {
        // 遭遇坏事件
        handleBadEvent();
        eventTriggered = true;
    } else {
        // 普通探索，可能发现物品
        const itemFindChance = window.explorationSettings.itemFindChance + (gameState.luck * window.explorationSettings.luckImpactOnItemFind);
        
        if (Math.random() < itemFindChance) {
            // 找到物品
            findItem();
            eventTriggered = true;
        } else {
            // 没有发现物品，尝试触发奇遇事件
            if (window.adventureEventManager) {
                const adventureTriggered = window.adventureEventManager.triggerRandomEvent();
                if (!adventureTriggered) {
                    addLog('你探索了一段时间，但没有发现什么特别的东西。', 'neutral');
                }
            } else {
                addLog('你探索了一段时间，但没有发现什么特别的东西。', 'neutral');
            }
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
    // 设置战斗状态
    isInCombat = true;
    
    // 根据玩家境界选择妖兽
    const monster = selectMonsterByRealm();
    
    // 创建妖兽实例
    const monsterInstance = {
        ...monster,
        currentHealth: monster.health
    };
    
    const tierLevel = `（${monster.level}级）`;
    addLog(`你遇到了一只${monster.name}${tierLevel}！`, 'negative');
    
    // 更新UI以禁用按钮
    updateUI();
    
    // 开始战斗回合
    startCombatRound(monsterInstance);
}

// 根据境界选择妖兽
function selectMonsterByRealm() {
    const playerRealm = gameState.realm;
    
    // 获取基础妖兽和进阶妖兽
    const basicMonsters = Object.values(window.monsterDatabase).filter(m => m.tier === 'basic');
    const advancedMonsters = Object.values(window.monsterDatabase).filter(m => m.tier === 'advanced');
    
    // 根据境界确定妖兽等级和概率
    let monsterLevel = 1;
    let selectedMonster;
    
    if (playerRealm >= 2) {
        // 从金丹期开始出现3级妖兽
        const level3Chance = Math.min(0.1 * (playerRealm - 1), 0.6); // 最高60%概率
        const level2Chance = Math.min(0.15 * playerRealm, 0.4); // 2级妖兽概率降低
        const level1Chance = 1 - level3Chance - level2Chance;
        
        const rand = Math.random();
        if (rand < level3Chance) {
            monsterLevel = 3;
            selectedMonster = advancedMonsters[Math.floor(Math.random() * advancedMonsters.length)];
        } else if (rand < level3Chance + level2Chance) {
            monsterLevel = 2;
            selectedMonster = advancedMonsters[Math.floor(Math.random() * advancedMonsters.length)];
        } else {
            monsterLevel = 1;
            selectedMonster = basicMonsters[Math.floor(Math.random() * basicMonsters.length)];
        }
    } else if (playerRealm >= 1) {
        // 筑基期：1级和2级妖兽
        const level2Chance = Math.min(0.15 * playerRealm, 0.5);
        if (Math.random() < level2Chance && advancedMonsters.length > 0) {
            monsterLevel = 2;
            selectedMonster = advancedMonsters[Math.floor(Math.random() * advancedMonsters.length)];
        } else {
            monsterLevel = 1;
            selectedMonster = basicMonsters[Math.floor(Math.random() * basicMonsters.length)];
        }
    } else {
        // 练气期：只有1级妖兽
        monsterLevel = 1;
        selectedMonster = basicMonsters[Math.floor(Math.random() * basicMonsters.length)];
    }
    
    // 根据等级增强妖兽属性
    return enhanceMonsterByLevel(selectedMonster, monsterLevel);
}

// 根据等级增强妖兽属性
function enhanceMonsterByLevel(monster, level) {
    const enhancedMonster = { ...monster };
    
    // 基础属性增强倍数
    const levelMultiplier = 1 + (level - 1) * 0.4; // 每级增加40%属性
    
    enhancedMonster.health = Math.floor(monster.health * levelMultiplier);
    enhancedMonster.attack = Math.floor(monster.attack * levelMultiplier);
    enhancedMonster.defense = Math.floor(monster.defense * levelMultiplier);
    enhancedMonster.speed = Math.floor(monster.speed * levelMultiplier);
    enhancedMonster.level = level;
    
    return enhancedMonster;
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
    // 计算基础伤害
    const baseDamage = gameState.attack - monster.defense;
    const damageVariance = baseDamage * window.combatSettings.playerDamageVariance;
    let damage = Math.max(1, Math.floor(baseDamage + (Math.random() * damageVariance * 2 - damageVariance)));
    
    // 检查技能触发
    let skillTriggered = false;
    let skillDamageMultiplier = 1.0;
    let skillEffects = {};
    
    if (gameState.skills && gameState.skills.length > 0) {
        for (const skillId of gameState.skills) {
            const skill = window.skillDatabase[skillId];
            if (skill && Math.random() < skill.triggerChance) {
                skillTriggered = true;
                addLog(skill.message, 'positive');
                
                // 应用技能效果
                if (skill.type === 'attack' && skill.effect.damageMultiplier) {
                    skillDamageMultiplier *= skill.effect.damageMultiplier;
                }
                
                // 处理其他技能效果
                if (skill.effect.lifeStealRatio) {
                    skillEffects.lifeSteal = skill.effect.lifeStealRatio;
                }
                
                if (skill.effect.burnDamage) {
                    skillEffects.burn = {
                        damage: skill.effect.burnDamage,
                        duration: skill.effect.burnDuration || 3
                    };
                }
                
                break; // 每次攻击只触发一个技能
            }
        }
    }
    
    // 应用技能伤害加成
    damage = Math.floor(damage * skillDamageMultiplier);
    
    // 检查暴击
    const critChance = window.combatSettings.criticalHitChance + (gameState.luck * window.combatSettings.luckImpactOnCrit);
    const isCritical = Math.random() < critChance;
    
    if (isCritical) {
        damage = Math.floor(damage * window.combatSettings.criticalHitMultiplier);
        if (skillTriggered) {
            addLog(`技能暴击！你对${monster.name}造成了${damage}点伤害！`, 'positive');
        } else {
            addLog(`暴击！你对${monster.name}造成了${damage}点伤害！`, 'positive');
        }
    } else {
        if (skillTriggered) {
            addLog(`技能攻击对${monster.name}造成了${damage}点伤害！`, 'positive');
        } else {
            addLog(`你攻击${monster.name}，造成了${damage}点伤害。`, 'neutral');
        }
    }
    
    monster.currentHealth -= damage;
    
    // 处理技能效果
    if (skillEffects.lifeSteal) {
        const healAmount = Math.floor(damage * skillEffects.lifeSteal);
        gameState.health = Math.min(gameState.maxHealth, gameState.health + healAmount);
        addLog(`你吸取了${healAmount}点生命值！`, 'positive');
    }
    
    if (skillEffects.burn) {
        addLog(`${monster.name}被灼烧了！`, 'negative');
        // 这里可以添加持续伤害逻辑
    }
    
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
        
        // 重置战斗状态
        isInCombat = false;
        
        // 更新UI以重新启用按钮
        updateUI();
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
    
    // 重置战斗状态
    isInCombat = false;
    
    // 更新UI以重新启用按钮
    updateUI();
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