import { css } from "@emotion/react";

export const layout = (show) => css`

    position: absolute;
    top: 0;

    transition: all 0.5s ease-in-out;
    opacity: ${show ? 1 : 0};
    left: ${show ? "0px" : "-200px"};

    z-index: 99;

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


export const profile = css`
    box-sizing: border-box;
    border-bottom: 1px solid #dbdbdb;

    width: 100%;
    height: 150px;
`;

export const authButtons = css`
    box-sizing: border-box;

    display: flex;
    justify-content: center;
    padding: 20px;

    flex-direction: column;

    width: 100%;
    height: 100%;
    
    & > button{
        box-sizing: border-box;
        margin-bottom: 5px;
        padding: 5px;

        border: 1px solid #dbdbdb;
        border-radius: 3px;
        background-color: white;
        font-weight: 600;

        cursor: pointer;

        &:hover{
            background-color: #fafafa;
        }
        &:active{
            background-color: #eeeeee;
        }
    }
`;

export const settings = css`
    display: flex;
    justify-content: flex-end;
    padding: 5px 10px;
    
    & > *{
        padding: 5px;
        cursor: pointer;
    }
`;

export const profileBox = css`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
`;

export const profileImg = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;

    width: 60px;
    height: 60px;

    border: 1px solid #dbdbdb;
    border-radius: 50%;

    background-color: white;
`;

export const usernameAndEmail = css`
    display: flex;
    flex-direction: column;
    margin-left: 5px;

    cursor: default;

    & > span:nth-of-type(1){
        font-weight: 600;
    }

    & > span:nth-of-type(2){
        font-size: 12px;
    }
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