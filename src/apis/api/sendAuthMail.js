import instance from "../utils/instance"

export const sendAuthMailRequest = async () => {
    return await instance.post("/mail/send");               // 토큰 발행, 메일전송
}