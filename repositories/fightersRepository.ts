import connection from "../database"
async function getBattle(user1){
    return connection.query(`
    SELECT * 
    FROM fighters 
    WHERE username=$1`
    , [user1,])
}
async function postBattle(user1,type){
    if(type==='win'){
        return connection.query(`
        INSERT INTO fighters 
        username,wins,losses,draws
        VALUES ($1,1,0,0)`
        , [user1])
    }
    if(type==='loss'){
        return connection.query(`
        INSERT INTO fighters 
        username,wins,losses,draws
        VALUES ($1,0,1,0)`
        , [user1])
    }
    if(type==='draw'){
        return connection.query(`
        INSERT INTO fighters 
        username,wins,losses,draws
        VALUES ($1,0,0,1)`
        , [user1])
    }
    
}

async function updateBattle(user1,type,numbers){
    if(type==='win'){
        return connection.query(`
        UPDATE fighters
        SET wins=$1
        WHERE username=$2`
        , [numbers.wins+1,user1])
    }
    if(type==='loss'){
        return connection.query(`
        UPDATE fighters
        SET losses=$1
        WHERE username=$2`
        , [numbers.losses+1,user1])
    }
    if(type==='draw'){
        return connection.query(`
        UPDATE fighters
        SET draws=$1
        WHERE username=$2`
        , [numbers.draws+1,user1])
    }

    
}

export const fightersRepository={
    postBattle,
    updateBattle,
    getBattle
}