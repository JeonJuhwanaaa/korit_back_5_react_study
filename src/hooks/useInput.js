import { useEffect, useState } from "react"
import { REGEX } from "../constants/regex";

export const useInput = (property) => {
    const [ value, setValue ] = useState("");
    const [ message, setMessage ] = useState(null);

    // entries :
    useEffect(() => {

        // value가 빈값일 경우
        if(!value) {
            setMessage(() => null);
            return;
        }

        const regexEntries = Object.entries(REGEX);
        for(let [ k, v ] of regexEntries) {
            if(property === k) {
                if(v.regexr.test(value)) {
                    setMessage(() => {
                        return {
                            type: "success",
                            text: ""
                        }
                    })
                } else {
                    setMessage(() => {
                        return {
                            type: "error",
                            text: v.text
                        }
                    })
                }
            }
        }
    },[value])

    const handelOnChange = (e) => {
        setValue(() => e.target.value);
    }

    // 외부로 보내줄 것들
    return [ value, handelOnChange,  message, setValue, setMessage ];
}