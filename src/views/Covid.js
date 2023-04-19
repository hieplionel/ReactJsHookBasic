import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const Covid = () => {

    const [ dataCovid, setDataCovid] = useState ([]);

    const [isLoading, setIsLoading] = useState (true);

    const [isError, setIsError] = useState (false);


    // = với hàm componentDidMount
    useEffect (async() => {
        try {
            // setTimeout(async() => {
                let res = await axios.get('https://api.covid19api.com/country/vietnam?from=2021-10-01T00%3A00%3A00Z&to=2021-10-20T00%3A00%3A00Z')
            
                console.log('checkk res', res)
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

                setDataCovid(data);
                setIsLoading(false);
                setIsError(false);

            // }, 3000)
        }
        catch(e) {
            setIsError(true);
            setIsLoading(false);
        }
        
    }, []);

    // vi dụ câu điều kiện
    // let x = 0;

    return (
        <>
            <h3>Covid 19 tracking in VIETNAM</h3>

            {/* {
                x > 5 ? <span> I'm greater than 5</span> : <span> I'm less than 5</span>
            } */}

            {/* { x > 5 && <span> I'm greater than 5</span>}
            { x < 5 && <span> I'm less than 5</span>} */}


            <table>
                { console.log('>>> check data covid: ', dataCovid)}
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Confirmed</th>
                        <th>Active</th>
                        <th>Deaths</th>
                        <th>Recovered</th>
                        <th>ID</th>

                    </tr>
                </thead>
                <tbody>

                    {isError === false && isLoading === false && dataCovid && dataCovid.length > 0 && 
                        dataCovid.map( item => {
                            return (
                                <tr key={item.ID}>
                                    <td>{item.Date}</td>
                                    <td>{item.Confirmed}</td>
                                    <td>{item.Active}</td>
                                    <td>{item.Deaths}</td>
                                    <td>{item.Date}</td>
                                    <td>{item.ID}</td>
                                </tr>
                            )
                        })
                    }

                    {isLoading === true 
                    && <tr>
                            <td colSpan = '6' style ={{'textAlign':'center'}}>isLoading...</td>
                        </tr>
                    }

                    {isError === true 
                    && <tr>
                            <td colSpan = '6' style ={{'textAlign':'center'}}>Something Wrong...</td>
                        </tr>
                    }

                    
                </tbody>
            </table>
        </>
    )
}

export default Covid