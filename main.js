const API_KEY=`ac0ee77ab7cb4975a4485d0265c3fc85`
let newsList=[]
const getLatestNews = async() => {
    const url = `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?`
    // const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    const response =  await fetch(url);
    const data = await response.json();
    console.log("rrrr", response);
    console.log("dddd", data);
    console.log("dddd", data.articles);
    newsList = data.articles;
    render();
    console.log("news", newsList);
}

const render =()=>{
    const newsHTML = newsList.map(news=>`
        <div class="row news">
            <div class="col-lg-4">
                <img class="news-image-size" src=${news.urlToImage} />
            </div>
            <div class="col-lg-8">
                <h2>${news.title}</h2>
                <p>
                    ${news.description}
                </p>
                <div>
                    ${news.source.name} * ${news.publishedAt}
                </div>
            </div>
        </div>
    `).join("")

    console.log("newsHTML", newsHTML)
    document.getElementById("news-board").innerHTML=newsHTML
}

getLatestNews(); 