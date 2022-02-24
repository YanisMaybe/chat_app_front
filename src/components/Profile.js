import React, { useState } from "react";
import buttonArrow from '../import/buttom-arrow.svg';
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { useDispatch, useSelector } from "react-redux";
import { changeUserPicture } from "../Actions/usersActions";

const profile = ({ picture, name, userId, channelId }) => {
    const dispatch = useDispatch()


    const [onePonce, setOnePonce] = useState(false)
    const [image, setImage] = useState(null)
    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles) {
            setOnePonce(true)
            setImage(acceptedFiles[0])
        } else {
            console.error("les fichier ne sont pas accepté")
        }
    }, [])
    if (onePonce && image !== null) {
        dispatch(changeUserPicture(userId, image, channelId))
        setOnePonce(false)
        window.location.reload();
    }

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: "image/jpeg, image/jpg, image/png" })
    return (
        <>
            <div className="left">
                <input {...getInputProps()} />
                <div {...getRootProps()} className="btn" style={{ width: "42px",height: "42px" }}>
                    <img className="image" alt="prof" src={picture} />
                </div>
                <p className="ProfileName">{name}</p>
            </div>
            <div id="rightPart" className="right a" onClick={e => {
                let popup = document.getElementById("popup")
                let rotateImage = document.getElementById("imageToRotate")
                if (rotateImage.className === "img") {
                    rotateImage.classList.add("rotateImage")
                    popup.classList.remove("nonePopup")
                    popup.classList.remove("none")
                } else if (rotateImage.className === "img rotateImage") {
                    popup.classList.add("nonePopup")
                    rotateImage.classList.remove('rotateImage')
                    setTimeout(() => {
                        popup.classList.add("none")
                    }, 400);
                }
            }}>

            </div>
            <img id="imageToRotate" className="img" style={{
                width: '19px',
                height: '12px',
                position: 'relative',
                right: '13px',
                transition: 'transform 0.2s'
            }} src={buttonArrow} alt="how" />
        </>
    )
}

export default profile