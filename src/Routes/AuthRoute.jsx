import { Route, Routes } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { principalState } from '../atoms/principalAtom';
import { useCallback, useEffect } from 'react';
import { getPrincipalRequest } from '../apis/api/principal';
import AuthPage from '../pages/AuthPage/AuthPage';
import HomePage from '../pages/HomePage/HomePage';
import { useQuery } from 'react-query';
import RootSideMenuLeft from '../components/RootSideMenuLeft/RootSideMenuLeft';
import RootHeader from '../components/RootHeader/RootHeader';
import { GridLoader } from 'react-spinners';
import FullSizeLoader from '../components/FullSizeLoader/FullSizeLoader';
import MyPage from '../pages/MyPage/MyPage';
import PageContainer from '../components/PageContainer/PageContainer';
import PasswordEditPage from '../pages/PasswordEditPage/PasswordEditPage';

function AuthRoute() {
    // const [ principal, setPrincipal ] = useRecoilState(principalState);

    // useEffect(() => {
    //     getPrincipal();
    // },[]);

    // const getPrincipal = useCallback(() => {
    //     getPrincipalRequest()
    //     .then(response => {
    //         // console.log(response);
    //         setPrincipal(() => response.data);
    //     }).catch(error => {
    //         console.log(error);
    //     });
    // },[]);
// -------------------------------------------------------------------------------------------
    // 라이브러리 설치 : npm i react-query
    // << useQuery >> : Get요청시에 사용
    // 첫번째 매개변수 : 배열["key값", dependency] - key값은 다른곳에서 리엑트쿼리를 찾을때 사용
    // 두번째 매개변수 : 요청메소드(async, await) function
    /* 세번째 매개변수 : 옵션
     *  {
     *      retry: 0,                           // 요청 실패시 재시도를 여러번 하는데 0(재시도 횟수)으로 하면 재시도 xx
     *      refetchOnWindowFocus: false,        // true 일 때, 포커스가 나갔다가 올때마다 fetch 한다
     *      onSuccess: 함수,                    // 요청 성공 시 response로 넘어간다
     *      onError: 함수,                      // 요청 실패 시 
     *      enable: true or false
     *  }
     * 
     *  */ 
    const principalQuery = useQuery(["principalQuery"], getPrincipalRequest,
    {
        retry: 0,
        refetchOnWindowFocus: false,
        onSuccess: response => {
            console.log("onSuccess");
            console.log(response);
        },
        onError: error => {
            console.log("오류");
            console.log(error);
        }
    });


    return (
        <>
            <RootSideMenuLeft/>
            <RootHeader />
            <PageContainer>
                {
                    principalQuery.isLoading 
                    ? <FullSizeLoader size={20}/>
                    : <Routes>
                        <Route path="/auth/*" element={ <AuthPage /> } />
                        <Route path="/" element={ <HomePage />} />
                        <Route path="/account/MyPage" element={ <MyPage />} />
                        <Route path="/account/edit/password" element={ <PasswordEditPage />} />

                    </Routes>
                }
            </PageContainer>
        </>
    );
}

export default AuthRoute;