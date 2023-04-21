// import { useEffect, useState } from "react";
import useFetch from "../customize/fetch";
import moment from "moment";

const Covid = () => {

    const today = new Date(new Date().setHours(0, 0, 0, 0));
    const priorDate = moment().subtract(30, 'days');
    const {data: dataCovid , isLoading, isError} 
        = useFetch('https://api.covid19api.com/country/vietnam?from=2021-10-01T00%3A00%3A00Z&to=2021-11-30T00%3A00%3A00Z')

        // useFetch ở dưới dùng để dùng với thời gian thực, hiện tại,
        // = useFetch(`https://api.covid19api.com/country/vietnam?from=${priorDate.toISOString()}&to=${today.toISOString()}`)
    // vì ở useFetch trả ra là data nhưng bên đây lại là dataCovid
    // nên gán giá trị dataCovid : data
    // bằng cách trên hoặc dưới đều đúng
    // let dataCovid = useFetch(url).data

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