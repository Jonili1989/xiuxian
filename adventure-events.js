// 奇遇事件模块

// 奇遇事件数据
const adventureEvents = [
    {
        id: 'mysterious_cave',
        title: '神秘洞穴',
        description: '你在修炼/探索时发现了一个散发着奇异光芒的洞穴...',
        options: [
            {
                text: '谨慎探索',
                luckThreshold: 30, // 幸运值阈值
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
                luckThreshold: 50,
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
                luckThreshold: 10,
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
        title: '古老卷轴',
        description: '你偶然发现了一卷古老的修炼秘籍...',
        options: [
            {
                text: '仔细研读',
                luckThreshold: 40,
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
                luckThreshold: 20,
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
        title: '灵兽相遇',
        description: '一只受伤的灵兽出现在你面前，眼中满含祈求...',
        options: [
            {
                text: '救治灵兽',
                luckThreshold: 35,
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
                        health: -40,
                        mood: -12
                    }
                }
            },
            {
                text: '攻击灵兽',
                luckThreshold: 40,
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
                luckThreshold: 25,
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
        title: '神秘商人',
        description: '一位神秘的商人出现，愿意用奇物与你交换修为...',
        options: [
            {
                text: '同意交换',
                luckThreshold: 45,
                goodResult: {
                    description: '商人给了你一件宝物，大大提升了你的实力！',
                    effects: {
                        cultivation: -50,
                        attack: 8,
                        defense: 8,
                        mood: 20
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
                luckThreshold: 15,
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
        title: '天象异变',
        description: '天空中出现了罕见的异象，似乎蕴含着天地灵气...',
        options: [
            {
                text: '借机修炼',
                luckThreshold: 55,
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
                luckThreshold: 20,
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
        
        // 30% 概率触发奇遇事件
        if (Math.random() > 0.3) return false;
        
        const randomEvent = adventureEvents[Math.floor(Math.random() * adventureEvents.length)];
        this.currentEvent = randomEvent;
        this.isEventActive = true;
        
        this.showEventDialog();
        return true;
    }

    // 显示事件对话框
    showEventDialog() {
        if (!this.currentEvent) return;

        // 记录奇遇事件的开始
        addLog(`\n=== 奇遇事件：${this.currentEvent.title} ===`, 'neutral');
        addLog(this.currentEvent.description, 'neutral');
        addLog('请选择你的行动...', 'neutral');

        // 创建事件对话框
        const eventDialog = document.createElement('div');
        eventDialog.className = 'adventure-event-dialog';
        eventDialog.innerHTML = `
            <div class="adventure-event-content">
                <h3>${this.currentEvent.title}</h3>
                <p>${this.currentEvent.description}</p>
                <div class="adventure-options">
                    ${this.currentEvent.options.map((option, index) => 
                        `<button class="adventure-option-btn" data-option="${index}">${option.text}</button>`
                    ).join('')}
                </div>
            </div>
        `;

        // 添加到页面
        document.body.appendChild(eventDialog);

        // 绑定选项点击事件
        eventDialog.querySelectorAll('.adventure-option-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const optionIndex = parseInt(e.target.dataset.option);
                this.handleOptionChoice(optionIndex);
                document.body.removeChild(eventDialog);
            });
        });
    }

    // 处理选项选择
    handleOptionChoice(optionIndex) {
        if (!this.currentEvent || !this.currentEvent.options[optionIndex]) return;

        const option = this.currentEvent.options[optionIndex];
        const playerLuck = gameState.luck;
        
        // 记录玩家的选择
        addLog(`你选择了：${option.text}`, 'neutral');
        addLog(`（需要幸运值：${option.luckThreshold}，你的幸运值：${playerLuck}）`, 'neutral');
        
        // 基于幸运值判定结果
        const isGoodResult = playerLuck >= option.luckThreshold;
        const result = isGoodResult ? option.goodResult : option.badResult;

        // 显示判定结果
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
                // 触发战斗系统
                if (typeof handleCombat === 'function') {
                    addLog('战斗即将开始！', 'negative');
                    setTimeout(() => {
                        handleCombat();
                    }, 1000);
                } else {
                    addLog('战斗系统暂时不可用！', 'negative');
                }
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
}

// 创建全局奇遇事件管理器实例
window.adventureEventManager = new AdventureEventManager();

// 导出供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AdventureEventManager, adventureEvents };
}