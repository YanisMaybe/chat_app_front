import axios from 'axios';

export const GET_USERS = "GET_USERS";
export const GET_ONE_USER = "GET_ONE_USER";
export const CHANGE_USER_PICTURE = "CHANGE_USER_PICTURE";

export const getAllUsers = () => {
    return dispatch => {
        axios.get("https://chatappback.onrender.com/auth/getallusers").then(res => {
            if (res) {
                return dispatch({ type: GET_USERS, payload: res.data })
            } else {
                console.error("nous n'arrivons pas a recuperer les utilisateur")
            }
        }).catch(err => {
            console.error(err)
            console.error('4err4')
        })
    }
}
export const getOneUser = id => {
    return dispatch => {
        axios.get(`https://chatappback.onrender.com/auth/getoneuser/${id}`).then(res => {
            if (res.data) {
                return dispatch({ type: GET_ONE_USER, payload: res.data })
            } else {
                console.error("nous n'arrivons pas a recuperer l'utilisateur")
            }
        }).catch(err => {
            console.error(err)
        })
    }
}
export const changeUserPicture = (id, image,channelId) => {
    let formData = new FormData();
    formData.append("userId", id)
    formData.append("image", image)
    formData.append("channelId",channelId)
    return dispatch => {

        console.log('formData')
        console.log(formData)
        console.log(image)
        axios({
            method: "post",
            url: "https://chatappback.onrender.com/api/editpicture",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
          }).then(res => {
            if (res.data.error) {
                console.error(res.data.error)
            } else {
                console.log(image)
                return dispatch({ type: CHANGE_USER_PICTURE, payload: `https://chatappback.onrender.com/images/${id}.jpg` })
            }
        }).catch(err => {
            console.error(err)
        })
    }
}