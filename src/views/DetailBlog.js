import {useParams, useHistory} from "react-router-dom";
import useFetch from "../customize/fetch";
import '../style/Blog.scss';

const DetailBlog = () => {
    let {id} = useParams();
    let history = useHistory();

    const {data: dataBlogDetail , isLoading, isError} 
    = useFetch(`https://jsonplaceholder.typicode.com/posts/${id}`, false)

    const handleBackData = () => {
        history.push("/blog");
    }
    return (
        <>
        <button onClick={handleBackData}>&lt;-- back</button>
        <div className="blog-detail">
            {dataBlogDetail /*&& dataBlogDetail.length > 0*/ &&
            <>
                <div className="title">
                    Blog ID: {id} --- {isLoading === true ? 'Loading Data...' : dataBlogDetail.title} 
                </div>
                <div className="content">
                    {dataBlogDetail.body}
                </div> 
            </>
            }
        </div>
        </>
        
    )
}

export default DetailBlog;