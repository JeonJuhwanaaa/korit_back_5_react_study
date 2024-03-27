/** @jsxImportSource @emotion/react */
import Select from "react-select";
import * as s from "./style";
import { useQuery, useQueryClient } from "react-query";
import { useEffect, useRef, useState } from "react";
import { useReactSelect } from "../../hooks/useReactSelect";
import { useBookRegisterInput } from "../../hooks/useBookRegisterInput";
import { getBookCountRequest, searchBooksRequest } from "../../apis/api/bookApi";
import { useSearchParams } from "react-router-dom";
import AdminBookSearchPageNumbers from "../AdminBookSearchPageNumbers/AdminBookSearchPageNumbers";
import { useRecoilState } from "recoil";
import { selectedBookState } from "../../atoms/adminSelectedBookAtom";

function AdminBookSearch( { selectStyle, bookTypeOptions, categoryOptions } ) {

    const [ searchParams, setSearchParams ] = useSearchParams();
    const [ bookList, setBookList ] = useState([]);
    const searchCount = 20;

    const [ checkAll, setCheckAll ] = useState({
        checked: false,
        target: 1       // 1 : 전체선택 , 2: 부분선택 
    });

    const [ selectedBook, setSelectedBook ] = useRecoilState(selectedBookState);
    const [ lastCheckBookId, setLastCheckBookId ] = useState(0);

    const searchBooksQuery = useQuery(
        ["searchBooksQuery", searchParams.get("page")],         // page번호 바뀌면 렌더링
        async () => await searchBooksRequest({
            page: searchParams.get("page"),
            count: searchCount,
            bookTypeId: selectedBookType.option.value,
            categoryId: selectedCategory.option.value,
            searchTypeId: selectedSearchType.option.value,
            searchText: searchText.value
        }),
        {
            refetchOnWindowFocus: false,            // (고정)화면 포커스가 변할때마다 렌더링될것인지 아닌지
            onSuccess: response => {
                console.log(response);
                setBookList(() => response.data.map(book => {
                    return {
                        ...book,
                        checked: false
                    }
                }));
            }
        }
    );

    const getBookCountQuery = useQuery(
        ["getBookCountQuery", searchBooksQuery.data],       // 검색에따라 페이지번호가 바뀌어야하기때문에 
        async () => await getBookCountRequest({
            count: searchCount,
            bookTypeId: selectedBookType.option.value,
            categoryId: selectedCategory.option.value,
            searchTypeId: selectedSearchType.option.value,
            searchText: searchText.value
        }),
        {
            refetchOnWindowFocus: false,
            onSuccess: response => {
                console.log(response);
            }
        }
    );


    const searchSubmit = () => {
        // 검색했을 때 page1 로 이동
        setSearchParams({
            page: 1
        });
        searchBooksQuery.refetch();     // useQuery 정의 한 것을 [실행]
        
        // console.log([
        //     selectedBookType.option.value,
        //     selectedCategory.option.value,
        //     selectedSearchType.option.value
        // ]);
    }

    const selectedBookType = useReactSelect({value: 0, label: "전체"});
    const selectedCategory = useReactSelect({value: 0, label: "전체"});
    const selectedSearchType = useReactSelect({value: 0, label: "전체"});
    const searchText = useBookRegisterInput(searchSubmit);

    const searchTypeOptions = [
        {value: 0, label: "전체"},
        {value: 1, label: "도서명"},
        {value: 2, label: "저자명"},
        {value: 3, label: "출판사"},
        {value: 4, label: "ISBN"}
    ];

    const selectStyle2 = {
        control: baseStyles => ({
            ...baseStyles,
            borderRadius: "0px",
            border: "none",
            borderRight: "1px solid #dbdbdb",
            outline: "none",
            boxShadow: "none"
        })
    }

    // 체크 시 전부 체크
    useEffect(() => {
        if(checkAll.target === 1) {
            setBookList(() =>                   // 웹 페이지 상 1~20번의 북리스트이다
                bookList.map(book => {
                    return {
                        ...book,
                        checked: checkAll.checked       // true 값을 받는다 (=체크가 됐다)
                    }
                })
            );
        }
    },[checkAll.checked]);

    const handleCheckAllChange = (e) => {               // 클릭 시 checked 는 true가 됐다(= 체크가 됐다)
        setCheckAll(() => {
            return{
                checked: e.target.checked,              // 기본제공 함수 : 기본 디폴트값이 false , 한번클릭 시 true / 다시 누르면 false
                target: 1
            }
        });
    }

    // 단일 체크
    useEffect(() => {
        // 체크 안된 것 갯수 
        const findCount = bookList.filter(book => book.checked === false).length;
        // 다 체크 됐을 때
        if(findCount === 0) {
            setCheckAll(() => {
                return {
                    checked: true,
                    target: 2
                }
            });
        } else {
            setCheckAll(() => {
                return {
                    checked: false,
                    target: 2
                }
            });
        }
    },[bookList]);

    // 체크된것 중에서 마지막인 것을 상태 변환
    useEffect(() => {
        let lastSelectedBook = {...selectedBook};
        let checkStatus = false;

        lastSelectedBook = bookList.filter(book => book.bookId === lastCheckBookId && book.checked === true)[0];
        if(!!lastSelectedBook) {
            checkStatus = true;
        }

        if(!checkStatus) {
            setSelectedBook(() => ({
                bookId: 0,
                isbn: "",
                bookTypeId: 0,
                bookTypeName: "",
                categoryId: 0,
                categoryName: "",
                bookName: "",
                authorName: "",
                publisherName: "",
                coverImgUrl: ""
            }));
        }else {
            setSelectedBook(() => lastSelectedBook);
        }
    },[bookList]);


    // 단일 체크
    const handleCheckOnChange = (e) => {
        const bookId = parseInt(e.target.value);          // input 안에 들어간 value 는 무조건 String
        setBookList(() => 
            bookList.map(book => {
                if(book.bookId === bookId) {    //
                    return {
                        ...book,
                        checked: e.target.checked
                    }
                }
                return book;
            })
        )
        setLastCheckBookId(() => bookId);
    }


    return (
        <div>
            <div css={s.searchBar}>
                <Select 
                    styles={selectStyle2} 
                    options={[{value: 0, label: "전체"}, ...bookTypeOptions]} 
                    defaultValue={selectedBookType.defaultValue}
                    value={selectedBookType.option}
                    onChange={selectedBookType.handleOnChange}
                />
                <Select 
                    styles={selectStyle2} 
                    options={[{value: 0, label: "전체"}, ...categoryOptions]} 
                    defaultValue={selectedBookType.defaultValue}
                    value={selectedCategory.option}
                    onChange={selectedCategory.handleOnChange}
                />
                <Select 
                    styles={selectStyle} 
                    options={searchTypeOptions} 
                    defaultValue={selectedBookType.defaultValue}
                    value={selectedSearchType.option}
                    onChange={selectedSearchType.handleOnChange}
                />
                <input 
                    css={s.searchInput}
                    type="text"
                    value={searchText.value}
                    onChange={searchText.handleOnChange}
                    onKeyDown={searchText.handleOnKeyDown}
                />
                <button css={s.searchButton} onClick={() => searchSubmit()} >검색</button>
            </div>

            <div css={s.tableLayout}>
                <table css={s.table}>
                    <thead>
                        <tr css={s.theadTr}>
                            <th><input type="checkbox" checked={checkAll.checked} onChange={handleCheckAllChange}/></th>
                            <th>코드번호</th>
                            <th>도서명</th>
                            <th>저자명</th>
                            <th>출판사명</th>
                            <th>ISBN</th>
                            <th>도서형식</th>
                            <th>카테고리</th>
                            <th>표지URL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookList.map(
                                (book) => 
                                <tr key={book.bookId}>
                                    <td><input type="checkbox" value={book.bookId} checked={book.checked} onChange={handleCheckOnChange}/></td>
                                    <td>{book.bookId}</td>
                                    <td>{book.bookName}</td>
                                    <td>{book.authorName}</td>
                                    <td>{book.publisherName}</td>
                                    <td>{book.isbn}</td>
                                    <td>{book.bookTypeName}</td>
                                    <td>{book.categoryName}</td>
                                    <td>{book.coverImgUrl}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <div>
                {
                    !getBookCountQuery.isLoading &&
                    <AdminBookSearchPageNumbers bookCount={getBookCountQuery.data?.data} />
                }
            </div>
        </div>
    );
}

export default AdminBookSearch;