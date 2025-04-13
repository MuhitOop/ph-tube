function removeActiveClass() {
  const activeBtns = document.getElementsByClassName("active");
  for (let btn of activeBtns) {
    btn.classList.remove("active");
  }
  // console.log(activeBtns)
}

function loadCategories() {
  // fetch the category data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
}

function loadVideos() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      document.getElementById("btn-all").classList.add("active");

      displayVideos(data.videos);
    });
}

function loadCategoryVideos(id) {
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  //   console.log(url);

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      const clickedBtn = document.getElementById(`btn-${id}`);
      clickedBtn.classList.add("active");

      displayVideos(data.category);
    });
}

const loadVideoDetails = (videoId) => {
  // console.log(videoId)
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayVideoDetails(data.video));
};

const displayVideoDetails = (video) => {
  console.log(video);
  document.getElementById("video_details").showModal();
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `
    <div class="card bg-base-100 image-full  shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>${video.description}</p>
  </div>
</div>
    `;
};

function displayCategories(categories) {
  // get the container
  const categorieContainer = document.getElementById("category-container");
  for (const cat of categories) {
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
        <button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})"  class="btn btn-sm hover:bg-ph-red hover:text-white">${cat.category}</button>
        `;
    categorieContainer.append(categoryDiv);
  }
}

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = "";

  if (videos.length === 0) {
    videoContainer.innerHTML = `
        <div class="py-20 col-span-full text-center flex flex-col justify-center items-center ">
      <img class="w-[120px]" src="resources/Icon.png" alt="">
      <h1 class="text-2xl font-bold">Oops!! Sorry, There is no <br> content here</h1>
     </div>
        `;
    return;
  }

  videos.forEach((video) => {
    // console.log(video);

    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
         <div class="card bg-base-100">
        <figure class="relative">
          <img class="w-full h-[200px] object-cover"
            src="${video.thumbnail}"
          />

          <span
            class="absolute bottom-2 right-2 text-[#FFFFFF90] bg-[#171717] px-2 rounded-[4px]"
            >3hrs 56 min ago</span
          >
        </figure>
        <div class="flex gap-3 px-0 py-5">
          <div class="profile">
            <div class="avatar">
              <div class="w-10 rounded-full">
                <img
                  src="${video.authors[0].profile_picture}"
                />
              </div>
            </div>
          </div>
          <div class="intro">
            <h2 class="text-sm font-semibold">${video.title}</h2>
            <p class="text-sm text-gray-500 flex gap-1 items-center">${video.authors[0].profile_name} <img  class="w-5 h-5" src="https://img.icons8.com/?size=100&id=98A4yZTt9abw&format=png&color=000000" alt=""></p>
            <p class="text-sm text-gray-500">${video.others.views}</p>
          </div>
        </div>
        <button onclick ="loadVideoDetails('${video.video_id}')" class="btn btn-block">Show Details</button>
      </div>
        `;

    // append the element
    videoContainer.append(videoCard);
  });
};

loadCategories();

// {
//     "category_id": "1001",
//     "video_id": "aaaa",
//     "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//     "title": "Shape of You",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//             "profile_name": "Olivia Mitchell",
//             "verified": ""
//         }
//     ],
//     "others": {
//         "views": "100K",
//         "posted_date": "16278"
//     },
//     "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// }
