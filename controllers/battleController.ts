import battleService from "../services/battleService"

export default function postBattle(req,res){
    const {firstUser}=req.body
    const {secondUser}=req.body
    const result=battleService(firstUser,secondUser)
    res.status(200).send(result)
}