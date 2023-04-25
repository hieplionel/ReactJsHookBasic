import './AddNewBlog.scss';
import { useState } from 'react';

const AddNewBlog = () => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');

    const handleSubmitBtn = () => {
        console.log('check data state: ', title, content, image)
    }

    return (
        <div className="add-new-container">
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
        </div>
    )
}

export default AddNewBlog;