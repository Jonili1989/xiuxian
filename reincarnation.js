// 轮回系统
class ReincarnationSystem {
    constructor() {
        this.reincarnationPoints = 0;
        this.isInReincarnation = false;
        this.tempStats = {
            attack: 0,
            defense: 0,
            luck: 0
        };
        this.allocatedPoints = {
            attack: 0,
            defense: 0,
            luck: 0
        };
    }

    // 计算轮回点数
    calculateReincarnationPoints(gameState) {
        let points = 0;
        
        // 基础点数：根据天数
        points += Math.floor(gameState.day / 5);
        
        // 修为点数：根据修为等级
        points += Math.floor(gameState.cultivation / 100);
        
        // 境界点数：根据境界等级
        points += gameState.realm * 2;
        
        // 最低保证1点
        return Math.max(1, points);
    }

    // 开始轮回
    startReincarnation(gameState) {
        this.reincarnationPoints = this.calculateReincarnationPoints(gameState);
        this.isInReincarnation = true;
        
        // 生成新的随机基础属性
        this.tempStats.attack = Math.max(1, window.characterDefaults.attack + Math.floor(Math.random() * 5) - 2);
        this.tempStats.defense = Math.max(1, window.characterDefaults.defense + Math.floor(Math.random() * 5) - 2);
        this.tempStats.luck = Math.max(1, Math.min(window.characterDefaults.maxLuck, window.characterDefaults.luck + Math.floor(Math.random() * 3) - 1));
        
        // 重置分配点数
        this.allocatedPoints = { attack: 0, defense: 0, luck: 0 };
        
        this.showReincarnationUI();
    }

    // 显示轮回界面
    showReincarnationUI() {
        // 隐藏游戏主界面（隐藏整个body的内容，除了轮回界面）
        const bodyChildren = document.body.children;
        for (let i = 0; i < bodyChildren.length; i++) {
            if (bodyChildren[i].id !== 'reincarnation-ui') {
                bodyChildren[i].style.display = 'none';
            }
        }
        
        // 创建轮回界面
        const reincarnationUI = document.createElement('div');
        reincarnationUI.id = 'reincarnation-ui';
        reincarnationUI.className = 'reincarnation-container';
        reincarnationUI.innerHTML = `
            <div class="reincarnation-panel">
                <h2>轮回重生</h2>
                <p>你已死亡，但可以通过轮回获得新生！</p>
                <p>可用轮回点: <span id="available-points">${this.reincarnationPoints}</span></p>
                
                <div class="stat-allocation">
                    <div class="stat-row">
                        <span>攻击力: <span id="temp-attack">${this.tempStats.attack}</span></span>
                        <button id="attack-minus" onclick="reincarnationSystem.adjustStat('attack', -1)">-</button>
                        <span id="attack-allocated">${this.allocatedPoints.attack}</span>
                        <button id="attack-plus" onclick="reincarnationSystem.adjustStat('attack', 1)">+</button>
                    </div>
                    
                    <div class="stat-row">
                        <span>防御力: <span id="temp-defense">${this.tempStats.defense}</span></span>
                        <button id="defense-minus" onclick="reincarnationSystem.adjustStat('defense', -1)">-</button>
                        <span id="defense-allocated">${this.allocatedPoints.defense}</span>
                        <button id="defense-plus" onclick="reincarnationSystem.adjustStat('defense', 1)">+</button>
                    </div>
                    
                    <div class="stat-row">
                        <span>幸运值: <span id="temp-luck">${this.tempStats.luck}</span></span>
                        <button id="luck-minus" onclick="reincarnationSystem.adjustStat('luck', -1)">-</button>
                        <span id="luck-allocated">${this.allocatedPoints.luck}</span>
                        <button id="luck-plus" onclick="reincarnationSystem.adjustStat('luck', 1)">+</button>
                    </div>
                </div>
                
                <div class="reincarnation-actions">
                    <button id="confirm-reincarnation" onclick="reincarnationSystem.confirmReincarnation()">确认轮回</button>
                    <button id="reset-allocation" onclick="reincarnationSystem.resetAllocation()">重置分配</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(reincarnationUI);
        this.updateUI();
    }

    // 调整属性点
    adjustStat(statType, change) {
        if (change > 0 && this.reincarnationPoints <= 0) {
            return; // 没有可用点数
        }
        
        if (change < 0 && this.allocatedPoints[statType] <= 0) {
            return; // 没有已分配的点数可以减少
        }
        
        // 检查幸运值是否会超过最大值
        if (statType === 'luck' && change > 0) {
            const newLuckValue = this.tempStats.luck + this.allocatedPoints.luck + change;
            if (newLuckValue > window.characterDefaults.maxLuck) {
                return; // 幸运值不能超过最大值
            }
        }
        
        this.allocatedPoints[statType] += change;
        this.reincarnationPoints -= change;
        
        this.updateUI();
    }

    // 重置分配
    resetAllocation() {
        const totalAllocated = this.allocatedPoints.attack + this.allocatedPoints.defense + this.allocatedPoints.luck;
        this.reincarnationPoints += totalAllocated;
        this.allocatedPoints = { attack: 0, defense: 0, luck: 0 };
        this.updateUI();
    }

    // 更新轮回界面
    updateUI() {
        document.getElementById('available-points').textContent = this.reincarnationPoints;
        document.getElementById('temp-attack').textContent = this.tempStats.attack + this.allocatedPoints.attack;
        document.getElementById('temp-defense').textContent = this.tempStats.defense + this.allocatedPoints.defense;
        document.getElementById('temp-luck').textContent = this.tempStats.luck + this.allocatedPoints.luck;
        document.getElementById('attack-allocated').textContent = this.allocatedPoints.attack;
        document.getElementById('defense-allocated').textContent = this.allocatedPoints.defense;
        document.getElementById('luck-allocated').textContent = this.allocatedPoints.luck;
        
        // 更新按钮状态
        document.getElementById('attack-plus').disabled = this.reincarnationPoints <= 0;
        document.getElementById('defense-plus').disabled = this.reincarnationPoints <= 0;
        
        // 幸运值加号按钮：检查点数和最大值限制
        const currentLuck = this.tempStats.luck + this.allocatedPoints.luck;
        document.getElementById('luck-plus').disabled = this.reincarnationPoints <= 0 || currentLuck >= window.characterDefaults.maxLuck;
        
        document.getElementById('attack-minus').disabled = this.allocatedPoints.attack <= 0;
        document.getElementById('defense-minus').disabled = this.allocatedPoints.defense <= 0;
        document.getElementById('luck-minus').disabled = this.allocatedPoints.luck <= 0;
    }

    // 确认轮回
    confirmReincarnation() {
        // 应用新属性到游戏状态
        gameState.attack = this.tempStats.attack + this.allocatedPoints.attack;
        gameState.defense = this.tempStats.defense + this.allocatedPoints.defense;
        gameState.luck = this.tempStats.luck + this.allocatedPoints.luck;
        
        // 重置游戏状态
        gameState.health = gameState.maxHealth;
        gameState.day = 1;
        gameState.actionPoints = gameState.maxActionPoints;
        gameState.cultivation = 0;
        gameState.realm = 0;
        
        // 隐藏轮回界面
        document.getElementById('reincarnation-ui').remove();
        
        // 显示游戏主界面（恢复所有被隐藏的元素）
        const bodyChildren = document.body.children;
        for (let i = 0; i < bodyChildren.length; i++) {
            bodyChildren[i].style.display = '';
        }
        
        // 重置轮回状态
        this.isInReincarnation = false;
        
        // 设置游戏为已开始状态
        gameState.isGameStarted = true;
        
        // 更新游戏UI
        updateUI();
        
        // 添加轮回日志
        addLog(`你已轮回重生！新的属性 - 攻击力: ${gameState.attack}, 防御力: ${gameState.defense}, 幸运值: ${gameState.luck}`, 'good');
    }
}

// 创建全局轮回系统实例
const reincarnationSystem = new ReincarnationSystem();