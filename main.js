const API_KEY=`ac0ee77ab7cb4975a4485d0265c3fc85`
let news=[]
const getLatestNews = async() => {
    const url = `https://noona-20240710.netlify.app/top-headlines?`
    // const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    const response =  await fetch(url);
    const data = await response.json();
    console.log("rrrr", response);
    console.log("dddd", data);
    console.log("dddd", data.articles);
    news = data.articles;
    console.log("news", news);
}

getLatestNews(); 