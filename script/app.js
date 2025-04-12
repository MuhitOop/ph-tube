function loadCategories() {
    // fetch the category data
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
      .then((res) => res.json())
      .then((data) => displayCategories(data.categories));
    
}

function loadVideos() {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then(res => res.json())
    .then(data => displayVideos(data.videos))
}

function displayCategories(categories) {
    // get the container
    const categorieContainer = document.getElementById("category-container");
    for (const cat of categories) {
        const categoryDiv = document.createElement("div");
        categoryDiv.setAttribute("id", cat.category_id);
        categoryDiv.innerHTML = `
        <button class="btn btn-sm hover:bg-ph-red hover:text-white">${cat.category}</button>
        `;
        categorieContainer.append(categoryDiv);
    }
}

const displayVideos = (videos) => {

    const videoContainer = document.getElementById("video-container");

    videos.forEach(video => {
        console.log(video)

        const videoCard = document.createElement("div");
        videoCard.innerHTML = `
        <h2></h2>

        `
    });
}

loadCategories()
loadVideos()
