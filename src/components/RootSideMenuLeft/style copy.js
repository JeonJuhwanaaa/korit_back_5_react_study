import { css } from "@emotion/react";

export const layout = (show) => css`

    position: absolute;
    top: 0;

    transition: all 0.5s ease-in-out;
    opacity: ${show ? 1 : 0};
    left: ${show ? "0px" : "-200px"};

    box-sizing: border-box;

    border-right: 1px solid #dbdbdb;
    padding: 15px 0px;

    width: 200px;
    height: 100%;

    background-color: #fafafa;
`;

export const header = css`
    box-sizing: border-box;
    padding: 0px 10px;

    display: flex;
    justify-content: flex-end;
    align-items: center;

    border-bottom: 1px solid #dbdbdb;

    width: 100%;
    height: 50px;

`;

export const menuButton = css`

    box-sizing: border-box;
    padding: 10px;

    border: none;

    // transparent : 뒷 배경색 따라(=배경색 없앰)
    background-color: transparent;

    cursor: pointer;

    & > *{
        font-size: 16px;
    }
`;



export const profilelayout = css`
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #dbdbdb;
    padding: 50px 0px 20px 0px;
    flex-direction: column;
`;


export const profile = css`
    display: flex;
    justify-content: center;
    align-items: center;

    box-sizing: border-box;
    border: none;
    border-radius: 50%;

    width: 150px;
    height: 150px;

    font-size: 50px;

    cursor: pointer;
`;

export const profileName = css`
    display: flex;
    justify-content: center;
`;
export const profileEmail = css`
    display: flex;
    justify-content: center;
`;

export const needLogin = css`
    display: flex;
    justify-content: center;

    border: 1px solid #dbdbdb;
    margin: 0px 10px;
    padding: 5px;

    font-size: 14px;
    font-weight: 600;
    color: #222222;
    text-decoration: none;
`;





export const menuList = css`

`;

export const menuLink = css`
    box-sizing: border-box;
    border-bottom: 1px solid #dbdbdb;
    padding: 0px 20px;

    display: flex;
    align-items: center;

    height: 40px;

    background-color: #fdfdfd;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    color: #222222;
`;