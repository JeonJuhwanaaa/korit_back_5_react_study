import axios from "axios";
// axios . crud 
const instance = axios.create({
    // 항상 이 주소로 요청을 날리겠다
    baseURL: "http://localhost:8080",                       // 기본 공통 주소
    headers:  {
        Authorization: "Bearer " + localStorage.getItem("AccessToken")
    }
});

export default instance;