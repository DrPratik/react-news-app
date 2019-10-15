import React, {useState,useEffect} from 'react';
import './App.css';

const App = ()=>{
  const [news,setNews] = useState([])
 
  const [searchquery,setsearchquery] = useState('react') 
 
  const [url,seturl] = useState('https://hn.algolia.com/api/v1/search?query=react')
 
  const [loading,setloading] = useState(false);
 
  const fetchNews = () =>{
    setloading(true)
    fetch(url)
    .then(result => result.json())
    .then(data => setNews((data.hits),setloading(false)))
    .catch(error => console.log(error));
  };
 
  useEffect(() => {
    fetchNews();
  }, [url]);
 
  const handleChange = (e) => {
    setsearchquery(e.target.value)
  }
 
  const handleSubmit = e => {
    e.preventDefault()
    seturl(`https://hn.algolia.com/api/v1/search?query=${searchquery}`)
  }
  const showLoading = () => (loading ? <h2>Loading</h2>:"")

  const searchForm = () => (
    <form onSubmit={handleSubmit}>
        <input type='text' width="8" value={searchquery} onChange={handleChange}/>
        <button class="btn btn-success">Search</button>
      </form>
  );

  const showNews = () => (news.map((n,i) => (<p key={i}>{n.title}</p>)))
  return(
    <div>
      <h2>News</h2>
      {showLoading()}
      {searchForm()}
      {showNews()}
      
    </div>
  )
};
export default App;
