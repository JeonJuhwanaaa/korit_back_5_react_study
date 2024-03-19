/** @jsxImportSource @emotion/react */
import { useRecoilState } from "recoil";
import * as s from "./style";
import { menuState } from "../../atoms/menuAtom";


function RootLayout({ children }) {

    const [ show, setShow ] = useRecoilState(menuState);

    // 어디를 클릭하든지 반응
    const handleBackgroundClick = (e) => {
        // console.log("클릭");
        setShow(() => false);
    }

    return (
        <>
            <div css={s.background} ></div>
            <div css={s.layout} onClick={handleBackgroundClick}>
                {children}
            </div>
        </>
    );
}

export default RootLayout;