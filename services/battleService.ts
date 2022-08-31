import {fightersRepository} from "../repositories/fightersRepository.js"
import axios from 'axios'

export default async function battleService(firstUser,secondUser){
    const user1=await axios.get(`https://api.github.com/users/${firstUser}/repos`)
    const user2=await axios.get(`https://api.github.com/users/${secondUser}/repos`)
    if(user1||user2){
        throw {type:"NotFound", message:"Usuário não encontrado"}
    }
    const user1Stars=user1.reduce((sum,{stargazers_count})=> sum+stargazers_count,0)
    const user2Stars=user2.reduce((sum,{stargazers_count})=> sum+stargazers_count,0)
    const finalResult={
        winner:null,
        loser:null,
        draw:true
    }
    if(user1Stars>user2Stars) finalResult.winner=firstUser; finalResult.loser=secondUser
    if(user1Stars<user2Stars) finalResult.winner=secondUser; finalResult.loser=firstUser
    const {rows:haveBattled1}=await fightersRepository.getBattle(firstUser)
    if(!haveBattled1.length){
        await fightersRepository.postBattle(firstUser,type)
    } else{
        await fightersRepository.updateBattle(firstUser,type,haveBattled1)
    }
    const {rows:haveBattled2}=await fightersRepository.getBattle(firstUser)
    if(!haveBattled2.length){
        await fightersRepository.postBattle(firstUser,type)
    } else{
        await fightersRepository.updateBattle(firstUser,type,haveBattled2)
    }
    return finalResult
}