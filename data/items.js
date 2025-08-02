// 物品效果定义
const itemEffects = {
    // 基础妖兽掉落物品
    '狐尾': { 
        description: '增加1点幸运值', 
        effect: (gameState) => { 
            gameState.luck = Math.min(gameState.luck + 1, gameState.maxLuck); 
            return '幸运值+1';
        } 
    },
    '狼牙': { 
        description: '增加1点攻击力', 
        effect: (gameState) => { 
            gameState.attack += 1; 
            return '攻击力+1';
        } 
    },
    '熊胆': { 
        description: '增加5点生命值上限', 
        effect: (gameState) => { 
            gameState.maxHealth += 5; 
            gameState.health = gameState.maxHealth; 
            return '生命值上限+5';
        } 
    },
    '蛇胆': { 
        description: '增加1点防御力', 
        effect: (gameState) => { 
            gameState.defense += 1; 
            return '防御力+1';
        } 
    },
    '虎骨': { 
        description: '增加2点修为', 
        effect: (gameState) => { 
            gameState.cultivation += 2; 
            return '修为+2';
        } 
    },
    
    // 进阶妖兽掉落物品（效果更强）
    '九尾狐尾': { 
        description: '增加2点幸运值', 
        effect: (gameState) => { 
            gameState.luck = Math.min(gameState.luck + 2, gameState.maxLuck); 
            return '幸运值+2';
        } 
    },
    '银月狼牙': { 
        description: '增加2点攻击力', 
        effect: (gameState) => { 
            gameState.attack += 2; 
            return '攻击力+2';
        } 
    },
    '铁甲熊胆': { 
        description: '增加8点生命值上限', 
        effect: (gameState) => { 
            gameState.maxHealth += 8; 
            gameState.health = gameState.maxHealth; 
            return '生命值上限+8';
        } 
    },
    '碧鳞蛇胆': { 
        description: '增加2点防御力', 
        effect: (gameState) => { 
            gameState.defense += 2; 
            return '防御力+2';
        } 
    },
    '白虎王骨': { 
        description: '增加5点修为', 
        effect: (gameState) => { 
            gameState.cultivation += 5; 
            return '修为+5';
        } 
    }
};

export default itemEffects;