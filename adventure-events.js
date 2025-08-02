// 奇遇事件模块

// 奇遇事件数据
const adventureEvents = [
    {
        id: 'mysterious_cave',
        title: '🏔️ 神秘洞穴',
        description: '你在修炼/探索时发现了一个散发着奇异光芒的洞穴...',
        options: [
            {
                text: '谨慎探索',
                successRate: 70, // 基础成功率（谨慎行动，成功率较高）
                goodResult: {
                    description: '你小心翼翼地探索，发现了一颗灵石！',
                    effects: {
                        cultivation: 50,
                        mood: 15
                    }
                },
                badResult: {
                    description: '洞穴突然坍塌，你受了轻伤...',
                    effects: {
                        health: -20,
                        mood: -10
                    }
                }
            },
            {
                text: '勇敢冲入',
                successRate: 40, // 基础成功率（高风险高回报）
                goodResult: {
                    description: '你的勇气得到了回报！发现了珍贵的修炼心法！',
                    effects: {
                        cultivation: 100,
                        attack: 5,
                        mood: 25
                    }
                },
                badResult: {
                    description: '你触发了洞穴中的陷阱，身受重伤！',
                    effects: {
                        health: -50,
                        mood: -20
                    }
                }
            },
            {
                text: '绕道而行',
                successRate: 80, // 基础成功率（保守选择，成功率很高）
                goodResult: {
                    description: '明智的选择！你避开了危险，心情舒畅。',
                    effects: {
                        mood: 10
                    }
                },
                badResult: {
                    description: '你错过了机缘，心中有些遗憾...',
                    effects: {
                        mood: -5
                    }
                }
            }
        ]
    },
    {
        id: 'ancient_scroll',
        title: '📜 古老卷轴',
        description: '你偶然发现了一卷古老的修炼秘籍...',
        options: [
            {
                text: '仔细研读',
                successRate: 60, // 基础成功率（需要一定悟性）
                goodResult: {
                    description: '你领悟了其中的奥义，修为大增！',
                    effects: {
                        cultivation: 80,
                        defense: 3,
                        mood: 20
                    }
                },
                badResult: {
                    description: '秘籍中的功法与你不合，走火入魔了！',
                    effects: {
                        health: -30,
                        cultivation: -20,
                        mood: -15
                    }
                }
            },
            {
                text: '收藏起来',
                successRate: 75, // 基础成功率（保守选择）
                goodResult: {
                    description: '你将秘籍妥善保存，日后或许有用。',
                    effects: {
                        mood: 5
                    }
                },
                badResult: {
                    description: '秘籍在保存过程中损坏了...',
                    effects: {
                        mood: -8
                    }
                }
            }
        ]
    },
    {
        id: 'spirit_beast',
        title: '🦌 灵兽相遇',
        description: '一只受伤的灵兽出现在你面前，眼中满含祈求...',
        options: [
            {
                text: '救治灵兽',
                successRate: 65, // 基础成功率（善意行为，中等成功率）
                goodResult: {
                    description: '灵兽康复后，感激地赠予你一颗内丹！',
                    effects: {
                        cultivation: 120,
                        luck: 2,
                        mood: 30
                    }
                },
                badResult: {
                    description: '灵兽突然发狂攻击了你！',
                    effects: {
                        combat: 'spirit_beast' // 触发战斗
                    }
                }
            },
            {
                text: '攻击灵兽',
                successRate: 45, // 基础成功率（攻击受伤灵兽，风险较高）
                goodResult: {
                    description: '你成功击败了灵兽，获得了它的内丹！',
                    effects: {
                        cultivation: 80,
                        attack: 3,
                        mood: 15
                    }
                },
                badResult: {
                    description: '灵兽虽然受伤但依然强大，你们展开了激烈的战斗！',
                    effects: {
                        combat: 'spirit_beast' // 触发战斗
                    }
                }
            },
            {
                text: '保持距离',
                successRate: 85, // 基础成功率（安全选择，成功率很高）
                goodResult: {
                    description: '你明智地保持了距离，灵兽平静地离开了。',
                    effects: {
                        mood: 8
                    }
                },
                badResult: {
                    description: '你的冷漠让你错失了机缘...',
                    effects: {
                        mood: -10
                    }
                }
            }
        ]
    },
    {
        id: 'mysterious_merchant',
        title: '🧙 神秘商人',
        description: '一位神秘的商人出现，愿意用奇物与你交换修为...',
        options: [
            {
                text: '同意交换',
                successRate: 35, // 基础成功率（高风险交易）
                goodResult: {
                    description: '商人给了你一件宝物，提升了你的实力！',
                    effects: {
                        cultivation: -50,
                        attack: Math.floor(Math.random() * 3) + 1, // 随机1-3点攻击力
                        defense: Math.floor(Math.random() * 3) + 1, // 随机1-3点防御力
                        mood: 15
                    }
                },
                badResult: {
                    description: '商人欺骗了你，拿走修为后消失了！',
                    effects: {
                        cultivation: -100,
                        mood: -25
                    }
                }
            },
            {
                text: '拒绝交换',
                successRate: 90, // 基础成功率（谨慎选择，几乎总是正确的）
                goodResult: {
                    description: '你的谨慎是对的，商人露出了邪恶的笑容后离开。',
                    effects: {
                        mood: 12
                    }
                },
                badResult: {
                    description: '商人恼羞成怒，诅咒了你！',
                    effects: {
                        luck: -1,
                        mood: -8
                    }
                }
            }
        ]
    },
    {
        id: 'heavenly_phenomenon',
        title: '🌟 天象异变',
        description: '天空中出现了罕见的异象，似乎蕴含着天地灵气...',
        options: [
            {
                text: '借机修炼',
                successRate: 30, // 基础成功率（极高风险，极高回报）
                goodResult: {
                    description: '你成功借助天地灵气，修为突飞猛进！',
                    effects: {
                        cultivation: 150,
                        mood: 25
                    }
                },
                badResult: {
                    description: '天地灵气过于狂暴，你被反噬了！',
                    effects: {
                        health: -35,
                        cultivation: -30,
                        mood: -18
                    }
                }
            },
            {
                text: '静观其变',
                successRate: 75, // 基础成功率（稳妥选择）
                goodResult: {
                    description: '你静心观察，领悟了一些天地法则。',
                    effects: {
                        cultivation: 30,
                        mood: 15
                    }
                },
                badResult: {
                    description: '异象消失了，你什么也没得到...',
                    effects: {
                        mood: -5
                    }
                }
            }
        ]
    }
];

// 奇遇事件管理器
class AdventureEventManager {
    constructor() {
        this.currentEvent = null;
        this.isEventActive = false;
    }

    // 触发随机奇遇事件
    triggerRandomEvent() {
        if (this.isEventActive) return false;
        
        // 80% 概率触发奇遇事件（便于测试弹窗效果）
        if (Math.random() > 0.8) return false;
        
        const randomEvent = adventureEvents[Math.floor(Math.random() * adventureEvents.length)];
        this.currentEvent = randomEvent;
        this.isEventActive = true;
        
        this.showEventDialog();
        return true;
    }

    // 显示事件UI（嵌入到事件日志中）
    showEventDialog() {
        if (!this.currentEvent) return;

        // 记录奇遇事件的开始
        addLog(`\n=== 奇遇事件：${this.currentEvent.title} ===`, 'neutral');
        addLog(this.currentEvent.description, 'neutral');
        addLog('请选择你的行动...', 'neutral');

        // 创建奇遇事件选项容器
        const adventureOptionsDiv = document.createElement('div');
        adventureOptionsDiv.className = 'adventure-event-options';
        adventureOptionsDiv.style.cssText = `
            background-color: #f0f8ff;
            border: 2px solid #4caf50;
            border-radius: 8px;
            padding: 15px;
            margin: 10px 0;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        `;

        // 添加事件标题
        const titleDiv = document.createElement('div');
        titleDiv.style.cssText = `
            font-weight: bold;
            font-size: 1.1em;
            color: #2e7d32;
            margin-bottom: 10px;
            text-align: center;
        `;
        titleDiv.textContent = this.currentEvent.title;
        adventureOptionsDiv.appendChild(titleDiv);

        // 添加选项按钮
        const buttonsContainer = document.createElement('div');
        buttonsContainer.style.cssText = `
            display: flex;
            flex-direction: column;
            gap: 8px;
        `;

        this.currentEvent.options.forEach((option, index) => {
            const optionBtn = document.createElement('button');
            optionBtn.textContent = option.text;
            optionBtn.style.cssText = `
                padding: 10px 15px;
                border: none;
                border-radius: 5px;
                background-color: #4caf50;
                color: white;
                cursor: pointer;
                font-size: 14px;
                transition: background-color 0.3s;
            `;
            optionBtn.addEventListener('mouseover', () => {
                optionBtn.style.backgroundColor = '#388e3c';
            });
            optionBtn.addEventListener('mouseout', () => {
                optionBtn.style.backgroundColor = '#4caf50';
            });
            optionBtn.addEventListener('click', () => {
                this.handleOptionChoice(index);
                this.closeEventDialog(adventureOptionsDiv);
            });
            buttonsContainer.appendChild(optionBtn);
        });

        adventureOptionsDiv.appendChild(buttonsContainer);

        // 添加到事件日志容器
        const logContainer = document.getElementById('log-container');
        logContainer.insertBefore(adventureOptionsDiv, logContainer.firstChild);
        // 新消息在顶部，不需要滚动

        // 禁用所有游戏操作按钮
        this.disableGameControls();
    }

    // 禁用游戏控制按钮
    disableGameControls() {
        const buttons = [
            'start-btn',
            'cultivate-btn', 
            'explore-btn',
            'rest-btn',
            'end-day-btn'
        ];
        
        buttons.forEach(btnId => {
            const btn = document.getElementById(btnId);
            if (btn) {
                btn.disabled = true;
                btn.style.opacity = '0.5';
            }
        });
    }

    // 启用游戏控制按钮
    enableGameControls() {
        const buttons = [
            'start-btn',
            'cultivate-btn', 
            'explore-btn',
            'rest-btn',
            'end-day-btn'
        ];
        
        buttons.forEach(btnId => {
            const btn = document.getElementById(btnId);
            if (btn) {
                btn.disabled = false;
                btn.style.opacity = '1';
            }
        });
        
        // 调用游戏的updateUI函数来正确设置按钮状态
        if (typeof updateUI === 'function') {
            updateUI();
        }
    }

    // 关闭事件UI
    closeEventDialog(adventureOptionsDiv) {
        if (adventureOptionsDiv && adventureOptionsDiv.parentNode) {
            adventureOptionsDiv.parentNode.removeChild(adventureOptionsDiv);
        }
        this.currentEvent = null;
        
        // 重新启用游戏控制按钮
        this.enableGameControls();
    }

    // 处理选项选择
    handleOptionChoice(optionIndex) {
        if (!this.currentEvent || !this.currentEvent.options[optionIndex]) return;

        const option = this.currentEvent.options[optionIndex];
        const playerLuck = gameState.luck;
        
        // 记录玩家的选择
        addLog(`你选择了：${option.text}`, 'neutral');
        
        // 计算成功概率：基础成功率 + 幸运值影响
        // 幸运值每点增加3%成功率，最低10%，最高90%
        const baseSuccessRate = option.successRate || 50; // 基础成功率（百分比）
        const luckBonus = (playerLuck - 5) * 3; // 以5为基准，每点幸运值±3%
        const finalSuccessRate = Math.max(10, Math.min(90, baseSuccessRate + luckBonus));
        
        addLog(`（基础成功率：${baseSuccessRate}%，幸运值加成：${luckBonus >= 0 ? '+' : ''}${luckBonus}%，最终成功率：${finalSuccessRate}%）`, 'neutral');
        
        // 基于概率判定结果
        const randomRoll = Math.random() * 100;
        const isGoodResult = randomRoll < finalSuccessRate;
        const result = isGoodResult ? option.goodResult : option.badResult;

        // 显示判定结果
        addLog(`掷骰结果：${randomRoll.toFixed(1)}`, 'neutral');
        if (isGoodResult) {
            addLog('幸运女神眷顾了你！', 'positive');
        } else {
            addLog('运气不佳...', 'negative');
        }

        // 应用效果
        this.applyEffects(result.effects);
        
        // 显示结果
        addLog(`【结果】${result.description}`, isGoodResult ? 'positive' : 'negative');
        
        // 显示属性变化总结
        this.showEffectSummary(result.effects);
        
        addLog('=== 奇遇事件结束 ===\n', 'neutral');
        
        // 重置事件状态
        this.currentEvent = null;
        this.isEventActive = false;
        
        // 更新UI
        updateUI();
    }

    // 显示效果总结
    showEffectSummary(effects) {
        const effectMessages = [];
        
        for (const [stat, value] of Object.entries(effects)) {
            if (stat === 'combat') {
                effectMessages.push('触发战斗');
            } else if (gameState.hasOwnProperty(stat)) {
                const statNames = {
                    health: '生命值',
                    mood: '心情值',
                    cultivation: '修为',
                    attack: '攻击力',
                    defense: '防御力',
                    luck: '幸运值'
                };
                
                const statName = statNames[stat] || stat;
                const change = value > 0 ? `+${value}` : `${value}`;
                effectMessages.push(`${statName}${change}`);
            }
        }
        
        if (effectMessages.length > 0) {
            addLog(`【属性变化】${effectMessages.join('，')}`, 'neutral');
        }
    }

    // 应用事件效果
    applyEffects(effects) {
        for (const [stat, value] of Object.entries(effects)) {
            if (stat === 'combat') {
                // 触发奇遇事件专用战斗系统
                addLog('战斗即将开始！', 'negative');
                setTimeout(() => {
                    this.handleAdventureCombat(value);
                }, 1000);
            } else if (gameState.hasOwnProperty(stat)) {
                gameState[stat] += value;
                
                // 确保数值在合理范围内
                if (stat === 'health') {
                    gameState.health = Math.max(0, Math.min(gameState.health, gameState.maxHealth));
                } else if (stat === 'mood') {
                    gameState.mood = Math.max(0, Math.min(gameState.mood, gameState.maxMood));
                } else if (stat === 'cultivation') {
                    gameState.cultivation = Math.max(0, gameState.cultivation);
                } else if (stat === 'luck') {
                    gameState.luck = Math.max(1, gameState.luck);
                } else if (['attack', 'defense'].includes(stat)) {
                    gameState[stat] = Math.max(1, gameState[stat]);
                }
            }
        }
    }

    // 奇遇事件专用战斗系统
    handleAdventureCombat(combatType) {
        // 检查是否已经在战斗中
        if (window.isInCombat) {
            addLog('你正在战斗中，无法开始新的战斗！', 'negative');
            return;
        }

        // 设置奇遇战斗状态
        window.isInAdventureCombat = true;
        
        // 根据战斗类型创建敌人
        let enemy;
        if (combatType === 'spirit_beast') {
            enemy = {
                name: '受伤的灵兽',
                health: Math.floor(gameState.attack * 1.5),
                maxHealth: Math.floor(gameState.attack * 1.5),
                attack: Math.floor(gameState.attack * 0.8),
                defense: Math.floor(gameState.defense * 0.6),
                currentHealth: Math.floor(gameState.attack * 1.5)
            };
        } else {
            // 默认敌人
            enemy = {
                name: '神秘敌人',
                health: gameState.attack,
                maxHealth: gameState.attack,
                attack: Math.floor(gameState.attack * 0.7),
                defense: Math.floor(gameState.defense * 0.5),
                currentHealth: gameState.attack
            };
        }

        addLog(`奇遇战斗：你遇到了${enemy.name}！`, 'negative');
        addLog(`${enemy.name}状态：生命值 ${enemy.health}，攻击力 ${enemy.attack}，防御力 ${enemy.defense}`, 'neutral');
        
        // 开始奇遇战斗回合
        this.startAdventureCombatRound(enemy);
    }

    // 奇遇战斗回合
    startAdventureCombatRound(enemy) {
        if (gameState.health <= 0) {
            this.handleAdventureCombatDefeat();
            return;
        }
        
        if (enemy.currentHealth <= 0) {
            this.handleAdventureCombatVictory(enemy);
            return;
        }

        // 显示当前状态
        addLog(`你的生命值：${gameState.health}/${gameState.maxHealth}`, 'neutral');
        addLog(`${enemy.name}的生命值：${enemy.currentHealth}/${enemy.maxHealth}`, 'neutral');
        
        // 创建战斗选项
        const combatContainer = document.createElement('div');
        combatContainer.className = 'adventure-combat-options';
        
        const attackBtn = document.createElement('button');
        attackBtn.textContent = '攻击';
        attackBtn.addEventListener('click', () => {
            combatContainer.remove();
            this.playerAttackInAdventure(enemy);
        });
        
        const fleeBtn = document.createElement('button');
        fleeBtn.textContent = '逃跑';
        fleeBtn.addEventListener('click', () => {
            combatContainer.remove();
            this.tryToFleeFromAdventure(enemy);
        });
        
        combatContainer.appendChild(attackBtn);
        combatContainer.appendChild(fleeBtn);
        
        const logContainer = document.getElementById('log-container');
        logContainer.insertBefore(combatContainer, logContainer.firstChild);
        // 新消息在顶部，不需要滚动
    }

    // 奇遇战斗中玩家攻击
    playerAttackInAdventure(enemy) {
        const damage = Math.max(1, gameState.attack - enemy.defense);
        enemy.currentHealth -= damage;
        
        addLog(`你攻击了${enemy.name}，造成${damage}点伤害！`, 'positive');
        
        if (enemy.currentHealth > 0) {
            // 敌人反击
            this.enemyAttackInAdventure(enemy);
        } else {
            // 敌人死亡
            this.handleAdventureCombatVictory(enemy);
        }
    }

    // 奇遇战斗中敌人攻击
    enemyAttackInAdventure(enemy) {
        const damage = Math.max(1, enemy.attack - gameState.defense);
        gameState.health -= damage;
        
        addLog(`${enemy.name}攻击了你，造成${damage}点伤害！`, 'negative');
        
        if (gameState.health > 0) {
            // 继续战斗
            setTimeout(() => {
                this.startAdventureCombatRound(enemy);
            }, 1000);
        } else {
            // 玩家死亡
            this.handleAdventureCombatDefeat();
        }
    }

    // 尝试从奇遇战斗中逃跑
    tryToFleeFromAdventure(enemy) {
        const fleeChance = 0.6 + (gameState.luck * 0.02);
        
        if (Math.random() < fleeChance) {
            addLog('你成功逃脱了！', 'positive');
            window.isInAdventureCombat = false;
            if (typeof updateUI === 'function') {
                updateUI();
            }
        } else {
            addLog('逃跑失败！', 'negative');
            this.enemyAttackInAdventure(enemy);
        }
    }

    // 奇遇战斗胜利
    handleAdventureCombatVictory(enemy) {
        addLog(`【奇遇战斗胜利】你击败了${enemy.name}！`, 'positive');
        
        // 根据敌人类型给予奖励
        if (enemy.name === '受伤的灵兽') {
            gameState.cultivation += 60;
            gameState.attack += 2;
            addLog('你从战斗中获得了经验：修为+60，攻击力+2', 'positive');
        } else {
            gameState.cultivation += 40;
            gameState.mood += 10;
            addLog('你从战斗中获得了经验：修为+40，心情+10', 'positive');
        }
        
        // 战斗后恢复少量生命值
        const healAmount = Math.floor(gameState.maxHealth * 0.1);
        gameState.health = Math.min(gameState.health + healAmount, gameState.maxHealth);
        addLog(`战斗结束后，你恢复了${healAmount}点生命值。`, 'positive');
        
        // 重置战斗状态
        window.isInAdventureCombat = false;
        
        if (typeof updateUI === 'function') {
            updateUI();
        }
    }

    // 奇遇战斗失败
    handleAdventureCombatDefeat() {
        addLog('【奇遇战斗失败】你在战斗中败北...', 'negative');
        
        // 重置战斗状态
        window.isInAdventureCombat = false;
        
        // 检查是否游戏结束
        if (gameState.health <= 0) {
            if (typeof gameOver === 'function') {
                gameOver();
            }
        } else {
            if (typeof updateUI === 'function') {
                updateUI();
            }
        }
    }
}

// 创建全局奇遇事件管理器实例
window.adventureEventManager = new AdventureEventManager();

// 导出供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AdventureEventManager, adventureEvents };
}