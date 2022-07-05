const container = document.getElementById('root');
const ajax = new XMLHttpRequest();
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';

const getData = (url) => {
  ajax.open('GET', url, false);
  ajax.send();

  return JSON.parse(ajax.response);
};

const newsDetail = () => {
  const id = location.hash.substring(1);
  const newContents = getData(CONTENT_URL.replace('@id', id));

  container.innerHTML = `
 <h1>${newContents.title}</h1>
 <div>
 <a href=''>목록으로</a>
 </div>
 `;
};

const newsFeed = () => {
  const newsFeedData = getData(NEWS_URL);
  const newList = [];

  newList.push('<ul>');
  newsFeedData.map((el, idx) => {
    newList.push(`<li>
  <a href='#${el.id}'>${el.title} (${el.comments_count})</a>
  </li>`);
  });
  newList.push('</ul>');

  container.innerHTML = newList.join('');
};

const router = () => {
  const routePath = location.hash;
  console.log(routePath);
  if (routePath === '') {
    newsFeed();
  } else {
    newsDetail();
  }
};

window.addEventListener('hashchange', router);

router();
