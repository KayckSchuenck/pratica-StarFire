import {fightersRepository} from "../repositories/fightersRepository.js"
import axios from 'axios'

export default async function battleService(firstUser,secondUser){
    const user1=await axios.get(`https://api.github.com/users/${firstUser}/repos`)
    const user2=await axios.get(`https://api.github.com/users/${secondUser}/repos`)
    if(user1.message||user2.message){
        throw {type:"NotFound", message:"Usuário não encontrado"}
    }
    const user1Stars=user1.reduce((sum,{stargazers_count})=> sum+stargazers_count,0)
    const user2Stars=user2.reduce((sum,{stargazers_count})=> sum+stargazers_count,0)

    const finalResult={
        winner:null,
        loser:null,
        draw:true
    }

    if(user1Stars>user2Stars) {
        finalResult.winner=firstUser; finalResult.loser=secondUser

        const {rows:haveBattled1}=await fightersRepository.getBattle(firstUser)
        if(!haveBattled1.length){
            await fightersRepository.postBattle(firstUser,"win")
        } else{
            await fightersRepository.updateBattle(firstUser,"win",haveBattled1)
        }

        const {rows:haveBattled2}=await fightersRepository.getBattle(firstUser)
        if(!haveBattled2.length){
            await fightersRepository.postBattle(firstUser,"loss")
        } else{
            await fightersRepository.updateBattle(firstUser,"loss",haveBattled2)
        }
    }

    if(user1Stars<user2Stars){
        finalResult.winner=secondUser; finalResult.loser=firstUser

        const {rows:haveBattled1}=await fightersRepository.getBattle(firstUser)
        if(!haveBattled1.length){
            await fightersRepository.postBattle(firstUser,"loss")
        } else{
            await fightersRepository.updateBattle(firstUser,"loss",haveBattled1)
        }

        const {rows:haveBattled2}=await fightersRepository.getBattle(firstUser)
        if(!haveBattled2.length){
            await fightersRepository.postBattle(firstUser,'win')
        } else{
            await fightersRepository.updateBattle(firstUser,'win',haveBattled2)
        }
    }

    const {rows:haveBattled1}=await fightersRepository.getBattle(firstUser)
    if(!haveBattled1.length){
        await fightersRepository.postBattle(firstUser,"draw")
    } else{
        await fightersRepository.updateBattle(firstUser,"draw",haveBattled1)
    }

    const {rows:haveBattled2}=await fightersRepository.getBattle(firstUser)
    if(!haveBattled2.length){
        await fightersRepository.postBattle(firstUser,'draw')
    } else{
        await fightersRepository.updateBattle(firstUser,'draw',haveBattled2)
    }

    return finalResult
}