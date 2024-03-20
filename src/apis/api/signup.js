import instansce from "../utils/instance"

// data 넣은 것은 js 는 자료형 선언이 따로 없기때문에 매개변수로 무언가가 들어갈 것이다 라는 정의 해놓은것
// signupPage에서 매개변수로 담긴것을 받는 것
// post 요청이 되면 spring 으로 넘어가서 filter - controller - service - repository - db 순으로 실행됨
export const signupRequest = async (data) => {
    try {
        const response = instansce.post("/auth/signup", data);
        return response;
    } catch(error) {
        console.log(error);
        return error.response;
    }
}