import './AddNewBlog.scss';
import { useState } from 'react';
import axios from 'axios';

const AddNewBlog = (props) => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');

    // khi dùng keywors await thì bắt buộc phải có key word async vào 
    // để nó biết đây là một function bất đồng bộ
    const handleSubmitBtn = async () => {
        // preventDefault() ngăn chặn việc reload
        // event.preventDefault();
        // if (title === '' || title === 'null' || title=== undefined) {
        //     alert('empty title')
        // }
        // dòng lệnh bên trên và bên dưới đều giống nhau, nhưng bên dưới viết rút gọn
        if (!title ) {
            alert('empty title');
            return;
        }
        if (!content ) {
            alert('empty content')
            return;
        }

        let data = {
            title: title,
            body: content,
            image: image,
            userId: 1,
        }

        let res = await axios.post('https://jsonplaceholder.typicode.com/posts', data);

        if (res && res.data) {
            let newBlog = res.data;
            props.handleAddNew(newBlog);
            console.log('check new blogs: ', newBlog)
        }
        console.log('>>> check res post data : ', res);

    }



    return (
        <div className="add-new-container">
            {/* <form onSubmit={handleSubmitBtn}> */}
                <div className="text-add-new">---&gt; ADD NEW BLOG &lt;---</div>
                <div className="input-data">
                    <label>Title: </label>
                    <input type="text" value={title} 
                        onChange={(event) => setTitle(event.target.value)}/>
                </div>
                <div className="input-data">
                    <label>Content: </label>
                    <input type="text" value={content} 
                        onChange={(event) => setContent(event.target.value)}/>
                </div>
                <div className="input-data">
                    <label>Image: </label>
                    <input type="file" value={image} 
                        onChange={(event) => setImage(event.target.value)}/>
                </div>
                <button className="btn-add-new" onClick={handleSubmitBtn}>Submit</button>
                {/* <button className="btn-add-new" type="submit">Submit</button>
            </form> */}
        </div>
    )
}

export default AddNewBlog;