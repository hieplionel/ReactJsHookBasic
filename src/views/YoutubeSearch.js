import "../style/YoutubeSearch.scss";
import axios from "axios";
import {useState, useEffect} from 'react';
import moment from "moment";

const YoutubeSearch = () => {

    const[videos, setVideos] = useState([]);
    const[query, setQuery] = useState('');

    useEffect(() => {

    },[]);

    const handleSearchYoutube = async () => {
        // let res = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        //     part:'snippet',
        //         maxResults: 20,
        //         key:'AIzaSyBtfDkvQgWMjLQ6c7RzvdifzH9X2ioZvCs',
        //         type: 'video',
        //         q:query
        // })

        let res = await axios({
            "method": "GET",
            "url": 'https://www.googleapis.com/youtube/v3/search',
            "params":{
                'part':'snippet',
                'maxResults':'20',
                'key':'AIzaSyBtfDkvQgWMjLQ6c7RzvdifzH9X2ioZvCs',
                'type': 'video',
                'q':query
            }
        })

        if(res && res.data && res.data.items) {
            let raw = res.data.items;
            let result = [];

            if(raw && raw.length > 0) {
                
                raw.map(item => {
                    let object = {};
                    object.id = item.id.videoId;
                    object.title = item.snippet.title;
                    object.createdAt = item.snippet.publishedAt;
                    object.auther = item.snippet.channelTitle;
                    object.description = item.snippet.description;

                    result.push(object)
                })
            }

            setVideos(result);
        }

    }

    return (
        <div className = "youtube-search-container">
            <div className="yt-search">
                <input type="text" placeholder="Search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                />
                <button type="button" onClick={handleSearchYoutube}>Search</button>
            </div>

            {videos && videos.length > 0 && 
            videos.map(item => {
                return (
                    <div className="yt-result" key={item.id}>
                        <div className="left">
                            <iframe className="iframe-yt"
                                src={`https://www.youtube.com/embed/${item.id}`}
                                title="#30.2 Design Giao Diện &amp; Hoàn Thiện Chức Năng &#39;Search Youtube&#39; với Google APIs và React Hook" 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                allowFullScreen>
                            </iframe>
                        </div> 
                        <div className="right">
                            <div className="title">
                                {item.title}
                            </div>
                            <div className="created-at">
                                Created At: {moment(item.createdAt).format('DD-MM-YYYY HH:mm:ss A')}
                            </div>
                            <div className="author">
                                Author: {item.auther}
                            </div>
                            <div className="description">
                                Description: {item.description}
                            </div>
                        </div>
                    </div>
                )
            })


            }
            
            
        </div>
    )
}

export default  YoutubeSearch;


// {
//     "kind": "youtube#searchListResponse",
//     "etag": "_q-v-BZxli2lj_IaglRo0v9vqU4",
//     "nextPageToken": "CAUQAA",
//     "regionCode": "VN",
//     "pageInfo": {
//       "totalResults": 937,
//       "resultsPerPage": 5
//     },
//     "items": [
//       {
//         "kind": "youtube#searchResult",
//         "etag": "pFXVbWs59fyT17EW1uYGf51OZUk",
//         "id": {
//           "kind": "youtube#channel",
//           "channelId": "UCVkBcokjObNZiXavfAE1-fA"
//         },
//         "snippet": {
//           "publishedAt": "2015-04-17T11:59:24Z",
//           "channelId": "UCVkBcokjObNZiXavfAE1-fA",
//           "title": "Hỏi Dân IT",
//           "description": "Chào mừng các bạn đến với channel \"Hỏi Dân IT\". Mình tên là Eric && Và mình ở đây để giải đáp, hỗ trợ cũng như chia sẻ các ...",
//           "thumbnails": {
//             "default": {
//               "url": "https://yt3.ggpht.com/oEiclGnYQdKhndmRnTOI-V0qU0pwoijkwSs-dLgTGAzr9zcS6NGS-H3ryfRjhgs3LTZwkLjHyA=s88-c-k-c0xffffffff-no-rj-mo"
//             },
//             "medium": {
//               "url": "https://yt3.ggpht.com/oEiclGnYQdKhndmRnTOI-V0qU0pwoijkwSs-dLgTGAzr9zcS6NGS-H3ryfRjhgs3LTZwkLjHyA=s240-c-k-c0xffffffff-no-rj-mo"
//             },
//             "high": {
//               "url": "https://yt3.ggpht.com/oEiclGnYQdKhndmRnTOI-V0qU0pwoijkwSs-dLgTGAzr9zcS6NGS-H3ryfRjhgs3LTZwkLjHyA=s800-c-k-c0xffffffff-no-rj-mo"
//             }
//           },
//           "channelTitle": "Hỏi Dân IT",
//           "liveBroadcastContent": "upcoming",
//           "publishTime": "2015-04-17T11:59:24Z"
//         }
//       },
//       {
//         "kind": "youtube#searchResult",
//         "etag": "HYGbo6rSj0Tzmvs3euBHv-OrqKI",
//         "id": {
//           "kind": "youtube#playlist",
//           "playlistId": "PLncHg6Kn2JT4C0enPGQPK7ZIlEoZ1ZvRy"
//         },
//         "snippet": {
//           "publishedAt": "2021-09-02T10:56:29Z",
//           "channelId": "UCVkBcokjObNZiXavfAE1-fA",
//           "title": "React Season 1 | Tự Học React Cơ Bản Từ A đến Z Cho Người Mới Bắt Đầu - Hỏi Dân IT",
//           "description": "React.JS là một thư viện, framework giúp xây dựng một website hiện đại, có tính mở rộng và hiệu năng cực lớn. Các sản phẩm ...",
//           "thumbnails": {
//             "default": {
//               "url": "https://i.ytimg.com/vi/ONnlXF4mpIg/default.jpg",
//               "width": 120,
//               "height": 90
//             },
//             "medium": {
//               "url": "https://i.ytimg.com/vi/ONnlXF4mpIg/mqdefault.jpg",
//               "width": 320,
//               "height": 180
//             },
//             "high": {
//               "url": "https://i.ytimg.com/vi/ONnlXF4mpIg/hqdefault.jpg",
//               "width": 480,
//               "height": 360
//             }
//           },
//           "channelTitle": "Hỏi Dân IT",
//           "liveBroadcastContent": "none",
//           "publishTime": "2021-09-02T10:56:29Z"
//         }
//       },
//       {
//         "kind": "youtube#searchResult",
//         "etag": "toghpD64w6pq4qvHawJde3EWQmI",
//         "id": {
//           "kind": "youtube#playlist",
//           "playlistId": "PLncHg6Kn2JT4xzJyhXfmJ53dzwVbq-S_E"
//         },
//         "snippet": {
//           "publishedAt": "2021-10-09T12:47:29Z",
//           "channelId": "UCVkBcokjObNZiXavfAE1-fA",
//           "title": "React Season 2 với Hook - Tự Học React.JS Cơ Bản Từ Z đến A Cho Người Mới Bắt Đầu - Hỏi Dân IT",
//           "description": "React.JS là một thư viện, framework giúp xây dựng một website hiện đại, có tính mở rộng và hiệu năng cực lớn. Các sản phẩm ...",
//           "thumbnails": {
//             "default": {
//               "url": "https://i.ytimg.com/vi/_gZTmBF7__M/default.jpg",
//               "width": 120,
//               "height": 90
//             },
//             "medium": {
//               "url": "https://i.ytimg.com/vi/_gZTmBF7__M/mqdefault.jpg",
//               "width": 320,
//               "height": 180
//             },
//             "high": {
//               "url": "https://i.ytimg.com/vi/_gZTmBF7__M/hqdefault.jpg",
//               "width": 480,
//               "height": 360
//             }
//           },
//           "channelTitle": "Hỏi Dân IT",
//           "liveBroadcastContent": "none",
//           "publishTime": "2021-10-09T12:47:29Z"
//         }
//       },
//       {
//         "kind": "youtube#searchResult",
//         "etag": "9L-1kl3JdLULDalLsmEH1rH43js",
//         "id": {
//           "kind": "youtube#playlist",
//           "playlistId": "PLncHg6Kn2JT6E38Z3kit9Hnif1xC_9VqI"
//         },
//         "snippet": {
//           "publishedAt": "2021-05-08T14:38:15Z",
//           "channelId": "UCVkBcokjObNZiXavfAE1-fA",
//           "title": "Khóa học Fullstack SERN (SQL, Express.js, React.js, Node.js) Web Developer  Miễn Phí với Hỏi Dân IT",
//           "description": "Làm sao để trở thành 1 fullstack web developer ? Đây là câu hỏi mà mình không có lời giải đáp khi còn là sinh viên. Tuy nhiên ...",
//           "thumbnails": {
//             "default": {
//               "url": "https://i.ytimg.com/vi/VvvXhNbFWKY/default.jpg",
//               "width": 120,
//               "height": 90
//             },
//             "medium": {
//               "url": "https://i.ytimg.com/vi/VvvXhNbFWKY/mqdefault.jpg",
//               "width": 320,
//               "height": 180
//             },
//             "high": {
//               "url": "https://i.ytimg.com/vi/VvvXhNbFWKY/hqdefault.jpg",
//               "width": 480,
//               "height": 360
//             }
//           },
//           "channelTitle": "Hỏi Dân IT",
//           "liveBroadcastContent": "none",
//           "publishTime": "2021-05-08T14:38:15Z"
//         }
//       },
//       {
//         "kind": "youtube#searchResult",
//         "etag": "nIkwtJKtKyBoh2uEAi6bH3gg_-8",
//         "id": {
//           "kind": "youtube#playlist",
//           "playlistId": "PLncHg6Kn2JT45Gg8eOGiqHv2yFqcBXJrK"
//         },
//         "snippet": {
//           "publishedAt": "2021-12-07T12:04:57Z",
//           "channelId": "UCVkBcokjObNZiXavfAE1-fA",
//           "title": "React Season 3 ULTIMATE - Tự Học React.JS Từ Z đến A Cho Beginners",
//           "description": "Tiếp nối sự thành công của 2 khóa học React đã public trên channel của mình, đây chính là series kế thừa cũng như khỏa lấp ...",
//           "thumbnails": {
//             "default": {
//               "url": "https://i.ytimg.com/vi/z5ywlBpVusw/default.jpg",
//               "width": 120,
//               "height": 90
//             },
//             "medium": {
//               "url": "https://i.ytimg.com/vi/z5ywlBpVusw/mqdefault.jpg",
//               "width": 320,
//               "height": 180
//             },
//             "high": {
//               "url": "https://i.ytimg.com/vi/z5ywlBpVusw/hqdefault.jpg",
//               "width": 480,
//               "height": 360
//             }
//           },
//           "channelTitle": "Hỏi Dân IT",
//           "liveBroadcastContent": "none",
//           "publishTime": "2021-12-07T12:04:57Z"
//         }
//       }
//     ]
//   }
  