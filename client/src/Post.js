import {format} from "date-fns";

export default function Post({title,summary,cover,content,createdAt}){
    return(
        <div className="post">
          <div className="image">
          <img src="https://www.go2ppo.com/wp-content/uploads/2018/10/AbInBev-1-1024x596.jpg" alt=""></img>
          </div>
          <div className="texts">
          <h2>{title}</h2>
          <p className="info">
            <a className="author">K Ranjith</a>
            <time>{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</time>
          </p>
          <p className="summary">{summary}</p>
          </div>
        </div>
    );
}