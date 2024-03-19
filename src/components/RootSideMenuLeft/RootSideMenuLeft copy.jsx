/** @jsxImportSource @emotion/react */
import { useRecoilState } from "recoil";
import * as s from "./style copy";
import { HiMenu } from "react-icons/hi"
import { menuState } from "../../atoms/menuAtom";
import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";


function RootSideMenuLeft() {

    const [ show, setShow ] = useRecoilState(menuState);

    const [ isLogin, setLogin ] = useState(false);
    const queryClient = useQueryClient();
    const principalQueryState = queryClient.getQueryState("principalQuery");

    useEffect(() => {
        setLogin(() => principalQueryState.status === "success");
    },[principalQueryState.status]);

    const handleCloseClick = () => {
        setShow(() => false)
    }

    return (
        <div css={s.layout(show)} >
            <div css={s.header}>
                <button css={s.menuButton} onClick={handleCloseClick}>
                    <HiMenu />
                </button>
            </div>

            <div css={s.profilelayout}>

                {
                    !isLogin
                    ?
                    <>
                        <Link css={s.needLogin} to={"/auth/signin"} onClick={handleCloseClick}>
                            로그인을 해주세요
                        </Link>
                        <div css={s.profileName}>name</div>
                        <div css={s.profileEmail}>email</div>
                    </>
                    :
                    <>
                        <button css={s.profile}>
                            <FiUser />
                        </button>
                        <div css={s.profileName}>name</div>
                        <div css={s.profileEmail} >email</div>
                    </>
                }
            </div>
            


            <div css={s.menuList}>
                <Link css={s.menuLink}>
                    도서 검색
                </Link>
            </div>

        </div>
    );
}

export default RootSideMenuLeft;