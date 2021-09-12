import { posts } from "./json/allPosts.js"

/* <h1 class="post-title" /> */
const postLink = document.querySelector(".content-link")
const postImg = document.querySelector(".banner-image")
const postTitle = document.querySelector(".post-title")
/**
 * ?=title -> ["", "title"] -> "title"
*/
const urlPostName = location.search.split("?=")[1]

posts.map(({ title, name, img  }) => {
  if(urlPostName === name) {
    postTitle.innerHTML = title
    document.title = title

    const { author, url, description } = img

    postLink.setAttribute("href", author)
    postImg.setAttribute("src", url)
    postImg.setAttribute("alt", description)
  }
});