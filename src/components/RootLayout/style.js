import { css } from "@emotion/react";

export const background = css`
    position: fixed;
    top: 0;
    left: 0;
    z-index: -99;

    width: 100%;
    height: 100%;
    background-color: #666666;
`;

export const layout = css`
    box-sizing: border-box;
    margin: 100px auto;
    padding: 10px;

    width: 800px;
    height: 600px;

    border: 2px solid #fafafa;
    border-radius: 30px;

    overflow: hidden;
    background-color: black;

`;