/** @jsxImportSource @emotion/react */
import * as s from "./style";

import AuthPageInput from '../../components/AuthPageInput/AuthPageInput';
import RightTopButton from "../../components/RightTopButton/RightTopButton";
import { useInput } from "../../hooks/useInput";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupPage() {

    // const testErrorMessage = {
    //     type : "success",
    //     text : "이미 등록된 사용자이름입니다."
    // }

    const navigate = useNavigate();

    const [ username, setUsername, userNameChange ] = useInput();
    const [ password, setPassword, passwordChange ] = useInput();
    const [ checkPassword, setCheckPassword, checkPasswordChange ] = useInput();
    const [ name, setName, nameChange ] = useInput();
    const [ email, setEmail, emailChange ] = useInput();

    const[messageGroup, setMessageGroup] = useState({
        username : null,
        password : null,
        checkPassword : null,
        name : null,
        email : null
    });


    const handleCheckPassword = (e) => {

        // e.target.value 가 !!(참)이면
        if(!!e.target.value) {
            setMessageGroup(messageGroup => {
                return {
                    ...messageGroup,
                    checkPassword: {
                        type: checkPassword === password ? "success" : "error",
                        text: checkPassword === password ? "" : "비밀번호가 서로 일치하지 않습니다"
                    }
                }
            })
        }else {
            setMessageGroup(messageGroup => {
                return {
                    ...messageGroup,
                    checkPassword: null
                }
            })
        }
    }


    //눌렀을 때 back으로 날려주기
    const handleSignupSubmit = () => {
        
        if(messageGroup?.checkPassword?.type === "error") {
            alert("가입할 회원의 정보를 다시 확인하세요/")
            return;
        }
        
        if(!checkPassword) {
            setMessageGroup(messageGroup => {
                return {
                    ...messageGroup,
                    checkPassword: {
                        type: "error",
                        text: "비밀번호를 입력하세요"
                    }
                }
            })
            return;
        }

        const signupData = {
            username,
            password,
            checkPassword,
            name,
            email
        }

        signupRequest(signupData);
    }

    const signupRequest = async (signupData) => {
        
        // post 요청 ("날릴 주소", ))
        // axios 는 알아서 객체(signupData)를 JSON으로 바꿔서 보낸다
        try{
            const response = await axios.post("http://localhost:8080/auth/signup", signupData)
            
            // console.log(response.data);  -> true 가 들어가있을 것이다
            if(response.data) {
                navigate("/auth/signin");
            }

        }catch(error) {
            const errorMap = error.response.data;
            const entires = Object.entries(errorMap);
            let newMessageGroup = {
                username:{
                    type: "success",
                    text: "사용할 수 있는 사용자 이름 입니다"
                },
                password:{
                    type: "success",
                    text: "사용 가능한 비밀번호 입니다"
                },
                checkPassword:{
                    type: "success",
                    text: ""
                },
                name:{
                    type: "success",
                    text: "확인했습니다"
                },
                email:{
                    type: "success",
                    text: "확인했습니다"
                }
              };

            for(let [key, value] of entires){
                newMessageGroup = {
                        ...newMessageGroup,
                        [key]: {
                            type : "error",
                            text : value
                     }
                }
              }

            if(newMessageGroup.password.type === "error") {
                newMessageGroup = {
                    ...newMessageGroup,
                    checkPassword: null
                }
                setPassword(() => "");
                setCheckPassword(() => "");
            }
            setMessageGroup(() => newMessageGroup);
        }
    }

    return (
        <>
            <div css={s.header}>
                <h1>회원가입</h1>
                <RightTopButton onClick={handleSignupSubmit}>가입하기</RightTopButton>
            </div>

            <AuthPageInput type={"text"} name={"username"} placeholder={"사용자이름"} value={username} onChange={userNameChange} message={messageGroup.username}/>
            <AuthPageInput type={"password"} name={"password"} placeholder={"비밀번호"} value={password} onChange={passwordChange} message={messageGroup.password}/>
            <AuthPageInput type={"password"} name={"checkPassword"} placeholder={"비밀번호 확인"} value={checkPassword} onChange={checkPasswordChange} onBlur={handleCheckPassword} message={messageGroup.checkPassword}/>
            <AuthPageInput type={"text"} name={"name"} placeholder={"성명"} value={name} onChange={nameChange} message={messageGroup.name}/>
            <AuthPageInput type={"text"} name={"email"} placeholder={"이메일"} value={email} onChange={emailChange} message={messageGroup.email}/>
        </>
    );
}

export default SignupPage;