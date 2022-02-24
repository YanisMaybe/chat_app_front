import axios from "axios";

export const GET_CAHNNELS = "GET_CAHNNELS";
export const GET_ONE_CHANNEL = "GET_ONE_CHANNEL";
export const CREATE_CHANNEL = "CREATE_CHANNEL";
export const ADD_MESSAGE_TO_CHANNEL = "ADD_MESSAGE_TO_CHANNEL";
export const ADD_USER_TO_CHANNEL = "ADD_USER_TO_CHANNEL";


export const getAllChannels = () => {
    return dispatch => {
        axios.get("http://localhost:4000/api/getAllChannels").then(res => {
            if (res) {
                return dispatch({ type: GET_CAHNNELS, payload: res.data })
            } else {
                console.error("nous n'arrivons pas a recuperer les canals")
            }
        }).catch(err => {
            console.error(err)
        })
    }
}
export const getOneChannel = (id) => {
    return dispatch => {
        axios.get(`http://localhost:4000/api/getOneChannel/${id}`)
            .then(res => {
                if (res) {
                    return dispatch({ type: GET_ONE_CHANNEL, payload: res.data })
                } else {
                    console.error("nous n'arrivons pas a recuperer les canals")
                }
            }).catch(err => {
                console.error(err)
            })
    }
}
export const createChannel = ({name,description,date}) => {
    return dispatch => {
        const data = {
            name,
            description,
            date:date
        }
        axios.post("http://localhost:4000/api/createChannel",data).then(res=>{
            if(res.data){
                if(res.data.error){
                    console.error(res.data.error)
                }
                else{
                    return dispatch({type:CREATE_CHANNEL,payload:res.data.channel})
                }
            }else{
                console.error("nous n'arrivons pas a crée un canal")
            }
        }).catch(err=>{
            console.error(err)
        })
    }
}
export const addMessageToChannel =({_id,posterId,pseudo,picture,message,user}) => {
    return dispatch => {
        const data = {
            id:posterId,
            pseudo,
            picture,
            message
        }
        axios.post(`http://localhost:4000/api/addmessagetochannel/${_id}`,data).then(res=>{
            if(res.data){
                if(res.data.error){
                    console.error(res.data.error)
                }else{
                    console.log(res.data.channel)
                }
            }
        }).catch(err=>{
            console.error(err)
        })
        console.log(user)
        const myData = {
            message: message,
            posterName: user.pseudo,
            posterPicture: user.picture,
            timestamps: Date.now()
        }
        return dispatch({type:ADD_MESSAGE_TO_CHANNEL,payload:myData})
    }
}
export const addUserToChannel = ({id,memberId,pseudo,picture})=>{
    return dispatch => {
        let data  = {
            id: memberId,
            pseudo,
            picture
        }
        
        axios.post(`http://localhost:4000/api/addusertochannel/${id}`,data).then(res=>{
            if(res.data){
                if(res.data.error){
                    console.error(res.data.error)
                }else{
                    return dispatch({type:ADD_USER_TO_CHANNEL,payload:res.data.channel})
                }
            }else{
                console.error("nous n'arrivons pas a trouver le 'res.data'")
            }
        }).catch(err=>{
            console.error(err)
        })
    }
}