import {useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";


// bởi vì đang viết 1 customhook nên 
// một cái customhook cần phải bắt đầu với keyword use
// khi có keyword use thì react mới hiểu đây là customhook
const useFetch = (url) => {
    const [ data, setData] = useState ([]);

    const [isLoading, setIsLoading] = useState (true);

    const [isError, setIsError] = useState (false);
    // = với hàm componentDidMount
    useEffect ( () => {
        // handle lỗi sử dụng try/catch(e)
        try {
                async function fetchData() {
                    // setTimeout(async() => {
                    let res = await axios.get(url)
                    
                    // dấu ? dùng để trả về true/false
                    let data = res && res.data ? res.data : []; 
                    // giải thích code dòng trên:
                    // nếu điều kiện (res && res.data) đúng (có giá trị) thì gán biến data = res.data
                    // cón nếu điều kiện (res && res.data) (không có giá trị) sai thì gán biến data = []


                    // nếu không dùng dấu ? thì có thể viết theo kiểu truyền thống bằng if/else
                    // let data = null;
                    // if (res && res.data) {
                    //     data = res.data;
                    // } else {
                    //     data =[]
                    // }
            
                    if(data && data.length > 0) {
                        data.map(item => {
                            item.Date = moment(item.Date).format('DD/MM/YYYY');
                            return item;
                        })

                        data = data.reverse()
                        // .reverse() dùng để hiện thị ngược dữ liệu 
                    }

                    setData(data);
                    setIsLoading(false);
                    setIsError(false);
                }

                fetchData();

            // }, 3000)
        }
        catch(e) {
            setIsError(true);
            setIsLoading(false);
        }
        
    },[url]);

    return {
        data, isLoading, isError
    }

}

export  default useFetch;