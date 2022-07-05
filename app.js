const container = document.getElementById('root');
const ajax = new XMLHttpRequest();
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';
const div = document.createElement('div');

const getData = (url) => {
  ajax.open('GET', url, false);
  ajax.send();
  console.log(JSON.parse(ajax.response));
  return JSON.parse(ajax.response);
};

const newsFeed = getData(NEWS_URL);
const ul = document.createElement('ul');
window.addEventListener('hashchange', () => {
  const id = location.hash.substring(1);
  const newContents = getData(CONTENT_URL.replace('@id', id));

  const h1 = document.createElement('h1');
  h1.innerHTML = newContents.title;
  div.appendChild(h1);
});
newsFeed.map((el, idx) => {
  const div = document.createElement('div');

  div.innerHTML = `<li>
  <a href='#${el.id}'>${el.title} (${el.comments_count})</a>
  </li>`;

  ul.appendChild(div.firstElementChild);
});

container.appendChild(ul);
container.appendChild(div);
