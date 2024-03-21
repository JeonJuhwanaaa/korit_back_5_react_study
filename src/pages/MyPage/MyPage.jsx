/** @jsxImportSource @emotion/react */

import { useMutation, useQueryClient } from "react-query";
import * as s from "./style";
import { GoShieldCheck } from "react-icons/go";
import { sendAuthMailRequest } from "../../apis/api/sendAuthMail";
import FullSizeLoader from "../../components/FullSizeLoader/FullSizeLoader";

function MyPage() {

    const queryClient = useQueryClient();
    const principalData = queryClient.getQueryData("principalQuery");       // AuthRoute에 있는 키값 가져오기위함
    
    // get요청은 ussQuery 사용
    // reactQuery 라이브러리 중 하나, get요청 외 나머지는 useMutation 사용
    const sendAuthMailMutation = useMutation({
        mutationKey: "sendAuthMailMutation",
        mutationFn: sendAuthMailRequest,
        retry: 0,
        onSuccess: (response) => {
            if(response) {
                alert("메일 전송을 완료하였습니다.");
            }else {
                alert("메일 전송에 실패하였습니다.");
            }
        }
    });
    
    const handleSendAuthMailClick = () => {
        // mutate 호출 시 위 mutationFn 실행 -> post요청
        sendAuthMailMutation.mutate();
    }

    return (
        <>
            {
                sendAuthMailMutation.isLoading 
                ? <FullSizeLoader />
                : <div css={s.layout}>
                    <div css={s.header}>
                        <div css={s.imgBox}>
                            <div css={s.profileImg}>
                                <img src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20131230_112%2Fmania4000_1388407275192Jsaj5_JPEG%2F10._%253F%253F%253F.jpg&type=a340" alt="" />
                            </div>
                        </div>
                        <div css={s.infoBox}>
                            <div css={s.infoText}>사용자이름: {principalData.data.username}</div>
                            <div css={s.infoText}>이름: {principalData.data.name}</div>
                            <div css={s.emailBox}>
                                <div css={s.infoText}>이메일: {principalData.data.email}</div>
                                {
                                    principalData.data.authorities.filter(auth => auth.authority === "ROLE_USER").length === 0
                                    ?
                                    <button css={s.infoButton} onClick={handleSendAuthMailClick}>인증하기</button>
                                    :
                                    <div css={s.emailCheck}><GoShieldCheck /></div>
                                }
                            </div>
                            <div css={s.infoButtons}>
                                <button css={s.infoButton}>정보 수정</button>
                                <button css={s.infoButton}>비밀번호 수정</button>
                            </div>
                        </div>
                    </div>
                    <div css={s.bottom}>

                    </div>
                </div>
            }
        </>
    );
}

export default MyPage;